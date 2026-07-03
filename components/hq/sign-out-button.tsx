"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { LogOut } from "lucide-react"

import { createClient } from "@/lib/supabase/client"

export function SignOutButton() {
  const router = useRouter()
  const [pending, setPending] = React.useTransition()

  function signOut() {
    setPending(async () => {
      await createClient().auth.signOut()
      router.push("/login")
      router.refresh()
    })
  }

  return (
    <button
      type="button"
      onClick={signOut}
      disabled={pending}
      className="inline-flex items-center gap-1.5 font-mono text-xs text-hq-text-muted transition-colors hover:text-hq-text disabled:opacity-60"
    >
      <LogOut className="size-3.5" />
      {pending ? "Signing out…" : "Sign out"}
    </button>
  )
}
