// src/lib/server/types.ts

/**
 * Email error types for classification and user messaging.
 *
 * Used throughout the email verification system to categorize failures
 * and determine appropriate user-facing messages and retry eligibility.
 *
 * @example
 * ```typescript
 * if (result.errorType === EmailErrorType.RATE_LIMITED) {
 *   console.log(`Retry after ${result.retryAfterMs}ms`);
 * }
 * ```
 */
export enum EmailErrorType {
	/** Email format does not match RFC 5322 pattern (not retryable) */
	INVALID_FORMAT = 'invalid_format',
	/** Domain has no MX records or does not exist (not retryable) */
	INVALID_DOMAIN = 'invalid_domain',
	/** Email uses disposable/temporary provider (not retryable) */
	DISPOSABLE_EMAIL = 'disposable_email',
	/** Too many requests in time window (retryable after delay) */
	RATE_LIMITED = 'rate_limited',
	/** Email service temporarily unavailable (retryable) */
	SERVICE_UNAVAILABLE = 'service_unavailable',
	/** Email send request timed out (retryable) */
	NETWORK_TIMEOUT = 'network_timeout',
	/** Unexpected error occurred (retryable) */
	UNKNOWN = 'unknown'
}

/**
 * Result of an email sending operation.
 *
 * Returned by email sending functions to provide comprehensive error context,
 * including retry eligibility and timing information for rate limiting.
 *
 * @example
 * ```typescript
 * const result: EmailSendResult = await sendVerificationEmail(email, code);
 * if (!result.success) {
 *   console.error(`Email failed: ${result.errorMessage}`);
 *   if (result.retryEligible && result.retryAfterMs) {
 *     console.log(`Retry after ${result.retryAfterMs}ms`);
 *   }
 * }
 * ```
 */
export interface EmailSendResult {
	/** Whether the email was sent successfully */
	success: boolean;
	/** Error type if send failed (undefined on success) */
	errorType?: EmailErrorType;
	/** Human-readable error message for user display */
	errorMessage?: string;
	/** Timestamp (milliseconds since epoch) of the send attempt */
	timestamp: number;
	/** Whether the user should retry this operation */
	retryEligible: boolean;
	/** Milliseconds until retry is allowed (for rate limiting) */
	retryAfterMs?: number;
	/** Additional metadata about the send operation */
	metadata?: {
		/** Postmark message ID for tracking */
		postmarkMessageId?: string;
		/** Email send duration in milliseconds */
		duration?: number;
	};
}

/**
 * Result of a rate limit check using token bucket algorithm.
 *
 * The rate limiter allows 3 requests per 5-minute window. Tokens refill
 * at 100-second intervals.
 *
 * @example
 * ```typescript
 * const limit = await checkRateLimit('user@example.com');
 * if (!limit.allowed) {
 *   const seconds = Math.ceil(limit.retryAfterMs / 1000);
 *   console.log(`Rate limited. Retry in ${seconds} seconds`);
 * } else {
 *   console.log(`${limit.remainingTokens} requests remaining`);
 * }
 * ```
 */
export interface RateLimitResult {
	/** Whether the request is allowed to proceed */
	allowed: boolean;
	/** Milliseconds until next token refills (only if !allowed) */
	retryAfterMs?: number;
	/** Number of tokens remaining in bucket (only if allowed) */
	remainingTokens?: number;
}

/**
 * Email service health status.
 *
 * Health transitions based on consecutive failures:
 * - healthy: 0-2 failures
 * - degraded: 3-4 failures
 * - unavailable: 5+ failures
 *
 * @example
 * ```typescript
 * const health = await getHealthStatus();
 * if (health.emailService !== 'healthy') {
 *   console.warn(`Email service ${health.emailService}: ${health.consecutiveFailures} failures`);
 * }
 * ```
 */
export interface HealthStatus {
	/** Overall health status of email service */
	emailService: 'healthy' | 'degraded' | 'unavailable';
	/** Number of consecutive failures (resets to 0 on success) */
	consecutiveFailures: number;
	/** Timestamp (ms since epoch) of last successful send */
	lastSuccessfulSend?: number;
	/** Timestamp (ms since epoch) of this health check */
	timestamp: number;
}
