<script>
	import Button from "./Button.svelte";
	import { release } from "../stores";

	export let primary = true;
	export let size = 0;
	export let background = "dark";

	export let enableStoreDownload = false;

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

<Button
	{primary}
	{background}
	{size}
	className="download-button"
	startIcon="mdi:microsoft"
	label="Download for Windows"
	secondaryLabel={"Try for free"}
	on:click={handleStartDownload}
/>
{#if enableStoreDownload}
	<a href="ms-windows-store://pdp/?productid=XP89FPP9MX5S91">
		<Button
			primary={false}
			{background}
			{size}
			className="download-button"
			startIcon="mdi:external-link"
			label="Get it from the Microsoft Store"
			secondaryLabel="Try for free"
		/>
	</a>
{/if}
