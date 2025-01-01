import { type RequestHandler } from "@sveltejs/kit";
import icon from "$lib/client/assets/icon.png";
import { read } from "$app/server";

export const GET: RequestHandler = () => {
	return read(icon);
};
