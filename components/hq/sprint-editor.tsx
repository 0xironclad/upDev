"use client"

import * as React from "react"

import type { WeeklySprint } from "@/db/schema"
import { cn } from "@/lib/utils"
import { sprintStatusMeta } from "@/lib/ui"
import { StatusBadge } from "@/components/hq/status-badge"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { updateSprint } from "@/app/actions/sprints"
import { toast } from "sonner"

type TextField = "focus" | "wins" | "blockers" | "revisit"

const FIELDS: { key: TextField; label: string; placeholder: string }[] = [
  { key: "focus", label: "Focus", placeholder: "What are you focused on this week?" },
  { key: "wins", label: "Wins", placeholder: "What worked well?" },
  { key: "blockers", label: "Blockers", placeholder: "What are you stuck on?" },
  { key: "revisit", label: "Revisit", placeholder: "What do you need to come back to?" },
]

export function SprintEditor({ sprint }: { sprint: WeeklySprint }) {
  const status = sprintStatusMeta(sprint.status)
  const [savedAt, setSavedAt] = React.useState(false)
  const [, startTransition] = React.useTransition()

  // Track the last-saved value per field to avoid redundant saves on blur.
  const saved = React.useRef<Record<TextField, string>>({
    focus: sprint.focus ?? "",
    wins: sprint.wins ?? "",
    blockers: sprint.blockers ?? "",
    revisit: sprint.revisit ?? "",
  })

  function flashSaved() {
    setSavedAt(true)
    window.setTimeout(() => setSavedAt(false), 1500)
  }

  function persist(fields: Parameters<typeof updateSprint>[1]) {
    startTransition(async () => {
      const res = await updateSprint(sprint.id, fields)
      if (res.success) flashSaved()
      else toast.error(res.error ?? "Save failed")
    })
  }

  function onBlurField(key: TextField, value: string) {
    if (value === saved.current[key]) return
    saved.current[key] = value
    persist({ [key]: value })
  }

  function setDays(days: number) {
    if (days === sprint.daysStudied) return
    persist({ daysStudied: days })
  }

  return (
    <div className="rounded-md border border-hq-border bg-hq-surface p-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="font-mono text-sm text-hq-text">{sprint.weekLabel}</div>
        <div className="flex items-center gap-2">
          {savedAt && (
            <span className="font-mono text-xs text-hq-green">Saved</span>
          )}
          <StatusBadge label={status.label} tone={status.accent} />
        </div>
      </div>

      {/* Days studied dot tracker */}
      <div className="mt-4">
        <Label className="font-mono text-[10px] uppercase tracking-widest text-hq-text-muted">
          Days studied
        </Label>
        <div className="mt-1.5 flex items-center gap-2">
          <div className="flex gap-1.5">
            {Array.from({ length: 7 }).map((_, i) => {
              const filled = i < sprint.daysStudied
              return (
                <button
                  key={i}
                  type="button"
                  aria-label={`Set ${i + 1} days`}
                  onClick={() => setDays(i + 1 === sprint.daysStudied ? i : i + 1)}
                  className={cn(
                    "size-4 rounded-full border transition-colors",
                    filled
                      ? "border-hq-green bg-hq-green"
                      : "border-hq-border hover:border-hq-green/60"
                  )}
                />
              )
            })}
          </div>
          <span className="font-mono text-xs text-hq-text-muted">
            {sprint.daysStudied}/7
          </span>
        </div>
      </div>

      {/* Text fields */}
      <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
        {FIELDS.map(({ key, label, placeholder }) => (
          <div key={key} className={key === "focus" ? "sm:col-span-2" : ""}>
            <Label
              htmlFor={`${sprint.id}-${key}`}
              className="font-mono text-[10px] uppercase tracking-widest text-hq-text-muted"
            >
              {label}
            </Label>
            <Textarea
              id={`${sprint.id}-${key}`}
              defaultValue={sprint[key] ?? ""}
              placeholder={placeholder}
              onBlur={(e) => onBlurField(key, e.target.value)}
              className="mt-1.5 min-h-16 resize-y bg-hq-bg font-sans text-sm"
            />
          </div>
        ))}
      </div>
    </div>
  )
}
