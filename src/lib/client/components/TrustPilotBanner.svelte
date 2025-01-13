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
					alt="trustpilot logo"
					class="inline-block text-white"
					height={34}
					loading="lazy"
					src={$page.data.trustPilotInfo.logoImageUrl}
					width={140}
				/></a
			>
			<img
				alt="trustpilot rating"
				class="rounded-xl overflow-hidden"
				height={36}
				loading="lazy"
				src={$page.data.trustPilotInfo.bannerImageUrl}
				width={200}
			/>
			<div class="font-display text-xl opacity-70">{$page.data.trustPilotInfo.rating}/5</div>
			<Button
				label="See Reviews"
				on:click={() => {
					window.open("https://www.trustpilot.com/review/glimmr.app", "_blank");
				}}
				startIcon="mdi:external-link"
			/>
		</div>
	</div>
</section>
