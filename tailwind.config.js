/** @type {import('tailwindcss').Config} */

const { nextui } = require('@nextui-org/react')
module.exports = {
  content: [
    // ...
    './**/*.tsx'
  ],
  theme: {
    extend: {
      fontFamily: {
        custom: ['Merriweather', 'serif']
      }
    }
  },
  mode: 'jit',
  darkMode: 'class',
  plugins: []
}
