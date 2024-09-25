<script>
	import Animate from "./Animate.svelte";
	import DownloadButton from "./DownloadButton.svelte";

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
			title: "Universal Monitor Compatibility",
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
			icon: "sentiment_very_satisfied",
			title: "Reduced Eye Strain",
			description:
				"Prolonged exposure to bright screens can cause eye strain. If it's too cumbersome to adjust your monitor's brightness manually, Glimmr can help."
		},
		{
			icon: "rocket_launch",
			title: "Auto Startup",
			description:
				"Glimmr starts up with Windows by default and automatically applies your predefined brightness adjustments so you don't have to."
		}
	];
</script>

<section class="bg-teal-900/10 text-black relative overflow-hidden">
	<div class="container mx-auto space-y-4 py-36 px-6 md:px-12">
		<div class="grid grid-cols-1 gap-12 items-center z-10 relative">
			<h1
				class="text-6xl font-display text-black font-bold text-center leading-tight md:leading-tight"
			>
				Designed for simplicity
			</h1>
			<section class="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 p-2 md:p-0">
				{#each features as feature, i}
					<div class="w-full h-full flex items-stretch justify-stretch">
						<Animate className="flex-grow">
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
			<div class="mx-auto">
				<DownloadButton size={4} />
			</div>
		</div>
	</div>
</section>
