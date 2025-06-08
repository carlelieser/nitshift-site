<script>
	import Animate from "./Animate.svelte";
	import DownloadButton from "./DownloadButton.svelte";
	import PurchaseButton from "./PurchaseButton.svelte";
	import Highlights from "./Highlights.svelte";
	import TrustedBy from "./TrustedBy.svelte";
	import Intro from "./Intro.svelte";
	import Link from "$lib/client/components/Link.svelte";
	import { Text } from "@smui/chips";

	const features = [
		{
			icon: "light_mode",
			title: "Adjust Brightness",
			description:
				"Effortlessly adjust display brightness individually or in sync with other displays."
		},
		{
			icon: "schedule",
			title: "Scheduling",
			description: "Easily modify brightness levels based on the time of day.",
			pro: true
		},
		{
			icon: "sync_saved_locally",
			title: "Universal Compatibility",
			description:
				"Unlike other brightness tools, Glimmr works with all display types, regardless of connection type."
		},
		{
			icon: "model_training",
			title: "Brightness Profiles",
			description: "Easily switch between different presets with just a few clicks."
		},
		{
			icon: "donut_small",
			title: "Shade Mode",
			description:
				"Artificially control brightness levels on displays that don't support native adjustments.",
			pro: true
		},
		{
			icon: "rocket_launch",
			title: "Auto Startup",
			description:
				"Glimmr starts up with Windows by default and automatically applies your predefined brightness adjustments."
		}
	];
</script>

<Highlights />
<TrustedBy />
<Intro />

<div class="section-container bg-teal-900/10 mt-24">
	<div class="section py-24">
		<div class="grid grid-cols-1 gap-12 items-center z-10 relative">
			<div class="mx-auto max-w-4xl text-center">
				<span class="text-base/7 font-semibold text-teal-600 font-display">Features</span>
				<h2
					class="mt-2 font-display text-balance text-5xl font-semibold tracking-tight text-teal-900 sm:text-6xl"
				>
					Designed for Simplicity
				</h2>
			</div>
			<section class="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 p-2 md:p-0">
				{#each features as feature, i}
					<div class="w-full h-full flex items-stretch justify-stretch">
						<Animate class="flex-grow">
							<section class="p-4 md:p-12 gap-8 h-full text-left flex flex-col">
								<div
									class="flex flex-col items-center justify-center size-16 p-12 bg-white text-teal-500 rounded-3xl"
								>
									<span class="material-symbols-outlined !text-5xl">
										{feature.icon}
									</span>
								</div>

								<div class="flex flex-col gap-4">
									<div class="flex items-center justify-between">
										<h1
											class="text-4xl font-display text-teal-900 leading-tight font-bold"
										>
											{feature.title}
										</h1>
										{#if feature.pro}
											<Link
												to="/pricing"
												class="bg-teal-500 !text-white px-3 py-1 rounded-full"
											>
												<Text>PRO</Text>
											</Link>
										{/if}
									</div>
									<p class="text-xl opacity-80 leading-relaxed">
										{feature.description}
									</p>
								</div>
							</section>
						</Animate>
					</div>
				{/each}
			</section>
			<div class="mx-aut flex flex-col items-center gap-8">
				<div class="flex gap-2 flex-col md:flex-row">
					<DownloadButton size={4} />
					<PurchaseButton context="features" size={4} />
				</div>
				<Link to="/pricing">View Pricing</Link>
			</div>
		</div>
	</div>
</div>
