import { GITHUB_API_KEY, GITHUB_USER } from "$env/static/private";
import { Octokit, type RestEndpointMethodTypes } from "@octokit/rest";
import { delay } from "$lib/common/utils";
import { InstallerCollection } from "$lib/server/firebase";

export const octokit = new Octokit({
	auth: GITHUB_API_KEY
});

export const defaultOptions = {
	owner: GITHUB_USER,
	repo: "glimmr"
};

export type Workflow =
	RestEndpointMethodTypes["actions"]["listWorkflowRuns"]["response"]["data"]["workflow_runs"][0];
export type Job = RestEndpointMethodTypes["actions"]["getJobForWorkflowRun"]["response"]["data"];

export interface Installer {
	workflowId?: number;
	jobId?: number;
	status: Job["status"] | "error";
	progress?: string;
	error?: string;
	cancelled?: boolean;
}

export const getWorkflowJob = async (workflowId: number): Promise<Job> => {
	const jobs = await octokit.rest.actions.listJobsForWorkflowRun({
		...defaultOptions,
		run_id: workflowId,
		filter: "latest"
	});
	return jobs.data.jobs[0];
};

export const waitUntilWorkflowInProgress = async (
	branch: string,
	interval: number = 1000 * 5,
	timeout: number = 1000 * 60,
	start = Date.now()
): Promise<Workflow> => {
	console.log("waiting until workflow is in progress", start + timeout - Date.now());
	if (start + timeout < Date.now()) throw new Error("Timeout");
	const email = branch.split("/").pop() as string;
	const installer = await InstallerCollection.doc(email).get();
	const workflows = await octokit.rest.actions.listWorkflowRuns({
		...defaultOptions,
		branch,
		workflow_id: "main.yml"
	});
	const workflow = workflows.data.workflow_runs[0];
	const isStale = installer?.data()?.cancelled && workflow?.id === installer?.data()?.workflowId;

	if (isStale) {
		await delay(interval);
		return waitUntilWorkflowInProgress(branch, interval, timeout, start);
	} else {
		if (workflow) {
			return workflow;
		}
	}

	await delay(interval);
	return waitUntilWorkflowInProgress(branch, interval, timeout, start);
};

export const pollWorkflowJob = async (
	jobId: number,
	onUpdate: (job: Job) => void,
	waitDuration: number = 5000,
	signal?: AbortSignal
): Promise<Job | null> => {
	if (signal?.aborted) {
		return null;
	}

	const job = await withOptions(octokit.rest.actions.getJobForWorkflowRun, {
		job_id: jobId
	});

	onUpdate(job.data);

	if (job.data.status === "completed") {
		return job.data;
	}

	await delay(waitDuration);

	return pollWorkflowJob(jobId, onUpdate, waitDuration, signal);
};

export const triggerWorkflow = (branch: string, access: string) => {
	return octokit.rest.actions.createWorkflowDispatch({
		...defaultOptions,
		workflow_id: "main.yml",
		ref: branch,
		inputs: {
			access
		}
	});
};

export const cancelWorkflowRun = async (runId: number) => {
	try {
		await octokit.rest.actions.cancelWorkflowRun({
			...defaultOptions,
			run_id: runId
		});
	} catch (err) {
		return null;
	}
};

export const withOptions = <T, TResponse>(
	fn: (params: T) => Promise<TResponse>,
	params: Omit<T, "owner" | "repo">
) =>
	fn({
		...defaultOptions,
		...params
	} as T);
