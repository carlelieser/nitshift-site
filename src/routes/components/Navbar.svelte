<script>
	import Icon from "$lib/assets/icon.svg";
	import DownloadButton from "./DownloadButton.svelte";
	import Animate from "./Animate.svelte";

	export let showDownloadButton = true;

	let scrollTop = 0;
	let innerWidth = 0;
</script>

<svelte:window bind:scrollY={scrollTop} bind:innerWidth />

<div
	class="w-full overflow-hidden transition p-5 {scrollTop === 0 ? 'bg-black bg-opacity-40' : 'bg-teal-800 bg-opacity-80 shadow-2xl'} text-white backdrop-blur-2xl sticky top-0 z-50"
>
	<div class="container mx-auto">
		<div class="flex items-center justify-between flex-col md:flex-row space-y-4 md:space-y-0">
			<Animate>
				<div class="flex items-center space-x-2">
					<img src={Icon} class="w-8 h-8" alt="logo" />
					<div class="font-bold text-3xl font-display">Glimmr</div>
				</div>
			</Animate>
			{#if innerWidth > 600 && showDownloadButton}
				<DownloadButton primary={scrollTop === 0} />
			{/if}
		</div>
	</div>
</div>
