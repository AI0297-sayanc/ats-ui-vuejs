module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'plugin:vue/essential',
    '@vue/airbnb',
  ],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    "func-names": [ "error", "never" ],
    "comma-dangle": [ "error", "only-multiline" ],
    "semi": [ "warn", "never" ],
    "no-param-reassign": [ "error", { "props": false } ],
    "quotes": [ "warn", "double" ],
    "max-len": [ "warn", { "ignoreComments": true, "ignoreTrailingComments": true, "ignoreUrls": true, "ignoreStrings": true, "ignoreTemplateLiterals": true, "ignoreRegExpLiterals": true } ],
    "no-unused-vars": 1,
    "prefer-const": 1,
    "no-var": 1,
    "eol-last": 1,
    "padded-blocks": 1,
    "import/newline-after-import": 0,
    "no-underscore-dangle": 0
  },
  parserOptions: {
    parser: 'babel-eslint',
  },
};
