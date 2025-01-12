import { getTrustPilotInfo } from "$lib/server/utils";

export const load = async () => {
	const trustPilotInfo = await getTrustPilotInfo();

	return {
		trustPilotInfo
	};
};
