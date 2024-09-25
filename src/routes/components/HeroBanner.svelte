<script>
	import { onMount } from "svelte";

	import DownloadButton from "./DownloadButton.svelte";
	import Animate from "./Animate.svelte";
	import demo from "$lib/client/assets/demo.mp4";
	import { loading } from "../stores.ts";
	import Detail from "./Detail.svelte";

	let scrollY = 0;

	const detail = [
		{
			icon: "monitor",
			title: "Multi-Monitor Support",
			description: "Supports direct monitor adjustments for 100K+ monitors and displays."
		},
		{
			icon: "schedule",
			title: "Custom Schedules",
			description: "Set your brightness to adjust automatically, aligning with your daily workflow. Enjoy perfect lighting, from dawn till dusk."
		},
		{
			icon: "donut_small",
			title: "Shade Mode",
			description: "For old or incompatible monitors, simulate brightness adjustments with a dark, translucent overlay."
		}
	]

	onMount(() => {
		loading.set(false);
	});
</script>

<svelte:head>
	<link rel="preload" as="image" href={demo} />
</svelte:head>

<svelte:window bind:scrollY={scrollY} />

<div class="section-container bg-white text-black relative z-0 pt-12">
	<div
		class="section bg-teal-900/10 rounded-3xl relative py-36 z-20 bg-repeat bg-contain">
		<div class="section relative z-10">
			<div class="text-center lg:text-left grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
				<div class="space-y-12 z-10">
					<div class="space-y-8 text-shadow-2xl shadow-amber-100/10">
						<Animate>
							<div
								class="text-5xl md:text-6xl lg:text-7xl leading-tight text-transparent font-display font-bold flex md:block justify-center"
							>
							<span
								class="bg-clip-text bg-black"
							>
								Comprehensive Brightness Control
							</span>
							</div>
						</Animate>
						<Animate delay="0.1s">
							<div class="text-2xl md:text-4xl font-display opacity-80">
								Easily adjust the brightness of all your displays right from your system
								tray.
							</div>
						</Animate>
					</div>
					<Animate delay="0.2s" className="flex gap-4 flex-wrap justify-center lg:justify-start">
						<DownloadButton primary={true} size={2} showFileSize={true} enableStoreDownload={true} />
					</Animate>
				</div>
				<div class="-order-1 lg:order-1 flex items-center justify-center w-full h-full relative">
					<div
						class="w-full max-w-2xl"
					>
						<Animate>
							<video
								class="w-full h-full rounded-2xl shadow-2xl"
								autoplay
								loop
								muted
								playsinline
							>
								<source src={demo} type="video/mp4"/>
							</video>
						</Animate>
					</div>
				</div>
			</div>
		</div>
		<div class="section flex flex-col justify-center md:flex-row flex-wrap gap-12 mt-24">
			{#each detail as { icon, title, description }, i}
				<Detail icon={icon} title={title} description={description} />
			{/each}
		</div>
	</div>
</div>