<script>
	import Navbar from "../components/Navbar.svelte";
	import Privacy from "$lib/privacy.md";
	import Button from "../components/Button.svelte";
	import Footer from "../components/Footer.svelte";
</script>

<div class="fade-in bg-white">
	<Navbar />
	<div class="container max-w-screen-lg mx-auto py-28 px-12 space-y-12">
		<a href="/">
			<Button icon="arrow_back" label="Go home" />
		</a>
		<Privacy />
	</div>
	<Footer />
</div>