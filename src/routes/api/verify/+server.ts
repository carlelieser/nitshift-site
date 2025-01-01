import { error, json, type RequestHandler } from "@sveltejs/kit";
import admin from "firebase-admin";
import { randomUUID } from "crypto";
import { sendEmailVerification, sendLicenseVerifiedEmail } from "$lib/server/mailer";
import { handleRequest } from "$lib/server/utils";

export const GET: RequestHandler = handleRequest(async ({ url }) => {
	const { searchParams } = url;
	const email = searchParams.get("email");
	const code = searchParams.get("code");

	if (email && code) {
		const verificationCode = await admin
			.firestore()
			.collection("verificationCodes")
			.doc(email)
			.get();

		if (verificationCode.exists) {
			const verified = verificationCode.data()?.code === code;

			if (verified) await sendLicenseVerifiedEmail(email);

			return json({ verified }, { status: verified ? 200 : 403 });
		}

		return error(404, {
			message: "Verification code not found"
		});
	}

	if (email) {
		const id = randomUUID().split("-").join("");
		const code = id.substring(0, 6).toUpperCase();
		const docRef = admin.firestore().collection("verificationCodes").doc(email);
		await docRef.set({ code });
		await sendEmailVerification(email, code);
		return json({ success: true });
	}

	return error(400, {
		message: "No email provided"
	});
});
