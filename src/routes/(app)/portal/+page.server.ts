import type { PageServerLoad } from "./$types";
import { get, getUsersByEmail, InstallerCollection, LicenseCollection } from "$lib/server/firebase";

export const load: PageServerLoad = async ({ locals, depends }) => {
	if (locals.user) {
		const deviceQuery = await getUsersByEmail(locals.user.email);
		const license = await get(LicenseCollection(), locals.user.email);
		const installer = await get(InstallerCollection(), locals.user.email);

		if (license.data) {
			const licenseIssuedOn = license.data.issuedOn || license.doc.createTime?.toDate();
			const devices = deviceQuery.docs.map((doc) => doc.data()?.id);

			let installerInfo = installer.data;

			if (installer.data?.cancelled) {
				installerInfo = undefined;
			}

			return {
				license: {
					...license.data,
					issuedOn: licenseIssuedOn
				},
				installer: installerInfo,
				devices
			};
		}
	}

	return {};
};
