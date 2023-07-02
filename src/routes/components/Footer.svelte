<script>
	import DownloadButton from "./DownloadButton.svelte";
</script>

<div
	class="w-full py-12 md:py-24 bg-teal-950 text-white overflow-hidden z-0 border-t border-teal-900"
>
	<div class="container mx-auto px-4 relative flex items-center space-y-12 flex-col text-center">
		<DownloadButton size={4} showFileSize={true} />
	</div>
</div>
