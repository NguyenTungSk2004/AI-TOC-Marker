import { defineConfig } from 'vite'
import { crx } from '@crxjs/vite-plugin'
import manifest from './src/manifest'
import obfuscator from 'rollup-plugin-javascript-obfuscator'

export default defineConfig({
  build: {
    emptyOutDir: true,
    outDir: 'build',
    sourcemap: false,
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
      mangle: true,
      format: {
        comments: false,
      },
    },
    rollupOptions: {
      output: {
        chunkFileNames: 'assets/[hash].js',
        entryFileNames: 'assets/[hash].js',
        assetFileNames: 'assets/[hash][extname]',
        manualChunks(id) {
          if (id.includes('node_modules')) return 'vendor'
          if (id.includes('/utils/')) return 'utils'
          if (id.includes('/core/')) return 'core'
        },
      },
      plugins: [
        obfuscator({
          compact: true,
          controlFlowFlattening: true,
          controlFlowFlatteningThreshold: 1,
          numbersToExpressions: true,
          simplify: true,
          stringArray: true,
          stringArrayEncoding: ['rc4'],
          stringArrayThreshold: 1,
          selfDefending: true,
          renameGlobals: true,
        }),
      ],
    },
  },

  plugins: [
    crx({ manifest }),
  ],
})
