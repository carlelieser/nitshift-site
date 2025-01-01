import admin, { type ServiceAccount } from "firebase-admin";
import serviceAccount from "$lib/server/serviceAccount.json" with { type: "json" };

admin.initializeApp({
	credential: admin.credential.cert(serviceAccount as ServiceAccount)
});
