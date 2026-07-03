"use client"

import * as React from "react"
import { Check } from "lucide-react"
import { toast } from "sonner"

import { markSkillComplete } from "@/app/actions/roadmap"

export function MarkCompleteButton({ skillId }: { skillId: string }) {
  const [pending, startTransition] = React.useTransition()
  const [done, setDone] = React.useState(false)

  function onClick() {
    startTransition(async () => {
      const res = await markSkillComplete(skillId)
      if (res.success) {
        setDone(true)
        toast.success("Marked as completed ✓")
      } else {
        toast.error(res.error ?? "Update failed")
      }
    })
  }

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={pending || done}
      className="hq-display inline-flex items-center gap-2 rounded-sm bg-hq-accent px-4 py-2.5 text-xs font-bold text-hq-bg transition-colors duration-150 hover:bg-hq-accent/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-hq-accent disabled:opacity-60"
    >
      <Check className="size-4" />
      {done ? "Completed" : pending ? "Saving…" : "Mark as Completed"}
    </button>
  )
}
