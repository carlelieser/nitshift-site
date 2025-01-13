<script>
	import "../app.css";
	import { analytics } from "$lib/client/analytics";

	analytics.page();
</script>

<svelte:head>
	<link
		href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@48,400,1,200"
		rel="stylesheet"
	/>
</svelte:head>

<div class="fade-in bg-white w-full h-full overflow-x-hidden" id="app">
	<slot />
</div>
