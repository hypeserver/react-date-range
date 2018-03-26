module.exports = {
    extends: [
        "eslint:recommended",
        "plugin:react/recommended",
        "prettier",
    ],
    plugins: [
        "react",
        "prettier",
    ],
    rules: {
        "prettier/prettier": ["error", {
            "singleQuote": true,
            "trailingComma": "es5",
            "bracketSpacing": true,
            "jsxBracketSameLine": true,
            "printWidth": 100,
            "parser": "babylon",
        }],
        "no-debugger": 0,
        "no-console": 0,
    },
    parser: "babel-eslint",
    env: {
        "es6": true,
        "node": true,
        "browser": true,
        "jest": true,
      },
};