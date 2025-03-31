
import { defineConfig } from "vite";
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
    // Enable minification with terser
    minify: true,
    target: 'es2015',
    cssMinify: true,
    
    // Source maps only in development
    sourcemap: mode !== 'production',
    
    // Chunk splitting optimization
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          // Improved chunking strategy for faster loading
          if (id.includes('node_modules')) {
            if (id.includes('react') || id.includes('react-dom') || id.includes('react-router')) {
              return 'react-vendor';
            }
            if (id.includes('@radix-ui')) {
              return 'ui-vendor';
            }
            if (id.includes('recharts')) {
              return 'chart-vendor';
            }
            if (id.includes('react-hook-form') || id.includes('zod')) {
              return 'form-vendor';
            }
            if (id.includes('lucide')) {
              return 'icons';
            }
            return 'vendor';
          }
        },
        
        // Optimize code splitting
        chunkFileNames: 'assets/js/[name]-[hash].js',
        entryFileNames: 'assets/js/[name]-[hash].js',
        assetFileNames: 'assets/[ext]/[name]-[hash].[ext]',
      },
    },
    
    // Reduce chunk size warnings
    chunkSizeWarningLimit: 1200,
    
    // Optimize assets
    assetsInlineLimit: 10 * 1024, // Inline files smaller than 10KB
    
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
      'react-helmet',
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
