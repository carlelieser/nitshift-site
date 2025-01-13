<script lang="ts">
	import Logo from "$lib/client/components/Logo.svelte";
	import Menu from "@smui/menu";
	import { Anchor } from "@smui/menu-surface";
	import List, { Graphic, Item, PrimaryText, SecondaryText, Separator, Text } from "@smui/list";
	import IconButton from "@smui/icon-button";
	import Button, { Icon, Label } from "@smui/button";
	import { goto, invalidateAll } from "$app/navigation";
	import dayjs from "dayjs";
	import CircularProgress from "@smui/circular-progress";
	import Snackbar from "@smui/snackbar";
	import Chip, { TrailingAction } from "@smui/chips";
	import Dialog, { Actions, Content, Title } from "@smui/dialog";
	import { onMount, type Snippet } from "svelte";

	let props = $props();

	let menu: Menu | undefined = $state();
	let snackbar: Snackbar | undefined = $state();
	let anchor: HTMLDivElement | undefined = $state();
	let anchorClasses: { [k: string]: boolean } = $state({});
	let message = $state("");
	let preppingInstaller = $state(false);
	let loadingDevices = $state(false);
	let installerProgressSource = $state(null);

	let licenseKeyVisible = $state(false);

	const openMenu = () => menu?.setOpen(true);
	const toggleLicenseKeyVisibility = () => (licenseKeyVisible = !licenseKeyVisible);

	const copyLicenseKeyToClipboard = () => {
		if (props.data.license?.code) {
			navigator.clipboard
				.writeText(props.data.license.code)
				.then(() => {
					console.log("License key copied to clipboard");
					message = "License key copied to clipboard";
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

	const buildInstaller = async () => {
		preppingInstaller = true;
		message = "Prepping installer...";
		const response = await fetch("/api/portal/installer/build");
		const { data } = await response.json();
		message = "This should take about 10 minutes. Feel free to come back later.";
		props.data.installer = data;
		preppingInstaller = false;
		await invalidateAll();
		listenForInstallerUpdates();
	};

	const cancelInstallerBuild = async () => {
		const response = await fetch("/api/portal/installer/cancel");
		installerProgressSource?.close();
		props.data.installer.status = "error";
		await invalidateAll();
		if (response.ok) {
			message = "Installer cancelled";
		} else {
			message = "Failed to cancel installer";
		}
	};

	const downloadInstaller = async () => {
		goto("/api/portal/installer/download");
	};

	let deviceAddDialogOpen = $state(false);
	let newDeviceId = $state("");

	const addDevice = async () => {
		loadingDevices = true;
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
			await invalidateAll();
			message = "New device added";
		} else {
			message = "Failed to add device";
		}
		loadingDevices = false;
	};

	const deviceAddDialogCloseHandler = (e: CustomEvent<{ action: string }>) => {
		switch (e.detail.action) {
			case "confirm":
				addDevice();
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
		if (message) {
			snackbar.close();
			snackbar?.open();
		} else {
			snackbar?.close();
		}
	});

	$effect(() => {
		if (props.data.installer?.error) {
			message = "Error occurred during installer creation";
		}
	});

	const listenForInstallerUpdates = () => {
		installerProgressSource = new EventSource("/api/portal/installer/progress/listen");

		installerProgressSource.addEventListener("update", (event) => {
			try {
				invalidateAll();
			} catch (err) {
				console.error("Failed to parse SSE update event props.data.", err);
			}
		});

		installerProgressSource.addEventListener("error", (event) => {
			console.error("SSE encountered an error:", event);
		});
	};

	onMount(() => {
		listenForInstallerUpdates();
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
				>{props.data.user.email.substring(0, 2).toUpperCase()}</Label
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
							<PrimaryText>{props.data.user.email}</PrimaryText>
							<SecondaryText class="uppercase">{props.data.user.license}</SecondaryText>
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

{#snippet dashboardInfo(icon: string, title: string, description: string, loading: boolean, children: Snippet)}
	<div class="bg-white rounded-lg border shadow-md p-6 flex flex-col gap-4 {loading ? 'animate-pulse' : ''}">
		<div
			class="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center flex-wrap"
		>
			<div class="flex items-center gap-6">
				<div
					class="w-10 h-10 rounded-full bg-teal-50 text-teal-600 flex items-center justify-center"
				>
					<i class="material-symbols-outlined opacity-70">{icon}</i>
				</div>
				<div>
					<div class="text-2xl font-display">{title}</div>
					<div class="opacity-70">
						{description}
					</div>
				</div>
			</div>
			{@render children()}
		</div>
	</div>
{/snippet}

{#snippet buildButton()}
	<Button color={"primary"} onclick={buildInstaller} class="gap-2">
		<Icon class="material-symbols-outlined">build</Icon>
		<Label>Build installer</Label>
	</Button>
{/snippet}

{#snippet license()}
	{#snippet licenseInfo()}
		<div
			class="bg-white border rounded-lg flex items-center gap-4 px-4 py-2 w-full lg:w-auto"
		>
			<div class="min-w-0 shrink flex-1">
				<div class="text-xs uppercase opacity-60">Key</div>
				<div class="text-lg opacity-70 font-[monospace] font-bold">
					{#if licenseKeyVisible}
						<div>
							{props.data.license?.code}
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
	{/snippet}
	{@render dashboardInfo("key", "Your License", `Issued on ${dayjs(props.data.license?.issuedOn).format("MM/DD/YYYY")}`, false, licenseInfo)}
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

	{#snippet devicesInfo()}
		<div class="flex items-center flex-row gap-2 flex-wrap">
			{#if Array.isArray(props.data.devices)}
				{#each props.data.devices as device}
					{@const deleteDevice = async () => {
						if (props.data.devices?.length === 1) {
							message = "You must have at least one device";
							snackbar?.open();
							return;
						}
						loadingDevices = true;
						await fetch(`/api/portal/devices/${device}`, {
							method: "DELETE"
						});
						await invalidateAll();
						loadingDevices = false;
					}}
					<Chip chip={device} shouldRemoveOnTrailingIconClick={false} class="truncate max-w-48">
						<Text tabindex={0}>{device}</Text>
						<TrailingAction icon$class="material-symbols-outlined" onclick={deleteDevice}
						>cancel
						</TrailingAction>
					</Chip>
				{/each}
			{/if}
			<IconButton class="material-symbols-outlined" onclick={openAddDeviceDialog}>add</IconButton>
		</div>
	{/snippet}

	{@render dashboardInfo("devices", "Your devices", "Add or remove devices", loadingDevices, devicesInfo)}
{/snippet}

{#snippet renderInstaller()}
	{#snippet installerInfo()}
		<div class="flex items-center justify-center gap-4">
			{#if props.data.installer?.status === "error"}
				{@render buildButton()}
			{:else}
				{#if props.data.installer?.status === "in_progress"}
					<Button color="secondary" onclick={cancelInstallerBuild}>
						<Icon class="material-symbols-outlined">close</Icon>
						<Label>Cancel</Label>
					</Button>
				{/if}
				<Button
					disabled={props.data.installer?.status === "in_progress"}
					color={props.data.installer?.status === "completed" ? "secondary" : "primary"}
					onclick={buildInstaller}
					class="gap-2"
				>
					{#if props.data.installer?.status === "in_progress"}
						<CircularProgress class="w-4 h-4" indeterminate />
						{#if props.data.installer?.progress}
							<div class="flex flex-col items-start text-left">
								<Label>Building Installer (Step {props.data.installer?.progress})</Label>
								<Label class="opacity-70">{props.data.installer?.step}</Label>
							</div>
						{:else}
							<Label>Setting stuff up...</Label>
						{/if}

					{:else if props.data.installer?.status === "completed"}
						<Icon class="material-symbols-outlined">refresh</Icon>
						<Label>Rebuild</Label>
					{:else}
						<Icon class="material-symbols-outlined">rocket</Icon>
						<Label>Build installer</Label>
					{/if}
				</Button>
				{#if props.data.installer?.status === "completed"}
					<Button onclick={downloadInstaller}>
						<Icon class="material-symbols-outlined">download</Icon>
						<Label>Download</Label>
					</Button>
				{/if}
			{/if}
		</div>
	{/snippet}
	{@render dashboardInfo("download", "Glimmr Installer", "With license pre-installed", preppingInstaller, installerInfo)}
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
