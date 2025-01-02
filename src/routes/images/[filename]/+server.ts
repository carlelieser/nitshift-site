import { error, type RequestHandler } from "@sveltejs/kit";
import * as path from "node:path";
import { read } from "$app/server";

const modules = import.meta.glob("$lib/client/assets/*.{ico,png,svg}");

export const GET: RequestHandler = async ({ params }) => {
	const filename = params.filename as string;
	const module = Object.keys(modules).find(
		(modulePath) => path.basename(modulePath) === filename
	);

	if (!module) {
		error(404, {
			message: "File not found"
		});
	}

	return read(module);
};
