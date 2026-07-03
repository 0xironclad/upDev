import { NextResponse, type NextRequest } from "next/server"

import { isSupabaseConfigured } from "@/lib/supabase/config"
import { updateSession } from "@/lib/supabase/middleware"

export async function proxy(request: NextRequest) {
  // Auth gate is dormant until Supabase env vars are set (local-first dev).
  if (!isSupabaseConfigured()) {
    if (process.env.NODE_ENV === "production") {
      return new NextResponse("Auth is not configured.", { status: 503 })
    }
    return NextResponse.next()
  }
  return updateSession(request)
}

export const config = {
  matcher: [
    // Run on all routes except static assets and the favicon/icon.
    "/((?!_next/static|_next/image|favicon.ico|icon.svg|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
}
