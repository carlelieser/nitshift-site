<script>
	import Icon from "$lib/client/assets/icon.svg";
	import DownloadButton from "./DownloadButton.svelte";
	import Animate from "./Animate.svelte";

	import { page } from "$app/stores";
	import { menu } from "$lib/client/global";
	import Link from "$lib/client/components/Link.svelte";
	import Logo from "$lib/client/components/Logo.svelte";

	export let showDownloadButton = true;
	export let showPurchaseButton = true;

	let scrollTop = 0;
	let innerWidth = 0;
</script>

<svelte:window bind:scrollY={scrollTop} bind:innerWidth />

<div
	class="section-container flex items-center justify-center sticky top-0 z-50 bg-transparent !py-4 pointer-events-none"
>
	<div class="transition mx-auto text-white pointer-events-auto">
		<div
			class="mx-auto {scrollTop === 0
				? 'bg-teal-950 text-white'
				: 'bg-white text-black shadow-lg'} transition backdrop-blur-3xl p-4 px-8 rounded-3xl"
		>
			<div class="flex items-center justify-between flex-col md:flex-row gap-4 lg:gap-12">
				<Animate>
					<Logo />
				</Animate>
				<div class="flex items-center gap-8">
					{#each menu as { name, link }, i}
						{@const active = $page.url.href.replace($page.url.origin, "") === link}
						<Animate delay={(i + 1) * 0.1 + "s"}>
							<Link
								to={link}
								class={active
									? scrollTop === 0
										? "!text-teal-400"
										: "!text-teal-500"
									: ""}
							>
								{name}
							</Link>
						</Animate>
					{/each}
				</div>
				<DownloadButton size={2} />
			</div>
		</div>
	</div>
</div>
