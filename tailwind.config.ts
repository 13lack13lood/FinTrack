import type { Config } from "tailwindcss";

const config: Config = {
	content: [
		"./pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./components/**/*.{js,ts,jsx,tsx,mdx}",
		"./app/**/*.{js,ts,jsx,tsx,mdx}",
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
			},
		},
	},
	plugins: [],
};
export default config;
