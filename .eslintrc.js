export default {
    env: {
        node: true,
        es2022: true,
    },
    extends: ['eslint:recommended', 'plugin:vue/vue3-recommended', 'prettier'],
    rules: {
        'prettier/prettier': ['error'],
        'vue/require-default-prop': 0,
        'vue/html-indent': ['error', 4],
        'vue/singleline-html-element-content-newline': 0,
        'vue/component-name-in-template-casing': ['error', 'PascalCase'],
    },
}
