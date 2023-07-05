import plugin from "tailwindcss/plugin.js";

/** @type {import("tailwindcss").Config} */
export default {
	content: ["./src/**/*.{html,js,svelte,ts}"],
	theme: {
		fontFamily: {
			sans: ['"roboto"', "sans-serif"],
			display: ['"sofia-pro"', "sans-serif"]
		},

		extend: {
			textShadow: {
				sm: "0 1px 2px var(--tw-shadow-color)",
				DEFAULT: "0 2px 4px var(--tw-shadow-color)",
				lg: "0 8px 16px var(--tw-shadow-color)",
				xl: "0 8px 24px var(--tw-shadow-color)",
				"2xl": "0 8px 36px var(--tw-shadow-color)",
				"4xl": "0 8px 64px var(--tw-shadow-color)"
			}
		}
	},
	plugins: [
		plugin(function ({ matchUtilities, theme }) {
			matchUtilities(
				{
					"text-shadow": (value) => ({
						textShadow: value
					})
				},
				{ values: theme("textShadow") }
			);
		})
	]
};
