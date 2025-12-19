<script>
	import HeroBanner from "$lib/client/components/HeroBanner.svelte";
	import Features from "$lib/client/components/Features.svelte";
	import FAQ from "$lib/client/components/FAQ.svelte";
	import Loading from "$lib/client/components/Loading.svelte";
	import Testimonials from "$lib/client/components/Testimonials.svelte";
	import Pricing from "$lib/client/components/Pricing.svelte";
	import { Separator } from "$lib/components/ui/separator";
</script>

<Loading />

<HeroBanner />
<Features />
<Testimonials />
<Separator />
<Pricing />
<Separator />
<FAQ />
