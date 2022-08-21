const defaultConfig = require('tailwindcss/defaultTheme')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        title: ['"DynaPuff"', ...defaultConfig.fontFamily.sans],
        sans: ['"Fira Sans"', ...defaultConfig.fontFamily.sans],
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
}
