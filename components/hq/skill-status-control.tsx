"use client"

import * as React from "react"
import { toast } from "sonner"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { skillStatusMeta, type Accent } from "@/lib/ui"
import { cn } from "@/lib/utils"
import { updateSkillStatus } from "@/app/actions/roadmap"

const STATUSES = [
  "not_started",
  "in_progress",
  "reviewing",
  "completed",
  "blocked",
] as const

const TONE_TEXT: Record<Accent, string> = {
  amber: "text-hq-accent",
  green: "text-hq-text",
  cyan: "text-hq-text-secondary",
  red: "text-hq-danger",
  muted: "text-hq-text-muted",
}

export function SkillStatusControl({
  skillId,
  status,
}: {
  skillId: string
  status: string
}) {
  const [optimisticStatus, setOptimisticStatus] = React.useOptimistic(status)
  const [, startTransition] = React.useTransition()

  function onValueChange(next: string) {
    startTransition(async () => {
      setOptimisticStatus(next)
      const res = await updateSkillStatus(skillId, next)
      if (!res.success) toast.error(res.error ?? "Update failed")
    })
  }

  const meta = skillStatusMeta(optimisticStatus)

  return (
    <Select value={optimisticStatus} onValueChange={onValueChange}>
      <SelectTrigger
        size="sm"
        className={cn(
          "w-[11rem] font-mono text-xs tracking-wider uppercase",
          TONE_TEXT[meta.accent]
        )}
      >
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {STATUSES.map((s) => {
          const m = skillStatusMeta(s)
          return (
            <SelectItem key={s} value={s} className="font-mono text-xs">
              {m.label}
            </SelectItem>
          )
        })}
      </SelectContent>
    </Select>
  )
}
