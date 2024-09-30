<script lang="ts">
	import Icon from "@iconify/svelte";

	export let label = "";
	export let secondaryLabel = "";

	export let primary = true;
	export let icon: boolean | string = false;
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
	class="cursor-pointer transition-all group {primary
		? 'bg-teal-500 text-white ' +
		  (background === 'dark'
				? 'hover:bg-white hover:text-black'
				: 'hover:bg-black hover:text-teal-300')
		: 'bg-teal-900/10 text-black ' +
		  (background === 'dark'
				? 'text-white hover:bg-teal-500 hover:text-white'
				: 'hover:bg-black hover:text-teal-500')} rounded-2xl bg-opacity-90 backdrop-blur-3xl hover:drop-shadow-2xl text-[{size *
		4 +
		18}px] inline-block {className}"
	style="padding-left: {paddingHorizontal}; padding-right: {paddingHorizontal}; padding-top: {paddingVertical}; padding-bottom: {paddingVertical};"
>
	<div class="flex items-center space-x-2">
		{#if icon}
			<Icon {icon} style="width: 24px; height: 24px; opacity: 70%;" />
		{/if}
		<div class="flex flex-col items-start sm:space-x-2 sm:flex-row sm:items-center truncate">
			<div class="font-medium whitespace-nowrap text-md">{label}</div>
			{#if secondaryLabel}
				<div class="opacity-70 text-xs sm:text-sm">{secondaryLabel}</div>
			{/if}
		</div>
	</div>
</div>
