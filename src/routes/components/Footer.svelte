<script>
	import DownloadButton from "./DownloadButton.svelte";
</script>

<footer
	class="w-full py-12 md:py-24 bg-teal-600 text-white overflow-hidden z-0"
>
	<div class="container mx-auto px-4 relative flex items-center space-y-12 flex-col text-center">
		<div class="flex flex-column space-y-2 md:space-y-0 md:space-x-8 md:flex-row md:items-center">
			<p class="font-display">© {new Date().getFullYear()} Glimmr LLC / All rights reserved.</p>
			<DownloadButton size={4} background="light" showFileSize={true} />
		</div>
	</div>
</footer>
