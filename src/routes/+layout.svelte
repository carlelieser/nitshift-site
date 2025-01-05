<script>
	import "../app.css";
	import Footer from "$lib/client/components/Footer.svelte";
	import Navbar from "$lib/client/components/Navbar.svelte";
</script>

<svelte:head>
	<link
		rel="stylesheet"
		href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@48,400,1,200"
	/>
</svelte:head>

<div class="fade-in bg-white">
	<Navbar />
	<slot />
	<Footer />
</div>
