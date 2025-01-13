import { error, json, type RequestHandler } from "@sveltejs/kit";
import { handleRequest } from "$lib/server/utils";
import { sendLicenseVerifiedEmail } from "$lib/server/mailer";
import { get, LicenseCollection, UserCollection } from "$lib/server/firebase";

export const GET: RequestHandler = handleRequest(async ({ url, locals }) => {
	const { searchParams } = url;
	const email = searchParams.get("email");
	const code = searchParams.get("code");

	if (!email || !code) {
		return error(400, { message: "No email or code provided" });
	}

	const license = await get(LicenseCollection(), email);
	const success = license.data?.code === code;

	if (!success) return error(403, { message: "Unauthorized" });
	if (locals.user?.email !== email) return error(403, { message: "Unauthorized" });

	await sendLicenseVerifiedEmail(email);
	await UserCollection()
		.doc(locals.user?.id as string)
		.set(
			{ license: "premium", trialAvailability: false, trialStartDate: null },
			{ merge: true }
		);

	return json(
		{
			success
		},
		{
			status: success ? 200 : 403
		}
	);
});
