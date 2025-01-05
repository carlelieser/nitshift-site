<script>
	import Animate from "./Animate.svelte";
	import DownloadButton from "./DownloadButton.svelte";
	import PurchaseButton from "./PurchaseButton.svelte";
	import Highlights from "./Highlights.svelte";
	import TrustedBy from "./TrustedBy.svelte";
	import Intro from "./Intro.svelte";
	import Link from "$lib/client/components/Link.svelte";
	import Button from "$lib/client/components/Button.svelte";

	const features = [
		{
			icon: "light_mode",
			title: "Precise Brightness Control",
			description:
				"Effortlessly adjust display brightness individually or in sync with other displays."
		},
		{
			icon: "schedule",
			title: "Personalized Brightness Schedules",
			description: "Easily modify brightness levels based on the time of day."
		},
		{
			icon: "sync_saved_locally",
			title: "Universal Display Compatibility",
			description:
				"Unlike other brightness tools, Glimmr works with all display types, regardless of connection type."
		},
		{
			icon: "model_training",
			title: "Brightness Profiles",
			description:
				"Easily switch between brightness levels for different lighting scenarios with predefined modes or customize your own."
		},
		{
			icon: "donut_small",
			title: "Shade Mode",
			description:
				"Artificially dim your display by overlaying a semi-transparent window on top of your screen."
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
				<h2 class="text-base/7 font-semibold text-teal-600 font-display">Features</h2>
				<p
					class="mt-2 font-display text-balance text-5xl font-semibold tracking-tight text-gray-900 sm:text-6xl"
				>
					Designed for Simplicity
				</p>
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
									<h1
										class="text-4xl font-display text-black leading-tight font-bold"
									>
										{feature.title}
									</h1>
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
					<PurchaseButton size={4} />
				</div>
				<Link to="/pricing">View Pricing</Link>
			</div>
		</div>
	</div>
</div>
