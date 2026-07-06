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

// prepare: false — required by Supabase's transaction-mode pooler.
// idle_timeout/max_lifetime — the pooler reaps idle server connections;
// without these, a warm serverless instance can reuse a dead socket and the
// first query on it fails (pages intermittently render without data).
const client =
  globalForDb.client ??
  postgres(connectionString, {
    prepare: false,
    idle_timeout: 20,
    max_lifetime: 60 * 5,
    connect_timeout: 10,
  })
if (process.env.NODE_ENV !== "production") globalForDb.client = client

export const db = drizzle(client, { schema })
export { schema }
