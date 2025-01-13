import admin from "firebase-admin";
import type { License, Session, User } from "$lib/common/types";
import type { CollectionReference } from "firebase-admin/firestore";
import type { Installer } from "$lib/server/octokit";

export const db = admin.firestore();

export const UserCollection = db.collection("users") as CollectionReference<User>;
export const LicenseCollection = db.collection("licenses") as CollectionReference<License>;
export const InstallerCollection = db.collection("installers") as CollectionReference<Installer>;
export const SessionCollection = db.collection("sessions") as CollectionReference<Session>;
export const getUsersByEmail = (email: string) => {
	return UserCollection.where("email", "==", email).get();
};
