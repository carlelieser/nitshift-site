// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			secret?: string | null;
			user?: {
				id: string;
				email: string;
				license: string;
				trialAvailability: boolean;
				trialStartDate: number | null;
			};
		}

		interface PageData {
			userCount: number;
		}
		// interface Platform {}
	}
}

export {};
