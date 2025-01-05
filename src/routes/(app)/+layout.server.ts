import { type ServerLoad } from "@sveltejs/kit";
import { getPriceRange } from "$lib/server/utils";

export const load: ServerLoad = async () => {
	const prices = getPriceRange();

	return {
		prices
	};
};
