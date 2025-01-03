<script>
	import Icon from "$lib/client/assets/icon.svg";
	import DownloadButton from "./DownloadButton.svelte";
	import Animate from "./Animate.svelte";
	import PurchaseButton from "./PurchaseButton.svelte";

	export let showDownloadButton = true;

	let scrollTop = 0;
	let innerWidth = 0;
</script>

<svelte:window bind:scrollY={scrollTop} bind:innerWidth />

<div
	class="section-container flex items-center justify-center sticky top-0 z-50 bg-transparent !py-4 pointer-events-none"
>
	<div class="transition mx-auto text-white pointer-events-auto">
		<div
			class="mx-auto shadow-sm {scrollTop === 0
				? 'bg-teal-950'
				: 'bg-white'} transition backdrop-blur-3xl p-4 px-8 rounded-3xl"
		>
			<div class="flex items-center justify-between flex-col md:flex-row gap-4 lg:gap-12">
				<Animate>
					<div class="flex items-center space-x-2">
						<img src={Icon} class="w-12 h-12" alt="logo" />
					</div>
				</Animate>
				{#if innerWidth > 600 && showDownloadButton}
					<div class="flex items-center gap-2">
						<DownloadButton background="light" primary={scrollTop === 0} size={2} />
						<PurchaseButton size={2} />
					</div>
				{/if}
			</div>
		</div>
	</div>
</div>
