<script lang="ts">
	import { Button } from "$lib/components/ui/button";
	import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "$lib/components/ui/dialog";
	import Icon from "@iconify/svelte";
	import { analytics } from "$lib/client/analytics";
	import { downloadInstaller } from "$lib/client/utils";

	let { open = $bindable(false) } = $props();

	let email = $state("");
	let isSubmitting = $state(false);

	const handleSubmit = async () => {
		if (email) {
			isSubmitting = true;
			analytics.track("email_capture", { email, source: "pre_download" });
			localStorage.setItem("glimmr_email", email);
		}
		downloadInstaller();
		open = false;
		isSubmitting = false;
	};

	const handleSkip = () => {
		analytics.track("email_capture_skipped", { source: "pre_download" });
		downloadInstaller();
		open = false;
	};
</script>

<Dialog bind:open>
	<DialogContent>
		<DialogHeader>
			<DialogTitle>Get your license key delivered</DialogTitle>
			<DialogDescription>
				Enter your email to receive updates and your license key when you upgrade to Pro.
			</DialogDescription>
		</DialogHeader>
		<input
			type="email"
			bind:value={email}
			placeholder="you@example.com"
		/>
		<DialogFooter>
			<Button variant="ghost" onclick={handleSkip}>Skip</Button>
			<Button onclick={handleSubmit}>
				<Icon icon="mdi:download" />
				{isSubmitting ? "Starting download..." : "Download Glimmr"}
			</Button>
		</DialogFooter>
	</DialogContent>
</Dialog>
