import { type Handle } from "@sveltejs/kit";
import { initializeApp, SessionCollection, UserCollection } from "$lib/server/firebase";

initializeApp();

export const handle: Handle = async ({ event, resolve }) => {
	const { locals, cookies } = event;
	const sessionId = cookies.get("session_id");

	locals.user = null;

	if (sessionId) {
		const session = await SessionCollection().doc(sessionId).get();
		const sessionData = session.data();

		if (sessionData) {
			if (sessionData.expires > Date.now()) {
				const user = await UserCollection().doc(sessionData.userId).get();
				const userData = user.data();

				if (userData) {
					locals.user = userData;
				}
			} else {
				await SessionCollection().doc(sessionId).delete();
				cookies.delete("session_id", {
					path: "/",
					httpOnly: true
				});
			}
		}
	}

	return resolve(event);
};
