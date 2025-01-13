import { error, json, type RequestHandler } from "@sveltejs/kit";
import { randomUUID } from "crypto";
import { sendEmailVerification } from "$lib/server/mailer";
import { handleRequest } from "$lib/server/utils";
import { get, UserCollection, VerificationCodeCollection } from "$lib/server/firebase";

export const GET: RequestHandler = handleRequest(async ({ url, locals }) => {
	const { searchParams } = url;
	const email = searchParams.get("email");
	const code = searchParams.get("code");

	if (email && code) {
		const verificationCode = await get(VerificationCodeCollection(), email);

		if (verificationCode.data) {
			const isExpired = verificationCode.data.expires < Date.now();

			if (isExpired) {
				await verificationCode.ref.delete();
				return error(410, {
					message: "Verification code expired"
				});
			}

			const verified = verificationCode.data.code === code;

			if (verified) {
				await verificationCode.ref.delete();
				await UserCollection()
					.doc(locals.user?.id as string)
					.set({ email }, { merge: true });
			}

			return json({ verified }, { status: verified ? 200 : 403 });
		}

		return error(404, {
			message: "Verification code not found"
		});
	}

	if (email) {
		const id = randomUUID().split("-").join("");
		const code = id.substring(0, 6).toUpperCase();
		await VerificationCodeCollection()
			.doc(email)
			.set({ code, expires: Date.now() + 1000 * 60 * 5 });
		await sendEmailVerification(email, code);
		return json({ success: true });
	}

	return error(400, {
		message: "No email provided"
	});
});
