import { stripe } from "$lib/server/stripe";

export const load = async ({ url }) => {
	const { searchParams } = url;
	const sessionId = searchParams.get("sessionId") as string;
	const price = searchParams.get("price") as string;
	const customerId = searchParams.get("customer-id") as string;

	const session = await stripe.checkout.sessions.retrieve(sessionId);
	const success = session.payment_status === "paid";

	return {
		checkout: {
			success,
			price,
			customerId
		}
	};
};
