"use client"

import * as React from "react"
import { Check } from "lucide-react"
import { toast } from "sonner"

import { cn } from "@/lib/utils"
import { markSkillComplete, updateSkillStatus } from "@/app/actions/roadmap"

/**
 * Small checkbox that toggles a skill between completed / not_started.
 * Rendered inside the (linked) skill card, so it stops navigation on click.
 */
export function SkillCompleteToggle({
  skillId,
  isDone,
}: {
  skillId: string
  isDone: boolean
}) {
  const [optimisticDone, setOptimisticDone] = React.useOptimistic(isDone)
  const [, startTransition] = React.useTransition()

  function onClick(e: React.MouseEvent) {
    e.preventDefault()
    e.stopPropagation()
    const next = !optimisticDone
    startTransition(async () => {
      setOptimisticDone(next)
      const res = next
        ? await markSkillComplete(skillId)
        : await updateSkillStatus(skillId, "not_started")
      if (!res.success) toast.error(res.error ?? "Update failed")
    })
  }

  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={optimisticDone}
      aria-label={optimisticDone ? "Mark not started" : "Mark completed"}
      className={cn(
        "flex size-5 items-center justify-center rounded-sm border transition-colors duration-150",
        optimisticDone
          ? "border-hq-green bg-hq-green/20 text-hq-green"
          : "border-hq-border text-transparent hover:border-hq-green/60"
      )}
    >
      <Check className="size-3.5" />
    </button>
  )
}
