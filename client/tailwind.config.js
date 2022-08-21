const defaultConfig = require('tailwindcss/defaultTheme')
const colors = require('tailwindcss/colors')

const rainbowColors = ['red', 'orange', 'yellow', 'green', 'blue', 'indigo', 'violet']
  .map((c) => colors[c][500])
  .join(', ')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        title: ['"DynaPuff"', ...defaultConfig.fontFamily.sans],
        sans: ['"Fira Sans"', ...defaultConfig.fontFamily.sans],
      },
      backgroundImage: {
        rainbow: `linear-gradient(to bottom right, ${rainbowColors})`,
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
}
