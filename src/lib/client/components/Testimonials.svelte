<script>
	import happyCustomer from "$lib/client/assets/happy-customer.png?enhanced";
	import mia from "$lib/client/assets/mia.png?enhanced";
	import jordan from "$lib/client/assets/jordan.png?enhanced";
	import riley from "$lib/client/assets/riley.png?enhanced";
	import alex from "$lib/client/assets/alex.png?enhanced";
	import Testimonial from "./Testimonial.svelte";
	import SplitScreen from "./layouts/SplitScreen.svelte";
</script>

<div class="w-full bg-white">
	<div class="section py-36">
		<SplitScreen>
			<div slot="left">
				<enhanced:img class="object-contain" loading="lazy" src={happyCustomer} />
			</div>
			<div class="space-y-4 md:space-y-8" slot="right">
				<div class="gap-2">
					<span class="text-base/7 font-semibold text-teal-600 font-display">
						Testimonials
					</span>
					<h2 class="text-6xl font-bold font-display text-teal-900">
						See What Our Customers Have to Say
					</h2>
				</div>
				<div class="grid grid-cols-1 xl:grid-cols-2 grid-rows-2 gap-10 gap-y-16 pt-12">
					<Testimonial
						avatar={mia}
						message="Before Glimmr, adjusting my display's brightness was a daily hassle, especially when dealing with the tiny buttons on the back of my screen. Now, I can easily manage everything from my desktop. It's not just convenient; it's a relief."
						name="Mia T."
						title="Digital Marketing Manager"
					/>
					<Testimonial
						avatar={jordan}
						message="The custom schedules feature in Glimmr has been a game-changer for me. I love how my screen automatically dims as the sun sets, making those long writing sessions less of a strain on my eyes. It's such a smart, user-friendly tool."
						name="Jordan M."
						title="Aspiring Writer"
					/>
					<Testimonial
						avatar={riley}
						message="I'm all about aesthetics, and Glimmr is not only a lifesaver for managing my dual displays but it's also beautifully designed. It fits perfectly into my workflow and my desktop setup. Finally, an app that gets it right."
						name="Riley S."
						title="Graphic Designer"
					/>
					<Testimonial
						avatar={alex}
						message="Dealing with multiple displays used to mean constantly fiddling with settings to get a uniform look. With Glimmr, it's a one-time setup, and everything is synchronized perfectly. It's such a simple solution to what was an ongoing frustration."
						name="Alex D."
						title="IT Professional"
					/>
				</div>
			</div>
		</SplitScreen>
	</div>
</div>
