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
import { projectStatusMeta, type Accent } from "@/lib/ui"
import { cn } from "@/lib/utils"
import { updateProjectStatus } from "@/app/actions/roadmap"

const STATUSES = ["not_started", "building", "polishing", "shipped"] as const

const TONE_TEXT: Record<Accent, string> = {
  amber: "text-hq-accent",
  green: "text-hq-text",
  cyan: "text-hq-text-secondary",
  red: "text-hq-danger",
  muted: "text-hq-text-muted",
}

export function ProjectStatusControl({
  projectId,
  status,
}: {
  projectId: string
  status: string
}) {
  const [optimisticStatus, setOptimisticStatus] = React.useOptimistic(status)
  const [, startTransition] = React.useTransition()

  function onValueChange(next: string) {
    startTransition(async () => {
      setOptimisticStatus(next)
      const res = await updateProjectStatus(projectId, next)
      if (!res.success) toast.error(res.error ?? "Update failed")
    })
  }

  const meta = projectStatusMeta(optimisticStatus)

  return (
    <Select value={optimisticStatus} onValueChange={onValueChange}>
      <SelectTrigger
        size="sm"
        className={cn(
          "w-[10rem] font-mono text-xs tracking-wider uppercase",
          TONE_TEXT[meta.accent]
        )}
      >
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {STATUSES.map((s) => (
          <SelectItem key={s} value={s} className="font-mono text-xs">
            {projectStatusMeta(s).label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
