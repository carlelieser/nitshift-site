import { json, type RequestHandler } from "@sveltejs/kit";
import { generateLicenseAndNotifyUser } from "$lib/server/license";

export const POST: RequestHandler = async ({ request }) => {
	const body = await request.json();
	const type = body.type;

	if (type === "payment_intent.succeeded") {
		await generateLicenseAndNotifyUser(body.data.object);
	}

	return json({
		received: true
	});
};
