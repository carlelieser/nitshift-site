import { handleRequest } from "$lib/server/utils";
import { json, type RequestHandler } from "@sveltejs/kit";
import { stripe } from "$lib/server/stripe";
import admin from "firebase-admin";

/*
	Loops through all successful checkout sessions and makes sure that:
	1. Malformed user objects (users generated from a recent server-side bug) are removed.
	2. Paid users have the correct license status.
	3. Paid users have the correct email address.
 */
const ensurePaidUsersPremium = async (starting_after?: string) => {
	const checkouts = await stripe.checkout.sessions.list({
		starting_after,
		status: "completed",
		limit: 100
	});

	for await (const checkout of checkouts.data) {
		if (
			checkout.metadata?.id &&
			checkout.customer_details &&
			checkout.payment_status === "paid"
		) {
			const userId = checkout.metadata?.id;
			const email = checkout.customer_details.email;

			console.log("Found checkout session: ", checkout.id);
			console.log("User ID: ", userId);
			console.log("User email: ", email);

			const userRef = admin.firestore().collection("users").doc(userId);
			const user = await userRef.get();

			const paidUserData = {
				email,
				license: "premium",
				trialAvailability: false,
				trialStartDate: null
			};

			if (user.exists) {
				const userData = user.data();

				console.log("Found user: ", userData);

				if (userData) {
					const isMalformed = Object.keys(userData).length !== 5;

					if (isMalformed) {
						console.log("User is malformed.");

						const staleUserRef = admin
							.firestore()
							.collection("users")
							.doc(`${userId}@glimmr.com`);
						const staleUser = await staleUserRef.get();
						const staleUserData = staleUser.data();

						if (staleUser.exists) {
							console.log("Found stale user with @glimmr.com email");
							const updatedUser = {
								...staleUserData,
								...userData,
								...paidUserData
							};

							await userRef.set(updatedUser);

							console.log("Merging user...", updatedUser);

							await staleUserRef.delete();

							console.log("Deleting old user...");
						}
					} else {
						if (userData.license !== "premium" || userData.email !== email) {
							await userRef.update(paidUserData);
						}
					}
				}
			}
		}
	}

	if (checkouts.has_more) {
		return ensurePaidUsersPremium(checkouts.data.pop()?.id);
	}
};

export const GET: RequestHandler = handleRequest(async () => {
	await ensurePaidUsersPremium();

	return json({
		success: true
	});
});
