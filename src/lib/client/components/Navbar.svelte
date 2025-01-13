<script lang="ts">
	import DownloadButton from "./DownloadButton.svelte";
	import Animate from "./Animate.svelte";
	import IconButton from "@smui/icon-button";

	import Drawer, { Content, Header, Scrim } from "@smui/drawer";
	import List, { Graphic, Item, Separator, Text } from "@smui/list";

	import { page } from "$app/stores";
	import { menu } from "$lib/client/global";
	import Link from "$lib/client/components/Link.svelte";
	import Logo from "$lib/client/components/Logo.svelte";
	import { downloadInstaller } from "$lib/client/utils";
	import { goto, onNavigate } from "$app/navigation";
	import PurchaseButton from "$lib/client/components/PurchaseButton.svelte";
	import { onMount } from "svelte";

	let scrollTop = $state(0);

	let open = $state(false);

	onNavigate(() => {
		open = false;
	});

	onMount(() => {
		document.getElementById("app")?.addEventListener("scroll", (e) => {
			scrollTop = document.getElementById("app")?.scrollTop;
		});
	});
</script>

<Drawer variant="modal" class="z-[100]" bind:open>
	<Header class="flex items-center justify-center py-12">
		<Logo />
	</Header>
	<Separator />
	<Content class="flex flex-col">
		<List class="flex-1">
			{#each menu as { name, link, icon }, i}
				{@const active = $page.url.href.replace($page.url.origin, "") === link}
				<Item href="javascript:void(0)" onclick={() => goto(link)} activated={active}>
					<Graphic class="material-symbols-outlined">{icon}</Graphic>
					<Text>{name}</Text>
				</Item>
			{/each}
			<Separator />
			<Item href="javascript:void(0)" onclick={downloadInstaller}>
				<Graphic class="material-symbols-outlined">download</Graphic>
				<Text>Download</Text>
			</Item>
		</List>
		<PurchaseButton context="drawer" containerClass="mt-auto p-2" menuClass="z-[100]" />
	</Content>
</Drawer>

<Scrim fixed={true} class="z-[80]" />

<div
	class="section-container flex items-center justify-center sticky top-0 z-50 bg-transparent !py-4 pointer-events-none"
>
	<div class="transition mx-auto text-white pointer-events-auto">
		<div
			class="mx-auto {scrollTop === 0
				? 'bg-teal-950 text-white'
				: 'bg-white text-black shadow-2xl'} transition backdrop-blur-3xl p-4 px-8 rounded-3xl"
		>
			<div class="flex items-center justify-between flex-row gap-4 lg:gap-12 min-w-48">
				<Animate>
					<Logo />
				</Animate>
				<div class="items-center gap-8 hidden lg:flex">
					{#each menu as { name, link }, i}
						{@const active = $page.url.href.replace($page.url.origin, "") === link}
						<Animate delay={(i + 1) * 0.1 + "s"}>
							<Link
								to={link}
								class={active
									? scrollTop === 0
										? "!text-teal-300"
										: "!text-teal-500"
									: ""}
							>
								{name}
							</Link>
						</Animate>
					{/each}
				</div>
				<div class="flex lg:hidden cursor-pointer">
					<IconButton class="material-symbols-outlined" onclick={() => (open = true)}
						>menu</IconButton
					>
				</div>
				<div class="hidden lg:flex">
					<DownloadButton size={2} />
				</div>
			</div>
		</div>
	</div>
</div>
