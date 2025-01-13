import { randomUUID } from "crypto";
import Stripe from "stripe";
import { stripe } from "$lib/server/stripe";
import { sendLicenseEmail } from "$lib/server/mailer";
import { LicenseCollection } from "$lib/server/firebase";

export const generateLicenseAndNotifyUser = async (
	paymentIntent: Stripe.PaymentIntent,
	infoText?: string
) => {
	const license = randomUUID().toUpperCase();
	const customer = await stripe.customers.retrieve(paymentIntent.customer as string);

	if (customer.deleted || !customer.email) return null;

	await LicenseCollection().doc(customer.email).set({
		code: license,
		issuedOn: new Date()
	});

	await sendLicenseEmail(customer.email, license, infoText);
};
