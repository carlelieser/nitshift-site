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
		const deviceQuerySnapshot = await deviceQuery.get();

		if (licenseSnapshot.exists) {
			const license = licenseSnapshot.data() as License;
			const licenseIssuedOn = licenseSnapshot.createTime?.toDate();
			const installer = installerSnapshot.data() as {
				status: string;
				error?: string;
				progress?: string;
			};
			const devices = deviceQuerySnapshot.docs.map((doc) => doc.data()?.id);
			return {
				license: {
					...license,
					issuedOn: licenseIssuedOn
				},
				installer,
				devices
			};
		}
	}

	return {};
};
