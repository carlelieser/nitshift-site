import type { RequestHandler } from "./$types";
import admin from "firebase-admin";
import { error } from "@sveltejs/kit";
import { GITHUB_USER } from "$env/static/private";
import { octokit } from "$lib/server/octokit";

export const GET: RequestHandler = async ({ locals }) => {
	const installerRef = admin.firestore().collection("installers").doc(locals.user.email);
	const installer = (await installerRef.get()).data();

	if (!installer || !installer?.workflowId) return error(500, { message: "Installer not ready" });

	const artifacts = await octokit.rest.actions.listWorkflowRunArtifacts({
		owner: GITHUB_USER,
		repo: "glimmr",
		run_id: installer?.workflowId
	});

	const artifact = artifacts.data.artifacts[0];

	if (!artifact) return error(500, { message: "Installer not ready" });

	const downloadUrl = await octokit.rest.actions.downloadArtifact({
		owner: GITHUB_USER,
		repo: "glimmr",
		artifact_id: artifact.id,
		archive_format: "zip"
	});

	const response = await fetch(downloadUrl.url);

	return new Response(response.body);
};
