<script>
	import DownloadButton from "./DownloadButton.svelte";
</script>

<footer class="w-full py-12 md:py-24 bg-teal-500 text-white overflow-hidden z-0">
	<div class="container mx-auto px-4 relative flex items-center flex-col text-center">
		<div class="flex flex-col-reverse gap-24 md:flex-row md:items-center">
			<div>
				<p class="font-display mt-8 md:mt-0 opacity-80">
					© {new Date().getFullYear()} Glimmr LLC / All rights reserved.
				</p>
				<a href="/privacy" class="opacity-50 hover:opacity-100 cursor-pointer"
					>Privacy Policy</a
				>
			</div>
			<DownloadButton size={4} background="dark" showFileSize={true} />
		</div>
	</div>
</footer>
