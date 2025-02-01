// @ts-check

import eslint from '@eslint/js'
import tseslint from 'typescript-eslint'

export default tseslint.config(
  eslint.configs.recommended,
  ...tseslint.configs.recommendedTypeChecked,
  {
    plugins: {
      '@typescript-eslint': tseslint.plugin
    },
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        project: true
      }
    },
    rules: {
      'import/no-extraneous-dependencies': ['off'],
      'import/prefer-default-export': ['off'],
      '@typescript-eslint/no-unsafe-argument': ['warn'],
      '@typescript-eslint/no-unsafe-assignment': ['off'],
      '@typescript-eslint/no-unsafe-member-access': ['warn'],
      '@typescript-eslint/no-unsafe-return': ['off'],
      '@typescript-eslint/no-misused-promises': ['off'],
      '@typescript-eslint/no-floating-promises': ['warn'],
      '@typescript-eslint/no-unsafe-call': ['off'],
      '@typescript-eslint/require-await': ['warn'],
      'no-async-promise-executor': ['off'],
      '@typescript-eslint/no-redundant-type-constituents': ['off'],
      'react-refresh/only-export-components': ['off']
    }
  },
  {
    files: ['**/*.ts', '**/*.tsx', '**/*.d.ts'],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        project: true,
        // @ts-ignore
        tsconfigRootDir: import.meta.dirname,
        include: ['.ts', '.tsx', '.d.ts'],
        ecmaVersion: 'latest',
        ecmaFeatures: {
          jsx: true
        },
        sourceType: 'module'
      }
    }
  },
  {
    ignores: [
      '.husky',
      'node_modules',
      '**/package.json',
      '*.md',
      '**/*.css',
      'apps/*/vitest.config.ts',
      'packages/*/vitest.config.ts',
      'apps/frontend/src/components/catalyst',
      '.esbuild',
      'copilot',
      'coverage',
      'tmp',
      '.tsup',
      '.vscode',
      '**/dist',
      '**/.esbuild',
      '**/.tsup',
      'eslint.config.js',
      'vitest.workspace.ts',
      '.eslintrc.cjs',
      'apps/*/tsup.config.ts',
      'packages/*/tsup.config.ts',
      'apps/*/tailwind.config.ts',
      'packages/*/tailwind.config.ts',
      'apps/*/vite.config.ts',
      'packages/*/vite.config.ts',
      'pnpm-lock.yaml',
      'dist'
    ]
  },
  {
    // disable type-aware linting on JS files
    files: [
      '**/*.js',
      '**/*.jsx',
      '**/*.mjs',
      '**/*.cjs',
      '**/*.svelte',
      '**/*.vue'
    ],
    ...tseslint.configs.disableTypeChecked
  }
)
