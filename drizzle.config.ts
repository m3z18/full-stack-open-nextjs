import { defineConfig } from "drizzle-kit"
import * as dotenv from "dotenv"
import { existsSync, readFileSync } from "node:fs"

// Load .env.test in test environment, otherwise .env.local
const envFile = process.env.NODE_ENV === "test" ? ".env.test" : ".env.local"
dotenv.config({ path: envFile, override: true })

if (!process.env.DATABASE_URL) {
  throw new Error(`DATABASE_URL is not configured in ${envFile}`)
}

if (envFile === ".env.test" && existsSync(".env.local")) {
  const localEnv = dotenv.parse(readFileSync(".env.local"))

  if (localEnv.DATABASE_URL === process.env.DATABASE_URL) {
    throw new Error("The test database must be different from the local database")
  }
}

export default defineConfig({
  schema: "./db/schema.ts",
  out: "./drizzle",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL,
  },
})
