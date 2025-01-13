import { error, json, type RequestHandler } from "@sveltejs/kit";
import { randomUUID } from "node:crypto";
import { getUsersByEmail, LicenseCollection, SessionCollection } from "$lib/server/firebase";

export const POST: RequestHandler = async ({ request, cookies }) => {
	const body = await request.json();
	const { email, password } = body;

	if (!email || !password) {
		return error(400, { message: "Email and password are required" });
	}

	const licenseSnapshot = await LicenseCollection().doc(email).get();
	const license = licenseSnapshot.data();

	if (license) {
		if (license.code === password) {
			const sessionId = randomUUID();
			const userSnapshot = await getUsersByEmail(email);
			const user = userSnapshot.docs.map((doc) => doc.data())[0];
			await SessionCollection()
				.doc(sessionId)
				.set({
					userId: user?.id,
					expires: Date.now() + 1000 * 60 * 60 * 24
				});

			cookies.set("session_id", sessionId, {
				path: "/",
				httpOnly: true
			});

			return json({
				success: true
			});
		}
	}

	return error(404, { message: "User not found" });
};
