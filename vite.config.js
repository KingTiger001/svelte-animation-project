import { sveltekit } from '@sveltejs/kit/vite'
import path from 'path'

/** @type {import('vite').UserConfig} */
const config = {
  resolve: {
    alias: {
      $css: path.resolve('./src/css'),
      $fonts: path.resolve('./src/fonts'),
      $static: path.resolve('./static')
    }
  },
  plugins: [sveltekit()]
}

export default config
