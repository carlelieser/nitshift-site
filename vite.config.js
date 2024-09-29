import { sveltekit } from "@sveltejs/kit/vite";
import { defineConfig } from "vite";
import svelteMd from "vite-plugin-svelte-md";
import { enhancedImages } from "@sveltejs/enhanced-img";

export default defineConfig({
	plugins: [enhancedImages(), svelteMd(), sveltekit()]
});
