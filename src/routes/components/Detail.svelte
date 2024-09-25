<script>
	export let icon = "";
	export let title = "";
	export let description = "";
</script>

<div class="gap-4 flex flex-col w-full md:max-w-sm">
	<div
		class="p-4 rounded-full flex items-center justify-center bg-white text-teal-500 self-start"
	>
		<span class="material-symbols-outlined">{icon}</span>
	</div>
	<div class="flex flex-col gap-2">
		<div class="text-2xl font-display font-bold">{title}</div>
		<div class="opacity-70 text-xl leading-relaxed">{description}</div>
	</div>
</div>
