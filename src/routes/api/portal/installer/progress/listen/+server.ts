import { type RequestHandler } from "@sveltejs/kit";
import { Readable } from "node:stream";
import { getWorkflowJob, pollWorkflowJob, waitUntilWorkflowInProgress } from "$lib/server/octokit";
import { updateInstallerProgress } from "$lib/server/utils";
import { get, InstallerCollection } from "$lib/server/firebase";

const syncInstallerProgress = async (email: string, controller: AbortController) => {
	try {
		const workflow = await waitUntilWorkflowInProgress(`user/${email}`);
		const job = await getWorkflowJob(workflow.id);
		await pollWorkflowJob(
			job.id,
			async ({ status, steps }) => {
				const completed = steps?.filter((step) => step.status === "completed").length;
				const step = steps?.find((step) => step.status === "in_progress")?.name;
				const total = steps?.length;
				const progress = `${completed} / ${total}`;
				const installer = await get(InstallerCollection(), email);

				if (installer.data && !installer.data.cancelled) {
					updateInstallerProgress(email, {
						progress,
						status,
						step: step ?? "None"
					});
				}

				if (!installer.data || status === "completed") {
					controller.abort();
				}
			},
			5000,
			controller.signal
		);
	} catch (err) {
		console.log(err);
	}
};

export const GET: RequestHandler = async ({ locals }) => {
	const email = locals.user?.email as string;
	const installer = await get(InstallerCollection(), email);
	const controller = new AbortController();

	const stream = new Readable({
		read() {},
		signal: controller.signal
	});

	const unsubscribe = installer.ref.onSnapshot(
		(doc) => {
			const data = `event: update\ndata: ${JSON.stringify(doc.data())}\n\n`;
			stream.push(data);
		},
		(error) => {
			const errorData = `event: error\ndata: ${JSON.stringify({ message: error.message })}\n\n`;
			stream.push(errorData);
		}
	);

	syncInstallerProgress(email, controller).then(() => console.log("Synced installer progress"));

	stream.on("close", () => {
		controller.abort();
		unsubscribe();
	});

	return new Response(stream as unknown as BodyInit, {
		headers: {
			"Content-Type": "text/event-stream",
			"Cache-Control": "no-cache",
			Connection: "keep-alive"
		}
	});
};
