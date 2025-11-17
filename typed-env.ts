import { z } from "zod";
import { loadEnv } from "vite";

const modeSchema = z
  .enum(["production", "development", "test"])
  .default("development");

const envSchema = z
  .object({
    /**
     * The origin of the url to deploy to.
     * Must be set when generating sitemaps or canonical URLs.
     */
    deployOrigin: z
      .string()
      .url()
      .describe("The origin of the deploy url.")
      .optional(),
    /**
     * The base path to deploy to.
     * Pages and assets will be generated relative to the base path.
     */
    deployPath: z
      .string()
      .startsWith("/")
      .transform((rawURI) => {
        return encodeURI(rawURI);
      })
      .or(
        z.literal("").transform(() => {
          return undefined;
        }),
      )
      .describe("The base path to serve the pages from.")
      .optional(),
    /**
     * An email address visitors can contact.
     * Will be displayed on the page.
     */
    contactEmail: z
      .string()
      .email()
      .or(
        z.literal("").transform(() => {
          return undefined;
        }),
      )
      .describe("An contact email address for visitors.")
      .optional(),
  })
  .readonly();

const loadPackageEnv = () => {
  const envMode = modeSchema.parse(process.env.NODE_ENV);
  const requiredPrefix = "";

  return loadEnv(envMode, process.cwd(), requiredPrefix);
};

const rawEnv = loadPackageEnv();
export const serverEnv = envSchema.parse(rawEnv);
