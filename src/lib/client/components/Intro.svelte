<script lang="ts">
	import Animate from "./Animate.svelte";
	import SplitScreen from "./layouts/SplitScreen.svelte";
	import demo from "$lib/client/assets/demo.mp4";
	import Icon from "@iconify/svelte";
</script>

<section class="section-container">
	<div class="section p-36 rounded-3xl bg-teal-900/5 text-black">
		<SplitScreen>
			<div slot="left">
				<video class="w-full h-full rounded-3xl" autoplay loop muted playsinline>
					<source src={demo} type="video/mp4" />
				</video>
			</div>
			<div slot="right">
				<div class="space-y-8 flex flex-col items-center max-w-lg mx-auto text-center">
					<Icon icon="mdi:cursor-default-click" class="text-6xl text-teal-500" />
					<Animate>
						<div
							class="text-teal-500 text-4xl md:text-5xl lg:text-6xl font-display leading-tight font-bold"
						>
							Accessible & Convenient
						</div>
					</Animate>
					<Animate>
						<div class="opacity-70 font-display text-xl lg:text-2xl !leading-relaxed">
							No more fiddling with display settings or dealing with the dreaded
							Windows brightness slider. All your displays will be automatically
							detected and available for adjustment.
						</div>
					</Animate>
				</div>
			</div>
		</SplitScreen>
	</div>
</section>
