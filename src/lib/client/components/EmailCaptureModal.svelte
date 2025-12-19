<script lang="ts">
	import Button from "./Button.svelte";
	import { analytics } from "$lib/client/analytics";
	import { downloadInstaller } from "$lib/client/utils";

	let { open = $bindable(false) } = $props();

	let email = $state("");
	let isSubmitting = $state(false);

	const handleSubmit = async () => {
		if (email) {
			isSubmitting = true;
			analytics.track("email_capture", { email, source: "pre_download" });
			// Store email in localStorage for potential future use
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

	const handleBackdropClick = (e: MouseEvent) => {
		if (e.target === e.currentTarget) {
			open = false;
		}
	};
</script>

{#if open}
	<!-- svelte-ignore a11y_click_events_have_key_events -->
	<!-- svelte-ignore a11y_no_static_element_interactions -->
	<div
		class="fixed inset-0 bg-black/60 backdrop-blur-sm z-[200] flex items-center justify-center p-4"
		onclick={handleBackdropClick}
	>
		<div
			class="bg-white rounded-3xl shadow-2xl max-w-md w-full p-8 space-y-6 animate-in fade-in zoom-in duration-200"
		>
			<div class="text-center space-y-2">
				<div class="flex justify-center mb-4">
					<div class="bg-teal-100 text-teal-600 rounded-full p-4">
						<span class="material-symbols-outlined !text-4xl">mail</span>
					</div>
				</div>
				<h2 class="text-2xl font-display font-bold text-teal-900">
					Get your license key delivered
				</h2>
				<p class="text-gray-600">
					Enter your email to receive updates and your license key when you upgrade to Pro.
				</p>
			</div>

			<div class="space-y-4">
				<input
					type="email"
					bind:value={email}
					placeholder="you@example.com"
					class="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 outline-none transition-all text-lg"
				/>
				<Button
					label={isSubmitting ? "Starting download..." : "Download Glimmr"}
					primary={true}
					size={2}
					class="w-full"
					startIcon="mdi:download"
					on:click={handleSubmit}
				/>
			</div>

			<button
				onclick={handleSkip}
				class="w-full text-gray-500 hover:text-gray-700 text-sm transition-colors"
			>
				Skip for now
			</button>

			<p class="text-xs text-gray-400 text-center">
				We respect your privacy. Unsubscribe anytime.
			</p>
		</div>
	</div>
{/if}
