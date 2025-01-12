import admin, { type ServiceAccount } from "firebase-admin";
import serviceAccount from "$lib/server/serviceAccount.json" with { type: "json" };
import { type Handle } from "@sveltejs/kit";

admin.initializeApp({
	credential: admin.credential.cert(serviceAccount as ServiceAccount)
});

export const handle: Handle = async ({ event, resolve }) => {
	const { locals, cookies } = event;
	const sessionId = cookies.get("session_id");

	locals.user = null;

	if (sessionId) {
		const session = await admin.firestore().collection("sessions").doc(sessionId).get();
		const sessionData = session.data();

		if (sessionData) {
			if (sessionData.expires > Date.now()) {
				const user = await admin
					.firestore()
					.collection("users")
					.doc(sessionData.userId)
					.get();
				const userData = user.data();

				if (userData) {
					locals.user = userData;
				}
			} else {
				await admin.firestore().collection("sessions").doc(sessionId).delete();
				cookies.delete("session_id", {
					path: "/",
					httpOnly: true
				});
			}
		}
	}

	return resolve(event);
};
