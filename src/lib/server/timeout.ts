// src/lib/server/timeout.ts

/**
 * Wraps a promise with a timeout using AbortController.
 *
 * @template T - The type of the promise result
 * @param promise - The promise to wrap with timeout
 * @param timeoutMs - Timeout duration in milliseconds
 * @param onTimeout - Optional callback to execute when timeout occurs
 * @returns Promise that resolves with the original promise's value or rejects on timeout
 * @throws {Error} Throws error with 'timeout' in message when timeout occurs
 *
 * @example
 * ```typescript
 * try {
 *   const result = await withTimeout(
 *     fetch('https://api.example.com'),
 *     5000,
 *     () => console.log('Request timed out')
 *   );
 * } catch (err) {
 *   // Handle timeout error
 * }
 * ```
 */
export async function withTimeout<T>(
	promise: Promise<T>,
	timeoutMs: number,
	onTimeout?: () => void
): Promise<T> {
	const controller = new AbortController();
	const timeout = setTimeout(() => {
		controller.abort();
		onTimeout?.();
	}, timeoutMs);

	try {
		const result = await promise;
		clearTimeout(timeout);
		return result;
	} catch (err: any) {
		clearTimeout(timeout);
		if (err.name === 'AbortError') {
			throw new Error('Request timeout');
		}
		throw err;
	}
}

/**
 * Wraps a fetch request with timeout using AbortController signal.
 *
 * @param url - URL to fetch
 * @param options - Fetch options
 * @param timeoutMs - Timeout duration in milliseconds
 * @returns Promise that resolves with fetch response or rejects on timeout
 * @throws {Error} Throws error with 'timeout' in message when timeout occurs
 *
 * @example
 * ```typescript
 * const response = await fetchWithTimeout(
 *   'https://api.example.com/data',
 *   { method: 'POST', body: JSON.stringify(data) },
 *   10000
 * );
 * ```
 */
export async function fetchWithTimeout(
	url: string,
	options: RequestInit = {},
	timeoutMs: number
): Promise<Response> {
	const controller = new AbortController();
	const timeout = setTimeout(() => controller.abort(), timeoutMs);

	try {
		const response = await fetch(url, {
			...options,
			signal: controller.signal
		});
		clearTimeout(timeout);
		return response;
	} catch (err: any) {
		clearTimeout(timeout);
		if (err.name === 'AbortError') {
			throw new Error('Request timeout');
		}
		throw err;
	}
}
