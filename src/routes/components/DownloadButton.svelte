<script>
	import Button from "./Button.svelte";
	import Animate from "./Animate.svelte";
	import { release } from "../stores.js";

	export let primary = true;
	export let showFileSize = false;
	export let size = 0;

	const handleStartDownload = () => {
		window.open($release.url, "_blank");
	};
</script>

<Animate>
	<Button primary={primary} icon="download" label="Download for Windows"
	        secondaryLabel={showFileSize ? $release?.size : false} size={size} on:click={handleStartDownload} />
</Animate>
