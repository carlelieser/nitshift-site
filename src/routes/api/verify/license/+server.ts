import { json, type RequestHandler } from "@sveltejs/kit";
import { findCustomerByEmail, getLatestPaymentIntent } from "$lib/server/stripe";
import { handleRequest } from "$lib/server/utils";
import { sendLicenseVerifiedEmail } from "$lib/server/mailer";
import admin from "firebase-admin";

export const GET: RequestHandler = handleRequest(async ({ url, locals, fetch }) => {
	const { searchParams } = url;
	const email = searchParams.get("email");

	if (email) {
		const customer = await findCustomerByEmail(email);
		const paymentIntent = await getLatestPaymentIntent(customer.id);
		const success = paymentIntent.status === "succeeded";

		if (success) {
			await sendLicenseVerifiedEmail(email);
			await admin
				.firestore()
				.collection("users")
				.doc(locals.user?.id as string)
				.set(
					{ license: "premium", trialAvailability: false, trialStartDate: null },
					{ merge: true }
				);
		}

		return json(
			{
				success
			},
			{
				status: success ? 200 : 403
			}
		);
	}

	return json({ error: "No email provided" }, { status: 400 });
});
