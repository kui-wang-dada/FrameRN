module.exports = {
  presets: ["module:metro-react-native-babel-preset"],
  plugins: [
    [
      "module-resolver",
      {
        root: ["./"],
        alias: {
          common: "./src/components/common",
          ui: "./src/components/ui",
          home: "./src/components/pages/home",
          service: "./src/components/pages/service",
          my: "./src/components/pages/my",
          public: "./src/components/pages/public",
          login: "./src/components/pages/login",
          "@": "./src",
          "@/*": "./src/*"
        }
      }
    ]
  ]
};
