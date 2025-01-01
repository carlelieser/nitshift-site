import { json, type RequestHandler } from "@sveltejs/kit";
import * as nodemailer from "nodemailer";
import { config, getBugReportConfig } from "$lib/server/mailer";

export const POST: RequestHandler = async ({ request }) => {
	const { title, description, machine } = await request.json();
	const transporter = nodemailer.createTransport(config);
	const options = await getBugReportConfig(title, description, machine);
	await transporter.sendMail(options);
	return json({ success: true });
};
