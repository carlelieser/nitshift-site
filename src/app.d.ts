// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
	namespace App {
		import { User, License } from "$lib/common/types";
		// interface Error {}
		interface Locals {
			secret?: string | null;
			user?: User;
		}

		interface PageData {
			userCount?: number;
			user?: User;
			license?: License;
		}
		// interface Platform {}
	}
}

export {};
