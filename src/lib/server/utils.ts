import { error, type RequestHandler } from "@sveltejs/kit";

export const isProduction = process.env.NODE_ENV === "production";
export const isDevelopment = process.env.NODE_ENV === "development";

export const handleRequest = (handler: RequestHandler, secure = true): RequestHandler => {
	return async (event) => {
		const { request } = event;
		const secret =
			request.headers.get("X-Glimmr-Secret-Key") || event.url.searchParams.get("key");

		event.locals.secret = secret;

		if (secure && !secret) {
			error(403, {
				message: "Unauthorized"
			});
		}

		if (secure && secret) {
			const response = await event.fetch(`/api/users/${secret}`);
			if (!response.ok) {
				error(403, {
					message: "Unauthorized"
				});
			}
			event.locals.user = await response.json();
		}

		return handler(event);
	};
};
