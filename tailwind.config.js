import defaultConfig from 'tailwindcss/defaultTheme'
import colors from 'tailwindcss/colors'
import forms from '@tailwindcss/forms'

const rainbowColors = ['red', 'orange', 'yellow', 'green', 'blue', 'indigo', 'violet']
  .map((c) => colors[c][500])
  .join(', ')

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,ts}'],
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
  plugins: [forms],
}
