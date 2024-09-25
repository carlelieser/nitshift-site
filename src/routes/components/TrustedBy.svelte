<script>
	import { userCount } from "../stores";
	import DownloadButton from "./DownloadButton.svelte";
</script>

<div class="w-full">
	<div class="section flex flex-col md:flex-row gap-12 items-center justify-between py-24">
		<h1 class="text-4xl text-center 2xl:text-left font-display font-bold">
			Join our growing family of {$userCount.toLocaleString()} satisfied users!
		</h1>
		<DownloadButton primary={false} size={2} showFileSize={false} />
	</div>
</div>
