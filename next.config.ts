import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  experimental: {
    // Client Router Cache: keep a visited page's rendered RSC payload in
    // memory so revisiting it (menu clicks, back/forward) is instant, with no
    // skeleton flash and no repeat DB query. Default for dynamic pages is 0
    // (never cached), which made every navigation re-hit Postgres. Mutations
    // call revalidatePath("/", "layout"), which busts this cache, so edits
    // still show fresh data immediately.
    staleTimes: {
      dynamic: 300,
      static: 300,
    },
  },
}

export default nextConfig
