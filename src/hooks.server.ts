import admin from "firebase-admin";
import serviceAccount from "$lib/server/serviceAccount.json";

admin.initializeApp({
	credential: admin.credential.cert(serviceAccount)
});
