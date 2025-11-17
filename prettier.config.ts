import type { Config } from "prettier";
import type { PluginOptions } from "prettier-plugin-tailwindcss";

const prettierConfig: Config & PluginOptions = {
  tabWidth: 2,
  semi: true,
  singleQuote: false,
  jsxSingleQuote: false,
  trailingComma: "all",
  arrowParens: "always",
  endOfLine: "lf",
  plugins: ["prettier-plugin-astro", "prettier-plugin-tailwindcss"],
  overrides: [
    {
      files: "*.astro",
      options: {
        parser: "astro",
      },
    },
  ],
};

export default prettierConfig;
