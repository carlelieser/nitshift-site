import { error, type RequestHandler } from "@sveltejs/kit";
import admin from "firebase-admin";

export const DELETE: RequestHandler = async ({ request, params, locals }) => {
	const id = params.id as string;
	const query = admin
		.firestore()
		.collection("users")
		.where("email", "==", locals.user.email)
		.count();
	const querySnapshot = await query.get();
	const totalDevices = querySnapshot.data().count;

	if (totalDevices === 1) {
		return error(400, { message: "Cannot delete the last device" });
	}

	const deviceRef = admin.firestore().collection("users").doc(id);
	await deviceRef.delete();

	return new Response(null, { status: 204 });
};
