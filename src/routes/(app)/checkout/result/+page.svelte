<script>
	import { page } from "$app/stores";
	import DownloadButton from "$lib/client/components/DownloadButton.svelte";
	import celebrating from "$lib/client/assets/flexy-happy-young-man-celebrating-something.svg";
	import error from "$lib/client/assets/error.png?enhanced";
	import Link from "$lib/client/components/Link.svelte";
	import { analytics } from "$lib/client/analytics";

	$effect(() => {
		analytics.track($page.data.checkout.success ? "purchase_success" : "purchase_error", {
			customer: $page.data.checkout.customerId,
		});
	})
</script>

<div class="section-container">
	<div class="section text-center flex items-center justify-center min-h-screen">
		{#if $page.data.checkout.success}
			<div class="flex flex-col items-center max-w-screen-md">
				<img src={celebrating} width={256} alt="Person celebrating" />
				<div class="font-bold font-display text-5xl capitalize mt-8 text-teal-900">
					Thank you for your purchase!
				</div>
				<div class="font-display opacity-70 text-xl mt-4">
					You should receive an email shortly with your license information. In the
					meantime, download Glimmr by clicking the button below.
				</div>
				<DownloadButton class="mt-12" size={2} />
			</div>
		{:else}
			<div class="flex flex-col items-center max-w-screen-md">
				<enhanced:img src={error} width="148" />
				<div class="font-bold font-display text-5xl capitalize mt-8 text-teal-900">
					Woops.
				</div>
				<div class="font-display opacity-70 text-xl mt-4">
					There was an error processing your order. Please try again or contact us at <span
						class="inline-block text-teal-600"
						><Link to="mailto:support@glimmr.app">support@glimmr.app</Link></span
					>
				</div>
			</div>
		{/if}
	</div>
</div>
