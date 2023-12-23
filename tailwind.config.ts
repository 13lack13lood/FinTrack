import type { Config } from "tailwindcss";

const config: Config = {
	content: [
		"./pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/components/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/app/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		extend: {
			colors: {
				bgcolor: {
					DEFAULT: "#121212",
					primary: "#1d1d1d",
					secondary: "#2b2b2b",
					gradient: "#323232",
				},
				accent: {
					blue: "#40c9ff",
					DEFAULT: "#BB86FC",
				},
				gain: {
					s: "#4E9666",
					m: "#2A8147",
					l: "#137333",
				},
				loss: {
					s: "#C66666",
					m: "#BC4B4B",
					l: "#B12D2D",
				},
			},
			dropShadow: {
				bg: "6px 10px 10px #000000FF",
				"bg-light": "6px 10px 10px #00000088",
			},
			transitionProperty: {
				width: "width",
			},
		},
	},
	plugins: [],
};
export default config;
