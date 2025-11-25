import path from "node:path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
	base: "/ab-line-chart/",
	plugins: [react()],
	resolve: {
		alias: {
			"@app": path.resolve(__dirname, "./src/app"),
			"@dashboard": path.resolve(__dirname, "./src/dashboard"),
			"@shared": path.resolve(__dirname, "./src/shared"),
		},
	},
});
