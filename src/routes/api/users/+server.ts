import { error, json, type RequestHandler } from "@sveltejs/kit";
import { get, UserCollection } from "$lib/server/firebase";

export const GET: RequestHandler = async ({ url }) => {
	const { searchParams } = url;
	const email = searchParams.get("email");

	if (email) {
		const user = await get(UserCollection(), email);

		if (user.data) {
			await UserCollection().doc(user.data.id).set(user.data);
			await user.ref.delete();

			return json(user.data);
		}

		return json({ error: "User not found" }, { status: 404 });
	}

	return json({ error: "No query provided" }, { status: 400 });
};

export const POST: RequestHandler = async ({ request }) => {
	const body = await request.json();
	const user = await get(UserCollection(), body.id);

	if (user.data) {
		if (user.data.license !== body.license) {
			return error(403, { message: "Cannot change license" });
		}
	} else {
		if (body.license !== "free") {
			return error(403, { message: "Invalid license" });
		}
	}

	await user.ref.set(body, { merge: true });

	return json(body);
};
