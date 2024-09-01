import { defineConfig } from "drizzle-kit";
import { validateEnv } from "./env";

const env = validateEnv(process.env);

export default defineConfig({
    schema: "./src/lib/db/schema.ts",
    out: "./drizzle",
    dialect: "sqlite",
    dbCredentials: {
        url: env.DATABASE_URL
    },
    verbose: true,
    strict: true
});
