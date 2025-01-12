import { error, type RequestHandler } from "@sveltejs/kit";
import * as path from "node:path";
import { isDevelopment } from "$lib/server/utils";
import * as fs from "node:fs";
import { Readable } from "node:stream";
import * as os from "node:os";

const modules = import.meta.glob("$lib/client/assets/*.{ico,png,svg}");

export const GET: RequestHandler = async ({ params }) => {
	const filename = params.filename as string;
	const modulePath = Object.keys(modules).find(
		(modulePath) => path.basename(modulePath) === filename
	);

	if (!modulePath) {
		return error(404, {
			message: "File not found"
		});
	}

	const module = (await modules[modulePath]()) as { default: string };
	const basePath = isDevelopment
		? path.join(import.meta.url, "..", "..", "..", "..", "..")
		: path.join(import.meta.url, "..", "..", "..", "client");
	const fileUrl = new URL(path.join(basePath, module.default));
	const filePath = path.normalize(fileUrl.pathname);
	const sanitizedFilePath = os.platform() === "win32" ? filePath.replace("\\", "") : filePath;
	const stream = fs.createReadStream(sanitizedFilePath);
	const webStream = Readable.toWeb(stream) as BodyInit;

	return new Response(webStream);
};
