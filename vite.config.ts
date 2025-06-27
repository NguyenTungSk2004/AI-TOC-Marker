import { defineConfig } from 'vite'
import { crx } from '@crxjs/vite-plugin'
import manifest from './src/manifest'
import obfuscator from 'rollup-plugin-javascript-obfuscator'
import crypto from 'crypto'

function hashName(str: string) {
  return crypto.createHash('md5').update(str).digest('hex').slice(0, 8)
}

export default defineConfig({
  build: {
    emptyOutDir: true,
    outDir: 'build',
    sourcemap: false,
    minify: 'terser',
    terserOptions: {
      // compress: {
      //   drop_console: true,
      //   drop_debugger: true,
      //   pure_funcs: ['console.log', 'console.warn', 'console.error'], // loại trừ cả khi console còn sót
      // },
      mangle: {
        toplevel: true,
        properties: {
          regex: /^_/ // mangle cả thuộc tính nếu bắt đầu bằng _
        }
      },
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
          // Chỉ tách chunk những phần dễ cache & logic chính
          if (id.includes('/sidepanel/') || id.includes('/contentScript/') || id.includes('/background/')) {
            return hashName(id)
          }
          // Gom mọi thứ khác vào 1 vendor chung nếu cần (tuỳ quy mô)
          if (id.includes('node_modules')) return 'vendor'
        }
      },
      plugins: [
        obfuscator({
          compact: true,
          controlFlowFlattening: true,
          controlFlowFlatteningThreshold: 0.75,
          deadCodeInjection: true,
          deadCodeInjectionThreshold: 0.4,
          numbersToExpressions: true,
          simplify: true,
          stringArray: true,
          stringArrayEncoding: ['rc4'],
          stringArrayThreshold: 1,
          selfDefending: true,
          renameGlobals: true,
          transformObjectKeys: true,
          unicodeEscapeSequence: true,
        }),
      ],
    },
  },
  plugins: [
    crx({ manifest }),
  ],
})
