import { fileURLToPath } from 'node:url'
import { includeIgnoreFile } from '@eslint/compat'
import pluginVue from 'eslint-plugin-vue'
import { defineConfigWithVueTs, vueTsConfigs } from '@vue/eslint-config-typescript'
import eslintConfigPrettier from '@vue/eslint-config-prettier'

const gitignoreFile = new URL('.gitignore', import.meta.url)

export default [
  includeIgnoreFile(fileURLToPath(gitignoreFile)),
  ...defineConfigWithVueTs(
    pluginVue.configs['flat/recommended'],
    vueTsConfigs.eslintRecommended,
    vueTsConfigs.recommendedTypeChecked,
  ),
  eslintConfigPrettier,
]
