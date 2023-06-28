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

<Navbar />
<HeroBanner />
<Features />
<DownloadBanner />
