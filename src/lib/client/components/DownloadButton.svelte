<script>
	import Button from "./Button.svelte";
	import { downloadInstaller } from "$lib/client/utils";

	export let primary = true;
	export let size = 0;
	export let background = "dark";

	export let enableStoreDownload = false;
</script>

<Button
	{...$$props}
	{background}
	class="download-button"
	label="Download for Windows"
	on:click={downloadInstaller}
	{primary}
	secondaryLabel={"Free"}
	{size}
	startIcon="mdi:microsoft"
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
