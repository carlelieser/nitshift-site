<script>
	import Render from "$lib/assets/render-compressed.png";
	import DownloadButton from "./DownloadButton.svelte";
	import Animate from "./Animate.svelte";
</script>

<div class="w-full py-12 md:py-24 bg-amber-100 text-teal-900 overflow-hidden z-0">
	<div class="container mx-auto px-4 relative">
		<div class="grid grid-cols-1 lg:grid-cols-2 gap-8 z-20 relative items-center">
			<div class="space-y-8 text-center lg:text-left">
				<div class="space-y-4 text-shadow-2xl shadow-amber-100/20">
					<Animate>
						<div class="text-7xl md:text-8xl font-display font-bold">
							Simplified Brightness Control
						</div>
					</Animate>
					<Animate delay="0.1s">
						<div class="text-4xl md:text-5xl font-display text-teal-700">
							Never fiddle with your monitors ever again.
						</div>
					</Animate>
				</div>
				<Animate delay="0.2s">
					<DownloadButton primary={false} showFileSize={true} size={2} />
				</Animate>
			</div>
			<Animate>
				<div>
					<img src={Render} alt="hero banner img" style="aspect-ratio: 1/1;"/>
				</div>
			</Animate>
		</div>
		<div class="bg-teal-300 absolute z-0 rounded-full bottom-0 right-0 w-[48rem] h-[48rem] -m-36" />
	</div>
</div>
