<script>
	import { Button, buttonVariants } from "$lib/components/ui/button";
	import { Badge } from "$lib/components/ui/badge";
	import * as Accordion from "$lib/components/ui/accordion";
	import * as DropdownMenu from "$lib/components/ui/dropdown-menu";
	import Logo from "$lib/client/components/Logo.svelte";
	import { Sun, Moon, Monitor, Clock, Sliders, Zap, Download, Github, ChevronRight, Star, Layers, Calendar } from "@lucide/svelte";
	import { resetMode, setMode } from "mode-watcher";

	const features = [
		{
			icon: Zap,
			title: "Native Hardware Control",
			description: "Direct DDC-CI protocol integration for zero-latency brightness adjustments on supported monitors."
		},
		{
			icon: Layers,
			title: "Software Fallback",
			description: "Overlay-based dimming for monitors without DDC-CI support. Mix and match modes across displays."
		},
		{
			icon: Monitor,
			title: "Multi-Monitor Support",
			description: "Individual brightness control per display with batch operations and custom nicknames."
		},
		{
			icon: Calendar,
			title: "Smart Scheduling",
			description: "Time-based and solar-aware scheduling. Automatic adjustments at sunrise, sunset, and golden hour."
		},
		{
			icon: Sliders,
			title: "Presets & Profiles",
			description: "Save custom brightness configurations. Quick switching between work, movie, and custom profiles."
		},
		{
			icon: Sun,
			title: "Unobtrusive Design",
			description: "Compact and expanded view modes. System tray operation with Windows startup integration."
		}
	];

	const faqs = [
		{
			question: "What are the system requirements?",
			answer: "Nitshift requires Windows 10 or Windows 11. For native brightness control, your monitors need DDC-CI support (most modern displays have this). For software brightness mode, any display will work."
		},
		{
			question: "Why isn't native brightness working on my monitor?",
			answer: "Native brightness requires DDC-CI to be enabled in your monitor's OSD settings menu. Try using a different video cable (DisplayPort or HDMI recommended). Some laptop displays don't support DDC-CI — use software mode instead."
		},
		{
			question: "What's the difference between native and software mode?",
			answer: "Native mode adjusts your monitor's actual backlight for true brightness control with zero latency. Software mode uses an overlay to dim the screen, which works on any display but doesn't reduce actual light output."
		},
		{
			question: "How does solar-aware scheduling work?",
			answer: "Nitshift automatically detects your location and calculates sunrise, sunset, and golden hour times. You can set brightness levels to automatically adjust based on the sun's position throughout the day."
		},
		{
			question: "My monitors aren't being detected. What should I do?",
			answer: "Try disconnecting and reconnecting your displays, then restart the application. Nitshift automatically detects display changes, but a restart can help with initial detection issues."
		}
	];
</script>

<svelte:head>
	<title>Nitshift — Multi-Monitor Brightness Control for Windows</title>
	<meta name="description" content="Control your monitor brightness with native hardware control, smart scheduling, and multi-monitor support. Free download for Windows 10/11." />
</svelte:head>

<!-- Navigation -->
<nav class="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
	<div class="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
		<Logo />
		<div class="flex items-center gap-2 sm:gap-4">
			<DropdownMenu.Root>
				<DropdownMenu.Trigger class={buttonVariants({ variant: "ghost", size: "icon" })}>
					<Sun class="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
					<Moon class="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
					<span class="sr-only">Toggle theme</span>
				</DropdownMenu.Trigger>
				<DropdownMenu.Content align="end">
					<DropdownMenu.Item onclick={() => setMode("light")}>Light</DropdownMenu.Item>
					<DropdownMenu.Item onclick={() => setMode("dark")}>Dark</DropdownMenu.Item>
					<DropdownMenu.Item onclick={() => resetMode()}>System</DropdownMenu.Item>
				</DropdownMenu.Content>
			</DropdownMenu.Root>
			<Button variant="ghost" size="icon" href="https://github.com/carlelieser/nitshift" target="_blank" rel="noopener noreferrer">
				<Github class="size-4" />
			</Button>
			<Button href="https://github.com/carlelieser/nitshift/releases" target="_blank" rel="noopener noreferrer">
				<Download class="size-4" />
				Download
			</Button>
		</div>
	</div>
</nav>

<!-- Hero Section -->
<section class="min-h-screen flex items-center justify-center pt-16 pb-24 px-6">
	<div class="max-w-4xl mx-auto text-center">
		<h1 class="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6 bg-gradient-to-br from-foreground via-foreground to-muted-foreground bg-clip-text">
			Multi-Monitor Brightness,<br />
			<span class="bg-gradient-to-r from-[#5eead4] to-[#d688ff] bg-clip-text text-transparent">Finally Under Control</span>
		</h1>

		<p class="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
			Native hardware control, intelligent scheduling, and seamless multi-monitor support.
			Manage all your displays from one beautiful interface.
		</p>

		<div class="flex flex-col sm:flex-row items-center justify-center gap-4">
			<Button size="lg" href="https://github.com/carlelieser/nitshift/releases" target="_blank" rel="noopener noreferrer" class="w-full sm:w-auto">
				<Download class="size-4" />
				Download for Windows
			</Button>
			<Button variant="outline" size="lg" href="#features" class="w-full sm:w-auto">
				Learn More
				<ChevronRight class="size-4" />
			</Button>
		</div>

		<p class="text-sm text-muted-foreground mt-6">
			Windows 10 & 11 • No account required • Always free
		</p>
	</div>
</section>

<!-- Features Section -->
<section id="features" class="py-24 px-6 bg-muted/30">
	<div class="max-w-6xl mx-auto">
		<div class="text-center mb-16">
			<Badge variant="outline" class="mb-4">Features</Badge>
			<h2 class="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
				Everything you need for display control
			</h2>
			<p class="text-lg text-muted-foreground max-w-2xl mx-auto">
				From hardware-level brightness adjustments to smart scheduling, Nitshift gives you complete control over your visual workspace.
			</p>
		</div>

		<div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
			{#each features as feature}
				<div class="bg-background rounded-xl p-6 border border-border hover:border-primary/20 hover:shadow-lg transition-all duration-300">
					<div class="size-12 rounded-lg bg-gradient-to-br from-[#5eead4]/20 to-[#d688ff]/20 flex items-center justify-center mb-4">
						<feature.icon class="size-6 text-foreground" />
					</div>
					<h3 class="text-lg font-semibold mb-2">{feature.title}</h3>
					<p class="text-muted-foreground">{feature.description}</p>
				</div>
			{/each}
		</div>
	</div>
</section>

<!-- How It Works Section -->
<section class="py-24 px-6">
	<div class="max-w-6xl mx-auto">
		<div class="text-center mb-16">
			<Badge variant="outline" class="mb-4">How It Works</Badge>
			<h2 class="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
				Simple setup, powerful control
			</h2>
			<p class="text-lg text-muted-foreground max-w-2xl mx-auto">
				Get up and running in seconds with automatic monitor detection and intelligent defaults.
			</p>
		</div>

		<div class="grid md:grid-cols-3 gap-8">
			<div class="text-center">
				<div class="size-16 rounded-full bg-gradient-to-br from-[#5eead4] to-[#5eead4]/50 flex items-center justify-center mx-auto mb-6 text-2xl font-bold text-foreground">
					1
				</div>
				<h3 class="text-xl font-semibold mb-3">Install & Launch</h3>
				<p class="text-muted-foreground">
					Download the installer and run it. Nitshift automatically detects all connected monitors.
				</p>
			</div>

			<div class="text-center">
				<div class="size-16 rounded-full bg-gradient-to-br from-[#a78bfa] to-[#a78bfa]/50 flex items-center justify-center mx-auto mb-6 text-2xl font-bold text-foreground">
					2
				</div>
				<h3 class="text-xl font-semibold mb-3">Configure Modes</h3>
				<p class="text-muted-foreground">
					Choose native DDC-CI control for supported monitors, or software mode for universal compatibility.
				</p>
			</div>

			<div class="text-center">
				<div class="size-16 rounded-full bg-gradient-to-br from-[#d688ff] to-[#d688ff]/50 flex items-center justify-center mx-auto mb-6 text-2xl font-bold text-foreground">
					3
				</div>
				<h3 class="text-xl font-semibold mb-3">Set & Forget</h3>
				<p class="text-muted-foreground">
					Create schedules, save presets, and let Nitshift manage your brightness automatically.
				</p>
			</div>
		</div>
	</div>
</section>

<!-- Dual Control Mode Section -->
<section class="py-24 px-6 bg-muted/30">
	<div class="max-w-6xl mx-auto">
		<div class="grid lg:grid-cols-2 gap-12 items-center">
			<div>
				<Badge variant="outline" class="mb-4">Dual Control Modes</Badge>
				<h2 class="text-3xl sm:text-4xl font-bold tracking-tight mb-6">
					Native and software brightness, working together
				</h2>
				<p class="text-lg text-muted-foreground mb-8">
					Nitshift intelligently combines DDC-CI hardware control with software overlay dimming,
					giving you the best of both worlds across all your displays.
				</p>

				<div class="space-y-4">
					<div class="flex items-start gap-4">
						<div class="size-10 rounded-lg bg-[#5eead4]/20 flex items-center justify-center shrink-0">
							<Sun class="size-5 text-[#5eead4]" />
						</div>
						<div>
							<h4 class="font-semibold mb-1">Native Mode (DDC-CI)</h4>
							<p class="text-muted-foreground text-sm">Direct hardware control for zero-latency adjustments and true backlight dimming.</p>
						</div>
					</div>

					<div class="flex items-start gap-4">
						<div class="size-10 rounded-lg bg-[#d688ff]/20 flex items-center justify-center shrink-0">
							<Moon class="size-5 text-[#d688ff]" />
						</div>
						<div>
							<h4 class="font-semibold mb-1">Software Mode</h4>
							<p class="text-muted-foreground text-sm">Overlay-based dimming that works on any display, including laptops and older monitors.</p>
						</div>
					</div>

					<div class="flex items-start gap-4">
						<div class="size-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
							<Layers class="size-5 text-primary" />
						</div>
						<div>
							<h4 class="font-semibold mb-1">Mix & Match</h4>
							<p class="text-muted-foreground text-sm">Use different modes across different displays based on what each monitor supports.</p>
						</div>
					</div>
				</div>
			</div>

			<div class="relative">
				<div class="aspect-video rounded-2xl bg-gradient-to-br from-[#5eead4]/10 via-background to-[#d688ff]/10 border border-border flex items-center justify-center">
					<div class="text-center p-8">
						<div class="flex items-center justify-center gap-4 mb-6">
							<div class="size-20 rounded-xl bg-gradient-to-br from-[#5eead4] to-[#5eead4]/50 flex items-center justify-center">
								<Monitor class="size-10 text-foreground" />
							</div>
							<div class="size-20 rounded-xl bg-gradient-to-br from-[#a78bfa] to-[#a78bfa]/50 flex items-center justify-center">
								<Monitor class="size-10 text-foreground" />
							</div>
							<div class="size-20 rounded-xl bg-gradient-to-br from-[#d688ff] to-[#d688ff]/50 flex items-center justify-center">
								<Monitor class="size-10 text-foreground" />
							</div>
						</div>
						<p class="text-sm text-muted-foreground">Control all your monitors from one interface</p>
					</div>
				</div>
			</div>
		</div>
	</div>
</section>

<!-- FAQ Section -->
<section class="py-24 px-6">
	<div class="max-w-3xl mx-auto">
		<div class="text-center mb-16">
			<Badge variant="outline" class="mb-4">FAQ</Badge>
			<h2 class="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
				Frequently asked questions
			</h2>
			<p class="text-lg text-muted-foreground">
				Everything you need to know about Nitshift.
			</p>
		</div>

		<Accordion.Root type="single" collapsible class="w-full">
			{#each faqs as faq, i}
				<Accordion.Item value="item-{i}" class="border-b border-border">
					<Accordion.Trigger class="flex w-full items-center justify-between py-4 text-left font-medium hover:underline">
						{faq.question}
					</Accordion.Trigger>
					<Accordion.Content class="pb-4 text-muted-foreground">
						{faq.answer}
					</Accordion.Content>
				</Accordion.Item>
			{/each}
		</Accordion.Root>
	</div>
</section>

<!-- CTA Section -->
<section class="py-24 px-6 bg-gradient-to-br from-[#5eead4]/10 via-background to-[#d688ff]/10">
	<div class="max-w-4xl mx-auto text-center">
		<h2 class="text-3xl sm:text-4xl font-bold tracking-tight mb-6">
			Ready to take control?
		</h2>
		<p class="text-lg text-muted-foreground max-w-2xl mx-auto mb-10">
			Download Nitshift now and experience the best multi-monitor brightness management for Windows.
			Free, open source, and always improving.
		</p>

		<div class="flex flex-col sm:flex-row items-center justify-center gap-4">
			<Button size="lg" href="https://github.com/carlelieser/nitshift/releases" target="_blank" rel="noopener noreferrer">
				<Download class="size-4" />
				Download for Windows
			</Button>
			<Button variant="outline" size="lg" href="https://github.com/carlelieser/nitshift" target="_blank" rel="noopener noreferrer">
				<Github class="size-4" />
				View on GitHub
			</Button>
		</div>
	</div>
</section>

<!-- Footer -->
<footer class="py-12 px-6 border-t border-border">
	<div class="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
		<div class="flex items-center gap-2">
			<Logo />
			<span class="text-muted-foreground text-sm">Multi-Monitor Brightness Control</span>
		</div>

		<div class="flex items-center gap-6 text-sm text-muted-foreground">
			<a href="https://github.com/carlelieser/nitshift" target="_blank" rel="noopener noreferrer" class="hover:text-foreground transition-colors">
				GitHub
			</a>
			<a href="https://github.com/carlelieser/nitshift/releases" target="_blank" rel="noopener noreferrer" class="hover:text-foreground transition-colors">
				Releases
			</a>
			<a href="https://github.com/carlelieser/nitshift/issues" target="_blank" rel="noopener noreferrer" class="hover:text-foreground transition-colors">
				Report Issue
			</a>
		</div>

		<p class="text-sm text-muted-foreground">
			MIT License
		</p>
	</div>
</footer>
