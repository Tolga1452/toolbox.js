import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import { defineConfig, globalIgnores } from "eslint/config";


export default defineConfig([
  globalIgnores(['__tests__', 'dist', 'node_modules']),
  {
    files: ['src/**/*.{js,mjs,cjs,ts,mts,cts}'],
    plugins: { js },
    extends: ['js/recommended']
  },
  {
    files: ['src/**/*.{js,mjs,cjs,ts,mts,cts}'],
    languageOptions: { globals: globals.browser }
  },
  tseslint.configs.recommended,
  {
    rules: {
      '@typescript-eslint/no-explicit-any': 'off'
    }
  }
]);
