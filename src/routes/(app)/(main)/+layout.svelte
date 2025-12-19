<script>
	import Navbar from "$lib/client/components/Navbar.svelte";
	import Footer from "$lib/client/components/Footer.svelte";
</script>

<div class="w-full h-full">
	<div class="fade-in bg-white">
		<Navbar />
		<main>
			<slot />
		</main>
		<Footer />
	</div>
</div>
