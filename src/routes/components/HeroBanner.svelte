<script lang="ts">
	import { onMount } from "svelte";

	import DownloadButton from "./DownloadButton.svelte";
	import Animate from "./Animate.svelte";
	import demo from "$lib/client/assets/glimmr-product-diagram.png?enhanced";
	import { loading } from "../stores";
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
			description:
				"Set your brightness to adjust automatically, aligning with your daily workflow. Enjoy perfect lighting, from dawn till dusk."
		},
		{
			icon: "donut_small",
			title: "Shade Mode",
			description:
				"For old or incompatible monitors, simulate brightness adjustments with a dark, translucent overlay."
		}
	];

	onMount(() => {
		loading.set(false);
	});
</script>

<svelte:head>
	<link rel="preload" as="image" href={demo} />
</svelte:head>

<svelte:window bind:scrollY />

<div class="section-container bg-white text-white relative z-0 pt-12">
	<div class="section p-12 md:p-24 !py-36 bg-zinc-900 rounded-3xl relative z-20 bg-repeat bg-contain">
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
								<span class="bg-clip-text bg-amber-500 capitalize leading-tight">
									Simplified Brightness Control
								</span>
							</div>
						</Animate>
						<Animate delay="0.1s">
							<div class="text-2xl md:text-4xl font-display opacity-80">
								Easily adjust brightness for all your displays right from your
								system tray.
							</div>
						</Animate>
					</div>
					<Animate
						delay="0.2s"
						className="flex gap-4 flex-wrap justify-center lg:justify-start"
					>
						<DownloadButton
							background="dark"
							primary={true}
							size={2}
							showFileSize={true}
							enableStoreDownload={true}
						/>
					</Animate>
				</div>
				<div
					class="shrink-0 -order-1 lg:order-1 flex items-center justify-center w-full h-full relative"
				>
					<div class="w-full max-w-lg flex items-center justify-center">
						<Animate>
							<enhanced:img src={demo} class="min-w-80" alt="demo"/>
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
