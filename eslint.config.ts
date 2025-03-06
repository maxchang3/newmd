import maxchang from '@maxchang/eslint-config'

export default maxchang({
    type: 'lib',
    typescript: true,
}, {
    rules: {
        'antfu/no-top-level-await': 'off',
    },
})
