import { json, type RequestHandler } from "@sveltejs/kit";
import { findCustomerByEmail, getLatestPaymentIntent } from "$lib/server/stripe";

export const GET: RequestHandler = async ({ url }) => {
	const { searchParams } = url;
	const email = searchParams.get("email");

	if (email) {
		const customer = await findCustomerByEmail(email);
		const paymentIntent = await getLatestPaymentIntent(customer.id);
		const success = paymentIntent.status === "succeeded";

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
};
