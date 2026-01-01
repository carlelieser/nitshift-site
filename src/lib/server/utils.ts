import * as cheerio from "cheerio";

export const isProduction = process.env.NODE_ENV === "production";
export const isDevelopment = process.env.NODE_ENV === "development";

export const getTrustPilotInfo = async () => {
	const response = await fetch("https://www.trustpilot.com/review/nitshift.com");
	const html = await response.text();
	const $ = cheerio.load(html);
	const data = $("div[data-rating-component='true']").first();
	const bannerImageUrl = data.find("img").attr("src");
	const rating = data.find("*[data-rating-typography='true']").text();
	const logoImageUrl = $("a[name='company-logo']").children().first().attr("src");
	return { logoImageUrl, bannerImageUrl, rating };
};
