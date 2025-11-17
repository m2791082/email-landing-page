import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";
import { serverEnv } from "./typed-env";

const astroConfig = defineConfig({
  output: "static",
  devToolbar: {
    enabled: false,
  },
  vite: {
    plugins: [tailwindcss()],
  },
});

const { deployOrigin, deployPath } = serverEnv;

if (deployOrigin) {
  astroConfig.site = deployOrigin;
}
if (deployPath) {
  astroConfig.base = deployPath;
}

export default astroConfig;
