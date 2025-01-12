import { GITHUB_API_KEY, GITHUB_USER } from "$env/static/private";
import { Octokit, type RestEndpointMethodTypes } from "@octokit/rest";
import { delay } from "$lib/common/utils";

export const octokit = new Octokit({
	auth: GITHUB_API_KEY
});

export type Workflow =
	RestEndpointMethodTypes["actions"]["listWorkflowRuns"]["response"]["data"]["workflow_runs"][0];
export type Job = RestEndpointMethodTypes["actions"]["getJobForWorkflowRun"]["response"]["data"];

export const getWorkflowJob = async (workflowId: number): Promise<Job> => {
	const jobs = await octokit.rest.actions.listJobsForWorkflowRun({
		owner: GITHUB_USER,
		repo: "glimmr",
		run_id: workflowId,
		filter: "latest"
	});
	return jobs.data.jobs[0];
};

export const waitUntilWorkflowInProgress = async (
	branch: string,
	waitDuration: number = 5000
): Promise<Workflow> => {
	const workflows = await octokit.rest.actions.listWorkflowRuns({
		owner: GITHUB_USER,
		repo: "glimmr",
		branch,
		workflow_id: "main.yml",
		status: "in_progress"
	});
	const workflow = workflows.data.workflow_runs[0];

	if (workflow) {
		return workflow;
	}

	await delay(waitDuration);

	return waitUntilWorkflowInProgress(branch, waitDuration);
};

export const pollWorkflowJob = async (
	jobId: number,
	onUpdate: (job: Job) => void,
	waitDuration: number = 5000
): Promise<Job> => {
	const job = await octokit.rest.actions.getJobForWorkflowRun({
		owner: GITHUB_USER,
		repo: "glimmr",
		job_id: jobId
	});

	onUpdate(job.data);

	if (job.data.status === "completed") {
		return job.data;
	}

	await delay(waitDuration);

	return pollWorkflowJob(jobId, onUpdate, waitDuration);
};

export const triggerWorkflow = (branch: string, access: string) => {
	return octokit.rest.actions.createWorkflowDispatch({
		workflow_id: "main.yml",
		repo: "glimmr",
		owner: GITHUB_USER,
		ref: branch,
		inputs: {
			access
		}
	});
};
