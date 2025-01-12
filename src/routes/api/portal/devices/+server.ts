import type { RequestHandler } from "./$types";
import { error } from "@sveltejs/kit";
import admin from "firebase-admin";

export const POST: RequestHandler = async ({ request, locals }) => {
	const body = await request.json();
	const id = body.id;

	if (!id || id?.length !== 64) {
		return error(400, { message: "Device ID is required" });
	}

	await admin
		.firestore()
		.collection("users")
		.doc(id)
		.set({
			...locals.user,
			id
		});

	return new Response(null, { status: 200 });
};
