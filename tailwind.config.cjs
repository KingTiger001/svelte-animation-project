const plugin = require('tailwindcss/plugin')
const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  content: ['./public/**/*.html', './src/**/*.svelte'],
  theme: {
    extend: {
      colors: {
       
        'yellow-dark': 'rgb(99, 71, 0)',
        blue: 'rgb(32, 165, 214)',
        green: 'rgb(137, 176, 39)',
        'green-light': 'rgb(209, 240, 219)',
        purple: 'rgb(123, 97, 255)',
        red: 'rgb(244, 116, 87)'
      },
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
