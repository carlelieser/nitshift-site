import { json, type RequestHandler } from "@sveltejs/kit";
import { SessionCollection } from "$lib/server/firebase";

export const GET: RequestHandler = async ({ cookies }) => {
	const sessionId = cookies.get("session_id");

	if (sessionId) {
		cookies.delete("session_id", { path: "/", httpOnly: true, secure: true });
		await SessionCollection().doc(sessionId).delete();
	}

	return json({
		success: true
	});
};
