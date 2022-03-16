module.exports = {
  env: {
    commonjs: true,
    es2021: true,
    node: true,
    jest: true,
    "no-new": 0,
  },
  extends: ["airbnb-base", "prettier"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: "latest",
  },
  rules: {},
};
