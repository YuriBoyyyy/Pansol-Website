module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    "airbnb",
    "airbnb/hooks",
    "airbnb-typescript",
    "react-app",
    "plugin:react/recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:prettier/recommended",
  ],
  overrides: [],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    project: "tsconfig.json",
  },
  // eslint-disable-next-line prettier/prettier
  plugins: ["react", "@typescript-eslint", "prettier"],
  rules: {
    "prettier/prettier": [
      "error",
      {
        endOfLine: "auto",
      },
    ],
    "arrow-body-style": "off",
    "prefer-arrow-callback": "off",
    "react/react-in-jsx-scope": ["off"],
    "react/button-has-type": [
      "off",
      {
        button: true,
      },
    ],
    "@typescript-eslint/no-shadow": [
      "off",
      {
        builtinGlobals: null,
        hoist: null,
        allow: null,
        ignoreTypeValueShadow: true,
      },
    ],
    "react/no-unescaped-entities": ["off"],
  },
};
