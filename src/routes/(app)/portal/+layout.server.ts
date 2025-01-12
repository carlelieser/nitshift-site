import type { LayoutServerLoad } from "./$types";
import { redirect } from "@sveltejs/kit";

export const load: LayoutServerLoad = async ({ locals, route, cookies }) => {
	if (!locals.user && route.id !== "/(app)/portal/login") {
		throw redirect(302, "/portal/login");
	}

	return {
		user: locals.user
	};
};
