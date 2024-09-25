import { ServerLoad } from "@sveltejs/kit/src/exports/public";

export const GET: ServerLoad = async ({ params }) => {
	const version = params.version;
	const tag = version.replace("v", "");
	const response = await fetch(
		`https://github.com/carlelieser/glimmr-release/releases/download/${version}/glimmr-${tag}-setup.exe`
	);
	return new Response(response.body);
};
