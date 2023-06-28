<script>
	import Screenshot from "$lib/assets/screenshot.svg";
	import Animate from "./Animate.svelte";

	const features = [
		{
			icon: "public",
			title: "Global Slider",
			description: "Set the brightness for all displays with a single slider"
		},
		{
			icon: "light_mode",
			title: "Monitor Slider",
			description: "Set different brightness levels for individual monitors"
		},
		{
			icon: "donut_large",
			title: "Support for old monitors",
			description:
				"With Shade Mode, you can adjust the brightness of any old or hub-connected monitor"
		},
		{
			icon: "event",
			title: "Schedule",
			description: "Easily set your monitor's brightness according to the time of day"
		}
	];
</script>

<div class="bg-teal-500 relative overflow-hidden">
	<div class="container mx-auto space-y-12 py-24">
		<div class="relative z-10 py-24">
			<Animate>
				<div class="text-6xl font-display font-bold max-w-2xl mx-auto text-center px-8">
					<span class="text-teal-300">Glimmr</span> gives you
					<span class="text-yellow-500">full control</span>
					over the <span class="text-yellow-500">brightness</span> of your monitors.
				</div>
			</Animate>
		</div>
		<div class="grid grid-cols-1 lg:grid-cols-2 items-center z-10 relative">
			<div>
				<Animate>
					<img src={Screenshot} />
				</Animate>
			</div>
			<div class="flex flex-col text-center space-y-4 p-6">
				{#each features as feature, i}
					<Animate>
						<div
							class="p-6 bg-teal-900 bg-opacity-80 backdrop-blur-2xl text-white drop-shadow-lg rounded-xl space-y-2"
						>
							<div class="w-full flex items-center justify-center">
								<span class="material-symbols-outlined size-48 text-yellow-500 drop-shadow-2xl"
									>{feature.icon}</span
								>
							</div>
							<div class="text-3xl font-display font-bold">{feature.title}</div>
							<div class="text-2xl opacity-70">{feature.description}</div>
						</div>
					</Animate>
				{/each}
			</div>
		</div>
		<div class="bg-amber-500 w-[48rem] h-[48rem] rounded-full absolute left-0 bottom-0 z-0 -m-48" />
		<div class="bg-teal-900 w-[48rem] h-[48rem] rounded-full absolute left-0 -top-1/3 z-0" />
	</div>
</div>
