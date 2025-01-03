import { writable } from "svelte/store";

export const userCount = writable(0);
export const loading = writable(true);
