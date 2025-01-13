import admin, { type ServiceAccount } from "firebase-admin";
import type { License, Session, User } from "$lib/common/types";
import type { CollectionReference } from "firebase-admin/firestore";
import type { Installer } from "$lib/server/octokit";
import { randomUUID } from "node:crypto";
import serviceAccount from "$lib/server/serviceAccount.json" with { type: "json" };

export const initializeApp = (name?: string) =>
	admin.initializeApp(
		{
			credential: admin.credential.cert(serviceAccount as ServiceAccount)
		},
		name
	);

const app = () => initializeApp(randomUUID());

export const db = () => admin.firestore(app());

export const UserCollection = () => db().collection("users") as CollectionReference<User>;
export const LicenseCollection = () => db().collection("licenses") as CollectionReference<License>;
export const InstallerCollection = () =>
	db().collection("installers") as CollectionReference<Installer>;
export const SessionCollection = () => db().collection("sessions") as CollectionReference<Session>;
export const getUsersByEmail = (email: string) => {
	return UserCollection().where("email", "==", email).get();
};
