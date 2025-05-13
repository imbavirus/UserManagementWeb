import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { FlatCompat } from '@eslint/eslintrc';
import stylistic from '@stylistic/eslint-plugin'
import stylisticTs from '@stylistic/eslint-plugin-ts';
import parserTs from '@typescript-eslint/parser';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

/** @type { import('eslint').Linter.Config[] } */
const eslintConfig = [
  ...compat.extends('next/core-web-vitals', 'next/typescript'),
  { ignores: ['.next/', 'node_modules/'] },
  {
    plugins: {
      '@stylistic': stylistic,
      '@stylistic/ts': stylisticTs,
    },
    languageOptions: {
      parser: parserTs,
    },
    files: ['**/*.js', '**/*.jsx','**/*.ts', '**/*.tsx'],
    rules: {
      '@next/next/no-html-link-for-pages': ['error', 'src/app'],
      '@stylistic/arrow-spacing': ['error', {
          'before': true,
          'after': true
      }],
      '@stylistic/block-spacing': ['warn', 'always'],
      '@stylistic/ts/type-annotation-spacing': ['warn', { 'before': true, 'after': true }],
      '@stylistic/quotes': ['error', 'single'],
      '@stylistic/eol-last': ['warn', 'always'],
      '@stylistic/semi': ['warn', 'always'],
      '@stylistic/member-delimiter-style': ['error', {
        'multiline': {
          'delimiter': 'semi',
          'requireLast': true
        },
        'singleline': {
          'delimiter': 'semi',
          'requireLast': false
        },
        'multilineDetection': 'brackets'
      }]
    }
  }
];

export default eslintConfig;
