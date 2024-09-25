<script lang="ts">
	import breeze from "$lib/client/assets/breeze.svg";
	import workAnimation from "$lib/client/assets/work.json?url";
	import Animate from "./Animate.svelte";
	import SplitScreen from "./layouts/SplitScreen.svelte";
	import demo from "$lib/client/assets/glimmr-product-diagram.png";
	import Icon from "@iconify/svelte";

	let workAnimationContainer: HTMLDivElement;

	const loadAnimation = async (path: string, element: HTMLElement) => {
		const { default: lottie } = await import("lottie-web");
		lottie.loadAnimation({
			container: element,
			renderer: "svg",
			loop: true,
			autoplay: true,
			path: path
		});
	};

	$: {
		if (workAnimationContainer) loadAnimation(workAnimation, workAnimationContainer);
	}
</script>

<section class="bg-white relative text-black overflow-hidden">
	<div class="container mx-auto space-y-12 py-36 px-6 md:px-12">
		<div class="mx-auto z-10 relative space-y-24">
			<SplitScreen>
				<div slot="left">
					<img src="{demo}" alt="demo"/>
				</div>
				<div slot="right">
					<div class="space-y-8 flex flex-col items-center max-w-lg mx-auto text-center">
						<Icon icon="mdi:cursor-default-click" class="text-6xl text-teal-500"/>
						<Animate>
							<div
								class="text-teal-500 text-4xl md:text-5xl lg:text-6xl font-display leading-tight font-bold">
								Accessible & Convenient
							</div>
						</Animate>
						<Animate>
							<div
								class="opacity-70 font-display text-xl lg:text-2xl !leading-relaxed">
								No more fiddling with monitor settings or dealing with the dreaded Windows brightness slider. All your displays will be automatically detected and available for adjustment.
							</div>
						</Animate>
					</div>
				</div>
			</SplitScreen>
<!--			<SplitScreen>-->
<!--				<div slot="left">-->
<!--					<div class="space-y-8 flex flex-col items-center max-w-lg mx-auto text-center">-->
<!--						<img src="{breeze}" width="64" height="64" />-->
<!--						<Animate>-->
<!--							<div-->
<!--								class="text-indigo-800 text-5xl md:text-6xl font-display leading-tight font-bold ">-->
<!--								Work without compromising your eyes.-->
<!--							</div>-->
<!--						</Animate>-->
<!--						<Animate>-->
<!--							<div-->
<!--								class="opacity-70 text-xl leading-tight">-->
<!--								You're only seconds away from never having to manually adjust your monitor settings.-->
<!--							</div>-->
<!--						</Animate>-->
<!--					</div>-->
<!--				</div>-->
<!--				<div slot="right">-->
<!--					<div bind:this={calmAnimationContainer}></div>-->
<!--				</div>-->
<!--			</SplitScreen>-->
		</div>
	</div>
</section>