import { json, type RequestHandler } from "@sveltejs/kit";
import { sendLicenseEmail } from "$lib/server/mailer";
import { get, LicenseCollection } from "$lib/server/firebase";

export const GET: RequestHandler = async ({ url }) => {
	const email = url.searchParams.get("email") as string;

	if (!email) {
		return json(
			{
				success: false,
				message: "No email provided"
			},
			{ status: 400 }
		);
	}

	const license = await get(LicenseCollection(), email);

	if (!license?.data) {
		return json(
			{
				success: false,
				message: "No license found for this email"
			},
			{ status: 404 }
		);
	}

	await sendLicenseEmail(email, license.data.code, "Thank you for purchasing a pro license.");

	return json({
		success: true,
		message: "License email sent successfully"
	});
};
