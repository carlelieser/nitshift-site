<script lang="ts">
	export let to: string;
</script>

<a
	href={to}
	class="group text-md flex items-center gap-1 font-display font-medium !text-inherit hover:opacity-70 no-underline transition-all {$$props.class} gap-2"
>
	<slot />
	<i
		class="material-symbols-outlined !text-sm !font-bold pointer-events-none -translate-x-1 group-hover:translate-x-0 relative flex items-center justify-center w-4 h-2 transition-transform"
	>
		<span class="opacity-100 group-hover:opacity-0 absolute">keyboard_arrow_right</span>
		<span class="opacity-0 group-hover:opacity-100 absolute">arrow_right_alt</span>
	</i>
</a>
