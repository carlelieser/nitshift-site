<script lang="ts">
	import Button from "./Button.svelte";
	import Menu from "@smui/menu";
	import List, { Item } from "@smui/list";
	import { page } from "$app/stores";
	import { goto } from "$app/navigation";
	import Portal from "svelte-portal";
	import { onMount } from "svelte";
	import { analytics } from "$lib/client/analytics";

	let buttonRef: HTMLDivElement;
	let menu: Menu;
	let isOpen: boolean = false;

	export let size = 0;

	const handleOpenPriceMenu = () => {
		analytics.track("open_price_menu");
		isOpen = !isOpen;
	}

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
		on:click={handleOpenPriceMenu}
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
					{@const handlePriceClick = () => {
						analytics.track("start_checkout", { price });
						goto(`/checkout?price=${price}`)
					}}
					<Item onSMUIAction={handlePriceClick} class="font-medium"
						>${price}</Item
					>
				{/each}
			</List>
		</Menu>
	</Portal>
</div>
