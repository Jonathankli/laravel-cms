import { defineConfig } from "vite";
import laravel from "laravel-vite-plugin";
import react from "@vitejs/plugin-react";

export default defineConfig(async () => ({
    plugins: [
        react(),
        laravel({
            input: ["resources/js/cms.ts", "resources/js/live.ts"],
        })
    ],
}));
