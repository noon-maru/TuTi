module.exports = {
  root: true,
  extends: ["@react-native"],
  // Prettier 설정 추가
  // plugins: ["prettier"],
  rules: {
    "arrow-parens": ["warn", "always"],
    quotes: ["warn", "double"],
    "react/react-in-jsx-scope": "off",
    "react-native/no-inline-styles": "off",
    curly: "off",
    "prettier/prettier": [
      "error",
      {
        endOfLine: "auto",
      },
    ],

    // "prettier/prettier": [
    //   "error",
    //   {
    //     arrowParens: "always",
    //     bracketSameLine: false,
    //     bracketSpacing: true,
    //     singleQuote: false,
    //     trailingComma: "es5",
    //   },
    // ],
  },
};
