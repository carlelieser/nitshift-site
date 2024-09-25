<script>
	import Navbar from "./components/Navbar.svelte";
	import HeroBanner from "./components/HeroBanner.svelte";
	import Features from "./components/Features.svelte";
	import DownloadBanner from "./components/Footer.svelte";
	import { release, userCount } from "./stores";
	import FAQ from "./components/FAQ.svelte";
	import Loading from "./components/Loading.svelte";
	import Intro from "./components/Intro.svelte";
	import Testimonials from "./components/Testimonials.svelte";
	import TrustedBy from "./components/TrustedBy.svelte";

	export let data;

	$: {
		release.set(data.metadata);
		userCount.set(data.userCount);
	}
</script>

<Loading />

<div class="fade-in bg-white">
	<Navbar />
	<HeroBanner />
	<TrustedBy />
	<Intro />
	<Features />
	<Testimonials />
	<FAQ />
	<DownloadBanner />
</div>

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
