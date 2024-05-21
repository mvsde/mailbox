import globals from "globals";
import js from "@eslint/js";

export default [
	// Global ignored files
	{
		ignores: ["coverage", "dist", "test/create"],
	},

	// Global settings
	{
		files: ["**/*.{js,mjs}"],
		languageOptions: {
			globals: {
				...globals.node,
			},
		},
		rules: {
			...js.configs.recommended.rules,
		},
	},
];
