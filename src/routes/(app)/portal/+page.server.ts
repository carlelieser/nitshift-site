import type { PageServerLoad } from "./$types";
import admin from "firebase-admin";
import { type License } from "$lib/common/types";

export const load: PageServerLoad = async ({ locals }) => {
	if (locals.user) {
		const licenseSnapshot = await admin
			.firestore()
			.collection("licenses")
			.doc(locals.user.email)
			.get();
		const installerSnapshot = await admin
			.firestore()
			.collection("installers")
			.doc(locals.user.email)
			.get();
		const deviceQuery = admin
			.firestore()
			.collection("users")
			.where("email", "==", locals.user.email);
		const devices = await deviceQuery.get();

		if (licenseSnapshot.exists) {
			const license = licenseSnapshot.data() as License;
			const installer = installerSnapshot.data() as { status: string };
			return {
				license: {
					...license,
					issuedOn: licenseSnapshot.createTime?.toDate()
				},
				installer,
				devices: devices.docs.map((doc) => doc.data()?.id)
			};
		}
	}

	return {};
};
