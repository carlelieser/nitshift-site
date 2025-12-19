// src/lib/server/logger.ts
import crypto from 'crypto';

/**
 * Hash email for privacy-preserving logging.
 * Uses SHA-256 and returns first 16 characters for readability.
 *
 * @param email - Email address to hash
 * @returns First 16 characters of SHA-256 hash
 *
 * @example
 * ```typescript
 * const hash = hashEmail('user@example.com');
 * // Returns: "a1b2c3d4e5f6g7h8"
 * ```
 */
function hashEmail(email: string): string {
	return crypto.createHash('sha256').update(email).digest('hex').substring(0, 16);
}

/**
 * Log email verification attempt with structured JSON format.
 * Includes privacy-preserving email hash, success status, error type, and duration.
 *
 * @param data - Email verification attempt data
 * @param data.email - Email address (will be hashed)
 * @param data.success - Whether email send succeeded
 * @param data.errorType - Error type if failed (optional)
 * @param data.duration - Email send duration in milliseconds (optional)
 *
 * @example
 * ```typescript
 * logEmailVerificationAttempt({
 *   email: 'user@example.com',
 *   success: true,
 *   duration: 1250
 * });
 * // Output: {"event":"email_verification_attempt","emailHash":"a1b2c3d4e5f6g7h8","success":true,"duration":1250,"timestamp":1234567890}
 * ```
 */
export function logEmailVerificationAttempt(data: {
	email: string;
	success: boolean;
	errorType?: string;
	duration?: number;
}): void {
	console.log(
		JSON.stringify({
			event: 'email_verification_attempt',
			emailHash: hashEmail(data.email),
			success: data.success,
			errorType: data.errorType,
			duration: data.duration,
			timestamp: Date.now()
		})
	);
}

/**
 * Log code verification attempt with structured JSON format.
 * Tracks verification success, attempts count, and email hash.
 *
 * @param data - Code verification attempt data
 * @param data.email - Email address (will be hashed)
 * @param data.success - Whether code verification succeeded
 * @param data.attempts - Number of attempts made for this code
 *
 * @example
 * ```typescript
 * logCodeVerificationAttempt({
 *   email: 'user@example.com',
 *   success: false,
 *   attempts: 2
 * });
 * // Output: {"event":"code_verification_attempt","emailHash":"a1b2c3d4e5f6g7h8","success":false,"attempts":2,"timestamp":1234567890}
 * ```
 */
export function logCodeVerificationAttempt(data: {
	email: string;
	success: boolean;
	attempts: number;
}): void {
	console.log(
		JSON.stringify({
			event: 'code_verification_attempt',
			emailHash: hashEmail(data.email),
			success: data.success,
			attempts: data.attempts,
			timestamp: Date.now()
		})
	);
}

/**
 * Log rate limit event with structured JSON format.
 * Tracks when users are rate limited and remaining tokens.
 *
 * @param data - Rate limit event data
 * @param data.email - Email address (will be hashed)
 * @param data.allowed - Whether request was allowed
 * @param data.remainingTokens - Number of tokens remaining (optional)
 * @param data.retryAfterMs - Milliseconds until retry allowed (optional)
 *
 * @example
 * ```typescript
 * logRateLimitEvent({
 *   email: 'user@example.com',
 *   allowed: false,
 *   retryAfterMs: 120000
 * });
 * ```
 */
export function logRateLimitEvent(data: {
	email: string;
	allowed: boolean;
	remainingTokens?: number;
	retryAfterMs?: number;
}): void {
	console.log(
		JSON.stringify({
			event: 'rate_limit_check',
			emailHash: hashEmail(data.email),
			allowed: data.allowed,
			remainingTokens: data.remainingTokens,
			retryAfterMs: data.retryAfterMs,
			timestamp: Date.now()
		})
	);
}

/**
 * Log health status change with structured JSON format.
 * Tracks email service health transitions.
 *
 * @param data - Health status data
 * @param data.status - Health status (healthy/degraded/unavailable)
 * @param data.consecutiveFailures - Number of consecutive failures
 * @param data.transition - Whether this is a status transition (optional)
 *
 * @example
 * ```typescript
 * logHealthStatusChange({
 *   status: 'degraded',
 *   consecutiveFailures: 3,
 *   transition: true
 * });
 * ```
 */
export function logHealthStatusChange(data: {
	status: 'healthy' | 'degraded' | 'unavailable';
	consecutiveFailures: number;
	transition?: boolean;
}): void {
	console.log(
		JSON.stringify({
			event: 'health_status_change',
			status: data.status,
			consecutiveFailures: data.consecutiveFailures,
			transition: data.transition,
			timestamp: Date.now()
		})
	);
}
