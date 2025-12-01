const path = require('node:path');
const js = require('@eslint/js');
const tseslint = require('typescript-eslint');
const importPlugin = require('eslint-plugin-import');
const prettierPlugin = require('eslint-plugin-prettier');

const tsconfigRootDir = __dirname;
const prettierRule = [
  'error',
  { singleQuote: true, trailingComma: 'all', printWidth: 100, semi: true }
];

module.exports = tseslint.config(
  {
    ignores: [
      '**/node_modules/**',
      '**/dist/**',
      '**/coverage/**',
      'mini-program/miniprogram/miniprogram_npm/**'
    ]
  },
  {
    files: ['server/**/*.ts'],
    extends: [js.configs.recommended, ...tseslint.configs.recommendedTypeChecked],
    languageOptions: {
      parserOptions: {
        project: path.join(tsconfigRootDir, 'server', 'tsconfig.json'),
        tsconfigRootDir
      }
    },
    plugins: {
      import: importPlugin,
      prettier: prettierPlugin
    },
    settings: {
      'import/resolver': {
        typescript: {
          project: path.join(tsconfigRootDir, 'server', 'tsconfig.json')
        }
      }
    },
    rules: {
      'prettier/prettier': prettierRule,
      'import/order': [
        'error',
        {
          groups: [['builtin', 'external'], ['internal'], ['parent', 'sibling', 'index']],
          'newlines-between': 'always',
          alphabetize: { order: 'asc', caseInsensitive: true }
        }
      ],
      '@typescript-eslint/no-misused-promises': [
        'error',
        {
          checksVoidReturn: false
        }
      ],
      '@typescript-eslint/no-floating-promises': ['error'],
      '@typescript-eslint/explicit-member-accessibility': ['error', { accessibility: 'no-public' }]
    }
  },
  {
    files: ['mini-program/**/*.ts'],
    extends: [js.configs.recommended, ...tseslint.configs.recommendedTypeChecked],
    languageOptions: {
      parserOptions: {
        project: path.join(tsconfigRootDir, 'mini-program', 'tsconfig.json'),
        tsconfigRootDir
      }
    },
    plugins: {
      prettier: prettierPlugin
    },
    rules: {
      'prettier/prettier': prettierRule,
      '@typescript-eslint/no-misused-promises': [
        'error',
        {
          checksVoidReturn: false
        }
      ],
      '@typescript-eslint/no-floating-promises': ['error'],
      '@typescript-eslint/explicit-member-accessibility': ['error', { accessibility: 'no-public' }]
    }
  }
);
