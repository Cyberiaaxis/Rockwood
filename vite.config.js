import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import laravel from "laravel-vite-plugin"
import fs from 'fs/promises';

function viteBasicSslPlugin() {
    return {
        name: 'vite:basic-ssl',
        async configResolved(config) {

            const certificate = fs.readFile('./ssl/server.crt');
            const certificateKey = fs.readFile('./ssl/server.key');

            const https = () => ({ cert: certificate, key: certificateKey })
            config.server.https = Object.assign({}, config.server.https, https())
            config.preview.https = Object.assign({}, config.preview.https, https())
        }
    }
}


export default defineConfig({
    define: {
        _global: ({}),
        global: 'window',
    },

    plugins: [
        laravel(['resources/js/index.jsx']),
        react(),
    ],
    resolve: {
        alias: {
            '@': './src',
        },
    },

    esbuild: {
        loader: "jsx",
        include: /resources\/.*\.jsx?$/,
        // loader: "tsx",
        // include: /src\/.*\.[tj]sx?$/,
        exclude: [],
    },
    optimizeDeps: {
        esbuildOptions: {
            loader: {
                '.js': 'jsx',
            },

            plugins: [
                {
                    name: "load-js-files-as-jsx",
                    setup(build) {
                        build.onLoad({ filter: /resources\/.*\.js$/ }, async (args) => ({
                            loader: "jsx",
                            contents: await fs.readFile(args.path, "utf8"),
                        }));
                    },
                },
            ],
        },
    },
});