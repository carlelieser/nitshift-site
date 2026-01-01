<script>
	import "../app.css";
	import { ModeWatcher } from "mode-watcher";
	import { browser } from "$app/environment";
	import { onMount } from "svelte";

	let { children } = $props();

	onMount(() => {
		if (browser) {
			import("$lib/client/analytics").then(({ analytics }) => {
				analytics.page();
			});
		}
	});
</script>

<ModeWatcher />

<div class="bg-background size-full overflow-x-hidden scroll-smooth">
	{@render children()}
</div>
