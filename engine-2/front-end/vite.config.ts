import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
    plugins: [react()],
    server: {
        host: '0.0.0.0',
        proxy: {
            '/api/iobroker': {
                target: 'https://www.iobroker.net:3001',
                changeOrigin: true,
                rewrite: (path: string): string => path.replace(/^\/api\/iobroker/, ''),
            },
            // the search endpoint of the backend next door (`npm start` in engine-2). The live
            // site answers here too, but out of the index that is deployed there.
            '/search': {
                target: 'http://127.0.0.1:5001',
                changeOrigin: true,
            },
            // the two product catalogues; neither host sends CORS headers,
            // so in development they are proxied through the dev server
            '/api/products/net': {
                target: 'https://iobroker.net:3001',
                changeOrigin: true,
                rewrite: (): string => '/api/v1/public/products',
            },
            '/api/products/pro': {
                target: 'https://iobroker.pro:3001',
                changeOrigin: true,
                rewrite: (): string => '/api/v1/public/products',
            },
        },
    },
    build: {
        outDir: 'build', // statt "dist"
    },
});
