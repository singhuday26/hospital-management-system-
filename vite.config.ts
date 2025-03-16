
import { defineConfig, splitVendorChunkPlugin } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react({
      // React-swc no longer has fastRefresh property
      // It's enabled by default in development
    }),
    // Split vendor chunks for better caching
    splitVendorChunkPlugin(),
    // Only use component tagger in development
    mode === 'development' &&
    // Using dynamic import to avoid build issues in production
    mode === 'development' ? 
      // @ts-ignore - we know this might not exist in production
      (async () => {
        try {
          const { componentTagger } = await import("lovable-tagger");
          return componentTagger();
        } catch (e) {
          console.warn("Could not load lovable-tagger, skipping");
          return null;
        }
      })() : 
      null,
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
    // Important: prevent empty chunk files
    emptyOutDir: true,
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
    exclude: [
      'lovable-tagger' // Exclude this from optimization to prevent build issues
    ]
  },
  // Enable top level await
  esbuild: {
    supported: {
      'top-level-await': true,
    },
  },
}));
