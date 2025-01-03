import { sveltekit } from "@sveltejs/kit/vite";
import { defineConfig } from "vite";

export default defineConfig({
	build: {
		rollupOptions: {
			output: {
				assetFileNames: `assets/[name].[ext]`
			}
		}
	},
	plugins: [sveltekit()]
});
