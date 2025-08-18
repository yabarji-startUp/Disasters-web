import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    // Tree shaking et code splitting (RGESN 1.2)
    rollupOptions: {
      output: {
        manualChunks: {
          // Séparation des chunks pour optimiser le cache
          vendor: ['react', 'react-dom'],
          three: ['three'],
          lucide: ['lucide-react'],
          utils: ['lodash']
        }
      }
    },
    // Optimisations de build
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true
      }
    },
    // Analyse du bundle
    sourcemap: false
  },
  optimizeDeps: {
    include: ['react', 'react-dom'],
    exclude: ['lucide-react']
  }
});
