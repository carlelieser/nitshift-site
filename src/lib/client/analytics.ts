import Analytics from "analytics";
import googleAnalytics from "@analytics/google-analytics";
import { PUBLIC_GOOGLE_ANALYTICS_ID, PUBLIC_GOOGLE_ANALYTICS_TAG } from "$env/static/public";

export const analytics = Analytics({
	app: PUBLIC_GOOGLE_ANALYTICS_ID,
	plugins: [
		googleAnalytics({
			measurementIds: [PUBLIC_GOOGLE_ANALYTICS_TAG]
		})
	]
});
