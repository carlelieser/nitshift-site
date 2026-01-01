<script>
	import "../app.css";
	import { analytics } from "$lib/client/analytics";
	import { ModeWatcher } from "mode-watcher";

	let { children } = $props();

	analytics.page();
</script>

<ModeWatcher />

<div class="bg-background size-full overflow-x-hidden scroll-smooth">
	{@render children()}
</div>
