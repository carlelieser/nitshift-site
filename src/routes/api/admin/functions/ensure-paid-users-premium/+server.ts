import { handleRequest } from "$lib/server/utils";
import { json, type RequestHandler } from "@sveltejs/kit";
import { stripe } from "$lib/server/stripe";
import { get, UserCollection } from "$lib/server/firebase";

/*
	Loops through all successful checkout sessions and makes sure that:
	1. Malformed user objects (users generated from a recent server-side bug) are removed.
	2. Paid users have the correct license status.
	3. Paid users have the correct email address.
 */
const ensurePaidUsersPremium = async (starting_after?: string) => {
	const checkouts = await stripe.checkout.sessions.list({
		starting_after,
		status: "complete",
		limit: 100
	});

	for await (const checkout of checkouts.data) {
		if (
			checkout.metadata?.id &&
			checkout.customer_details &&
			checkout.payment_status === "paid"
		) {
			const userId = checkout.metadata?.id;
			const email = checkout.customer_details.email as string;

			console.log("Found checkout session: ", checkout.id);
			console.log("User ID: ", userId);
			console.log("User email: ", email);

			const user = await get(UserCollection(), userId);

			const paidUserData = {
				email,
				license: "premium",
				trialAvailability: false,
				trialStartDate: null
			};

			if (user.data) {
				console.log("Found user: ", user.data);

				if (user.data) {
					const isMalformed = Object.keys(user.data).length !== 5;

					if (isMalformed) {
						console.log("User is malformed.");

						const staleUser = await get(UserCollection(), `${userId}@glimmr.com`);

						if (staleUser.data) {
							console.log("Found stale user with @glimmr.com email");
							const updatedUser = {
								...staleUser.data,
								...user.data,
								...paidUserData
							};

							await user.ref.set(updatedUser);

							console.log("Merging user...", updatedUser);

							await staleUser.ref.delete();

							console.log("Deleting old user...");
						}
					} else {
						if (user.data.license !== "premium" || user.data.email !== email) {
							await user.ref.update(paidUserData);
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
