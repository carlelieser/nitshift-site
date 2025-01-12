import { error, json, type RequestHandler } from "@sveltejs/kit";
import admin from "firebase-admin";
import { type User } from "$lib/common/types";
import { getUserDataPath } from "$lib/server/utils";
import { GITHUB_USER } from "$env/static/private";
import { octokit } from "$lib/server/octokit";
import { delay } from "$lib/common/utils";
import { type RestEndpointMethodTypes } from "@octokit/rest";
import * as fs from "node:fs";
import path from "node:path";

type Workflow =
	RestEndpointMethodTypes["actions"]["listWorkflowRuns"]["response"]["data"]["workflow_runs"][0];
type Job = RestEndpointMethodTypes["actions"]["getJobForWorkflowRun"]["response"]["data"];

const getWorkflowJob = async (workflowId: number): Promise<Job> => {
	const jobs = await octokit.rest.actions.listJobsForWorkflowRun({
		owner: GITHUB_USER,
		repo: "glimmr",
		run_id: workflowId,
		filter: "latest"
	});
	return jobs.data.jobs[0];
};

const waitUntilWorkflowInProgress = async (
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

const pollWorkflowJob = async (
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

const triggerWorkflow = (branch: string, access: string) => {
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

const updateInstallerProgress = (email: string, data: object) =>
	admin.firestore().collection("installers").doc(email).set(data, { merge: true });

const beginDownload = async (user: User) => {
	try {
		const usersByEmail = await admin
			.firestore()
			.collection("users")
			.where("email", "==", user.email)
			.get();
		const licenseSnapshot = await admin
			.firestore()
			.collection("licenses")
			.doc(user.email)
			.get();
		const license = licenseSnapshot.data();
		const ids = usersByEmail.docs.map((doc) => doc.data()).map((data) => data.id);

		const userDataPath = await getUserDataPath(license?.code);
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

		await pollWorkflowJob(job.id, (job) => {
			const completed = job.steps?.filter((step) => step.status === "completed").length;
			const total = job.steps?.length;
			const progress = `${completed} / ${total}`;
			updateInstallerProgress(user.email, {
				progress
			});
		});

		const artifacts = await octokit.rest.actions.listWorkflowRunArtifacts({
			owner: GITHUB_USER,
			repo: "glimmr",
			run_id: workflow.id
		});

		const artifact = artifacts.data.artifacts[0];

		await updateInstallerProgress(user.email, {
			status: "complete",
			artifactId: artifact.id
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

		beginDownload(locals.user);

		return json({
			success: true
		});
	}

	return error(403, { message: "Unauthorized" });
};
