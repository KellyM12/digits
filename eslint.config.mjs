import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import pluginReact from "eslint-plugin-react";

export default tseslint.config(
  {
    ignores: [
      "eslint.config.js",
      "eslint.config.mjs",
      "next.config.mjs",
      ".next/**",
      "node_modules/**"
    ],
  },
  {
    files: ["**/*.{ts,tsx,js,jsx,mjs,cjs}"],
    extends: [
      js.configs.recommended,
      ...tseslint.configs.recommended,
      pluginReact.configs.flat.recommended,
      pluginReact.configs.flat['jsx-runtime'],
    ],
    languageOptions: {
      globals: globals.browser,
      parserOptions: {
        tsconfigRootDir: __dirname,
        projectService: {
          allowDefaultProject: [
            "next.config.mjs", 
            "eslint.config.js", 
            "eslint.config.mjs"
          ],
        },
      },
    },
    rules: {
      "react/react-in-jsx-scope": "off",
    },
  }
);