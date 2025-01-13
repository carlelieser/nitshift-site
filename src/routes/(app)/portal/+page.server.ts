import type { PageServerLoad } from "./$types";
import { getUsersByEmail, InstallerCollection, LicenseCollection } from "$lib/server/firebase";

export const load: PageServerLoad = async ({ locals, depends }) => {
	if (locals.user) {
		const licenseSnapshot = await LicenseCollection().doc(locals.user.email).get();
		const installerSnapshot = await InstallerCollection().doc(locals.user.email).get();
		const deviceQuery = await getUsersByEmail(locals.user.email);

		if (licenseSnapshot.exists) {
			const license = licenseSnapshot.data();
			const licenseIssuedOn = licenseSnapshot.createTime?.toDate();
			const devices = deviceQuery.docs.map((doc) => doc.data()?.id);
			let installer = installerSnapshot.data();

			if (installer?.cancelled) {
				installer = undefined;
			}

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
