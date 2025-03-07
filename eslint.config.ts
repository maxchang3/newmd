import maxchang from '@maxchang/eslint-config'

export default maxchang({
    type: 'lib',
}, {
    rules: {
        'antfu/no-top-level-await': 'off',
    },
})
