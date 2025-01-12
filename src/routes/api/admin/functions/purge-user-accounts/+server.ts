import { json, type RequestHandler } from "@sveltejs/kit";
import admin from "firebase-admin";
import type { UserRecord } from "firebase-admin/auth";
import { handleRequest } from "$lib/server/utils";
import { delay } from "$lib/common/utils";

const getAllUsers = async (users: Array<UserRecord> = [], pageToken?: string) => {
	const results = await admin.auth().listUsers(1000, pageToken);
	const currentUsers = [...users, ...results.users];
	if (results.pageToken) {
		return getAllUsers(currentUsers, results.pageToken);
	} else {
		return currentUsers;
	}
};

const purgeUser = (user: UserRecord) => admin.auth().deleteUser(user.uid);

export const GET: RequestHandler = handleRequest(async () => {
	const users = await getAllUsers();

	for await (const user of users) {
		await purgeUser(user);
		await delay(100);
		console.log("Deleted user: ", user.uid);
	}

	return json({
		success: true
	});
});
