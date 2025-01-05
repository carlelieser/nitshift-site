import { randomUUID } from "crypto";
import Stripe from "stripe";
import admin from "firebase-admin";
import { stripe } from "$lib/server/stripe";
import { sendLicenseEmail } from "$lib/server/mailer";

export const generateLicenseAndNotifyUser = async (paymentIntent: Stripe.PaymentIntent) => {
	const license = randomUUID().toUpperCase();
	const customer = await stripe.customers.retrieve(paymentIntent.customer as string);

	if (customer.deleted || !customer.email) return null;

	await admin.firestore().collection("licenses").doc(customer.email).set({
		code: license
	});

	await sendLicenseEmail(customer.email, license);
};
