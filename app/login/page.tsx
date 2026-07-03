"use client"

import * as React from "react"
import { useRouter } from "next/navigation"

import { createClient } from "@/lib/supabase/client"
import { isSupabaseConfigured } from "@/lib/supabase/config"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function LoginPage() {
  const router = useRouter()
  const configured = isSupabaseConfigured()
  const [email, setEmail] = React.useState("")
  const [password, setPassword] = React.useState("")
  const [error, setError] = React.useState<string | null>(null)
  const [pending, setPending] = React.useState(false)

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    setPending(true)
    try {
      const supabase = createClient()
      const { error } = await supabase.auth.signInWithPassword({ email, password })
      if (error) {
        setError(error.message)
        setPending(false)
        return
      }
      router.push("/")
      router.refresh()
    } catch {
      setError("Something went wrong. Try again.")
      setPending(false)
    }
  }

  return (
    <div className="flex min-h-svh items-center justify-center px-6">
      <div className="w-full max-w-sm rounded-md border border-hq-border bg-hq-surface p-6">
        <div className="hq-overline text-hq-text-muted">Cracked Dev HQ</div>
        <h1 className="hq-display mt-2 text-2xl font-extrabold text-hq-text">
          Welcome back, Collins.
        </h1>

        {!configured ? (
          <p className="mt-4 rounded-sm border border-hq-border bg-hq-elevated p-3 text-sm text-hq-text-secondary">
            Auth isn&apos;t configured yet. Add your Supabase env vars to enable
            sign-in.
          </p>
        ) : (
          <form onSubmit={onSubmit} className="mt-6 space-y-4">
            <div>
              <Label htmlFor="email" className="text-xs text-hq-text-muted">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1.5"
              />
            </div>
            <div>
              <Label htmlFor="password" className="text-xs text-hq-text-muted">
                Password
              </Label>
              <Input
                id="password"
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1.5"
              />
            </div>
            {error && (
              <p className="text-sm text-hq-danger" role="alert">
                {error}
              </p>
            )}
            <button
              type="submit"
              disabled={pending}
              className="hq-display inline-flex w-full items-center justify-center rounded-sm bg-hq-accent px-4 py-2.5 text-xs font-bold text-hq-bg transition-colors duration-150 hover:bg-hq-accent/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-hq-accent disabled:opacity-50"
            >
              {pending ? "Signing in…" : "Sign in"}
            </button>
          </form>
        )}
      </div>
    </div>
  )
}
