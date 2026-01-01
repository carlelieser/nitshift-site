import adapter from "@sveltejs/adapter-node";
import type { Config } from "@sveltejs/kit";

const config: Config = {
	extensions: [".svelte", ".md"],
	kit: {
		adapter: adapter()
	}
};

export default config;
