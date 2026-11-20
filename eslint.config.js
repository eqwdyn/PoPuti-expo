const { defineConfig } = require("eslint/config");
const expoConfig = require("eslint-config-expo/flat");
const boundaries = require("@lapidix/eslint-plugin-boundaries");

module.exports = defineConfig([
  expoConfig,
  {
    plugins: {
      "@lapidix/boundaries": boundaries,
    },
    rules: {
      "@lapidix/boundaries/no-same-layer-alias": "error",
      "@lapidix/boundaries/prefer-alias-import": "error",
    },
  },
  {
    settings: {
      "import/resolver": {
        typescript: { project: "./tsconfig.json" },
      },
    },
  },
]);
