import { error, json, type RequestHandler } from "@sveltejs/kit";
import { type User } from "$lib/common/types";
import { updateInstallerProgress } from "$lib/server/utils";
import {
	cancelWorkflowRun,
	getWorkflowJob,
	octokit,
	triggerWorkflow,
	waitUntilWorkflowInProgress,
	withOptions
} from "$lib/server/octokit";
import { get, getUsersByEmail, InstallerCollection } from "$lib/server/firebase";

const beginDownload = async (user: User) => {
	try {
		const users = await getUsersByEmail(user.email);
		const ids = users.docs.map((doc) => doc.data()?.id);
		const branch = `user/${user.email}`;

		const commit = await withOptions(octokit.rest.repos.getCommit, {
			ref: "refs/heads/main"
		});

		try {
			await withOptions(octokit.rest.git.deleteRef, {
				ref: `heads/${branch}`
			});
		} catch (err) {}

		await withOptions(octokit.rest.git.createRef, {
			ref: `refs/heads/${branch}`,
			sha: commit.data.sha
		});

		await triggerWorkflow(branch, ids.join(","));

		const workflow = await waitUntilWorkflowInProgress(branch);

		if (!workflow) return { status: "error" };

		const job = await getWorkflowJob(workflow.id);

		return {
			workflowId: workflow.id,
			jobId: job.id,
			cancelled: false,
			status: job.status
		};
	} catch (err) {
		return {
			status: "error"
		};
	}
};

export const GET: RequestHandler = async ({ locals }) => {
	if (locals.user) {
		const installer = await get(InstallerCollection(), locals.user.email);

		if (installer.data?.workflowId) {
			await cancelWorkflowRun(installer.data?.workflowId);
		}

		await installer.ref.set(
			{
				status: "in_progress"
			},
			{ merge: true }
		);

		const result = await beginDownload(locals.user);

		await updateInstallerProgress(locals.user.email, result);

		return json({
			success: result.status === "in_progress",
			data: result
		});
	}

	return error(403, { message: "Unauthorized" });
};
