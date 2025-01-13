import type { RequestHandler } from "./$types";
import { error } from "@sveltejs/kit";
import { octokit, withOptions } from "$lib/server/octokit";
import { InstallerCollection } from "$lib/server/firebase";

export const GET: RequestHandler = async ({ locals }) => {
	const installerRef = InstallerCollection.doc(locals.user.email);
	const installer = (await installerRef.get()).data();

	if (!installer || !installer?.workflowId) return error(500, { message: "Installer not ready" });

	const artifacts = await withOptions(octokit.rest.actions.listWorkflowRunArtifacts, {
		run_id: installer?.workflowId
	});

	const artifact = artifacts.data.artifacts[0];

	if (!artifact) return error(500, { message: "Installer not ready" });

	const downloadUrl = await withOptions(octokit.rest.actions.downloadArtifact, {
		artifact_id: artifact.id,
		archive_format: "zip"
	});

	const response = await fetch(downloadUrl.url);

	return new Response(response.body, {
		headers: {
			"Content-Disposition": `attachment; filename=setup.zip`,
			"Content-Type": "application/zip"
		}
	});
};
