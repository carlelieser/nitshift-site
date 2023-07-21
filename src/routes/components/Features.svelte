<script>
	import Animate from "./Animate.svelte";
	import DownloadButton from "./DownloadButton.svelte";

	const features = [
		{
			icon: "light_mode",
			title: "Precise Brightness Control",
			description: "Effortlessly adjust display brightness individually or in sync with other displays."
		},
		{
			icon: "schedule",
			title: "Personalized Brightness Schedules",
			description: "Easily modify brightness levels based on the time of day."
		},
		{
			icon: "sync_saved_locally",
			title: "Universal Monitor Compatibility",
			description: "Unlike other brightness control apps, Glimmr offers brightness adjustments for all display types, regardless of connection type."
		},
		{
			icon: "model_training",
			title: "Customizable Brightness Modes",
			description: "Switch between brightness levels for different lighting scenarios with predefined modes."
		},
		{
			icon: "sentiment_very_satisfied",
			title: "Reduced Eye Strain",
			description: "More control over your brightness means less eye strain and a happier you."
		},
		{
			icon: "rocket_launch",
			title: "Auto Startup",
			description: "Glimmr starts up with Windows so your brightness levels are ready to go when you are."
		}
	];

</script>

<section class="bg-teal-50 text-teal-950 relative overflow-hidden shadow-2xl">
	<div class="container mx-auto space-y-4 py-24 px-6 md:px-12">
		<div class="relative z-10 py-12">
			<Animate>
				<div class="text-6xl font-display font-bold max-w-2xl lg:max-w-4xl mx-auto text-center px-8">
					You <span class="text-indigo-500">deserve</span> this.
				</div>
			</Animate>
		</div>
		<div class="grid grid-cols-1 gap-4 items-center z-10 relative">
			<section class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:p-6">
				{#each features as feature, i}
					<Animate>
						<section
							class="p-6 bg-teal-950 bg-opacity-80 backdrop-blur-2xl text-white drop-shadow-lg rounded-xl space-y-2 h-full text-center flex flex-col justify-center"
						>
							<span
								class="text-yellow-500 drop-shadow-2xl size-48 p-3 rounded-2xl bg-gray-900 bg-opacity-80 inline-block material-symbols-outlined mx-auto"
							>
								{feature.icon}
							</span>
							<h1 class="text-3xl font-display font-bold capitalize">
								{feature.title}
							</h1>
							<p class="text-xl opacity-80">{feature.description}</p>
						</section>
					</Animate>
				{/each}
			</section>
			<div class="mx-auto">
				<DownloadButton size={4}/>
			</div>
		</div>
		<div
			class="bg-amber-500 w-[48rem] h-[48rem] rounded-full absolute -right-40 -bottom-1/4 z-0"></div>
		<div
			class="bg-teal-100 w-[56rem] h-[56rem] rounded-full absolute -left-40 -top-1/4 lg:-top-1/3 z-0"></div>
	</div>
</section>
