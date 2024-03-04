import { fileURLToPath, URL } from 'node:url'

import { defineConfig, splitVendorChunkPlugin } from 'vite'
import vue from '@vitejs/plugin-vue'
import vuetify, { transformAssetUrls } from 'vite-plugin-vuetify'

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        manualChunks(id: string) {
          if (id.includes('node_modules')) {
            if (id.includes('vuetify')) return "vuetify"
            if (id.includes('vue')) return "vendor"
            return id.toString().split('node_modules/')[1].split('/')[0].replace('@','').toString()
          }
        }
      }
    }
  },
  plugins: [
    vue({
      template: transformAssetUrls
    }),
    vuetify({ autoImport: true }),
    splitVendorChunkPlugin(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server: {
    port: 5000,
    strictPort: true
  }
})
