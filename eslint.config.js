import antfu from '@antfu/eslint-config'

export default antfu({
  type: 'lib',
  typescript: {
    overrides: {
      'ts/explicit-function-return-type': 'off',
    },
  },
}, {
  rules: {
    'no-console': 'off',
  },
}, {
  files: ['**/*.ts'],
  rules: {
    'style/indent': ['error', 4],
  },
})
