<script>
	import DownloadButton from "./DownloadButton.svelte";
	import PurchaseButton from "./PurchaseButton.svelte";

	const pricing = [
		{
			title: "Free",
			price: "$0",
			frequency: "forever",
			description: "Ideal for basic display brightness control.",
			features: [
				"Individual Brightness Adjustment (Up to 2 displays)",
				"Profiles (Create or use preset brightness levels)",
				"Expanded/Compact View",
				"Light/Dark Mode",
				"Auto Startup",
				"Auto Detect Displays"
			]
		},
		{
			title: "PRO",
			price: "$1.99 - $5.99",
			frequency: "/one-time",
			description:
				"Unlock enhanced features and support development by choosing how much you want to pay.",
			features: [
				"Individual Brightness Adjustment (Unlimited displays)",
				"Global Brightness Slider",
				"Schedules",
				"Shade Mode",
				"Universal Display Compatibility",
				"All Free Features Included"
			]
		}
	];
</script>

{#snippet check(dark = true)}
	<svg
		class="h-6 w-5 flex-none {dark ? 'text-teal-600' : 'text-teal-500'}"
		viewBox="0 0 20 20"
		fill="currentColor"
		aria-hidden="true"
		data-slot="icon"
	>
		<path
			fill-rule="evenodd"
			d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z"
			clip-rule="evenodd"
		/>
	</svg>
{/snippet}

<div class="section-container bg-white">
	<div class="section py-12 pb-24">
		<div class="grid grid-cols-1 gap-12 items-center z-10 relative">
			<div class="mx-auto max-w-4xl text-center">
				<span class="text-base/7 font-semibold text-teal-600 font-display">Pricing</span>
				<h2
					class="mt-2 font-display text-balance text-5xl font-semibold tracking-tight text-teal-900 sm:text-6xl"
				>
					Choose What Works Best for You
				</h2>
				<span
					class="mx-auto mt-6 max-w-2xl text-pretty text-center text-lg text-gray-600 sm:text-xl/8"
				>
					Glimmr offers a free version for essential brightness control, plus an optional
					paid license for full functionality.
				</span>
			</div>
			<div class="relative isolate">
				<div
					aria-hidden="true"
					class="absolute inset-x-0 -top-3 -z-10 transform-gpu overflow-hidden px-36 blur-3xl"
				>
					<div
						class="mx-auto aspect-[1155/678] w-[72.1875rem] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30"
						style="clip-path: polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)"
					></div>
				</div>

				<!-- Pricing Tiers -->
				<div
					class="mx-auto mt-16 grid max-w-lg grid-cols-1 items-center gap-y-6 sm:mt-20 lg:gap-y-0 lg:max-w-4xl lg:grid-cols-2"
				>
					{#each pricing as { title, price, description, features, frequency }, i}
						{@const isPro = title === "PRO"}
						<div
							class="rounded-3xl sm:mx-8 lg:rounded-b-none sm:p-10 lg:mx-0 lg:rounded-bl-3xl lg:rounded-tr-none p-8 {isPro
								? 'bg-teal-950 text-white !rounded-3xl shadow-lg'
								: 'bg-white/60 ring-1 ring-gray-900/10'}"
						>
							<h3
								id={"tier-" + title.toLowerCase()}
								class="text-base/7 font-light text-teal-500"
							>
								{title}
							</h3>
							<p class="mt-4 flex items-baseline gap-x-2">
								<span class="text-5xl font-semibold tracking-tight">{price}</span>
								<span class="text-base opacity-70">{frequency}</span>
							</p>
							<span class="mt-6 text-base/7">{description}</span>
							<ul role="list" class="mt-8 space-y-3 text-sm/6 sm:mt-10">
								{#each features as feature}
									<li class="flex gap-x-3">
										{@render check(!isPro)}
										{feature}
									</li>
								{/each}
							</ul>
							{#if isPro}
								<div class="mt-8 space-y-2 text-sm text-teal-300">
									<div class="flex items-center gap-2">
										{@render check(false)}
										<span>30-day money-back guarantee</span>
									</div>
									<div class="flex items-center gap-2">
										{@render check(false)}
										<span>Lifetime license — no subscription</span>
									</div>
								</div>
								<PurchaseButton
									context="pricing"
									class="w-full mt-6"
									size={2}
									background="dark"
								/>
							{:else}
								<DownloadButton
									class="w-full mt-12"
									size={2}
									background="light"
									primary={false}
								/>
							{/if}
						</div>
					{/each}
				</div>
			</div>
		</div>
	</div>
</div>
