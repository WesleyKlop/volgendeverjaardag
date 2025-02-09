import * as tailwindcss from 'prettier-plugin-tailwindcss'
import * as vue from 'prettier-plugin-vue'

/**
 * @see https://prettier.io/docs/en/configuration.html
 * @type {import("prettier").Config}
 */
const config = {
  plugins: [tailwindcss, vue],
  semi: false,
  tabWidth: 2,
  singleQuote: true,
  printWidth: 100,
  trailingComma: 'all',
  singleAttributePerLine: true,
  htmlWhitespaceSensitivity: 'ignore',
}

export default config
