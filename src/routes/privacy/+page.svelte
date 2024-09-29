<script lang="ts">
	import Navbar from "../components/Navbar.svelte";
	import Privacy from "$lib/client/privacy.md";
	import Button from "../components/Button.svelte";
	import Footer from "../components/Footer.svelte";
	import Loading from "../components/Loading.svelte";
	import { onMount } from "svelte";
	import { loading } from "../stores";

	onMount(() => {
		loading.set(false);
	});
</script>

<Loading />

<div class="fade-in bg-white">
	<Navbar />
	<div class="container max-w-screen-lg mx-auto py-12 px-12 space-y-4">
		<a href="/">
			<Button icon="mdi:arrow-back" label="Home" size={2} />
		</a>
		<Privacy />
	</div>
	<Footer />
</div>
