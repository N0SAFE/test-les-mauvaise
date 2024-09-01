import { drizzle } from "drizzle-orm/better-sqlite3";
import Database from "better-sqlite3";
import * as schema from "@/lib/db/schema";
import { validateEnvSafe } from "#/env";

const env = validateEnvSafe(process.env);

const sqlite = new Database(env.data?.DATABASE_URL);
export const db = drizzle(sqlite, { schema, logger: true });