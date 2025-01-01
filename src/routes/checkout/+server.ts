import { LICENSE_MAX_PRICE, LICENSE_MIN_PRICE, STRIPE_PRODUCT_ID } from "$env/static/private";
import { json, redirect, type RequestHandler } from "@sveltejs/kit";
import range from "lodash/range";
import { stripe } from "$lib/server/stripe";

export const GET: RequestHandler = async ({ url }) => {
	const { searchParams } = url;
	const suggestedPriceAmount = searchParams.get("price");
	const customerId = searchParams.get("customer-id");
	const priceAmount = suggestedPriceAmount
		? Number(suggestedPriceAmount)
		: Number(LICENSE_MIN_PRICE);
	const priceRange = range(Number(LICENSE_MIN_PRICE), Number(LICENSE_MAX_PRICE) + 1);
	const priceIsValid = priceRange.includes(priceAmount);

	if (!priceIsValid) {
		return json({ error: "Invalid price" }, { status: 400 });
	}

	const existingPrices = await stripe.prices.search({
		query: `product: "${STRIPE_PRODUCT_ID}"`
	});
	const existingPrice = existingPrices.data.find(
		(price) => price.unit_amount === priceAmount * 100
	);

	let priceId = existingPrice?.id;

	if (!priceId) {
		const price = await stripe.prices.create({
			unit_amount: priceAmount * 100,
			currency: "usd",
			product: STRIPE_PRODUCT_ID
		});
		priceId = price.id;
	}

	const paymentLink = await stripe.paymentLinks.create({
		metadata: {
			id: customerId
		},
		line_items: [
			{
				price: priceId,
				quantity: 1
			}
		],
		customer_creation: "always"
	});

	throw redirect(303, paymentLink.url);
};
