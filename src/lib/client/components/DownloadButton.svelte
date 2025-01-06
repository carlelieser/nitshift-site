<script>
	import Button from "./Button.svelte";
	import { PUBLIC_INSTALLER_NAME } from "$env/static/public";
	import { analytics } from "$lib/client/analytics";

	export let primary = true;
	export let size = 0;
	export let background = "dark";

	export let enableStoreDownload = false;

	const handleStartDownload = () => {
		analytics.track("download", { platform: "windows", version: "latest" });
		const link = document.createElement("a");
		link.href = "/releases/latest/glimmr-setup.exe";
		link.download = PUBLIC_INSTALLER_NAME;
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
	class="download-button"
	startIcon="mdi:microsoft"
	label="Download for Windows"
	secondaryLabel={"Free"}
	on:click={handleStartDownload}
	{...$$props}
/>
{#if enableStoreDownload}
	<a href="ms-windows-store://pdp/?productid=XP89FPP9MX5S91">
		<Button
			primary={false}
			{background}
			{size}
			class="download-button"
			startIcon="mdi:shopping"
			label="Get it from the Microsoft Store"
			secondaryLabel="Free"
		/>
	</a>
{/if}
