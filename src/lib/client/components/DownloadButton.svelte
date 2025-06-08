<script>
	import Button from "./Button.svelte";
	import { downloadInstaller, downloadMicrosoftStore } from "$lib/client/utils";

	export let primary = true;
	export let size = 0;
	export let background = "dark";

	export let enableStoreDownload = false;
</script>

<Button
	{...$$props}
	{background}
	class="download-button ${$$props.class ?? ''}"
	label="Download for Windows"
	on:click={downloadInstaller}
	{primary}
	secondaryLabel={"Free"}
	{size}
	startIcon="mdi:microsoft"
/>
{#if enableStoreDownload}
		<Button
			primary={false}
			{background}
			{size}
			on:click={downloadMicrosoftStore}
			class="download-button"
			startIcon="mdi:shopping"
			label="Get it from the Microsoft Store"
			secondaryLabel="Free"
		/>
{/if}
