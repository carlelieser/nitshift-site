import { sveltekit } from "@sveltejs/kit/vite";
import { defineConfig } from "vite";
import svelteMd from "vite-plugin-svelte-md";

export default defineConfig({
	plugins: [svelteMd(), sveltekit()]
});
