import { mdsvex } from 'mdsvex'
import mdsvexConfig from './mdsvex.config.js'
import preprocess from 'svelte-preprocess'
import adapter from '@sveltejs/adapter-static'

/** @type {import('@sveltejs/kit').Config} */
const config = {
  extensions: ['.svelte', ...mdsvexConfig.extensions],

  // Consult https://github.com/sveltejs/svelte-preprocess
  // for more information about preprocessors
  preprocess: [
    mdsvex(mdsvexConfig),
    preprocess({ replace: [['__COPYRIGHT_YEAR__', new Date().getFullYear()]] })
  ],

  kit: {
    adapter: adapter({
      fallback: '200.html'
    }),
    trailingSlash: 'always'
  }
}

export default config
