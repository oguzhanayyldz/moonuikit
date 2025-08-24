import { defineConfig } from "tsup";
import { glob } from "glob";
import { execSync } from "child_process";

export default defineConfig([
    // Regular builds (CJS, ESM)
    {
        entry: ["src/index.tsx", ...glob.sync("src/components/ui/*.tsx")],
        format: ["cjs", "esm"],
        splitting: true,
        sourcemap: true,
        clean: true,
        treeshake: true,
        external: ["react", "react-dom", "tailwindcss", "next", "next/link", "next/image", "next/navigation"],
        banner: {
            js: '"use client";\n/** @license MoonUI v1.0.0 - MIT License - https://moonui.dev */',
        },
        esbuildOptions(options) {
            options.jsx = "automatic";
        },
        // CSS injection for auto-import
        injectStyle: true,
        // DTS temporarily disabled due to type conflicts
        dts: true,
        async onSuccess() {
            // Add 'use client' directive after build in watch mode
            console.log("Running post-build script...");
            execSync("node scripts/postbuild.js", { stdio: "inherit" });
        },
    },
    // CDN Build (IIFE for browser usage)
    {
        entry: ["src/index.tsx"],
        format: ["iife"],
        name: "MoonUI",
        platform: "browser",
        globalName: "MoonUI",
        outDir: "dist",
        sourcemap: true,
        minify: true,
        external: [],
        noExternal: [/.*/], // Bundle everything for CDN
        banner: {
            js: '/** @license MoonUI v1.0.0 - MIT License - https://moonui.dev */',
        },
        esbuildOptions(options) {
            options.jsx = "automatic";
            options.define = {
                "process.env.NODE_ENV": '"production"',
            };
        },
        // Inject React and ReactDOM from CDN
        footer: {
            js: `
if (typeof window !== 'undefined' && !window.React) {
    console.warn('MoonUI: React not found. Please include React and ReactDOM before MoonUI.');
}`,
        },
        outExtension: () => ({
            js: '.global.js',
        }),
    },
]);
