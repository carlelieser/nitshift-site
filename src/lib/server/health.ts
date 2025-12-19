// src/lib/server/health.ts
import { getFirestore } from 'firebase-admin/firestore';
import type { HealthStatus, EmailSendResult } from './types';

const HEALTH_DOC_ID = 'email-service';

/**
 * Get current email service health status from Firestore.
 *
 * Returns the current health status based on consecutive failures:
 * - healthy: 0-2 consecutive failures
 * - degraded: 3-4 consecutive failures
 * - unavailable: 5+ consecutive failures
 *
 * If no health document exists, assumes healthy state.
 *
 * @returns Current health status including consecutive failures and last success timestamp
 *
 * @example
 * ```typescript
 * const health = await getHealthStatus();
 * if (health.emailService === 'unavailable') {
 *   console.error(`Email service down: ${health.consecutiveFailures} failures`);
 *   // Disable email features or show maintenance message
 * }
 * ```
 */
export async function getHealthStatus(): Promise<HealthStatus> {
	const db = getFirestore();
	const doc = await db.collection('system-health').doc(HEALTH_DOC_ID).get();

	if (!doc.exists) {
		return {
			emailService: 'healthy',
			consecutiveFailures: 0,
			timestamp: Date.now()
		};
	}

	const data = doc.data()!;
	return {
		emailService: data.status,
		consecutiveFailures: data.consecutiveFailures || 0,
		lastSuccessfulSend: data.lastSuccessfulSend,
		timestamp: Date.now()
	};
}

/**
 * Update email service health status based on send result.
 *
 * Tracks consecutive failures and transitions health status accordingly:
 * - On success: Resets to healthy (0 failures)
 * - On failure: Increments failure count and updates status
 *   - 0-2 failures: healthy
 *   - 3-4 failures: degraded
 *   - 5+ failures: unavailable
 *
 * Maintains error log of last 10 failures for debugging.
 *
 * @param result - Email send result (success or error with type/message)
 *
 * @example
 * ```typescript
 * try {
 *   await sendEmail();
 *   await updateHealthStatus({ success: true, timestamp: Date.now(), retryEligible: false });
 * } catch (err) {
 *   const emailResult = mapPostmarkError(err);
 *   await updateHealthStatus(emailResult); // Increments failure count
 * }
 * ```
 */
export async function updateHealthStatus(result: EmailSendResult): Promise<void> {
	const db = getFirestore();
	const docRef = db.collection('system-health').doc(HEALTH_DOC_ID);
	const doc = await docRef.get();

	if (result.success) {
		await docRef.set(
			{
				status: 'healthy',
				consecutiveFailures: 0,
				lastSuccessfulSend: Date.now(),
				lastHealthCheck: Date.now()
			},
			{ merge: true }
		);
	} else {
		const currentFailures = doc.exists ? (doc.data()!.consecutiveFailures || 0) : 0;
		const newFailures = currentFailures + 1;

		let status = 'healthy';
		if (newFailures >= 5) {
			status = 'unavailable';
		} else if (newFailures >= 3) {
			status = 'degraded';
		}

		await docRef.set(
			{
				status,
				consecutiveFailures: newFailures,
				lastHealthCheck: Date.now(),
				errorLog: [...(doc.data()?.errorLog || []).slice(-9), { timestamp: Date.now(), errorType: result.errorType }]
			},
			{ merge: true }
		);
	}
}
