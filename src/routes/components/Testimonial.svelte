<script lang="ts">
	export let message: string = "";
	export let name: string = "";
	export let title: string = "";
	export let avatar: string = "";
</script>

<div class="bg-teal-900/10 rounded-3xl p-8 flex flex-col gap-8 h-full">
	<div class="flex-grow">
		<span
			class="material-symbols-outlined transform rotate-180 text-left self-start opacity-70"
			style="font-size: 3rem !important;">format_quote</span
		>
		<div class="text-lg leading-relaxed">
			{message}
		</div>
	</div>
	<div class="flex items-center space-x-2">
		<div class="rounded-full overflow-hidden">
			<img src={avatar} width="48" height="48" />
		</div>
		<div>
			<div class="font-medium opacity-90">{name}</div>
			<div class="opacity-70">{title}</div>
		</div>
	</div>
</div>
