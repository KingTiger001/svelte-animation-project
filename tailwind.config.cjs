const plugin = require('tailwindcss/plugin')
const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  content: ['./public/**/*.html', './src/**/*.svelte'],
  theme: {
    
      fontFamily: {
        inter: ['InterVariable', ...defaultTheme.fontFamily.sans],
        'open-sans': ['"Open SansVariable"', ...defaultTheme.fontFamily.sans],
        'proxima-nova': ['"Proxima Nova"', ...defaultTheme.fontFamily.sans],
        'roboto-slab': ['"Roboto SlabVariable"', ...defaultTheme.fontFamily.sans]
      }
    }
  },
  plugins: [
    // add font weights for variable fonts
    plugin(({ theme, addUtilities }) => {
      const utils = {}
      Object.entries(theme('fontWeight')).forEach(([key, value]) => {
        utils[`.font-${key}`] = { 'font-variation-settings': `'wght' ${value}` }
      })
      addUtilities(utils)
    })
  ]
}
