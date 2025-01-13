<script>
	import QA from "./QA.svelte";
	import Animate from "./Animate.svelte";
	import Link from "$lib/client/components/Link.svelte";

	const data = [
		{
			question: "How does it work?",
			answer: "Glimmr simplifies brightness adjustment by directly interfacing with your displays through DDC/CI. This provides the same outcome as using the built-in buttons on the display's back or sides, but with enhanced convenience and ease-of-use."
		},
		{
			question:
				"Can I adjust the brightness of individual displays in a multi-display setup?",
			answer: "Certainly! With Glimmr, you have the flexibility to adjust the brightness of individual displays in a multi-display setup. The tool recognizes and allows you to control each connected display separately. This means you can fine-tune the brightness settings of each display independently, ensuring optimal visual experience and comfort across your entire multi-display configuration. Glimmr provides you with the granular control needed to tailor the brightness levels of each display to your specific preferences and requirements."
		},
		{
			question: "Can I set a global brightness level?",
			answer: "Yes, you have the ability to set a global brightness level for all your displays simultaneously with a single slider. This means you can adjust the brightness of all connected displays at once, ensuring a uniform and consistent brightness experience across your entire display setup. It's a convenient feature that saves you time and effort, as you don't have to adjust each display individually."
		},
		{
			question: "Is the app compatible with all versions of Windows?",
			answer: "Glimmr should run on all versions of Windows 7 and up, including Windows 8, 10, and 11."
		},
		{
			question: "Does the app work with displays from different manufacturers?",
			answer: "Absolutely! Glimmr utilizes DDC/CI to directly adjust brightness, ensuring compatibility with a wide range of displays. In case you encounter flickering or consistent brightness levels, consider trying a different connection type (preferably direct instead of using adapters or USB-C hubs). Alternatively, you can utilize Shade Mode, which works seamlessly on all displays regardless of the connection type."
		},
		{
			question: "What is Shade Mode?",
			answer: "With a premium license, you can easily activate Shade Mode on any display. This feature enables you to adjust the brightness of your displays by creating an Always-On-Top (AOT) semi-transparent window on the desired display. Please note that certain native Windows elements, such as the taskbar, may appear above this window when focused. Shade Mode is particularly useful if you frequently rely on adapters or USB-C hubs for display connections, encounter issues when adjusting brightness natively, or prefer setting your displays to lower brightness levels than what they typically offer."
		},
		{
			question:
				"Can I schedule automatic brightness adjustments based on specific times of day?",
			answer: "Absolutely! The scheduling feature allows you to create a custom brightness schedule tailored to your preferences. Simply specify the target displays, desired times, and corresponding brightness levels, and Glimmr will automatically adjust the brightness of your displays according to the schedule you've set. This enables you to have an optimized viewing experience at different times, without the need for manual adjustments."
		},
		{
			question: "Is the app compatible with both desktop and laptop computers?",
			answer: "Yes, you can use Glimmr to adjust both internal and external displays. It can also be used from a laptop or desktop, whichever you prefer."
		},
		{
			question: "Can I try Glimmr before purchasing a license?",
			answer: "Absolutely – you can download and install Glimmr for free to try out its features. The free version includes basic functionality to get you started. If you find Glimmr useful and want to unlock additional features, such as scheduling, Shade Mode, and more, you can purchase a premium license to access the full suite of capabilities."
		},
		{
			question: "I'm having trouble activating my license. What should I do?",
			answer: "If you're experiencing issues activating your license, please ensure that you're connected to the internet and that your firewall or antivirus software isn't blocking Glimmr's connection to the licensing server. If you continue to encounter issues, please reach out to our support team at support@glimmr.app for further assistance."
		},
		{
			question: "I never received my license key. What should I do?",
			answer: "If you haven't received your license key after purchasing a premium license, please make sure to check your spam or junk folder. If you still can't find it, please reach out to our support team and we'll be happy to assist you."
		},
		{
			question: "Can I use Glimmr on multiple devices with a single license?",
			answer: "Yes! Your license key can be used on an unlimited number of devices. This flexibility ensures that you can access Glimmr's functionality wherever you need it, without any restrictions."
		}
	];
</script>

<section class="w-full z-0">
	<div class="section flex flex-col items-center py-24 gap-12 text-center">
		<div class="mx-auto max-w-4xl text-center">
			<h2 class="text-base/7 font-semibold text-teal-600 font-display">FAQ</h2>
			<p
				class="mt-2 font-display text-balance text-5xl font-semibold tracking-tight text-gray-900 sm:text-6xl"
			>
				Got Questions? We've Got Answers.
			</p>
			<p
				class="mx-auto mt-6 max-w-2xl text-pretty text-center text-lg text-gray-600 sm:text-xl/8"
			>
				Check out our frequently asked questions below. If you have any other questions, or
				just wanna chat, feel free to reach out to us at <span
				class="inline-block text-teal-500"
			><Link to="mailto:support@glimmr.app">support@glimmr.app</Link></span
			>
			</p>
		</div>
		<div class="grid grid-cols-1 lg:grid-cols-2 gap-12 mt-24">
			{#each data as content, i}
				<Animate>
					<QA question={content.question} answer={content.answer} />
				</Animate>
			{/each}
		</div>
	</div>
</section>
