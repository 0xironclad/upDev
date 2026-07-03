import { isSupabaseConfigured } from "@/lib/supabase/config"
import { createClient } from "@/lib/supabase/server"

type OwnerCheck = { ok: true } | { ok: false; error: string }

/**
 * Authorization for mutations. Middleware only gates page navigation —
 * every server action must verify the caller's identity itself.
 * - Supabase unconfigured: allow in dev (dormant mode), refuse in prod.
 * - Configured: require a session; if OWNER_EMAIL is set, require it to match.
 */
export async function requireOwner(): Promise<OwnerCheck> {
  if (!isSupabaseConfigured()) {
    if (process.env.NODE_ENV === "production") {
      return { ok: false, error: "Auth is not configured." }
    }
    return { ok: true }
  }

  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) return { ok: false, error: "Not signed in." }

  const owner = process.env.OWNER_EMAIL?.trim().toLowerCase()
  if (owner && user.email?.toLowerCase() !== owner) {
    return { ok: false, error: "Not authorized." }
  }
  return { ok: true }
}
