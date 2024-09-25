import { GITHUB_API_KEY } from "$env/static/private";
import * as cheerio from "cheerio";
import { ServerLoad } from "@sveltejs/kit/src/exports/public";
import admin from "firebase-admin";

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

const getInstallerMetadata = async (tag) => {
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

const getUserCount = async (count = 0, pageToken = undefined) => {
	const result = await admin.auth().listUsers(1000, pageToken);

	count += result.users.length;

	if (result.pageToken) {
		count = await getUserCount(count, result.pageToken);
	}

	return count;
};

export const load: ServerLoad = async () => {
	const tag = await getLatestTag();
	const metadata = await getInstallerMetadata(tag.name);
	const userCount = await getUserCount();
	return {
		metadata,
		userCount
	};
};
