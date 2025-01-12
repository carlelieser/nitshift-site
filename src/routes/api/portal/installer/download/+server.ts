import type { RequestHandler } from "./$types";
import admin from "firebase-admin";
import { error } from "@sveltejs/kit";
import { GITHUB_USER } from "$env/static/private";
import { octokit } from "$lib/server/octokit";

export const GET: RequestHandler = async ({ locals }) => {
	if (locals.user) {
		const installerRef = admin.firestore().collection("installers").doc(locals.user.email);
		const installer = (await installerRef.get()).data();

		if (installer?.artifactId) {
			const downloadUrl = await octokit.rest.actions.downloadArtifact({
				owner: GITHUB_USER,
				repo: "glimmr",
				artifact_id: installer?.artifactId,
				archive_format: "zip"
			});

			const response = await fetch(downloadUrl.url);

			return new Response(response.body);
		}

		return error(500, { message: "Installer not ready" });
	}

	return error(403, { message: "Unauthorized" });
};
