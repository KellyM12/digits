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
  // 1. Tell ESLint to completely ignore all configuration files globally 👈 THE FIX
  {
    ignores: [
      "eslint.config.js",  // 👈 Updated to match your exact file extension!
      "next.config.mjs", 
      "**/.eslintrc*", 
      ".next/**", 
      "node_modules/**"
    ],
  },

  // 2. Setup global language options using Project Service
  {
    languageOptions: {
      globals: globals.browser,
      parserOptions: {
        projectService: true,
        tsconfigRootDir: __dirname,
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