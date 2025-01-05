import { type ServerLoad } from "@sveltejs/kit";
import { getUserCount } from "$lib/server/utils";

export const load: ServerLoad = async () => {
	const userCount = await getUserCount();
	return {
		userCount
	};
};
