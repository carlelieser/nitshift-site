<script>
	import Navbar from "../components/Navbar.svelte";
	import Privacy from "$lib/privacy.md";
	import Button from "../components/Button.svelte";
	import Footer from "../components/Footer.svelte";
	import Loading from "../components/Loading.svelte";
	import { onMount } from "svelte";
	import { loading } from "../stores.js";

	onMount(() => {
		loading.set(false);
	});
</script>

<Loading />

<div class="fade-in bg-white">
	<Navbar />
	<div class="container max-w-screen-lg mx-auto py-12 px-12 space-y-4">
		<a href="/">
			<Button icon="arrow_back" label="Go home" />
		</a>
		<Privacy />
	</div>
	<Footer />
</div>