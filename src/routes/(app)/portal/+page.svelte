<script lang="ts">
	import Logo from "$lib/client/components/Logo.svelte";
	import Menu from "@smui/menu";
	import { Anchor } from "@smui/menu-surface";
	import List, { Graphic, Item, PrimaryText, SecondaryText, Separator, Text } from "@smui/list";
	import IconButton from "@smui/icon-button";
	import Button, { Icon, Label } from "@smui/button";
	import { goto } from "$app/navigation";
	import { default as dayjs } from "dayjs";
	import CircularProgress from "@smui/circular-progress";
	import Snackbar from "@smui/snackbar";
	import Chip, { Set, TrailingAction } from "@smui/chips";
	import Dialog, { Actions, Content, Title } from "@smui/dialog";

	let { data } = $props();

	let menu: Menu | undefined = $state();
	let snackbar: Snackbar | undefined = $state();
	let anchor: HTMLDivElement | undefined = $state();
	let anchorClasses: { [k: string]: boolean } = $state({});
	let message = $state("");
	let installer = $state(data.installer);
	let devices = $state(data.devices);

	let licenseKeyVisible = $state(false);

	const openMenu = () => menu?.setOpen(true);
	const toggleLicenseKeyVisibility = () => (licenseKeyVisible = !licenseKeyVisible);

	const copyLicenseKeyToClipboard = () => {
		if (data.license?.code) {
			navigator.clipboard
				.writeText(data.license.code)
				.then(() => {
					console.log("License key copied to clipboard");
					message = "License key copied to clipboard";
					snackbar?.open();
				})
				.catch((err) => {
					message = "Failed to copy license key to clipboard";
				});
		}
	};

	const handleLogout = async () => {
		await fetch("/api/portal/auth/logout");
		await goto("/portal/login");
	};

	const generateInstaller = async () => {
		await fetch("/api/portal/installer/generate");
		message = "This should take about 10 minutes or less. Feel free to come back later.";
		snackbar?.open();
		goto("/portal", {
			replaceState: true,
			invalidateAll: true
		});
	};

	const downloadInstaller = async () => {
		goto("/api/portal/installer/download");
	};

	let deviceAddDialogOpen = $state(false);
	let newDeviceId = $state("");

	const deviceAddDialogCloseHandler = async (e: CustomEvent<{ action: string }>) => {
		switch (e.detail.action) {
			case "confirm":
				const response = await fetch("/api/portal/devices", {
					method: "POST",
					headers: {
						"Content-Type": "application/json"
					},
					body: JSON.stringify({
						id: newDeviceId
					})
				});
				if (response.ok) {
					goto("/portal", {
						replaceState: true,
						invalidateAll: true
					});
				} else {
					message = "Failed to add device";
					snackbar?.open();
				}
				break;
			case "cancel":
				deviceAddDialogOpen = false;
				break;
		}
	};

	const openAddDeviceDialog = () => {
		deviceAddDialogOpen = true;
	};

	$effect(() => {
		if (installer?.error) {
			message = "Error occurred during installer creation";
			snackbar?.open();
		}
	});

	$effect(() => {
		if (installer?.status === "pending") {
			const source = new EventSource("/api/portal/installer/progress/listen");

			source.addEventListener("update", (event) => {
				try {
					installer = JSON.parse(event.data);
				} catch (err) {
					source.close();
					console.error("Failed to parse SSE update event data.", err);
				}
			});

			source.addEventListener("error", (event) => {
				console.error("SSE encountered an error:", event);
			});
		}
	});
</script>

{#snippet navbar()}
	<div class="flex items-center justify-between">
		<Logo />
		<div
			class={Object.keys(anchorClasses).join(" ")}
			use:Anchor={{
				addClass: (className) => {
					if (!anchorClasses[className]) {
						anchorClasses[className] = true;
					}
				},
				removeClass: (className) => {
					if (anchorClasses[className]) {
						delete anchorClasses[className];
					}
				}
			}}
			bind:this={anchor}
		>
			<IconButton onclick={openMenu}>
				<Label class="text-[1rem] font-bold opacity-70"
					>{data.user.email.substring(0, 2).toUpperCase()}</Label
				>
			</IconButton>
			<Menu
				bind:this={menu}
				anchor={false}
				anchorElement={anchor}
				anchorCorner="BOTTOM_LEFT"
				class="mt-2"
			>
				<List>
					<Item class="pointer-events-none">
						<Text>
							<PrimaryText>{data.user.email}</PrimaryText>
							<SecondaryText class="uppercase">{data.user.license}</SecondaryText>
						</Text>
					</Item>
					<Separator />
					<Item onSMUIAction={handleLogout}>
						<Graphic class="material-symbols-outlined">logout</Graphic>
						<Text>Sign out</Text>
					</Item>
				</List>
			</Menu>
		</div>
	</div>
{/snippet}

{#snippet renderGenerateButton()}
	<Button color={"primary"} onclick={generateInstaller} class="gap-2">
		<Icon class="material-symbols-outlined">rocket</Icon>
		<Label>Generate installer</Label>
	</Button>
{/snippet}

{#snippet license()}
	<div class="bg-white rounded-lg border shadow-md p-6 flex flex-col gap-4">
		<div
			class="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center flex-wrap"
		>
			<div class="flex items-center gap-6">
				<div
					class="w-10 h-10 rounded-full bg-teal-50 text-teal-600 flex items-center justify-center"
				>
					<i class="material-symbols-outlined opacity-70">key</i>
				</div>
				<div>
					<div class="text-2xl font-display">Your License</div>
					<div class="opacity-70">
						Issued on {dayjs(data.license?.issuedOn).format("MM/DD/YYYY")}
					</div>
				</div>
			</div>
			<div
				class="bg-white border rounded-lg flex items-center gap-4 px-4 py-2 w-full lg:w-auto"
			>
				<div class="min-w-0 shrink flex-1">
					<div class="text-xs uppercase opacity-60">Key</div>
					<div class="text-lg opacity-70 font-[monospace] font-bold">
						{#if licenseKeyVisible}
							<div>
								{data.license?.code}
							</div>
						{:else}
							<div class="truncate w-full">XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX</div>
						{/if}
					</div>
				</div>
				<div class="flex flex-row gap-2 opacity-70">
					<IconButton
						class="material-symbols-outlined"
						onclick={copyLicenseKeyToClipboard}
						>content_copy
					</IconButton>
					<IconButton
						class="material-symbols-outlined"
						onclick={toggleLicenseKeyVisibility}
					>
						{#if licenseKeyVisible}
							visibility_off
						{:else}
							visibility
						{/if}
					</IconButton>
				</div>
			</div>
		</div>
	</div>
{/snippet}

{#snippet renderDevices()}
	<Dialog
		bind:open={deviceAddDialogOpen}
		aria-labelledby="event-title"
		aria-describedby="event-content"
		onSMUIDialogClosed={deviceAddDialogCloseHandler}
	>
		<Title>Add device</Title>
		<Content>
			<div class="flex flex-col gap-4">
				Copy and paste your device ID below. Your device ID is the same as your Support ID.
				<input
					bind:value={newDeviceId}
					type="text"
					name="device-id"
					class="block w-full p-3 border border-gray-200 rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500 text-sm"
					placeholder="Device ID"
				/>
			</div>
		</Content>
		<Actions>
			<Button action="cancel" color="secondary">
				<Label>Cancel</Label>
			</Button>
			<Button action="confirm" defaultAction>
				<Label>Add</Label>
			</Button>
		</Actions>
	</Dialog>

	<div class="flex justify-between flex-col gap-4 p-6 bg-white border rounded-lg shadow-md">
		<div class="flex items-center gap-6">
			<div
				class="w-10 h-10 rounded-full bg-teal-50 text-teal-600 flex items-center justify-center"
			>
				<i class="material-symbols-outlined opacity-70">devices</i>
			</div>
			<div>
				<div class="text-2xl font-display">Your devices</div>
				<div class="opacity-70">Add or remove devices</div>
			</div>
			<div class="ml-auto">
				<IconButton class="material-symbols-outlined" onclick={openAddDeviceDialog}
					>add</IconButton
				>
			</div>
		</div>
		<Set bind:chips={devices} input>
			{#snippet chip(chip)}
				{@const deleteDevice = async () => {
					if (devices?.length === 1) {
						message = "You must have at least one device";
						snackbar?.open();
						return;
					}
					await fetch(`/api/portal/devices/${chip}`, {
						method: "DELETE"
					});
					goto("/portal", {
						replaceState: true,
						invalidateAll: true
					});
				}}
				<Chip {chip} shouldRemoveOnTrailingIconClick={false} class="truncate max-w-48">
					<Text tabindex={0}>{chip}</Text>
					<TrailingAction icon$class="material-symbols-outlined" onclick={deleteDevice}
						>cancel
					</TrailingAction>
				</Chip>
			{/snippet}
		</Set>
	</div>
{/snippet}

{#snippet renderInstaller()}
	<div
		class="flex justify-between flex-col md:flex-row md:items-center gap-4 p-6 bg-white border rounded-lg shadow-md"
	>
		<div class="flex items-center gap-6">
			<div
				class="w-10 h-10 rounded-full bg-teal-50 text-teal-600 flex items-center justify-center"
			>
				<i class="material-symbols-outlined opacity-70">download</i>
			</div>
			<div>
				<div class="text-2xl font-display">Glimmr Installer</div>
				<div class="opacity-70">With your license pre-installed</div>
			</div>
		</div>
		<div class="flex items-center justify-center gap-4">
			{#if installer?.status === "error"}
				{@render renderGenerateButton()}
			{:else}
				<Button
					disabled={installer?.status === "pending"}
					color={installer?.status === "complete" ? "secondary" : "primary"}
					onclick={generateInstaller}
					class="gap-2"
				>
					{#if installer?.status === "pending"}
						<CircularProgress class="w-4 h-4" indeterminate />
						<Label>Generating Installer (Step {installer?.progress ?? 1})</Label>
					{:else if installer?.status === "complete"}
						<Icon class="material-symbols-outlined">refresh</Icon>
						<Label>Regenerate</Label>
					{:else}
						<Icon class="material-symbols-outlined">rocket</Icon>
						<Label>Generate installer</Label>
					{/if}
				</Button>
				{#if installer?.status === "complete"}
					<Button onclick={downloadInstaller}>
						<Icon class="material-symbols-outlined">download</Icon>
						<Label>Download</Label>
					</Button>
				{/if}
			{/if}
		</div>
	</div>
{/snippet}

<Snackbar bind:this={snackbar}>
	<Label>{message}</Label>
</Snackbar>

<div class="container max-w-screen-lg mx-auto p-12 flex flex-col gap-8 z-0">
	{@render navbar()}
	{@render license()}
	{@render renderDevices()}
	{@render renderInstaller()}
</div>
