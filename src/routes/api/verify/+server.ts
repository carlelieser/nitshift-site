import { error, json, type RequestHandler } from '@sveltejs/kit';
import { randomUUID } from 'crypto';
import { sendEmailVerification } from '$lib/server/mailer';
import { handleRequest } from '$lib/server/utils';
import { get, UserCollection, VerificationCodeCollection } from '$lib/server/firebase';
import { validateEmailFull } from '$lib/server/validation';
import { checkRateLimit } from '$lib/server/rate-limiter';
import { mapPostmarkError } from '$lib/server/error-mapper';
import { updateHealthStatus } from '$lib/server/health';
import { EmailErrorType } from '$lib/server/types';
import { withTimeout } from '$lib/server/timeout';
import {
	logEmailVerificationAttempt,
	logCodeVerificationAttempt,
	logRateLimitEvent
} from '$lib/server/logger';

export const GET: RequestHandler = handleRequest(async ({ url, locals }) => {
	const { searchParams } = url;
	const email = searchParams.get('email');
	const code = searchParams.get('code');

	// CODE VERIFICATION FLOW (existing logic with enhancements)
	if (email && code) {
		const verificationCode = await get(VerificationCodeCollection(), email);

		if (verificationCode.data) {
			const isExpired = verificationCode.data.expires < Date.now();

			if (isExpired) {
				await verificationCode.ref.delete();
				return error(410, {
					message: 'Verification code expired',
					errorType: 'code_expired'
				});
			}

			// Check max attempts
			if (verificationCode.data.attempts >= 5) {
				await verificationCode.ref.delete();
				return error(403, {
					message: 'Too many failed attempts. Please request a new verification code.'
				});
			}

			const verified = verificationCode.data.code === code;

			if (verified) {
				logCodeVerificationAttempt({
					email,
					success: true,
					attempts: verificationCode.data.attempts
				});

				await verificationCode.ref.delete();
				await UserCollection()
					.doc(locals.user?.id as string)
					.set({ email }, { merge: true });
				return json({ verified: true }, { status: 200 });
			} else {
				// Increment attempts
				const newAttempts = verificationCode.data.attempts + 1;

				logCodeVerificationAttempt({
					email,
					success: false,
					attempts: newAttempts
				});

				await verificationCode.ref.update({
					attempts: newAttempts
				});
				return json({ verified: false }, { status: 403 });
			}
		}

		return error(404, {
			message: 'Verification code not found'
		});
	}

	// EMAIL SENDING FLOW (NEW ERROR HANDLING)
	if (email) {
		// Step 1: Validate email format and domain
		const validation = await validateEmailFull(email);
		if (!validation.valid) {
			const statusCode = validation.errorType === 'invalid_format' ? 400 : 422;
			return error(statusCode, {
				errorType: validation.errorType,
				message:
					validation.errorType === 'invalid_format'
						? 'Invalid email address format'
						: validation.errorType === 'disposable_email'
							? 'Disposable email addresses are not allowed'
							: 'Email domain does not exist or has no mail server',
				retryEligible: false
			});
		}

		// Step 2: Check rate limit
		const rateLimit = await checkRateLimit(email);

		logRateLimitEvent({
			email,
			allowed: rateLimit.allowed,
			remainingTokens: rateLimit.remainingTokens,
			retryAfterMs: rateLimit.retryAfterMs
		});

		if (!rateLimit.allowed) {
			return error(429, {
				errorType: EmailErrorType.RATE_LIMITED,
				message: 'Too many verification requests. Please wait before trying again.',
				retryEligible: true,
				retryAfterMs: rateLimit.retryAfterMs
			});
		}

		// Step 3: Generate code
		const id = randomUUID().split('-').join('');
		const verificationCode = id.substring(0, 6).toUpperCase();

		try {
			// Step 4: Send email FIRST (transactional integrity) with 10s timeout
			const startTime = Date.now();

			await withTimeout(sendEmailVerification(email, verificationCode), 10000);

			const duration = Date.now() - startTime;

			// Step 5: ONLY create code after successful send
			await VerificationCodeCollection()
				.doc(email)
				.set({
					code: verificationCode,
					email,
					expires: Date.now() + 1000 * 60 * 5, // 5 minutes
					sentAt: Date.now(),
					attempts: 0,
					createdAt: Date.now()
				});

			// Step 6: Update health status
			await updateHealthStatus({
				success: true,
				timestamp: Date.now(),
				retryEligible: false,
				metadata: { duration }
			});

			// Log successful email verification attempt
			logEmailVerificationAttempt({
				email,
				success: true,
				duration
			});

			return json({ success: true });
		} catch (err: any) {
			// Step 7: Map error and update health
			const emailResult = mapPostmarkError(err);
			await updateHealthStatus(emailResult);

			// Log failed email verification attempt
			logEmailVerificationAttempt({
				email,
				success: false,
				errorType: emailResult.errorType,
				duration: Date.now() - startTime
			});

			// Return appropriate error
			const statusCode =
				emailResult.errorType === EmailErrorType.RATE_LIMITED
					? 429
					: emailResult.errorType === EmailErrorType.SERVICE_UNAVAILABLE
						? 503
						: 500;

			return error(statusCode, {
				errorType: emailResult.errorType,
				message: emailResult.errorMessage,
				retryEligible: emailResult.retryEligible,
				retryAfterMs: emailResult.retryAfterMs
			});
		}
	}

	return error(400, {
		message: 'No email provided'
	});
});
