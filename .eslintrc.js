module.exports = {
    extends: [
        "eslint:recommended",
        "plugin:react/recommended",
        "prettier",
        "plugin:@typescript-eslint/eslint-recommended",
        "plugin:@typescript-eslint/recommended"
    ],
    plugins: [
        "react",
        "@typescript-eslint",
        "prettier"
    ],
    parserOptions: {
        ecmaVersion: 12,
        parser: '@babel/eslint-parser',
        requireConfigFile: false,
        sourceType: 'module',
      },
    env: {
        "es6": true,
        "node": true,
        "browser": true,
        "jest": true,
      },
      settings: {
        react: {
            version: "detect"
        }
      }
};