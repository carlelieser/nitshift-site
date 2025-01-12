<script>
	import "../app.css";
	import { analytics } from "$lib/client/analytics";

	analytics.page();
</script>

<svelte:head>
	<link
		rel="stylesheet"
		href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@48,400,1,200"
	/>
</svelte:head>

<div id="app" class="fade-in bg-white w-full h-full overflow-x-hidden">
	<slot />
</div>
