<script lang="ts">
	import { Button } from "$lib/components/ui/button";
	import Icon from "@iconify/svelte";
	import {
		DropdownMenu,
		DropdownMenuContent,
		DropdownMenuItem,
		DropdownMenuTrigger
	} from "$lib/components/ui/dropdown-menu";
	import { page } from "$app/stores";
	import { goto } from "$app/navigation";
	import { analytics } from "$lib/client/analytics";

	let { context = "default", class: className = "" } = $props();

	let isOpen = $state(false);

	const handleOpenPriceMenu = () => {
		analytics.track("open_price_menu", { context });
	};

	const handlePriceClick = (price: number) => {
		analytics.track("start_checkout", { price });
		goto(`/checkout?price=${price}`);
	};
</script>

<div>
	<DropdownMenu bind:open={isOpen}>
		<DropdownMenuTrigger asChild>
			{#snippet child({ props })}
				<Button {...props} class={className} onclick={handleOpenPriceMenu}>
					<Icon icon="mdi:star" />
					Unlock Pro Features
					<Icon icon={isOpen ? "mdi:chevron-up" : "mdi:chevron-down"} />
				</Button>
			{/snippet}
		</DropdownMenuTrigger>
		<DropdownMenuContent>
			{#each $page.data.prices as price}
				<DropdownMenuItem onclick={() => handlePriceClick(price)}>
					${price}
				</DropdownMenuItem>
			{/each}
		</DropdownMenuContent>
	</DropdownMenu>
</div>
