const production = process.env.NODE_ENV === 'production'

module.exports = {
  plugins: [
    // we have issues with nested `@screen` directives with `postcss-nested`
    require('tailwindcss/nesting')(require('postcss-nesting')),
    require('tailwindcss'),
    require('postcss-preset-env')({
      features: { 'nesting-rules': false }
    }),
    production ? require('cssnano') : undefined
  ]
}
