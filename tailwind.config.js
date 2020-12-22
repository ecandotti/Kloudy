const generator = require('./generator')

const flex = generator({}, { noUnit: true })

module.exports = {
  purge: [
     './src/**/*.html',
     './src/**/*.jsx',
   ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      flex
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}