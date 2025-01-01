import { GITHUB_API_KEY } from "$env/static/private";
import * as cheerio from "cheerio";
import admin from "firebase-admin";
import { type ServerLoad } from "@sveltejs/kit";

const getLatestTag = () => {
	const url = "https://api.github.com/repos/carlelieser/glimmr-release/tags";
	return fetch(url, {
		headers: {
			Authorization: `Bearer ${GITHUB_API_KEY}`
		}
	})
		.then((response) => response.json())
		.then((tags) => {
			const latest = tags[0];
			if (!latest) return null;
			return latest;
		})
		.catch(() => {
			return null;
		});
};

const getInstallerMetadata = async (tag: string) => {
	const response = await fetch(
		`https://github.com/carlelieser/glimmr-release/releases/expanded_assets/${tag}`
	);
	const html = await response.text();
	const $ = cheerio.load(html);
	const link = $(`a[href*='/carlelieser/glimmr-release/releases/download/${tag}/']`);
	const size = link.parent().parent().children().last().children().first().text().trim();

	return {
		url: `/releases/${tag}/glimmr-setup.exe`,
		name: "glimmr-setup.exe",
		tag,
		size
	};
};

const getUserCount = async (count: number, pageToken?: string) => {
	const result = await admin.auth().listUsers(1000, pageToken);

	count += result.users.length;

	if (result.pageToken !== undefined) {
		count = await getUserCount(count, result.pageToken);
	}

	return count;
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

const getPrices = async (_fetch: typeof fetch) => {
	const response = await _fetch("/api/prices");
	return response.json();
};

export const load: ServerLoad = async ({ fetch }) => {
	const tag = await getLatestTag();
	const [metadata, userCount, trustPilotInfo, prices] = await Promise.all([
		getInstallerMetadata(tag.name),
		getUserCount(0),
		getTrustPilotInfo(),
		getPrices(fetch)
	]);

	return {
		metadata,
		userCount,
		trustPilotInfo,
		prices
	};
};
