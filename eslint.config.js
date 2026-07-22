import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import pluginReact from "eslint-plugin-react";
import { defineConfig } from "eslint/config";

export default defineConfig([
  // 1. Tell ESLint to ignore build artifacts and configuration files
  {
    ignores: ["eslint.config.js", "**/.eslintrc*", ".next/**", "node_modules/**"],
  },

  // 2. Setup global language options using Project Service 👈 THE FIX
  {
    languageOptions: {
      globals: globals.browser,
      parserOptions: {
        projectService: true, // Automatically manages tsconfig mappings without breaking paths!
        tsconfigRootDir: __dirname, // Anchors the root fallback
      },
    },
  },

  // 3. Base configuration for file targeting
  { 
    files: ["**/*.{js,mjs,cjs,ts,mts,cts,jsx,tsx}"], 
    plugins: { js }, 
    extends: ["js/recommended"] 
  },

  // 4. Recommended configs
  ...tseslint.configs.recommended, 
  pluginReact.configs.flat.recommended,
  pluginReact.configs.flat['jsx-runtime'],

  // 5. Custom rule overrides
  {
    rules: {
      "react/react-in-jsx-scope": "off",
    },
  },
]);