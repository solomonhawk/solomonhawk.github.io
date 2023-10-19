/** @type {import('eslint').ESLint.ConfigData} */
module.exports = {
  root: true,
  env: {
    es6: true,
  },
  extends: [
    'plugin:prettier/recommended',
    'plugin:astro/recommended',
    'plugin:astro/jsx-a11y-strict',
  ],
  plugins: ['simple-import-sort'],
  rules: {
    'simple-import-sort/imports': 'error',
    'simple-import-sort/exports': 'error',
  },
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  overrides: [
    {
      files: ['*.astro'],
      parser: 'astro-eslint-parser',
      parserOptions: {
        parser: '@typescript-eslint/parser',
        extraFileExtensions: ['.astro'],
      },
    },
    {
      files: ['*.ts', '*.tsx'],
      parser: '@typescript-eslint/parser',
    },
  ],
};
