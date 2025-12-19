import { defineConfig } from 'vitest/config';
import { resolve } from 'path';

export default defineConfig({
	test: {
		globals: true,
		environment: 'happy-dom',
		setupFiles: ['./tests/setup.ts'],
		include: ['tests/**/*.{test,spec}.ts'],
		coverage: {
			provider: 'v8',
			reporter: ['text', 'json', 'html'],
			exclude: ['node_modules/', 'tests/']
		}
	},
	resolve: {
		alias: {
			'$lib': resolve(__dirname, './src/lib'),
			'$env/static/private': resolve(__dirname, './tests/mocks/env.ts'),
			'$env/static/public': resolve(__dirname, './tests/mocks/env.ts')
		}
	}
});
