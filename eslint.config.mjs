import eslint from "@eslint/js"
import eslintConfigPrettier from "eslint-config-prettier"
import eslintPluginReact from "eslint-plugin-react"
import eslintPluginReactHooks from "eslint-plugin-react-hooks"
import eslintPluginReactRefresh from "eslint-plugin-react-refresh"
import tseslint from "typescript-eslint"

/** @type {import('eslint').Linter.Config[]} */
const eslintConfig = [
  { ignores: ["dist", "node_modules", "public", "prettier.config.cjs"] },

  eslint.configs.recommended,

  ...tseslint.configs.recommended,

  eslintPluginReact.configs.flat.recommended,

  eslintConfigPrettier,

  {
    plugins: {
      react: eslintPluginReact,
      "react-hooks": eslintPluginReactHooks,
      "react-refresh": eslintPluginReactRefresh,
    },
    settings: {
      react: {
        version: "detect",
      },
    },
    rules: {
      // typescript-eslint
      "@typescript-eslint/no-empty-object-type": "off",
      "@typescript-eslint/no-unused-vars": "warn",

      // eslint-plugin-react
      ...eslintPluginReact.configs.recommended.rules,
      "react/jsx-uses-react": "off",
      "react/react-in-jsx-scope": "off",

      // eslint-plugin-react-hooks
      ...eslintPluginReactHooks.configs.recommended.rules,

      // eslint-plugin-react-refresh
      "react-refresh/only-export-components": "off",
    },
  },
]

export default eslintConfig
