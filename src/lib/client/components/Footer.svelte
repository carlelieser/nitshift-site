<script>
	import DownloadButton from "./DownloadButton.svelte";
	import PurchaseButton from "./PurchaseButton.svelte";
	import { menu } from "$lib/client/global";
	import Link from "$lib/client/components/Link.svelte";
	import Logo from "$lib/client/components/Logo.svelte";
</script>

<footer class="w-full py-12 md:py-24 bg-teal-950 text-white z-10 flex flex-col items-center">
	<div class="w-full lg:container mx-auto px-4 relative text-center flex flex-col gap-12">
		<div
			class="flex flex-col items-center gap-12 lg:gap-24 md:flex-row md:items-start justify-center mx-auto"
		>
			<Logo />
			<div class="flex gap-4 md:gap-8 lg:gap-12">
				<div class="flex flex-col items-start gap-4">
					<h4 class="font-display uppercase opacity-70 text-xs">Directory</h4>
					<ul class="flex flex-col gap-2">
						{#each menu as { name, link }, i}
							<li>
								<Link to={link}>
									{name}
								</Link>
							</li>
						{/each}
					</ul>
				</div>
				<div class="flex flex-col items-start gap-4">
					<h4 class="font-display uppercase opacity-70 text-xs">Contact</h4>
					<Link to="mailto:support@glimmr.app">Email us</Link>
				</div>
			</div>
			<div class="flex flex-col xl:flex-row gap-2">
				<DownloadButton background="dark" size={4} />
				<PurchaseButton background="dark" context="footer" size={4} />
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
