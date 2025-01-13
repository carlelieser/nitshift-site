<script lang="ts">
	import value from "$lib/client/privacy.md?raw";
	import Loading from "$lib/client/components/Loading.svelte";
	import { onMount } from "svelte";
	import { loading } from "$lib/client/stores";
	import "carta-md/default.css";
	import { Carta, Markdown } from "carta-md";
	import DOMPurify from "isomorphic-dompurify";

	const carta = new Carta({
		sanitizer: DOMPurify.sanitize
	});

	onMount(() => {
		loading.set(false);
	});
</script>

<Loading />

<div class="section-container" id="policy-container">
	<div class="section pb-24">
		<Markdown {carta} {value} />
	</div>
</div>

<style>
	#policy-container :global(h1),
	#policy-container :global(h2),
	#policy-container :global(p),
	#policy-container :global(li) {
		font-family: "sofia-pro", sans-serif !important;
		margin-top: 1em;
	}

	#policy-container :global(h1) {
		font-size: 4em !important;
	}

	#policy-container :global(h2) {
		font-size: 2em;
	}

	#policy-container :global(ul) {
		list-style: unset;
		margin-left: 2em;
	}

	#policy-container :global(p),
	#policy-container :global(li) {
		line-height: 2em;
		opacity: 0.7;
	}
</style>
