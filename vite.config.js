import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

/**
 * BASE_PATH controls the public path of the site.
 *
 *  - Custom domain or a `<user>.github.io` repository  →  BASE_PATH="/"        (default)
 *  - Project pages, e.g. https://<user>.github.io/okkuva/  →  BASE_PATH="/okkuva/"
 *
 * The GitHub Actions workflow in .github/workflows/deploy.yml sets this automatically.
 */
const base = process.env.BASE_PATH || '/'

export default defineConfig(({ isSsrBuild }) => ({
  base,
  plugins: [react()],
  build: {
    target: 'es2020',
    cssMinify: true,
    // dist-ssr is a throwaway bundle used only by scripts/prerender.mjs and is
    // deleted afterwards, so it must not receive a copy of public/ – that would
    // duplicate ~36 MB of video on every build and briefly create (then remove)
    // dist-ssr/videos/*.mp4, which crashes a running dev server's file watcher.
    copyPublicDir: !isSsrBuild,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules/react') || id.includes('node_modules/scheduler')) {
            return 'react'
          }
        },
      },
    },
  },
  // Dedicated ports for this project. 5173/4173 are the Vite defaults and are
  // shared by every other Vite project on this machine – if one of them is
  // still running, the browser can silently serve you that project instead.
  // strictPort makes a collision fail loudly instead of moving to another port.
  server: {
    port: 5273,
    strictPort: true,
    open: false,
    // Build output is not source – never watch it, so `npm run build` in a
    // second terminal cannot disturb a running dev server.
    watch: {
      ignored: ['**/dist/**', '**/dist-ssr/**'],
    },
  },
  preview: {
    port: 4273,
    strictPort: true,
  },
}))
