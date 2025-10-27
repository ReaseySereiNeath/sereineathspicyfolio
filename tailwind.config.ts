import type { Config } from "tailwindcss";
import plugin from "tailwindcss/plugin";

const config: Config = {
	content: [
		"./pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./components/**/*.{js,ts,jsx,tsx,mdx}",
		"./app/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		extend: {
			colors: {
				background: "rgb(var(--background) / <alpha-value>)",
				foreground: "rgb(var(--foreground) / <alpha-value>)",
				primary: {
					DEFAULT: "rgb(var(--primary) / <alpha-value>)",
					foreground: "rgb(var(--primary-foreground) / <alpha-value>)",
				},
				border: "rgb(var(--border) / 0.1)",
				ring: "rgb(var(--ring) / <alpha-value>)",
			},
			borderRadius: {
				lg: "var(--radius)",
				md: "calc(var(--radius) - 2px)",
				sm: "calc(var(--radius) - 4px)",
				"4xl": "2rem",
			},
		},
	},
	plugins: [
		require("tailwindcss-animate"),
		plugin(function ({ addUtilities }) {
			// Utility classes for glow effects (used in Hero component)
			addUtilities({
				".glow-blue": {
					"@apply bg-gradient-to-r from-blue-500/30 via-blue-500/20 to-transparent":
						{},
				},
				".glow-blue-light": {
					"@apply bg-gradient-to-r from-blue-500/20 via-blue-500/10 to-transparent":
						{},
				},
				".bg-gradient-blue-light": {
					"@apply bg-gradient-to-r from-blue-400 to-blue-600": {},
				},
			});
		}),
	],
};

export default config;
