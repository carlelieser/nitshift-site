import { type RequestHandler } from "@sveltejs/kit";
import { Readable } from "node:stream";
import { getWorkflowJob, pollWorkflowJob, waitUntilWorkflowInProgress } from "$lib/server/octokit";
import { updateInstallerProgress } from "$lib/server/utils";
import { InstallerCollection } from "$lib/server/firebase";

export const GET: RequestHandler = async ({ locals }) => {
	const installerRef = InstallerCollection().doc(locals.user?.email);
	const controller = new AbortController();

	const stream = new Readable({
		read() {},
		signal: controller.signal
	});

	const unsubscribe = installerRef.onSnapshot(
		(doc) => {
			const data = `event: update\ndata: ${JSON.stringify(doc.data())}\n\n`;
			stream.push(data);
		},
		(error) => {
			const errorData = `event: error\ndata: ${JSON.stringify({ message: error.message })}\n\n`;
			stream.push(errorData);
		}
	);

	waitUntilWorkflowInProgress(`user/${locals.user.email}`)
		.then((workflow) => getWorkflowJob(workflow.id))
		.then((job) =>
			pollWorkflowJob(
				job.id,
				async ({ status, steps }) => {
					const completed = steps?.filter((step) => step.status === "completed").length;
					const step = steps?.find((step) => step.status === "in_progress")?.name;
					const total = steps?.length;
					const progress = `${completed} / ${total}`;
					const installerInfo = await installerRef.get();
					if (installerInfo.exists && !installerInfo?.data()?.cancelled) {
						updateInstallerProgress(locals.user.email, {
							progress,
							status,
							step: step ?? "None"
						});
					}

					if (!installerInfo.exists || status === "completed") {
						controller.abort();
					}
				},
				5000,
				controller.signal
			)
		)
		.catch((err) => console.log(err));

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
