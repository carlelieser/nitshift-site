import { json, type RequestHandler } from "@sveltejs/kit";
import admin from "firebase-admin";

export const GET: RequestHandler = async ({ cookies }) => {
	const sessionId = cookies.get("session_id");

	if (sessionId) {
		cookies.delete("session_id", { path: "/", httpOnly: true, secure: true });
		await admin.firestore().collection("sessions").doc(sessionId).delete();
	}

	return json({
		success: true
	});
};
