<script>
	import Navbar from "./components/Navbar.svelte";
	import HeroBanner from "./components/HeroBanner.svelte";
	import Features from "./components/Features.svelte";
	import DownloadBanner from "./components/Footer.svelte";
	import { release } from "./stores.js";

	/** @type {import("./$types").PageData} */
	export let data;

	$: {
		release.set(data);
	}
</script>

<div class="fade-in">
	<Navbar />
	<HeroBanner />
	<Features />
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
		animation: fade-in 1s ease-in-out forwards;
		animation-delay: 1s;
	}
</style>
