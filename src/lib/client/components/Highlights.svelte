<script>
	import brightnessModeDemo from "$lib/client/assets/brightness-mode-demo.mp4";
	import scheduleChangeDemo from "$lib/client/assets/schedule-change-demo.mp4";
	import globalChangeDemo from "$lib/client/assets/global-change-demo.mp4";
	import Highlight from "./Highlight.svelte";

	const features = [
		{
			video: brightnessModeDemo,
			title: "Create & Apply Custom Brightness Modes",
			description:
				"Whether you're working, gaming, or watching a movie, with just a few clicks, you can set the perfect brightness for your display."
		},
		{
			video: scheduleChangeDemo,
			title: "Use Custom Schedules to Automate Brightness Changes",
			description:
				"Create custom schedules to automatically adjust your display's brightness without lifting a finger."
		},
		{
			video: globalChangeDemo,
			title: "Adjust Displays Individually or in Sync",
			description:
				"Change the brightness of all your displays at once or adjust them individually to suit your needs."
		}
	];
</script>

<div class="section-container">
	<div class="section grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
		{#each features as feature, i}
			<Highlight {...feature} />
		{/each}
	</div>
</div>
