<script>
	import Icon from "$lib/assets/icon.svg";
	import DownloadButton from "./DownloadButton.svelte";
	import Animate from "./Animate.svelte";

	let scrollTop = 0;
</script>

<svelte:window bind:scrollY={scrollTop} />

<div
	class="w-full overflow-hidden transition p-5 {scrollTop === 0
		? 'bg-teal-950 text-white'
		: 'bg-white text-teal-950 bg-opacity-80'}  backdrop-blur-lg sticky top-0 z-50"
>
	<div class="container mx-auto">
		<div class="flex items-center justify-between flex-col md:flex-row space-y-4 md:space-y-0">
			<Animate>
				<div class="flex items-center space-x-2">
					<img src={Icon} class="w-8 h-8" alt="logo" />
					<div class="font-bold text-3xl font-display">Glimmr</div>
				</div>
			</Animate>
			<DownloadButton primary={scrollTop !== 0} />
		</div>
	</div>
</div>
