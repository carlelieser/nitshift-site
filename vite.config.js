import { sveltekit } from "@sveltejs/kit/vite";
import { defineConfig } from "vite";
import { enhancedImages } from "@sveltejs/enhanced-img";

export default defineConfig({
	build: {
		rollupOptions: {
			output: {
				assetFileNames: `assets/[name].[ext]`
			}
		}
	},
	plugins: [enhancedImages(), sveltekit()]
});
