<script lang="ts">
	import { Button } from "$lib/components/ui/button";
	import Icon from "@iconify/svelte";
	import EmailCaptureModal from "./EmailCaptureModal.svelte";
	import { downloadMicrosoftStore } from "$lib/client/utils";

	export let enableStoreDownload = false;
	export let showEmailCapture = true;

	let emailModalOpen = false;

	const handleDownloadClick = () => {
		if (showEmailCapture) {
			emailModalOpen = true;
		} else {
			import("$lib/client/utils").then(({ downloadInstaller }) => downloadInstaller());
		}
	};
</script>

<Button onclick={handleDownloadClick}>
	<Icon icon="mdi:microsoft" />
	Download for Windows
</Button>
{#if enableStoreDownload}
	<Button variant="secondary" onclick={downloadMicrosoftStore}>
		<Icon icon="mdi:shopping" />
		Get it from the Microsoft Store
	</Button>
{/if}

<EmailCaptureModal bind:open={emailModalOpen} />
