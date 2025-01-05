import { error, json, type RequestHandler } from "@sveltejs/kit";
import { generateLicenseAndNotifyUser } from "$lib/server/license";
import { stripe } from "$lib/server/stripe";
import { STRIPE_WEBHOOK_SECRET } from "$env/static/private";

export const POST: RequestHandler = async ({ request }) => {
	const sig = request.headers.get("stripe-signature") as string;

	let event;

	try {
		event = stripe.webhooks.constructEvent(
			Buffer.from(await request.arrayBuffer()),
			sig,
			STRIPE_WEBHOOK_SECRET
		);
	} catch (err: any) {
		console.error(err);
		return error(400, { message: `Webhook Error: ${err.message}` });
	}

	const type = event.type;

	if (type === "payment_intent.succeeded") {
		await generateLicenseAndNotifyUser(event.data.object);
	}

	return json({
		received: true
	});
};
