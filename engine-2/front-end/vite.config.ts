import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
    plugins: [react()],
    server: {
        host: '0.0.0.0',
        proxy: {
            /*
             * The documents, indexes and icons of the live site. It used to be the old backend on
             * `www.iobroker.net:3001`, which no longer answers since the move: the request for a
             * readme stayed pending and every adapter page came up with an empty body in
             * development (17.09.2026).
             */
            '/api/iobroker': {
                target: 'https://www.iobroker.com',
                changeOrigin: true,
                rewrite: (path: string): string => path.replace(/^\/api\/iobroker/, ''),
            },
            // the search endpoint of the backend next door (`npm start` in engine-2). The live
            // site answers here too, but out of the index that is deployed there.
            '/api/search': {
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
            // the access licenses are an endpoint of their own - see the note in src/lib/web.ts
            '/api/products/pro': {
                target: 'https://iobroker.pro:3001',
                changeOrigin: true,
                rewrite: (): string => '/api/v1/public/accessProducts',
            },
        },
    },
    build: {
        outDir: 'build', // statt "dist"
    },
});
