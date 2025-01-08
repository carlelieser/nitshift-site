import { json, type RequestHandler } from "@sveltejs/kit";
import { handleRequest } from "$lib/server/utils";
import admin from "firebase-admin";

/*
	Ensures all user docs have a standardized id.
	Since migrating firebase auth/user logic to the server, users no longer use @glimmr.com ids.
 */
const ensureUserId = async () => {
	const userCollection = admin.firestore().collection("users");
	const users = await userCollection.get();

	for (const userDoc of users.docs) {
		const user = userDoc.data();
		if (userDoc.id.includes("@glimmr.com")) {
			await userDoc.ref.delete();
			await userCollection.doc(user.id).set(user);
		}
	}
};

export const GET: RequestHandler = handleRequest(async () => {
	await ensureUserId();
	return json({
		success: true
	});
});
