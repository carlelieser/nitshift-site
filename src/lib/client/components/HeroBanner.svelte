<script lang="ts">
	import { onMount } from "svelte";

	import DownloadButton from "./DownloadButton.svelte";
	import Animate from "./Animate.svelte";
	import demo from "$lib/client/assets/glimmr-product-diagram.png?enhanced";
	import { loading } from "$lib/client/stores";
	import Detail from "./Detail.svelte";

	let scrollY = 0;

	const detail = [
		{
			icon: "monitor",
			title: "Universal Support",
			description: "Supports direct display adjustments for 100K+ displays and displays."
		},
		{
			icon: "schedule",
			title: "Custom Schedules",
			description:
				"Set your brightness to adjust automatically, aligning with your daily workflow. Enjoy perfect lighting, from dawn till dusk."
		},
		{
			icon: "donut_small",
			title: "Shade Mode",
			description:
				"For old or incompatible displays, simulate brightness adjustments with a dark, translucent overlay."
		}
	];

	onMount(() => {
		loading.set(false);
	});
</script>

<svelte:window bind:scrollY />

<div class="section-container bg-white text-white relative z-0">
	<div
		class="section p-12 md:p-24 !py-36 !pt-44 bg-teal-950 rounded-3xl relative z-20 bg-repeat bg-contain"
	>
		<div class="section relative z-10">
			<div
				class="text-center xl:text-left grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
			>
				<div class="space-y-12 z-10">
					<div class="space-y-8 text-shadow-2xl shadow-amber-100/10">
						<Animate>
							<div
								class="max-w-sm mx-auto lg:mx-0 lg:text-left text-center text-5xl md:text-6xl lg:text-7xl text-transparent font-display font-bold flex md:block justify-center"
							>
								<h1 class="bg-clip-text bg-teal-50 capitalize leading-tight">
									Skip Windows Settings Forever
								</h1>
							</div>
						</Animate>
						<Animate delay="0.1s">
							<span class="text-2xl md:text-4xl font-display opacity-80 lg:text-left">
								Adjust all your monitors in one click from the system tray. No more hunting through Control Panel.
							</span>
						</Animate>
					</div>
					<Animate
						class="flex gap-4 flex-wrap items-center justify-center lg:justify-start"
						delay="0.2s"
					>
						<DownloadButton
							background="dark"
							enableStoreDownload={false}
							primary={true}
							size={2}
						/>
					</Animate>
				</div>
				<div
					class="shrink-0 -order-1 lg:order-1 flex items-center justify-center w-full h-full relative"
				>
					<div class="w-full max-w-lg flex items-center justify-center">
						<Animate>
							<enhanced:img
								alt="demo"
								class="min-w-80"
								fetchpriority="high"
								src={demo}
							/>
						</Animate>
					</div>
				</div>
			</div>
		</div>
		<div class="section flex flex-col justify-center md:flex-row flex-wrap gap-12 mt-24">
			{#each detail as { icon, title, description }, i}
				<Detail {icon} {title} {description} />
			{/each}
		</div>
	</div>
</div>

<svelte:head>
	<link as="image" href={demo.img.src} rel="preload" />
</svelte:head>
