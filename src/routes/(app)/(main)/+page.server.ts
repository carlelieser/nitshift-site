import { type ServerLoad } from "@sveltejs/kit";
import { getTrustPilotInfo, getUserCount } from "$lib/server/utils";

export const load: ServerLoad = async () => {
	const userCount = await getUserCount();
	const trustPilotInfo = await getTrustPilotInfo();

	return {
		userCount,
		trustPilotInfo
	};
};
