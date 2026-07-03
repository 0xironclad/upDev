"use client"

import * as React from "react"
import { toast } from "sonner"

import type { CareerItem } from "@/db/schema"
import { cn } from "@/lib/utils"
import { accent, careerStatusMeta } from "@/lib/ui"
import { formatShortDate } from "@/lib/format"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { CareerItemDialog } from "@/components/hq/career-item-dialog"
import { updateCareerStatus } from "@/app/actions/career"

const NEXT_STATUS: Record<string, string> = {
  todo: "in_progress",
  in_progress: "done",
  done: "todo",
}

export function CareerItemCard({ item }: { item: CareerItem }) {
  const [optimisticStatus, setOptimisticStatus] = React.useOptimistic(item.status)
  const [, startTransition] = React.useTransition()
  const meta = careerStatusMeta(optimisticStatus)
  const date = formatShortDate(item.targetDate)

  function cycleStatus(e: React.MouseEvent) {
    e.preventDefault()
    e.stopPropagation()
    const next = NEXT_STATUS[optimisticStatus] ?? "todo"
    startTransition(async () => {
      setOptimisticStatus(next)
      const res = await updateCareerStatus(item.id, next)
      if (!res.success) toast.error(res.error ?? "Update failed")
      else if (next === "done") toast.success(`✓ ${item.title}`)
    })
  }

  return (
    <CareerItemDialog
      item={item}
      trigger={
        <div
          role="button"
          tabIndex={0}
          className="cursor-pointer rounded-md border border-hq-border bg-hq-surface p-3 transition-colors hover:border-hq-amber/40 hover:bg-hq-elevated"
        >
          <div className="text-sm font-medium text-hq-text">{item.title}</div>

          <div className="mt-2 flex items-center justify-between gap-2">
            <button
              type="button"
              onClick={cycleStatus}
              aria-label="Cycle status"
              className={cn(
                "rounded-sm border px-1.5 py-0.5 font-mono text-[10px] uppercase tracking-widest transition-colors",
                accent(meta.accent).text,
                accent(meta.accent).border,
                accent(meta.accent).bg
              )}
            >
              {meta.label}
            </button>
            {date && (
              <span className="font-mono text-xs text-hq-text-muted">{date}</span>
            )}
          </div>

          {item.notes && (
            <Tooltip>
              <TooltipTrigger asChild>
                <p className="mt-2 line-clamp-2 text-xs text-hq-text-secondary">
                  {item.notes}
                </p>
              </TooltipTrigger>
              <TooltipContent className="max-w-xs">{item.notes}</TooltipContent>
            </Tooltip>
          )}
        </div>
      }
    />
  )
}
