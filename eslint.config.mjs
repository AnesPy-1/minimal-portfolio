import js from "@eslint/js";
import tseslint from "typescript-eslint";

export default tseslint.config(
  {
    ignores: [".next/**", "node_modules/**", "backend/.venv/**", "backend/media/**", "backend/db.sqlite3"],
  },
  js.configs.recommended,
  ...tseslint.configs.recommended
);
