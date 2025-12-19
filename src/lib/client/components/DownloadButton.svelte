<script lang="ts">
	import Button from "./Button.svelte";
	import EmailCaptureModal from "./EmailCaptureModal.svelte";
	import { downloadMicrosoftStore } from "$lib/client/utils";

	export let primary = true;
	export let size = 0;
	export let background = "dark";
	export let enableStoreDownload = false;
	export let showEmailCapture = true;

	let emailModalOpen = false;

	const handleDownloadClick = () => {
		if (showEmailCapture) {
			emailModalOpen = true;
		} else {
			// Direct download without modal
			import("$lib/client/utils").then(({ downloadInstaller }) => downloadInstaller());
		}
	};
</script>

<Button
	{...$$props}
	{background}
	class="download-button {$$props.class ?? ''}"
	label="Download for Windows"
	on:click={handleDownloadClick}
	{primary}
	secondaryLabel="Free — No credit card required"
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

<EmailCaptureModal bind:open={emailModalOpen} />
