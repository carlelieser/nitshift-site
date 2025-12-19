// src/lib/server/rate-limiter.ts
import { getFirestore } from 'firebase-admin/firestore';
import type { RateLimitResult } from './types';

const MAX_TOKENS = 3;
const REFILL_INTERVAL_MS = 100000; // 100 seconds (3 tokens per 5 min)

/**
 * Check rate limit for email using token bucket algorithm.
 *
 * Implements a token bucket with 3 tokens that refill at 100-second intervals,
 * allowing 3 requests per 5-minute window. Stores rate limit state in Firestore.
 *
 * Algorithm:
 * 1. First request: Create bucket with 2 remaining tokens (consume 1)
 * 2. Subsequent requests: Refill tokens based on elapsed time
 * 3. If tokens available: Consume 1 and allow request
 * 4. If no tokens: Return retry delay
 *
 * @param email - Email address to check rate limit for
 * @returns Rate limit result indicating if request is allowed and retry timing
 *
 * @example
 * ```typescript
 * const limit = await checkRateLimit('user@example.com');
 * if (limit.allowed) {
 *   await sendEmail();
 *   console.log(`${limit.remainingTokens} requests remaining`);
 * } else {
 *   const seconds = Math.ceil(limit.retryAfterMs / 1000);
 *   throw new Error(`Rate limited. Retry in ${seconds} seconds`);
 * }
 * ```
 */
export async function checkRateLimit(email: string): Promise<RateLimitResult> {
	const db = getFirestore();
	const docRef = db.collection('rate-limits').doc(`email:${email}`);
	const doc = await docRef.get();

	if (!doc.exists) {
		// First request - create with 2 tokens remaining (consume 1)
		await docRef.set({
			tokens: MAX_TOKENS - 1,
			lastRefill: Date.now(),
			windowMs: 300000
		});
		return { allowed: true, remainingTokens: MAX_TOKENS - 1 };
	}

	const data = doc.data()!;
	const now = Date.now();
	const elapsed = now - data.lastRefill;
	const tokensToAdd = Math.floor(elapsed / REFILL_INTERVAL_MS);

	let tokens = Math.min(data.tokens + tokensToAdd, MAX_TOKENS);

	if (tokens > 0) {
		// Allow request, consume token
		await docRef.update({
			tokens: tokens - 1,
			lastRefill: data.lastRefill + (tokensToAdd * REFILL_INTERVAL_MS)
		});
		return { allowed: true, remainingTokens: tokens - 1 };
	} else {
		// Rate limited
		const retryAfterMs = REFILL_INTERVAL_MS - (elapsed % REFILL_INTERVAL_MS);
		return { allowed: false, retryAfterMs };
	}
}

/**
 * Reset rate limit for an email address (testing only).
 *
 * Deletes the rate limit document from Firestore, allowing the email
 * to make requests as if it's the first time. Used in test cleanup.
 *
 * @param email - Email address to reset rate limit for
 *
 * @example
 * ```typescript
 * // In test cleanup
 * afterEach(async () => {
 *   await resetRateLimit('test@example.com');
 * });
 * ```
 */
export async function resetRateLimit(email: string): Promise<void> {
	const db = getFirestore();
	await db.collection('rate-limits').doc(`email:${email}`).delete();
}
