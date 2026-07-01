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
      className="inline-flex items-center gap-2 rounded-sm border border-hq-green/40 bg-hq-green/10 px-3 py-1.5 text-sm text-hq-green transition-colors hover:bg-hq-green/20 disabled:opacity-60"
    >
      <Check className="size-4" />
      {done ? "Completed" : pending ? "Saving…" : "Mark as Completed"}
    </button>
  )
}
