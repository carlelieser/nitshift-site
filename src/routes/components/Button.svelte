<script>
	export let label = "";
	export let secondaryLabel = "";

	export let primary = true;
	export let icon = false;
	export let background = "dark";
	export let className = "";

	/**
	 *
	 * @type {number}
	 */
	export let size = 0;

	export const paddingHorizontal = size * 4 + 16 + "px";
	export const paddingVertical = size * 4 + 8 + "px";
</script>

<div
	on:click
	class="cursor-pointer transition {primary
		? 'bg-teal-500 text-white ' +
		  (background === 'dark'
				? 'hover:bg-white hover:text-teal-950'
				: 'hover:bg-black hover:text-teal-300')
		: 'bg-amber-300  text-amber-950 ' +
		  (background === 'dark'
				? 'hover:bg-amber-600 hover:text-amber-200'
				: 'hover:bg-black hover:text-amber-400')} bg-opacity-80 backdrop-blur-3xl rounded-full hover:drop-shadow-2xl text-[{size *
		4 +
		18}px] inline-block {className}"
	style="padding-left: {paddingHorizontal}; padding-right: {paddingHorizontal}; padding-top: {paddingVertical}; padding-bottom: {paddingVertical};"
>
	<div class="flex items-center space-x-2">
		{#if icon}
			<span class="material-symbols-outlined opacity-80">{icon}</span>
		{/if}
		<div class="flex flex-col items-start sm:space-x-2 sm:flex-row sm:items-center">
			<div class="font-medium whitespace-nowrap">{label}</div>
			{#if secondaryLabel}
				<div class="opacity-70 text-xs sm:text-sm">{secondaryLabel}</div>
			{/if}
		</div>
	</div>
</div>
