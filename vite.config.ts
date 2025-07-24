import * as fs from "node:fs";
import tailwindcss from "@tailwindcss/vite";
import { tanstackRouter } from "@tanstack/router-plugin/vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { defineConfig } from "vite";

// https://vite.dev/config/
export default defineConfig({
	plugins: [
		tanstackRouter({
			target: "react",
			autoCodeSplitting: true,
		}),
		react(),
		tailwindcss(),
		{
			name: "public-images-list",
			resolveId(id) {
				if (id === "virtual:images-list") return id;
			},
			load(id) {
				if (id === "virtual:images-list") {
					const dir = path.resolve(__dirname, "public/images");
					const files = fs
						.readdirSync(dir)
						.filter((f) => /\.(jpe?g|png|webp|avif)$/i.test(f))
						.map((f) => `/images/${f}`);
					return `export default ${JSON.stringify(files)};`;
				}
			},
		},
	],
	resolve: {
		alias: {
			"@": path.resolve(__dirname, "./src"),
		},
	},
});
