import { getPriceRange } from "$lib/server/utils";
import { json, type RequestHandler } from "@sveltejs/kit";

export const GET: RequestHandler = () => {
	return json(getPriceRange());
};
