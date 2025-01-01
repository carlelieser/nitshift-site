import { json, type RequestHandler } from "@sveltejs/kit";
import { sendBugReport } from "$lib/server/mailer";

export const POST: RequestHandler = async ({ request }) => {
	const { title, description, machine } = await request.json();
	await sendBugReport(title, description, machine);
	return json({ success: true });
};
