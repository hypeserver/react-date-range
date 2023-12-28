module.exports = {
    extends: ['eslint:recommended', 'plugin:react/recommended', 'prettier'],
    plugins: ['react', 'prettier'],
    rules: {
        'prettier/prettier': ['error', {}],
        'no-debugger': 0,
        'no-console': 0,
        semi: 2,
    },
    parser: '@babel/eslint-parser',
    parserOptions: {
        ecmaVersion: 'latest',
    },
    env: {
        es6: true,
        node: true,
        browser: true,
        jest: true,
    },
};
