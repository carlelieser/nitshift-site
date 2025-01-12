import { error, json, type RequestHandler } from "@sveltejs/kit";
import admin from "firebase-admin";
import { type User } from "$lib/common/types";
import { updateInstallerProgress } from "$lib/server/utils";
import { GITHUB_USER } from "$env/static/private";
import {
	getWorkflowJob,
	octokit,
	triggerWorkflow,
	waitUntilWorkflowInProgress
} from "$lib/server/octokit";

const beginDownload = async (user: User) => {
	try {
		const usersByEmail = await admin
			.firestore()
			.collection("users")
			.where("email", "==", user.email)
			.get();
		const ids = usersByEmail.docs.map((doc) => doc.data()).map((data) => data.id);

		const branch = `user/${user.email}`;

		const { data } = await octokit.rest.repos.getCommit({
			owner: GITHUB_USER,
			repo: "glimmr",
			ref: "refs/heads/main"
		});

		await octokit.rest.git.deleteRef({
			owner: GITHUB_USER,
			repo: "glimmr",
			ref: `heads/${branch}`
		});

		await octokit.rest.git.createRef({
			owner: GITHUB_USER,
			repo: "glimmr",
			ref: `refs/heads/${branch}`,
			sha: data.sha
		});

		await triggerWorkflow(branch, ids.join(","));

		const workflow = await waitUntilWorkflowInProgress(branch);
		const job = await getWorkflowJob(workflow.id);

		await updateInstallerProgress(user.email, {
			workflowId: workflow.id,
			jobId: job.id
		});
	} catch (err) {
		await updateInstallerProgress(user.email, {
			status: "error"
		});
	}
};

export const GET: RequestHandler = async ({ locals }) => {
	if (locals.user) {
		await admin.firestore().collection("installers").doc(locals.user.email).set({
			status: "pending"
		});

		await beginDownload(locals.user);

		return json({
			success: true
		});
	}

	return error(403, { message: "Unauthorized" });
};
