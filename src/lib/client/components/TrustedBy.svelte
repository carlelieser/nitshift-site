<script>
	import DownloadButton from "./DownloadButton.svelte";
	import { page } from "$app/stores";
</script>

<div class="section-container">
	<div
		class="section text-white bg-teal-950 rounded-3xl flex flex-col md:flex-row gap-12 items-center justify-between py-24"
	>
		<h1 class="text-4xl text-center 2xl:text-left font-display font-bold">
			Join our growing family of <span class="text-teal-500"
				>{$page.data.userCount.toLocaleString()}</span
			> satisfied users!
		</h1>
		<DownloadButton background="dark" primary={false} size={2} />
	</div>
</div>
