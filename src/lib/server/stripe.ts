import { STRIPE_SECRET_KEY } from "$env/static/private";
import Stripe from "stripe";

export const stripe = new Stripe(STRIPE_SECRET_KEY);

export const findCustomerByEmail = async (email: string) => {
	const response = await stripe.customers.list({
		email,
		limit: 1
	});
	if (!response || response?.data?.length === 0)
		throw new Error("A customer with that email doesn't exist.");
	return response.data[0];
};

export const getLatestPaymentIntent = async (customerId: string) => {
	const response = await stripe.paymentIntents.list({
		customer: customerId
	});
	if (!response || response?.data?.length === 0)
		throw new Error("A payment couldn't be found for this customer.");
	return response.data[0];
};
