import type { RequestHandler } from "./$types";
import { json } from "@sveltejs/kit";
import { postmarkClient } from "$lib/server/postmark";
import { stripe } from "$lib/server/stripe";
import Stripe from "stripe";
import { getReviewRequestConfig, toPostmarkConfig } from "$lib/server/mailer";
import uniqBy from "lodash/uniqBy";

const getAllCustomers = async (customers: Array<Stripe.Customer> = [], startingAfter?: string) => {
	const response = await stripe.customers.list({
		starting_after: startingAfter,
		limit: 100
	});

	if (response.has_more) {
		return getAllCustomers(
			[...customers, ...response.data],
			response.data.at(response.data.length - 1)?.id
		);
	}

	return [...customers, ...response.data];
};

export const GET: RequestHandler = async () => {
	const customers = await getAllCustomers();
	const uniqueCustomers = uniqBy(customers, "email");
	const messages = uniqueCustomers.map((customer) => ({
		...toPostmarkConfig(
			getReviewRequestConfig(customer.email as string, customer.name as string)
		),
		MessageStream: "broadcast"
	}));

	await postmarkClient.sendEmailBatch(messages);

	return json({
		success: true
	});
};
