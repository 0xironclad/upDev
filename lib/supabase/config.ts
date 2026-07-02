/**
 * Auth is enabled only when Supabase env vars are present. While they're
 * absent (local-first dev), the login gate stays dormant and the app works
 * without authentication.
 *
 * Accepts either the newer "publishable" key or the legacy "anon" key.
 */
export const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL ?? ""
export const SUPABASE_ANON_KEY =
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ??
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ??
  ""

export function isSupabaseConfigured(): boolean {
  return Boolean(SUPABASE_URL && SUPABASE_ANON_KEY)
}
