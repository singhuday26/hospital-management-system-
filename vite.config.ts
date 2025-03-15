
import { defineConfig, splitVendorChunkPlugin } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react({
      // Enable fast refresh in development
      fastRefresh: mode === 'development',
    }),
    // Split vendor chunks for better caching
    splitVendorChunkPlugin(),
    // Only use component tagger in development
    mode === 'development' &&
    componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    // Enable minification and tree-shaking
    minify: 'terser',
    target: 'es2015',
    cssMinify: true,
    // Source maps only in development
    sourcemap: mode !== 'production',
    // Chunk strategy
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          'ui-vendor': ['@radix-ui/react-avatar', '@radix-ui/react-dialog', '@radix-ui/react-dropdown-menu'],
          'chart-vendor': ['recharts'],
          'form-vendor': ['react-hook-form', '@hookform/resolvers', 'zod'],
        },
      },
    },
    // Reduce chunk size warnings
    chunkSizeWarningLimit: 1000,
    // Inline assets to reduce HTTP requests
    assetsInlineLimit: 4096,
  },
  // Optimize dependencies pre-bundling
  optimizeDeps: {
    include: [
      'react', 
      'react-dom', 
      'react-router-dom', 
      '@radix-ui/react-avatar',
      'lucide-react',
      'recharts',
    ],
  },
  // Enable top level await
  esbuild: {
    supported: {
      'top-level-await': true,
    },
  },
}));
