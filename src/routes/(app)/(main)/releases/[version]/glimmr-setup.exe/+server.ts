import { type ServerLoad } from "@sveltejs/kit";

export const GET: ServerLoad = async ({ params, fetch }) => {
	let version = params.version as string;

	if (version === "latest") {
		const response = await fetch("/releases/latest");
		const release = await response.json();
		version = release.tag_name;
	}

	const tag = version.replace("v", "");

	const response = await fetch(
		`https://github.com/carlelieser/glimmr-release/releases/download/${version}/glimmr-${tag}-setup.exe`
	);
	return new Response(response.body);
};
