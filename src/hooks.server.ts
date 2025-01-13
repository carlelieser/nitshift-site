import { type Handle } from "@sveltejs/kit";
import { get, initializeApp, SessionCollection, UserCollection } from "$lib/server/firebase";

initializeApp();

export const handle: Handle = async ({ event, resolve }) => {
	const { locals, cookies } = event;
	const sessionId = cookies.get("session_id");

	locals.user = null;

	if (sessionId) {
		const session = await get(SessionCollection(), sessionId);

		if (session.data) {
			if (session.data.expires > Date.now()) {
				const user = await get(UserCollection(), session.data.userId);

				if (user.data) {
					locals.user = user.data;
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
