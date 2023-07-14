<script>
	import Button from "./Button.svelte";
	import Animate from "./Animate.svelte";
	import { release } from "../stores.js";

	export let primary = true;
	export let showFileSize = false;
	export let size = 0;
	export let background = "dark";

	const handleStartDownload = () => {
		const link = document.createElement("a");
		link.href = $release.url;
		link.download = $release.name;
		link.style.display = "none";
		document.body.appendChild(link);
		link.click();
		document.body.removeChild(link);
	};
</script>

<Animate>
	<Button
		{primary}
		{background}
		{size}
		className="download-button"
		icon="rocket"
		label="Download for Windows"
		secondaryLabel={showFileSize ? $release?.size : false}
		on:click={handleStartDownload}
	/>
</Animate>
