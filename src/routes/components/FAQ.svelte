<script>
	import QA from "./QA.svelte";
	import Animate from "./Animate.svelte";

	const data = [
		{
			question: "What's the catch?",
			answer: "No catch and no strings attached. Glimmr is completely free to use. However, for more advanced features like Shade Mode and Scheduling, you can purchase a premium license from with-in the app for as little as $1.99."
		},
		{
			question: "How does it work?",
			answer: "Glimmr simplifies brightness adjustment by directly interfacing with your monitors through DDC/CI. This provides the same outcome as using the built-in buttons on the monitor's back or sides, but with enhanced convenience and ease-of-use."
		},
		{
			question:
				"Can I adjust the brightness of individual monitors in a multi-monitor setup?",
			answer: "Certainly! With Glimmr, you have the flexibility to adjust the brightness of individual monitors in a multi-monitor setup. The tool recognizes and allows you to control each connected monitor separately. This means you can fine-tune the brightness settings of each monitor independently, ensuring optimal visual experience and comfort across your entire multi-monitor configuration. Glimmr provides you with the granular control needed to tailor the brightness levels of each monitor to your specific preferences and requirements."
		},
		{
			question: "Can I set a global brightness level?",
			answer: "Yes, you have the ability to set a global brightness level for all your monitors simultaneously with a single slider. This means you can adjust the brightness of all connected monitors at once, ensuring a uniform and consistent brightness experience across your entire display setup. It's a convenient feature that saves you time and effort, as you don't have to adjust each monitor individually."
		},
		{
			question: "Is the app compatible with all versions of Windows?",
			answer: "Glimmr should run on all versions of Windows 7 and up, including Windows 8, 10, and 11."
		},
		{
			question: "Does the app work with monitors from different manufacturers?",
			answer: "Absolutely! Glimmr utilizes DDC/CI to directly adjust brightness, ensuring compatibility with a wide range of monitors. In case you encounter flickering or consistent brightness levels, consider trying a different connection type (preferably direct instead of using adapters or USB-C hubs). Alternatively, you can utilize Shade Mode, which works seamlessly on all monitors regardless of the connection type."
		},
		{
			question: "What is Shade Mode?",
			answer: "With a premium license, you can easily activate Shade Mode on any monitor. This feature enables you to adjust the brightness of your monitors by creating an Always-On-Top (AOT) semi-transparent window on the desired monitor. Please note that certain native Windows elements, such as the taskbar, may appear above this window when focused. Shade Mode is particularly useful if you frequently rely on adapters or USB-C hubs for monitor connections, encounter issues when adjusting brightness natively, or prefer setting your monitors to lower brightness levels than what they typically offer."
		},
		{
			question:
				"Can I schedule automatic brightness adjustments based on specific times of day?",
			answer: "Absolutely! The scheduling feature allows you to create a custom brightness schedule tailored to your preferences. Simply specify the target monitors, desired times, and corresponding brightness levels, and Glimmr will automatically adjust the brightness of your monitors according to the schedule you've set. This enables you to have an optimized viewing experience at different times, without the need for manual adjustments."
		},
		{
			question: "Is the app compatible with both desktop and laptop computers?",
			answer: "Yes, you can use Glimmr to adjust both internal and external monitors. It can also be used from a laptop or desktop, whichever you prefer."
		}
	];
</script>

<div>
	<section class="w-full bg-teal-50">
		<div class="container max-w-screen-lg mx-auto py-12 text-center space-y-8 px-8">
			<div class="space-y-4">
				<h1 class="text-5xl font-display font-bold">FAQ</h1>
				<p class="opacity-70 text-2xl">You've got questions, we've got answers.</p>
			</div>
			<div class="space-y-6">
				{#each data as content, i}
					<Animate>
						<QA question={content.question} answer={content.answer} />
					</Animate>
				{/each}
			</div>
		</div>
		<div class="py-12 text-center px-8">
			<span class="opacity-60">Feel free to send us an email at</span>
			<a href="mailto:support@glimmr.app" class="text-teal-500 hover:text-teal-700"
				>support@glimmr.app</a
			>
			<span class="opacity-60">if you have any questions!</span>
		</div>
	</section>
</div>
