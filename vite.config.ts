/// <reference types="vitest" />
/// <reference types="vite/client" />

import {defineConfig} from 'vite';
import preact from '@preact/preset-vite';
import postcssNesting from 'postcss-nesting';
import postcssCustomMedia from 'postcss-custom-media';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [preact()],
    test: {
        globals: true,
        environment: 'jsdom',
        setupFiles: './src/test/setup.ts',
    },
    css: {
        postcss: {
            plugins: [postcssNesting(), postcssCustomMedia()],
        },
    },
});
