<script>
	import Animate from "./Animate.svelte";

	const features = [
		{
			icon: "light_mode",
			title: "Precise Brightness Control",
			description: "Take control of your display's luminosity. Whether synchronizing screens or individually tuning a particular display, Glimmr has you covered."
		},
		{
			icon: "schedule",
			title: "Personalized Brightness Schedules",
			description: "Adapt your display brightness effortlessly with custom schedules. Tailor your brightness levels to change automatically based on the time of day."
		},
		{
			icon: "sync_saved_locally",
			title: "Universal Monitor Compatibility",
			description: "Adjust brightness levels seamlessly across diverse displays - including screens connected via adapters or hubs. Glimmr supports them all."
		},
		{
			icon: "model_training",
			title: "Customizable Brightness Modes",
			description: "Switch effortlessly between preferred brightness levels for various occasions with our predefined modes. Tailor your visual experience to your tasks with just a click."
		}
	];

</script>

<section class="bg-teal-50 text-teal-950 relative overflow-hidden shadow-2xl">
	<div class="container mx-auto space-y-4 py-24 px-6 md:px-12">
		<div class="relative z-10 py-24 pt-12">
			<Animate>
				<div class="text-6xl font-display font-bold max-w-2xl lg:max-w-4xl mx-auto text-center px-8">
					Gain
					<span class="text-yellow-500">complete control</span> over your monitors'
					<span class="text-yellow-500">brightness levels</span>.
				</div>
			</Animate>
		</div>
		<div class="grid grid-cols-1 gap-4 items-center z-10 relative">
			<section class="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:p-6">
				{#each features as feature, i}
					<Animate>
						<section
							class="p-6 bg-teal-950 bg-opacity-80 backdrop-blur-2xl text-white drop-shadow-lg rounded-xl space-y-2 h-full"
						>
							<span
								class="text-yellow-500 drop-shadow-2xl size-48 p-3 rounded-2xl bg-gray-900 bg-opacity-80 inline-block material-symbols-outlined"
							>
								{feature.icon}
							</span>
							<h1 class="text-3xl font-display font-bold capitalize">
								{feature.title}
							</h1>
							<p class="text-2xl opacity-70">{feature.description}</p>
						</section>
					</Animate>
				{/each}
			</section>
		</div>
		<div
			class="bg-amber-500 w-[48rem] h-[48rem] rounded-full absolute -right-40 -bottom-1/4 z-0"></div>
		<div
			class="bg-teal-100 w-[56rem] h-[56rem] rounded-full absolute -left-40 -top-1/4 lg:-top-1/3 z-0"></div>
	</div>
</section>
