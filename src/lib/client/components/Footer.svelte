<script>
	import DownloadButton from "./DownloadButton.svelte";
	import PurchaseButton from "./PurchaseButton.svelte";
	import { menu } from "$lib/client/global";
	import Link from "$lib/client/components/Link.svelte";
	import Logo from "$lib/client/components/Logo.svelte";
</script>

<footer class="w-full py-12 md:py-24 bg-teal-950 text-white z-10 flex flex-col items-center">
	<div class="container mx-auto px-4 relative flex items-center flex-col text-center gap-12">
		<div class="flex flex-col-reverse items-start gap-24 md:flex-row">
			<Logo />
			<div class="flex flex-col items-start gap-4">
				<p class="font-display uppercase opacity-70 text-xs">Directory</p>
				{#each menu as { name, link }, i}
					<Link to={link}>
						{name}
					</Link>
				{/each}
			</div>
			<div class="flex flex-col items-start gap-4">
				<p class="font-display uppercase opacity-70 text-xs">Contact</p>
				<Link to="mailto:support@glimmr.app">Email us</Link>
			</div>
			<div class="flex items-center gap-2">
				<DownloadButton size={4} background="dark" />
				<PurchaseButton size={4} background="dark" />
			</div>
		</div>
		<div class="flex flex-col gap-4 items-center">
			<Link to="/privacy">Privacy Policy</Link>
			<p class="font-display opacity-70">
				© {new Date().getFullYear()} Glimmr LLC / All rights reserved.
			</p>
		</div>
	</div>
</footer>
