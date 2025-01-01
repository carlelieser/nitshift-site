import { LICENSE_MAX_PRICE, LICENSE_MIN_PRICE } from "$env/static/private";
import { json, type RequestHandler } from "@sveltejs/kit";
import range from "lodash/range";

export const GET: RequestHandler = () => {
	return json(range(Number(LICENSE_MIN_PRICE), Number(LICENSE_MAX_PRICE) + 1));
};
