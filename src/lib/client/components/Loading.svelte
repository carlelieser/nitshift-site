<script lang="ts">
	import { loading } from "$lib/client/stores";
</script>

<div
	class="w-full h-full fixed top-0 left-0 bg-gray-950 flex items-center justify-center transition-all duration-300 {$loading
		? 'opacity-100'
		: 'opacity-0 pointer-events-none'} z-50"
>
	<span class="loader" />
</div>

<style>
	.loader {
		width: 48px;
		height: 48px;
		border: 2px solid #fff;
		border-radius: 50%;
		display: inline-block;
		position: relative;
		box-sizing: border-box;
		animation: rotation 1s linear infinite;
	}
	.loader::after,
	.loader::before {
		content: "";
		box-sizing: border-box;
		position: absolute;
		left: 0;
		top: 0;
		background: #28da7a;
		width: 6px;
		height: 6px;
		transform: translate(150%, 150%);
		border-radius: 50%;
	}
	.loader::before {
		left: auto;
		top: auto;
		right: 0;
		bottom: 0;
		transform: translate(-150%, -150%);
	}

	@keyframes rotation {
		0% {
			transform: rotate(0deg);
		}
		100% {
			transform: rotate(360deg);
		}
	}
</style>
