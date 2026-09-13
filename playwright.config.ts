import { existsSync, readFileSync } from "node:fs"
import { defineConfig } from "@playwright/test"
import { parse } from "dotenv"

if (!existsSync(".env.test")) {
  throw new Error(
    "Create .env.test with a separate test DATABASE_URL before running Playwright",
  )
}

const testEnv = parse(readFileSync(".env.test"))
const localEnv = existsSync(".env.local")
  ? parse(readFileSync(".env.local"))
  : {}
const databaseUrl = testEnv.DATABASE_URL
const authSecret = testEnv.AUTH_SECRET ?? testEnv.NEXTAUTH_SECRET
const baseURL = testEnv.NEXTAUTH_URL ?? "http://localhost:3000"

if (!databaseUrl) {
  throw new Error("DATABASE_URL is not configured in .env.test")
}

if (databaseUrl === localEnv.DATABASE_URL) {
  throw new Error("The test database must be different from the local database")
}

if (!authSecret) {
  throw new Error("AUTH_SECRET or NEXTAUTH_SECRET is not configured in .env.test")
}

if (baseURL !== "http://localhost:3000") {
  throw new Error("NEXTAUTH_URL in .env.test must be http://localhost:3000")
}

export default defineConfig({
  testDir: "./tests",
  fullyParallel: false,
  workers: 1,
  use: {
    baseURL,
    trace: "on-first-retry",
  },
  webServer: {
    command: "npm run dev",
    url: baseURL,
    reuseExistingServer: false,
    env: {
      DATABASE_URL: databaseUrl,
      AUTH_SECRET: authSecret,
      NEXTAUTH_SECRET: authSecret,
      NEXTAUTH_URL: baseURL,
    },
  },
})
