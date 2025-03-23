import {defineConfig} from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import svgr from "vite-plugin-svgr";
import path from "path";

export default defineConfig({
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "src"),
        },
    },
    plugins: [react(), svgr(), tsconfigPaths()],
    base: "/Word-Quest---react-ts-scss--xlsx/",
    build: {
        outDir: "dist",
        emptyOutDir: true,
    },
    server: {
        port: 7173,
        open: true,
    },
});
