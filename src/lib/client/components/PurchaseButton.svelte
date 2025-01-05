<script lang="ts">
	import Button from "./Button.svelte";
	import Menu from "@smui/menu";
	import List, { Item } from "@smui/list";
	import { page } from "$app/stores";
	import { goto } from "$app/navigation";
	import Portal from "svelte-portal";
	import { onMount } from "svelte";

	let buttonRef: HTMLDivElement;
	let menu: Menu;
	let isOpen: boolean = false;

	export let size = 0;

	onMount(() => {
		menu.getMenuSurface().setIsHoisted(true);
	});
</script>

<div class="flex flex-col" bind:this={buttonRef}>
	<Button
		{size}
		startIcon="mdi:shopping"
		endIcon="mdi:chevron-down"
		label="Buy Glimmr Pro"
		secondaryLabel="Lifetime license: Choose your price"
		on:click={() => (isOpen = true)}
		{...$$props}
	/>
	<Portal>
		<Menu
			bind:this={menu}
			bind:open={isOpen}
			anchor={false}
			anchorElement={buttonRef}
			anchorCorner="BOTTOM_LEFT"
			class="my-2 z-50 rounded-2xl"
			style="min-width: {buttonRef?.offsetWidth}px;"
		>
			<List>
				{#each $page.data.prices as price}
					<Item onSMUIAction={() => goto(`/checkout?price=${price}`)} class="font-medium"
						>${price}</Item
					>
				{/each}
			</List>
		</Menu>
	</Portal>
</div>
