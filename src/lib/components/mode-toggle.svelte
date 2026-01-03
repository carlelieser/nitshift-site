<script>
	import {DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem} from "$lib/components/ui/dropdown-menu";
	import { resetMode, setMode } from "mode-watcher";
	import {SunIcon, MoonIcon} from "@lucide/svelte";
</script>

<DropdownMenu>
	<DropdownMenuTrigger class={buttonVariants({ variant: "ghost", size: "icon" })}>
		<SunIcon class="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
		<MoonIcon class="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
		<span class="sr-only">Toggle theme</span>
	</DropdownMenuTrigger>
	<DropdownMenuContent align="end">
		<DropdownMenuItem onclick={() => setMode("light")}>Light</DropdownMenuItem>
		<DropdownMenuItem onclick={() => setMode("dark")}>Dark</DropdownMenuItem>
		<DropdownMenuItem onclick={() => resetMode()}>System</DropdownMenuItem>
	</DropdownMenuContent>
</DropdownMenu>