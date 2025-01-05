import { error, json, type RequestHandler } from "@sveltejs/kit";
import admin from "firebase-admin";
import { handleRequest } from "$lib/server/utils";

export const GET: RequestHandler = async ({ url }) => {
	const { searchParams } = url;
	const email = searchParams.get("email");

	if (email) {
		const docRef = admin.firestore().collection("users").doc(email);
		const user = await docRef.get();

		if (user.exists) {
			return json(user.data());
		}

		return json({ error: "User not found" }, { status: 404 });
	}

	return json({ error: "No query provided" }, { status: 400 });
};

export const POST: RequestHandler = handleRequest(async ({ request }) => {
	try {
		const body = await request.json();
		const docRef = admin.firestore().collection("users").doc(body.id);
		const user = await docRef.get();

		if (user.exists) {
			const data = user.data();
			if (data?.license !== body.license) {
				return error(403, { message: "Cannot change license" });
			}
		}

		await docRef.set(body, { merge: true });

		return json(body);
	} catch (err) {
		return error(500, { message: "Failed to create user" });
	}
});
