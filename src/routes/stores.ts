import { writable } from "svelte/store";

export const release = writable<object>(null);
export const userCount = writable(0);
export const loading = writable(true);
