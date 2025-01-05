<script>
	import { page } from "$app/stores";
	import Button from "./Button.svelte";
</script>

<section class="section-container">
	<div class="section bg-teal-900 text-white rounded-3xl py-12">
		<div class="flex flex-col md:flex-row items-center justify-center gap-4">
			<div class="font-display text-3xl">We're on</div>
			<a href="https://www.trustpilot.com/review/glimmr.app">
				<img
					src={$page.data.trustPilotInfo.logoImageUrl}
					width={140}
					height={34}
					class="inline-block text-white"
					alt="trustpilot logo"
					loading="lazy"
				/></a
			>
			<img
				src={$page.data.trustPilotInfo.bannerImageUrl}
				class="rounded-xl overflow-hidden"
				width={200}
				height={36}
				alt="trustpilot rating"
				loading="lazy"
			/>
			<div class="font-display text-xl opacity-70">{$page.data.trustPilotInfo.rating}/5</div>
			<Button
				on:click={() => {
					window.open("https://www.trustpilot.com/review/glimmr.app", "_blank");
				}}
				label="See Reviews"
				startIcon="mdi:external-link"
			/>
		</div>
	</div>
</section>
