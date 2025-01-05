<script>
	import HeroBanner from "$lib/client/components/HeroBanner.svelte";
	import Features from "$lib/client/components/Features.svelte";
	import FAQ from "$lib/client/components/FAQ.svelte";
	import Loading from "$lib/client/components/Loading.svelte";
	import Testimonials from "$lib/client/components/Testimonials.svelte";
	import TrustPilotBanner from "$lib/client/components/TrustPilotBanner.svelte";
	import Pricing from "$lib/client/components/Pricing.svelte";
</script>

<Loading />

<HeroBanner />
<TrustPilotBanner />
<Features />
<Testimonials />
<Pricing />
<div class="w-full h-[0.5px] bg-gray-100" />
<FAQ />

<style>
	@keyframes fade-in {
		0% {
			opacity: 0;
		}
		100% {
			opacity: 100%;
		}
	}

	.fade-in {
		opacity: 0;
		animation: fade-in 0.5s ease-in-out forwards;
	}
</style>
