module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  extends: ['standard-with-typescript', 'standard-jsx', 'prettier'],
  plugins: ['svelte3', '@typescript-eslint'],
  ignorePatterns: [
    // add patterns here, rather than `.eslintignore`, to prevent conflict with `ts-standard`
    // TS Standard
    '*.js',
    '*.jsx',
    '*.ts',
    '*.tsx',
    '*.mjs',
    '*.cjs',
    // Artifacts
    '.svelte-kit',
    'build',
    // Misc
    'static',
    'node_modules'
  ],
  overrides: [
    {
      files: ['*.svelte'],
      processor: 'svelte3/svelte3',
      rules: {
        // rules that conflict (we should still use `svelte-check`)
        'no-use-before-define': 'off',
        'import/first': 'off'
      }
    }
  ],
  settings: {
    'svelte3/typescript': () => require('typescript')
  },
  parserOptions: {
    sourceType: 'module',
    ecmaVersion: 2019
  },
  env: {
    browser: true,
    es2017: true,
    node: true
  }
}
