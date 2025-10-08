/* eslint-env node */
module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'react', 'react-hooks', 'import', 'boundaries'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:import/recommended',
    'plugin:import/typescript',
    'prettier'
  ],
  settings: {
    react: { version: 'detect' },
    'import/resolver': { typescript: true },
    boundaries: {
      defaultBoundary: 'disallow',
      elements: [
        { type: 'app', pattern: 'src/app/**' },
        { type: 'widgets', pattern: 'src/widgets/**' },
        { type: 'pages', pattern: 'src/pages/**' },
        { type: 'features', pattern: 'src/features/**' },
        { type: 'entities', pattern: 'src/entities/**' },
        { type: 'shared', pattern: 'src/shared/**' }
      ],
      rules: [
        { from: ['app'], allow: ['widgets', 'pages', 'features', 'entities', 'shared', 'app'] },
        { from: ['widgets'], allow: ['features', 'entities', 'shared'] },
        { from: ['pages'], allow: ['widgets', 'features', 'entities', 'shared'] },
        { from: ['features'], allow: ['entities', 'shared'] },
        { from: ['entities'], allow: ['shared'] },
        { from: ['shared'], allow: ['shared'] }
      ]
    }
  },
  rules: {
    'react/react-in-jsx-scope': 'off',
    'import/no-unresolved': 'off',
    'boundaries/element-types': ['error', { message: 'Invalid import across FSD layers' }]
  }
}