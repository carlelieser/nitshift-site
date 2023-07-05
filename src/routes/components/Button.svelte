<script>
	export let label = "";
	export let secondaryLabel = "";

	export let primary = true;
	export let icon = false;

	/**
	 *
	 * @type {number}
	 */
	export let size = 0;

	export const paddingHorizontal = size * 4 + 12 + "px";
	export const paddingVertical = size * 4 + 8 + "px";
</script>

<div
	on:click
	class="cursor-pointer transition {primary
		? 'bg-teal-500 hover:bg-black text-white hover:text-teal-300'
		: 'bg-amber-300 hover:bg-black text-amber-950 hover:text-amber-400'} bg-opacity-80 backdrop-blur-3xl rounded-lg hover:drop-shadow-2xl text-[{size *
		4 +
		18}px] inline-block"
	style="padding-left: {paddingHorizontal}; padding-right: {paddingHorizontal}; padding-top: {paddingVertical}; padding-bottom: {paddingVertical};"
>
	<div class="flex items-center space-x-2">
		{#if icon}
			<span class="material-symbols-outlined opacity-80">{icon}</span>
		{/if}
		<div class="flex items-center space-x-2">
			<div class="font-medium whitespace-nowrap">{label}</div>
			{#if secondaryLabel}
				<div class="opacity-70">{secondaryLabel}</div>
			{/if}
		</div>
	</div>
</div>
