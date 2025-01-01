import admin from "firebase-admin";
import { json, type RequestHandler } from "@sveltejs/kit";

export const GET: RequestHandler = async ({ params, fetch }) => {
	const id = params.id as string;

	if (id) {
		const docRef = admin.firestore().collection("users").doc(id);
		const user = await docRef.get();

		if (user.exists) {
			return json(user.data());
		}

		return fetch(`/api/users?email=${id}@glimmr.com`);
	}

	return json({ error: "No query provided" }, { status: 400 });
};
