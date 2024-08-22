// eslint.config.mjs
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
})
