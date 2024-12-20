// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc'; // Vite plugin for React
import path from 'path'; // For resolving paths

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'), // Map '@' to 'src' directory
    },
  },
  server: {
    host: true,
    port: 5173,
    open: true, // Automatically open the app in the browser
  },
});
