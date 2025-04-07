import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { FlatCompat } from '@eslint/eslintrc';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  // Global ignores
  {
    ignores: ['dist/**', 'node_modules/**', 'build/**', 'coverage/**'],
  },
  // Spread the extended configurations
  ...compat.extends(
    'next/core-web-vitals',
    'next/typescript',
    'plugin:import/errors', // Added for error-level import rules
    'plugin:import/warnings',
    'plugin:prettier/recommended',
  ),
  // General rules for all filesa
  {
    rules: {
      // Spacing rules
      'space-before-blocks': ['error', 'always'],
      'space-infix-ops': 'error',
      'object-curly-spacing': ['error', 'always'],
      'keyword-spacing': ['error', { before: true, after: true }],
      // Blank line rules
      'padding-line-between-statements': [
        'error',
        { blankLine: 'always', prev: 'var', next: '*' },
        { blankLine: 'always', prev: '*', next: 'return' },
      ],
      'no-multiple-empty-lines': ['error', { max: 1, maxEOF: 1 }],
      'lines-between-class-members': ['error', 'always'],
    },
  },
];

export default eslintConfig;
