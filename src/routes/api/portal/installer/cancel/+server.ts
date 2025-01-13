import { json, type RequestHandler } from "@sveltejs/kit";
import { cancelWorkflowRun, octokit, withOptions } from "$lib/server/octokit";
import { InstallerCollection } from "$lib/server/firebase";

export const GET: RequestHandler = async ({ locals }) => {
	const workflows = await withOptions(octokit.rest.actions.listWorkflowRunsForRepo, {
		branch: `user/${locals.user.email}`
	});
	const workflow = workflows.data.workflow_runs[0];
	const workflowId = workflow.id;
	if (workflowId) await cancelWorkflowRun(workflowId);
	await InstallerCollection().doc(locals.user.email).set(
		{
			cancelled: true
		},
		{ merge: true }
	);
	return json({
		success: true
	});
};
