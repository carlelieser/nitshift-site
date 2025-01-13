import { json, type RequestHandler } from "@sveltejs/kit";
import { handleRequest } from "$lib/server/utils";
import { firestore } from "firebase-admin";
import { UserCollection } from "$lib/server/firebase";
import { type User } from "$lib/common/types";
import QueryDocumentSnapshot = firestore.QueryDocumentSnapshot;

const ensureUserId = async (userDoc: QueryDocumentSnapshot<User>) => {
	const user = userDoc.data();
	if (userDoc.id.includes("@glimmr.com")) {
		await userDoc.ref.delete();
		await UserCollection().doc(user.id).set(user);
	}
};

/*
	Ensures all user docs have a standardized id.
	Since migrating firebase auth/user logic to the server, users no longer use @glimmr.com ids.
 */
export const GET: RequestHandler = handleRequest(async () => {
	const users = await UserCollection().get();
	const promises = users.docs.map(ensureUserId);

	await Promise.all(promises);

	return json({
		success: true
	});
});
