import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
    plugins: [react()],
    server: {
        proxy: {
            '/api/iobroker': {
                target: 'https://www.iobroker.net',
                changeOrigin: true,
                rewrite: (path: string): string => path.replace(/^\/api\/iobroker/, ''),
            },
        },
    },
    build: {
        outDir: 'build', // statt "dist"
    },
});
