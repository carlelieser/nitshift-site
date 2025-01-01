import { type RequestHandler } from "@sveltejs/kit";
import { read } from "$app/server";
import icon from "$lib/client/assets/icon.svg";

export const GET: RequestHandler = async () => {
	return read(icon);
};
