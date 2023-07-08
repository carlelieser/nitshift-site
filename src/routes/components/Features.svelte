<script>
	import Screenshot from "$lib/assets/screenshot.png";
	import Animate from "./Animate.svelte";

	const features = [
		{
			icon: "light_mode",
			title: "Brightness fine-tuning",
			description:
				"Whether setting the relative brightness of all displays, or adjusting the brightness of a specific one, we've got you covered."
		},
		{
			icon: "schedule",
			title: "Custom scheduling",
			description: "Effortlessly modify display brightness based on the time of day."
		},
		{
			icon: "handshake",
			title: "Excellent monitor support",
			description:
				"Tweak brightness levels for all kinds of displays, even ones connected through an adapter or hub."
		}
	];
</script>

<section class="bg-teal-50 text-teal-950 relative overflow-hidden">
	<div class="container mx-auto space-y-12 py-24 px-6 md:px-12">
		<div class="relative z-10 py-24 pt-12">
			<Animate>
				<div class="text-6xl font-display font-bold max-w-2xl mx-auto text-center px-8">
					<span class="text-teal-400">Glimmr</span> gives you
					<span class="text-yellow-500">full control</span>
					over the <span class="text-yellow-500">brightness</span> of your monitors.
				</div>
			</Animate>
		</div>
		<div class="grid grid-cols-1 lg:grid-cols-2 gap-4 items-center z-10 relative">
			<div class="flex items-center justify-center">
				<Animate>
					<img
						src={Screenshot}
						class="max-w-[340px] sm:max-w-[500px]"
						alt="app screenshot"
					/>
				</Animate>
			</div>
			<section class="flex flex-col space-y-4 sm:p-6">
				{#each features as feature, i}
					<Animate>
						<section
							class="p-6 bg-teal-950 bg-opacity-80 backdrop-blur-2xl text-white drop-shadow-lg rounded-xl space-y-2"
						>
							<span
								class="text-yellow-500 drop-shadow-2xl size-48 p-3 rounded-lg bg-teal-950 inline-block material-symbols-outlined"
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
			class="bg-amber-500 w-[48rem] h-[48rem] rounded-full absolute -right-40 -bottom-1/4 z-0"
		/>
		<div
			class="bg-teal-100 w-[56rem] h-[56rem] rounded-full absolute -left-40 -top-1/4 lg:-top-1/3 z-0"
		/>
	</div>
</section>
