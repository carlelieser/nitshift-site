<script>
	import collapse from "svelte-collapse";

	export let question = "";
	export let answer = "";

	let open = false;
</script>

<section
	class="rounded-3xl flex flex-col items-center justify-center p-6 cursor-pointer transition {open
		? 'bg-teal-900/10'
		: 'bg-white text-black hover:bg-teal-900/10'}"
	on:click={() => (open = !open)}
>
	<div class="flex items-center justify-between text-left w-full">
		<h3 class="font-medium transition max-w-2xl font-display text-xl">{question}</h3>
		<span class="material-symbols-outlined">{open ? "expand_less" : "expand_more"}</span>
	</div>
	<div use:collapse={{ open }}>
		<p class="text-left pt-4 pb-2 text-xl leading-relaxed opacity-90">{answer}</p>
	</div>
</section>
