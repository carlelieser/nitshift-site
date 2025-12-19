// src/routes/api/webhooks/postmark/+server.ts
import { json, type RequestHandler } from '@sveltejs/kit';
import { getFirestore } from 'firebase-admin/firestore';

/**
 * POST /api/webhooks/postmark
 * Handles bounce notifications from Postmark email service
 */
export const POST: RequestHandler = async ({ request }) => {
	try {
		const webhook = await request.json();

		// Validate webhook signature (optional, for production)
		// ...

		// Store bounce in Firestore
		await getFirestore()
			.collection('bounce-log')
			.add({
				email: webhook.Email,
				bounceType:
					webhook.Type === 'HardBounce'
						? 'hard'
						: webhook.Type === 'SoftBounce'
							? 'soft'
							: 'spam_complaint',
				bouncedAt: new Date(webhook.BouncedAt).getTime(),
				reason: webhook.Description || '',
				messageId: webhook.MessageID
			});

		return json({ received: true });
	} catch (err) {
		console.error('Postmark webhook error:', err);
		return json({ received: false }, { status: 500 });
	}
};
