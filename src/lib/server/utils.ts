import { GLIMMR_SECRET_KEY, LICENSE_MAX_PRICE, LICENSE_MIN_PRICE } from "$env/static/private";
import { error, type RequestHandler } from "@sveltejs/kit";
import range from "lodash/range";
import * as cheerio from "cheerio";
import path from "node:path";
import * as os from "node:os";
import fs from "fs-extra";
import { InstallerCollection, UserCollection } from "$lib/server/firebase";

export const isProduction = process.env.NODE_ENV === "production";
export const isDevelopment = process.env.NODE_ENV === "development";

export const getPriceRange = () => range(Number(LICENSE_MIN_PRICE), Number(LICENSE_MAX_PRICE) + 1);

export const handleRequest = (handler: RequestHandler, secure = true): RequestHandler => {
	return async (event) => {
		const { request } = event;

		const secret =
			request.headers.get("X-Glimmr-Secret-Key") || event.url.searchParams.get("key");

		event.locals.secret = secret;

		if (secure && !secret) {
			error(403, {
				message: "Unauthorized"
			});
		}

		if (secure && secret) {
			if (secret !== GLIMMR_SECRET_KEY) {
				const response = await event.fetch(`/api/users/${secret}`);
				if (!response.ok) {
					error(403, {
						message: "Unauthorized"
					});
				}
				event.locals.user = await response.json();
			}
		}

		return handler(event);
	};
};

export const getUserCount = async () => {
	const result = UserCollection().count();
	const count = await result.get();
	return count.data().count;
};

export const getTrustPilotInfo = async () => {
	const response = await fetch("https://www.trustpilot.com/review/glimmr.app");
	const html = await response.text();
	const $ = cheerio.load(html);
	const data = $("div[data-rating-component='true']").first();
	const bannerImageUrl = data.find("img").attr("src");
	const rating = data.find("*[data-rating-typography='true']").text();
	const logoImageUrl = $("a[name='company-logo']").children().first().attr("src");
	return { logoImageUrl, bannerImageUrl, rating };
};

export const getUserDataPath = async (license: string) => {
	const userPath = path.join(os.homedir(), "glimmr-data", license);
	await fs.ensureDir(userPath);
	return userPath;
};

export const updateInstallerProgress = (email: string, data: object) =>
	InstallerCollection().doc(email).set(data, { merge: true });
