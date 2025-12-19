// src/lib/server/error-mapper.ts
import { EmailErrorType, type EmailSendResult } from './types';

/**
 * Maps Postmark SDK errors to standardized EmailSendResult.
 *
 * Handles HTTP status codes (400, 422, 429, 500, 503), timeout errors,
 * and unknown errors. Determines retry eligibility based on error type.
 *
 * @param error - Error object from Postmark SDK or network request
 * @returns Standardized email send result with error classification
 *
 * @example
 * ```typescript
 * try {
 *   await postmark.sendEmail(params);
 * } catch (err) {
 *   const result = mapPostmarkError(err);
 *   console.error(`${result.errorType}: ${result.errorMessage}`);
 *   if (result.retryEligible) {
 *     console.log('User can retry this operation');
 *   }
 * }
 * ```
 */
export function mapPostmarkError(error: any): EmailSendResult {
	const timestamp = Date.now();

	// Timeout errors
	if (error.name === 'AbortError' || error.message?.includes('timeout')) {
		return {
			success: false,
			errorType: EmailErrorType.NETWORK_TIMEOUT,
			errorMessage: 'Request timed out. Please check your internet connection and try again.',
			timestamp,
			retryEligible: true
		};
	}

	// HTTP status code errors
	const statusCode = error.statusCode || error.status;

	switch (statusCode) {
		case 400:
			return {
				success: false,
				errorType: EmailErrorType.INVALID_FORMAT,
				errorMessage: 'Invalid email address format',
				timestamp,
				retryEligible: false
			};

		case 422:
			// Check error message for specific type
			if (error.message?.toLowerCase().includes('domain')) {
				return {
					success: false,
					errorType: EmailErrorType.INVALID_DOMAIN,
					errorMessage: 'Email domain does not exist or has no mail server',
					timestamp,
					retryEligible: false
				};
			}
			return {
				success: false,
				errorType: EmailErrorType.DISPOSABLE_EMAIL,
				errorMessage: 'Disposable email addresses are not allowed',
				timestamp,
				retryEligible: false
			};

		case 429:
			return {
				success: false,
				errorType: EmailErrorType.RATE_LIMITED,
				errorMessage: 'Too many verification requests. Please wait before trying again.',
				timestamp,
				retryEligible: true,
				retryAfterMs: 120000 // 2 minutes default
			};

		case 500:
		case 503:
			return {
				success: false,
				errorType: EmailErrorType.SERVICE_UNAVAILABLE,
				errorMessage: 'Email service is temporarily unavailable. Please try again later.',
				timestamp,
				retryEligible: true
			};

		default:
			return {
				success: false,
				errorType: EmailErrorType.UNKNOWN,
				errorMessage: error.message || 'An unexpected error occurred. Please try again.',
				timestamp,
				retryEligible: true
			};
	}
}

export { EmailErrorType };
