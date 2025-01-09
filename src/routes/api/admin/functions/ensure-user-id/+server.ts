import { json, type RequestHandler } from "@sveltejs/kit";
import { handleRequest } from "$lib/server/utils";
import admin, { firestore } from "firebase-admin";
import QueryDocumentSnapshot = firestore.QueryDocumentSnapshot;

const ensureUserId = async (userDoc: QueryDocumentSnapshot) => {
	const user = userDoc.data();
	if (userDoc.id.includes("@glimmr.com")) {
		const userCollection = admin.firestore().collection("users");
		await userDoc.ref.delete();
		await userCollection.doc(user.id).set(user);
	}
};

/*
	Ensures all user docs have a standardized id.
	Since migrating firebase auth/user logic to the server, users no longer use @glimmr.com ids.
 */
const ensureAllUserIds = async () => {
	const userCollection = admin.firestore().collection("users");
	const users = await userCollection.get();
	const promises = users.docs.map(ensureUserId);

	await Promise.all(promises);
};

export const GET: RequestHandler = handleRequest(async () => {
	await ensureAllUserIds();
	return json({
		success: true
	});
});
