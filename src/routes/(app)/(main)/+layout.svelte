<script>
	import { AppContent, Scrim } from "@smui/drawer";
	import Navbar from "$lib/client/components/Navbar.svelte";
	import Footer from "$lib/client/components/Footer.svelte";
</script>

<AppContent class="w-full h-full">
	<div class="fade-in bg-white">
		<Navbar />
		<slot />
		<Footer />
	</div>
</AppContent>
