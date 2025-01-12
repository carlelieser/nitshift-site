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
	export let width = 0;
	export let containerClass = "";
	export let menuClass = "";
	export let context = "default";

	const handleOpenPriceMenu = () => {
		analytics.track("open_price_menu", { context });
		isOpen = !isOpen;
	};

	onMount(() => {
		menu.getMenuSurface().setIsHoisted(true);
	});
</script>

<div class="flex flex-col {containerClass}">
	<Button
		{size}
		bind:ref={buttonRef}
		bind:offsetWidth={width}
		startIcon="mdi:shopping"
		endIcon={isOpen ? "mdi:chevron-up" : "mdi:chevron-down"}
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
			class="my-2 z-50 rounded-2xl {menuClass}"
			style="min-width: {width}px;"
		>
			<List>
				{#each $page.data.prices as price}
					{@const handlePriceClick = () => {
						analytics.track("start_checkout", { price });
						goto(`/checkout?price=${price}`);
					}}
					<Item onSMUIAction={handlePriceClick} class="font-medium">${price}</Item>
				{/each}
			</List>
		</Menu>
	</Portal>
</div>
