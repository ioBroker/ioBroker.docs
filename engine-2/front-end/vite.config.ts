import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
    plugins: [react()],
    server: {
        host: '0.0.0.0',
        proxy: {
            '/api/iobroker': {
                target: 'https://www.iobroker.net',
                changeOrigin: true,
                rewrite: (path: string): string => path.replace(/^\/api\/iobroker/, ''),
            },
            // the two product catalogues; neither host sends CORS headers,
            // so in development they are proxied through the dev server
            '/api/products/net': {
                target: 'https://iobroker.net',
                changeOrigin: true,
                rewrite: (): string => '/api/v1/public/products',
            },
            '/api/products/pro': {
                target: 'https://iobroker.pro',
                changeOrigin: true,
                rewrite: (): string => '/api/v1/public/products',
            },
        },
    },
    build: {
        outDir: 'build', // statt "dist"
    },
});
