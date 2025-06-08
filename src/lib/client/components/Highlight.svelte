<script>
	export let video;
	export let title;
	export let description;
</script>

<div class="bg-white gap-4 flex flex-col">
	<video autoplay class="rounded-3xl" loop muted playsinline src={video} />
	<h3 class="text-2xl font-display font-bold mt-4">{title}</h3>
	<span class="text-xl leading-relaxed opacity-70">{description}</span>
</div>
