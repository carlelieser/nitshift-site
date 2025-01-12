import { type RequestHandler } from "@sveltejs/kit";
import admin from "firebase-admin";
import { Readable } from "node:stream";
import { pollWorkflowJob } from "$lib/server/octokit";
import { updateInstallerProgress } from "$lib/server/utils";

export const GET: RequestHandler = async ({ locals }) => {
	const installerRef = admin.firestore().collection("installers").doc(locals.user?.email);
	const installer = await installerRef.get();

	const stream = new Readable({
		read() {
			// The read function is not used directly here since we push data manually
		}
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

	pollWorkflowJob(installer.data()?.jobId, (job) => {
		const completed = job.steps?.filter((step) => step.status === "completed").length;
		const total = job.steps?.length;
		const progress = `${completed} / ${total}`;
		updateInstallerProgress(locals.user.email, { progress, status: job.status });
		if (job.status === "completed") {
			stream.destroy();
		}
	});

	stream.on("close", () => {
		unsubscribe();
	});

	return new Response(stream as unknown as BodyInit, {
		headers: {
			// SSE requires this content type
			"Content-Type": "text/event-stream",
			// Disables caching so the events stream live
			"Cache-Control": "no-cache",
			// Keep connection alive
			Connection: "keep-alive"
		}
	});
};
