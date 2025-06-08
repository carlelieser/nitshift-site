<script>
	export let icon = "";
	export let title = "";
	export let description = "";
</script>

<div class="gap-4 flex flex-col w-full md:max-w-sm">
	<div
		class="p-4 rounded-full flex items-center justify-center bg-teal-900 text-teal-500 self-start"
	>
		<span class="material-symbols-outlined">{icon}</span>
	</div>
	<div class="flex flex-col gap-2">
		<h3 class="text-2xl font-display font-bold">{title}</h3>
		<span class="opacity-70 text-xl leading-relaxed">{description}</span>
	</div>
</div>
