<script>
	import { inview } from "svelte-inview";

	export let delay = "0s";

	let isInView = false;

	const options = {
		rootMargin: "-50px",
		unobserveOnEnter: true
	};

	const handleChange = ({ detail }) => {
		isInView = detail.inView;
	};
</script>

<div
	class={$$props.class}
	class:animate={isInView}
	class:opacity-0={true}
	on:inview_change={handleChange}
	style="--delay: {delay};"
	use:inview={options}
>
	<slot />
</div>

<style>
	@keyframes from-bottom {
		0% {
			opacity: 0;
			transform: translateY(10%);
		}
		100% {
			opacity: 1;
			transform: translateY(0);
		}
	}

	.animate {
		animation: from-bottom 0.5s cubic-bezier(0.4, 0, 0.2, 1) var(--delay) both;
	}
</style>
