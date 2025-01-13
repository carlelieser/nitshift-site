import { error, type RequestHandler } from "@sveltejs/kit";
import { UserCollection } from "$lib/server/firebase";

export const DELETE: RequestHandler = async ({ request, params, locals }) => {
	const id = params.id as string;
	const query = UserCollection().where("email", "==", locals.user.email).count();
	const querySnapshot = await query.get();
	const totalDevices = querySnapshot.data().count;

	if (totalDevices === 1) {
		return error(400, { message: "Cannot delete the last device" });
	}

	const deviceRef = UserCollection().doc(id);
	await deviceRef.delete();

	return new Response(null, { status: 204 });
};
