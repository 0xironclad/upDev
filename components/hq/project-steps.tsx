"use client"

import * as React from "react"
import { Check } from "lucide-react"

import { cn } from "@/lib/utils"

/**
 * Implementation-step checklist. Step-level completion is personal scratch
 * state, so it lives in localStorage (no DB column), keyed by project id.
 */
export function ProjectSteps({
  projectId,
  steps,
}: {
  projectId: string
  steps: string[]
}) {
  const storageKey = `updev:project-steps:${projectId}`
  // Server + first client render must match (all unchecked); real state is
  // restored from localStorage after mount, then flagged hydrated.
  const [state, setState] = React.useState<{
    checked: boolean[]
    hydrated: boolean
  }>(() => ({ checked: steps.map(() => false), hydrated: false }))
  const { checked, hydrated } = state

  React.useEffect(() => {
    let restored = steps.map(() => false)
    try {
      const raw = localStorage.getItem(storageKey)
      if (raw) {
        const parsed = JSON.parse(raw) as boolean[]
        restored = steps.map((_, i) => parsed[i] ?? false)
      }
    } catch {
      // ignore malformed storage
    }
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setState({ checked: restored, hydrated: true })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [storageKey])

  function toggle(i: number) {
    setState((prev) => {
      const nextChecked = prev.checked.map((v, idx) => (idx === i ? !v : v))
      try {
        localStorage.setItem(storageKey, JSON.stringify(nextChecked))
      } catch {
        // ignore write failures (private mode, etc.)
      }
      return { checked: nextChecked, hydrated: true }
    })
  }

  const doneCount = checked.filter(Boolean).length

  return (
    <div>
      <div className="mb-2 font-mono text-xs text-hq-text-muted">
        {hydrated ? `${doneCount}/${steps.length} steps` : `${steps.length} steps`}
      </div>
      <ol className="space-y-2">
        {steps.map((step, i) => {
          // steps come as "1. text" — split the leading number for styling
          const match = step.match(/^(\d+)\.\s*(.*)$/)
          const num = match ? match[1] : String(i + 1)
          const text = match ? match[2] : step
          const isChecked = checked[i]
          return (
            <li key={i}>
              <button
                type="button"
                onClick={() => toggle(i)}
                aria-pressed={isChecked}
                className="flex w-full items-start gap-3 rounded-sm text-left focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-hq-accent"
              >
                <span
                  className={cn(
                    "mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-sm border transition-colors duration-150",
                    isChecked
                      ? "border-hq-text bg-hq-text text-hq-bg"
                      : "border-hq-border text-transparent hover:border-hq-text/60"
                  )}
                >
                  <Check className="size-3.5" />
                </span>
                <span className="flex gap-2 text-sm">
                  <span className="font-mono text-hq-accent">{num}.</span>
                  <span
                    className={cn(
                      "text-hq-text",
                      isChecked && "text-hq-text-muted line-through"
                    )}
                  >
                    {text}
                  </span>
                </span>
              </button>
            </li>
          )
        })}
      </ol>
    </div>
  )
}
