// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		interface PageData {
			metadata: object;
			userCount: number;
		}
		// interface Platform {}
	}
}

export {};
