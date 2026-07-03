import { drizzle } from "drizzle-orm/postgres-js"
import postgres from "postgres"

import * as schema from "./schema"

// Prefer the Supabase connection when present; fall back to local Postgres.
const connectionString =
  process.env.DATABASE_URL_SUPABASE ?? process.env.DATABASE_URL

if (!connectionString) {
  throw new Error("DATABASE_URL is not set. See .env.local.example.")
}

// Reuse a single postgres client across hot-reloads in dev.
const globalForDb = globalThis as unknown as {
  client: ReturnType<typeof postgres> | undefined
}

const client = globalForDb.client ?? postgres(connectionString, { prepare: false })
if (process.env.NODE_ENV !== "production") globalForDb.client = client

export const db = drizzle(client, { schema })
export { schema }
