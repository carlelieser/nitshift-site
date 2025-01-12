<script lang="ts">
	import Icon from "@iconify/svelte";

	export let label = "";
	export let secondaryLabel = "";

	export let primary = true;
	export let startIcon: string = "";
	export let endIcon: string = "";
	export let background = "dark";
	export let ref: HTMLDivElement | null = null;
	export let offsetWidth = 0;

	/**
	 *
	 * @type {number}
	 */
	export let size = 0;

	export const paddingHorizontal = size * 4 + 16 + "px";
	export const paddingVertical = size * 4 + 8 + "px";
</script>

<div
	bind:this={ref}
	tabindex="0"
	role="button"
	on:click
	on:keydown
	bind:offsetWidth
	class="cursor-pointer transition-all group {primary
		? 'bg-teal-500 text-white ' +
			(background === 'dark'
				? 'hover:bg-white hover:text-black'
				: 'hover:bg-black hover:text-white')
		: 'bg-teal-900/10 text-black ' +
			(background === 'dark'
				? 'text-white hover:bg-teal-500 hover:text-white'
				: 'hover:bg-black hover:text-white')} rounded-2xl hover:drop-shadow-2xl text-[{size *
		4 +
		18}px] flex items-center {$$props.class}"
	style="padding-left: {paddingHorizontal}; padding-right: {paddingHorizontal}; padding-top: {paddingVertical}; padding-bottom: {paddingVertical};"
>
	<div class="flex items-center space-x-2 flex-1 shrink min-w-0">
		{#if startIcon}
			<Icon icon={startIcon} style="width: 24px; height: 24px; opacity: 70%;" />
		{/if}
		<div
			class="flex flex-col items-start gap-0 cursor-pointer text-left flex-1 shrink min-w-0 overflow-hidden"
		>
			<div class="font-medium whitespace-nowrap text-md truncate flex-1 shrink w-full">
				{label}
			</div>
			{#if secondaryLabel}
				<div class="opacity-70 text-xs sm:text-sm flex-1 truncate w-full">
					{secondaryLabel}
				</div>
			{/if}
		</div>
		{#if endIcon}
			<Icon icon={endIcon} style="width: 24px; height: 24px; opacity: 70%; flex-shrink: 0;" />
		{/if}
	</div>
</div>
