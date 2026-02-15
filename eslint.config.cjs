/* eslint-disable @typescript-eslint/no-require-imports */
const {defineConfig, globalIgnores} = require('eslint/config');
const {fixupConfigRules, fixupPluginRules} = require('@eslint/compat');
const typescriptEslint = require('@typescript-eslint/eslint-plugin');
const prettier = require('eslint-plugin-prettier');
const globals = require('globals');
const tsParser = require('@typescript-eslint/parser');
const js = require('@eslint/js');
const {FlatCompat} = require('@eslint/eslintrc');

// __dirname and __filename exist natively in CommonJS
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all
});

module.exports = defineConfig([
  globalIgnores(['.yarn/**/*', 'coverage/**/*', 'dist/**/*', 'node_modules/**/*']),
  {
    extends: fixupConfigRules(
      compat.extends(
        'eslint:recommended',
        'plugin:@typescript-eslint/eslint-recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:prettier/recommended'
      )
    ),

    plugins: {
      '@typescript-eslint': fixupPluginRules(typescriptEslint),
      prettier: fixupPluginRules(prettier)
    },

    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.mocha
      },
      parser: tsParser,
      ecmaVersion: 2023,
      sourceType: 'module'
    },

    rules: {
      '@typescript-eslint/no-require-imports': [
        'error',
        {
          allowAsImport: true
        }
      ]
    }
  }
]);
