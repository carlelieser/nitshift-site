import { error, json, type RequestHandler } from "@sveltejs/kit";
import { Octokit } from "@octokit/rest";
import { GITHUB_API_KEY } from "$env/static/private";
import { isDevelopment } from "$lib/server/utils";

export const GET: RequestHandler = async () => {
	const api = new Octokit({
		auth: GITHUB_API_KEY
	});
	try {
		const response = await api.rest.repos.listReleases({
			owner: "carlelieser",
			repo: "glimmr"
		});

		if (isDevelopment) return json(response.data.shift());

		const release = response.data.find((release) => !release.draft && !release.prerelease);
		return json(release);
	} catch (err) {
		return error(500, {
			message: "Failed to get latest release."
		});
	}
};
