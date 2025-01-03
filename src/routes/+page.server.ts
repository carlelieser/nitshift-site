import * as cheerio from "cheerio";
import admin from "firebase-admin";
import { type ServerLoad } from "@sveltejs/kit";
import { getPriceRange } from "$lib/server/utils";

const getUserCount = async () => {
	const result = admin.firestore().collection("users").count();
	const count = await result.get();
	return count.data().count;
};

const getTrustPilotInfo = async () => {
	const response = await fetch("https://www.trustpilot.com/review/glimmr.app");
	const html = await response.text();
	const $ = cheerio.load(html);
	const data = $("div[data-rating-component='true']").first();
	const bannerImageUrl = data.find("img").attr("src");
	const rating = data.find("*[data-rating-typography='true']").text();
	const logoImageUrl = $("a[name='company-logo']").children().first().attr("src");
	return { logoImageUrl, bannerImageUrl, rating };
};

export const load: ServerLoad = async ({ fetch }) => {
	const userCount = await getUserCount();
	const trustPilotInfo = await getTrustPilotInfo();
	const prices = getPriceRange();

	return {
		userCount,
		trustPilotInfo,
		prices
	};
};
