<script lang="ts">
	import Button from "./Button.svelte";
	import Menu from "@smui/menu";
	import List, { Item } from "@smui/list";
	import { page } from "$app/stores";
	import { goto } from "$app/navigation";
	import { PUBLIC_GLIMMR_API_KEY } from "$env/static/public";

	let isOpen: boolean = false;

	export let size = 0;
</script>

<div>
	<Button {size} startIcon="mdi:shopping" endIcon="mdi:chevron-down" label="Buy Glimmr Pro"
	        secondaryLabel="Lifetime license: Choose your price"
	        className="bg-none hover:!bg-none {isOpen ? '!bg-teal-500 !text-white' : '!bg-gradient-to-r from-yellow-500 to-amber-500'}"
	        on:click={() => isOpen = true} />
	<Menu bind:open={isOpen} anchorCorner="BOTTOM_LEFT" class="w-full mt-1 rounded-2xl">
		<List>
			{#each $page.data.prices as price}
				<Item onSMUIAction={() => goto(`/checkout?price=${price}&key=${PUBLIC_GLIMMR_API_KEY}`)}>${price}</Item>
			{/each}
		</List>
	</Menu>
</div>