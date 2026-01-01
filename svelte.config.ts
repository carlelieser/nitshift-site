import adapter from "@sveltejs/adapter-cloudflare";
import type { Config } from "@sveltejs/kit";

const config: Config = {
	extensions: [".svelte", ".md"],
	kit: {
		adapter: adapter()
	}
};

export default config;
