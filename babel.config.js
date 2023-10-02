module.exports = {
  presets: ["module:metro-react-native-babel-preset"],
  plugins: [
    "react-native-reanimated/plugin",
    [
      "module:react-native-dotenv",
      {
        moduleName: "@env",
        path: ".env",
        blacklist: null,
        whitelist: null,
        safe: false,
        allowUndefined: true,
      },
    ],
    [
      "module-resolver",
      {
        root: ["./src"],
        extensions: [
          ".ios.ts",
          ".android.ts",
          ".ts",
          ".ios.tsx",
          ".android.tsx",
          ".tsx",
          ".jsx",
          ".js",
          ".json",
        ],
        alias: {
          "@components": "./src/components",
          "@screens": "./src/screens",
          "@assets": "./src/assets",
          "@navigators": "./src/navigators",
          "@utils": "./src/utils",
          "@redux": "./src/redux",
          "@styles": "./src/styles",
          "@": "./src",
        },
      },
    ],
  ],
};
