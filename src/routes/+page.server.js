import { GITHUB_API_KEY } from "$env/static/private";
import * as cheerio from "cheerio";

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

const getSetupFileInfo = async (tag) => {
	const response = await fetch(
		`https://github.com/carlelieser/glimmr-release/releases/expanded_assets/${tag}`
	);
	const html = await response.text();
	const $ = cheerio.load(html);
	const link = $(`a[href*='/carlelieser/glimmr-release/releases/download/${tag}/']`);
	const size = link.parent().parent().children().last().children().first().text().trim();

	return {
		url: `https://glimmr.app/releases/${tag}/glimmr-setup.exe`,
		name: "glimmr-setup.exe",
		tag,
		size
	};
};

export async function load() {
	const tag = await getLatestTag();
	return await getSetupFileInfo(tag.name);
}
