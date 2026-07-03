"use client"

import "./globals.css"

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <html lang="en">
      <body className="bg-hq-bg text-hq-text">
        <div className="mx-auto mt-16 max-w-md rounded-md border border-hq-border bg-hq-surface p-6">
          <p className="hq-overline text-hq-danger">Something broke</p>
          <p className="mt-2 text-sm text-hq-text-secondary">{error.message}</p>
          <button
            onClick={() => reset()}
            className="mt-4 rounded-sm border border-hq-border px-3 py-1.5 font-mono text-xs tracking-widest text-hq-text uppercase transition-colors duration-150 hover:bg-hq-elevated focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-hq-accent"
          >
            Retry
          </button>
        </div>
      </body>
    </html>
  )
}
