import * as Mailer from "nodemailer/lib/mailer";
import SMTPTransport from "nodemailer/lib/smtp-transport";

import emailVerificationTemplate from "./templates/email-verification.html?raw";
import licenseVerifiedTemplate from "./templates/license-verified.html?raw";
import licenseTemplate from "./templates/license.html?raw";
import { SMTP_FROM, SMTP_HOST, SMTP_PASSWORD, SMTP_PORT, SMTP_USER } from "$env/static/private";
import { PUBLIC_ICON_URL } from "$env/static/public";
import { postmarkClient } from "$lib/server/postmark";

export const config: SMTPTransport.Options = {
	host: SMTP_HOST,
	port: Number(SMTP_PORT),
	auth: {
		user: SMTP_USER,
		pass: SMTP_PASSWORD
	},
	secure: true,
	logger: true,
	debug: true
};

const defaultOptions = {
	from: SMTP_FROM,
	headers: {
		"X-Face": PUBLIC_ICON_URL,
		"X-Image-URL": PUBLIC_ICON_URL
	}
};

export const getEmailVerificationConfig = (email: string, code: string): Mailer.Options => ({
	to: email,
	subject: "Your single-use code",
	html: emailVerificationTemplate.replace("{{ code }}", code),
	...defaultOptions
});

export const getLicenseVerifiedConfig = (email: string): Mailer.Options => ({
	to: email,
	bcc: "glimmr.app+98972a7044@invite.trustpilot.com",
	subject: "License verified",
	html: licenseVerifiedTemplate,
	...defaultOptions
});

export const getLicenseConfig = (
	email: string,
	code: string,
	intro: string = ""
): Mailer.Options => ({
	to: email,
	subject: "Your new license",
	html: licenseTemplate.replace("{{ code }}", code).replace("{{ intro }}", intro),
	...defaultOptions
});

export const getBugReportConfig = (
	title: string,
	description: string,
	machine: object
): Mailer.Options => {
	const data = {
		description,
		machine
	};
	const finalTitle = title ?? "Untitled";
	const subject = `[BUG REPORT] : ${finalTitle}`;
	const text = JSON.stringify(data);
	return {
		to: SMTP_USER,
		subject,
		text,
		...defaultOptions
	};
};

export const toPostmarkConfig = (options: Mailer.Options) => ({
	From: options.from as string,
	To: options.to as string,
	Subject: options.subject as string,
	HtmlBody: options.html as string,
	TextBody: options.text as string
});

export const sendMail = async (options: Mailer.Options) => {
	return postmarkClient.sendEmail(toPostmarkConfig(options));
};

export const sendLicenseVerifiedEmail = async (email: string) => {
	return sendMail(getLicenseVerifiedConfig(email));
};

export const sendEmailVerification = async (email: string, code: string) => {
	return sendMail(getEmailVerificationConfig(email, code));
};

export const sendLicenseEmail = (email: string, code: string, intro?: string) => {
	return sendMail(getLicenseConfig(email, code, intro));
};

export const sendBugReport = async (title: string, description: string, machine: object) => {
	const options = getBugReportConfig(title, description, machine);
	return sendMail(options);
};
