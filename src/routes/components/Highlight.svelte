<script>
	export let video;
	export let title;
	export let description;
</script>

<div class="bg-white gap-4 flex flex-col">
	<video
		class="rounded-3xl"
		autoplay
		loop
		muted
		playsinline
		src={video}
	/>
	<h1 class="text-2xl font-display font-bold mt-4">{title}</h1>
	<p class="text-xl leading-relaxed opacity-70">{description}</p>
</div>