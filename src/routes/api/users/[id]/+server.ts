import { json, type RequestHandler } from "@sveltejs/kit";
import { get, UserCollection } from "$lib/server/firebase";

export const GET: RequestHandler = async ({ params, fetch }) => {
	const id = params.id as string;

	if (id) {
		const user = await get(UserCollection(), id);
		if (user.data) {
			if (Object.keys(user.data).length === 1) {
				await user.ref.delete();
			} else {
				return json(user.data);
			}
		}

		return fetch(`/api/users?email=${id}@glimmr.com`);
	}

	return json({ error: "No query provided" }, { status: 400 });
};
