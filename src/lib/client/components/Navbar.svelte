<script lang="ts">
	import DownloadButton from "./DownloadButton.svelte";
	import { Button } from "$lib/components/ui/button";
	import { Separator } from "$lib/components/ui/separator";
	import { Sheet, SheetContent, SheetHeader } from "$lib/components/ui/sheet";
	import {
		NavigationMenuItem,
		NavigationMenuLink,
		NavigationMenuList,
		NavigationMenuRoot
	} from "$lib/components/ui/navigation-menu";

	import { page } from "$app/stores";
	import { menu } from "$lib/client/global";
	import Logo from "$lib/client/components/Logo.svelte";
	import { downloadInstaller } from "$lib/client/utils";
	import { goto, onNavigate } from "$app/navigation";
	import PurchaseButton from "$lib/client/components/PurchaseButton.svelte";

	let open = $state(false);

	onNavigate(() => {
		open = false;
	});
</script>

<Sheet bind:open>
	<SheetContent side="left">
		<SheetHeader>
			<div class="p-12 w-full flex items-center justify-center">
				<Logo />
			</div>
		</SheetHeader>
		<Separator />
		<div class="p-4 flex flex-col gap-2">
			{#each menu as { name, link, icon }}
				<Button class="justify-start" variant="ghost" onclick={() => goto(link)}>
					<span class="material-symbols-outlined">{icon}</span>
					{name}
				</Button>
			{/each}
			<Separator />
			<Button variant="ghost" onclick={downloadInstaller}>
				<span class="material-symbols-outlined">download</span>
				Download
			</Button>
		</div>
		<div class="p-2 mt-auto w-full">
			<PurchaseButton class="w-full" context="drawer" />
		</div>
	</SheetContent>
</Sheet>

<header class="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur px-3">
	<div class="w-full max-w-lg gap-4 flex h-18 items-center justify-center mx-auto">
		<Button variant="ghost" size="icon" onclick={() => (open = true)} class="lg:hidden">
			<span class="material-symbols-outlined">menu</span>
		</Button>
		<Logo />
		<NavigationMenuRoot class="hidden lg:flex mx-12">
			<NavigationMenuList>
				{#each menu as { name, link }}
					{@const active = $page.url.href.replace($page.url.origin, "") === link}
					<NavigationMenuItem>
						<NavigationMenuLink href={link} {active}>
							{name}
						</NavigationMenuLink>
					</NavigationMenuItem>
				{/each}
			</NavigationMenuList>
		</NavigationMenuRoot>
		<div class="flex flex-1 items-center justify-end gap-2">
			<div class="hidden lg:flex gap-2">
				<DownloadButton showEmailCapture={false} />
				<PurchaseButton context="navbar" />
			</div>
			<div class="lg:hidden">
				<PurchaseButton context="mobile-navbar" />
			</div>
		</div>
	</div>
</header>
