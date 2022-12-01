import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import istanbul from 'vite-plugin-istanbul'

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      // From https://github.com/vitejs/vite/discussions/6282
      Buffer: 'buffer',
      // From https://gist.github.com/ef4/d2cf5672a93cf241fd47c020b9b3066a (polyfills webpack)
      crypto: 'crypto-browserify',
      querystring: 'querystring-es3',
      stream: 'stream-browserify',
      _stream_readable: 'readable-stream/readable',
    },
  },
  plugins: [
    react(),
    istanbul({
      cypress: true,
      requireEnv: false,
    }),
  ],
  optimizeDeps: {
    esbuildOptions: {
      define: {
        // Node.js global to browser globalThis
        global: 'globalThis',
      },
    },
  },
})
