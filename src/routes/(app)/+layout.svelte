<script>
	import { afterNavigate } from "$app/navigation";

	afterNavigate(() => {
		document.getElementById("app")?.scrollTo(0, 0);
	});
</script>

<slot />
