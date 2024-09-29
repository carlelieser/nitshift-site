<script>
	import brightnessModeDemo from "$lib/client/assets/brightness-mode-demo.mp4";
	import scheduleChangeDemo from "$lib/client/assets/schedule-change-demo.mp4";
	import globalChangeDemo from "$lib/client/assets/global-change-demo.mp4";
</script>

<div class="section-container">
	<div class="section grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
		<div class="bg-white gap-4 flex flex-col">
			<video
				class="rounded-3xl"
				autoplay
				loop
				muted
				playsinline
				src={brightnessModeDemo}
			/>
			<h1 class="text-2xl font-display font-bold">Create & Apply Custom Brightness Modes</h1>
			<p class="text-xl leading-relaxed opacity-70">Whether you're working, gaming, or watching a movie, with just a few clicks, you can set the perfect brightness for your display.</p>
		</div>
		<div class="bg-white gap-4 flex flex-col">
			<video
				class="rounded-3xl"
				autoplay
				loop
				muted
				playsinline
				src={scheduleChangeDemo}
			/>
			<h1 class="text-2xl font-display font-bold">Use Custom Schedules to Automate Brightness Changes</h1>
			<p class="text-xl leading-relaxed opacity-70">Create custom schedules to automatically adjust your display's brightness without lifting a finger.</p>
		</div>
		<div class="bg-white gap-4 flex flex-col">
			<video
				class="rounded-3xl"
				autoplay
				loop
				muted
				playsinline
				src={globalChangeDemo}
			/>
			<h1 class="text-2xl font-display font-bold">Adjust Monitors Individually or in Sync</h1>
			<p class="text-xl leading-relaxed opacity-70">Change the brightness of all your monitors at once or adjust them individually to suit your needs.</p>
		</div>
	</div>
</div>