module.exports = {
  env: {
    commonjs: true,
    es2021: true,
    node: true,
    jest: true,
    "no-new": "off",
  },
  extends: ["airbnb-base", "prettier"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: "latest",
  },
  plugins: ["@typescript-eslint"],
  rules: {},
};
