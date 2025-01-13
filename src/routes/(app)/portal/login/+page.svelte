<script>
	import Logo from "$lib/client/components/Logo.svelte";
	import Button from "$lib/client/components/Button.svelte";
	import { goto } from "$app/navigation";

	let email = $state("");
	let password = $state("");
	let loading = $state(false);
	let error = $state("");

	$effect(() => {
		if (email || password) {
			error = "";
		}
	});

	const handleLogin = async () => {
		loading = true;

		try {
			const response = await fetch("/api/portal/auth/login", {
				method: "POST",
				headers: {
					"Content-Type": "application/json"
				},
				body: JSON.stringify({
					email,
					password
				})
			});

			if (response.ok) {
				goto("/portal");
			} else {
				const result = await response.json();
				console.log(result);
				error = result.message;
			}
		} catch (err) {
			console.log(err);
			error = "An error occurred";
		}

		loading = false;
	};
</script>

<div class="w-full h-full bg-zinc-100">
	<div
		class="grid grid-cols-6 container mx-auto border-l-2 border-dashed border-zinc-200/50 h-full"
	>
		<div class="col-span-1 px-4 py-12">
			<Logo />
		</div>
		<div class="col-span-4 h-full">
			<div
				class="h-full mx-auto border-l-2 border-r-2 border-zinc-200/50 border-dashed flex items-center justify-center"
			>
				<div
					class="bg-white p-12 rounded-lg shadow-md border row-span-4 w-full max-w-md mx-auto flex flex-col justify-center"
				>
					<h1 class="text-2xl font-bold text-left mb-4 text-zinc-900">
						Sign in to your account
					</h1>
					<div class="mt-2 flex flex-col gap-4">
						<div>
							<label class="block text-sm font-medium text-gray-700" for="email"
								>Email</label
							>
							<input
								bind:value={email}
								class="mt-1 block w-full p-3 border border-gray-200 rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500 text-sm"
								id="email"
								name="email"
								type="email"
							/>
						</div>
						<div>
							<label class="block text-sm font-medium text-gray-700" for="password"
								>License</label
							>
							<input
								bind:value={password}
								class="mt-1 block w-full p-3 border border-gray-200 rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500 text-sm"
								id="password"
								name="password"
								type="password"
							/>
						</div>
						{#if error}
							<div class="bg-red-50 rounded-lg p-3">
								<div class="text-red-500 text-sm font-medium">{error}</div>
							</div>
						{/if}
						<div class="mt-4">
							<Button
								class="rounded-md items-center shadow-sm border border-transparent hover:border-gray-100 hover:shadow-sm"
								endIcon="mdi:login"
								label="Login"
								on:click={handleLogin}
							></Button>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="col-span-1"></div>
	</div>
</div>
