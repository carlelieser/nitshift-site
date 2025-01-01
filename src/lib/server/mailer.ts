import * as Mailer from "nodemailer/lib/mailer";
import SMTPTransport from "nodemailer/lib/smtp-transport";
import * as nodemailer from "nodemailer";

import emailVerificationTemplate from "./templates/email-verification.html?raw";
import licenseVerifiedTemplate from "./templates/license-verified.html?raw";
import { SMTP_FROM, SMTP_HOST, SMTP_PASSWORD, SMTP_PORT, SMTP_USER } from "$env/static/private";

export const config: SMTPTransport.Options = {
	service: "Gmail",
	auth: {
		user: SMTP_USER,
		pass: SMTP_PASSWORD
	},
	requireTLS: true
};

export const getEmailVerificationConfig = (email: string, code: string): Mailer.Options => ({
	from: SMTP_FROM,
	to: email,
	subject: "Your single-use code",
	html: emailVerificationTemplate.replace("[CODE]", code),
	headers: {
		"X-Face": "https://glimmr.app/images/icon.png",
		"X-Image-URL": "https://glimmr.app/images/icon.png"
	}
});

export const getLicenseVerifiedConfig = (email: string): Mailer.Options => ({
	from: SMTP_FROM,
	to: email,
	bcc: "glimmr.app+98972a7044@invite.trustpilot.com",
	subject: "License verified",
	html: licenseVerifiedTemplate,
	headers: {
		"X-Face": "https://glimmr.app/images/icon.png",
		"X-Image-URL": "https://glimmr.app/images/icon.png"
	}
});

export const getBugReportConfig = async (title: string, description: string, machine: object) => {
	const data = {
		description,
		machine
	};
	const finalTitle = title ?? "Untitled";
	const subject = `[BUG REPORT] : ${finalTitle}`;
	const text = JSON.stringify(data);
	return {
		from: SMTP_FROM,
		to: SMTP_USER,
		subject,
		text
	};
};

export const sendMail = async (options: Mailer.Options) => {
	const transporter = nodemailer.createTransport(config);
	await transporter.sendMail(options);
};

export const sendLicenseVerifiedEmail = async (email: string) => {
	return sendMail(getLicenseVerifiedConfig(email));
};

export const sendEmailVerification = async (email: string, code: string) => {
	return sendMail(getEmailVerificationConfig(email, code));
};
