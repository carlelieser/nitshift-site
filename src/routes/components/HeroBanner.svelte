<script>
	import { onMount } from "svelte";

	import DownloadButton from "./DownloadButton.svelte";
	import Animate from "./Animate.svelte";
	import Screenshot from "$lib/assets/screenshot.png";
	import { loading } from "../stores.js";

	onMount(() => {
		loading.set(false)
	});
</script>

<svelte:head>
	<link rel="preload" as="image" href={Screenshot} />
</svelte:head>

<div class="w-full py-12 md:py-24 px-4 text-white overflow-hidden z-0 bg-blue-800">
	<div class="container max-w-7xl px-5 md:px-12 mx-auto relative z-10">
		<div class="text-center lg:text-left grid grid-cols-1 lg:grid-cols-2 gap-8">
			<div class="space-y-12">
				<div class="space-y-8 text-shadow-2xl shadow-amber-100/20">
					<Animate>
						<div
							class="text-6xl md:text-8xl text-transparent font-display font-bold flex md:block justify-center"
						>
							<span
								class="bg-clip-text bg-gradient-to-r from-yellow-500 to-white"
							>
								Simplified Brightness Control
							</span>
						</div>
					</Animate>
					<Animate delay="0.1s">
						<div class="text-2xl md:text-4xl font-display text-white opacity-80">
							Easily manage brightness levels for multiple monitors right from your system tray.
						</div>
					</Animate>
				</div>
				<Animate delay="0.2s">
					<DownloadButton primary={false} size={2} showFileSize={true} enableStoreDownload={true} />
				</Animate>
			</div>
			<div class="flex items-center justify-center">
				<Animate>
					<img
						src={Screenshot}
						class="max-w-[340px] sm:max-w-[500px]"
						alt="app screenshot"
					/>
				</Animate>
			</div>
		</div>
	</div>
</div>
