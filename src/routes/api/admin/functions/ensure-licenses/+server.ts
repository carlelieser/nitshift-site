import { stripe } from "$lib/server/stripe";
import { json, type RequestHandler } from "@sveltejs/kit";
import { generateLicenseAndNotifyUser } from "$lib/server/license";
import admin from "firebase-admin";

/*
	Ensures all paid users have a license.
 */
const ensureLicenses = async (starting_after?: string) => {
	const checkouts = await stripe.checkout.sessions.list({
		starting_after,
		status: "complete",
		limit: 100
	});

	for await (const checkout of checkouts.data) {
		if (checkout.payment_status === "paid" && checkout.customer_details) {
			const licenseRef = admin
				.firestore()
				.collection("licenses")
				.doc(checkout.customer_details.email as string);
			const license = await licenseRef.get();
			if (!license.exists) {
				const paymentIntent = await stripe.paymentIntents.retrieve(
					checkout.payment_intent as string
				);
				await generateLicenseAndNotifyUser(
					paymentIntent,
					"We've recently upgraded our licensing infrastructure. Since you've already purchased a premium license, we've issued you a key to use on any device."
				);
			}
		}
	}

	if (checkouts.has_more) {
		await ensureLicenses(checkouts.data.pop()?.id);
	}
};

export const GET: RequestHandler = async () => {
	await ensureLicenses();
	return json({
		success: true
	});
};
