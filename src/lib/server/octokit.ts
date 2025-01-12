import { GITHUB_API_KEY } from "$env/static/private";
import { Octokit } from "@octokit/rest";

export const octokit = new Octokit({
	auth: GITHUB_API_KEY
});
