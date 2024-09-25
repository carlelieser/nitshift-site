<script lang="ts">
	import Animate from "../Animate.svelte";
</script>

<div class="w-full grid grid-cols-1 lg:grid-cols-4 gap-24 items-center">
	<Animate className="col-span-2">
		<slot name="left" />
	</Animate>
	<Animate className="col-span-2">
		<slot name="right" />
	</Animate>
</div>
