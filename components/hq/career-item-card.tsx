"use client"

import * as React from "react"
import { toast } from "sonner"

import type { CareerItem } from "@/db/schema"
import { cn } from "@/lib/utils"
import { careerStatusMeta } from "@/lib/ui"
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

// Status is spoken in text, not hue (DESIGN.md §1): accent only marks the
// active item; done reads as solidity, queued as muted.
const STATUS_LABEL_CLASS: Record<string, string> = {
  todo: "text-hq-text-muted",
  in_progress: "text-hq-accent",
  done: "text-hq-text",
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
          className="cursor-pointer rounded-lg border border-hq-border bg-hq-surface p-3 transition-colors duration-150 hover:bg-hq-elevated focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-hq-accent"
        >
          <div
            className={cn(
              "text-sm font-medium text-hq-text",
              optimisticStatus === "done" && "line-through"
            )}
          >
            {item.title}
          </div>

          <div className="mt-2 flex items-center justify-between gap-2">
            <button
              type="button"
              onClick={cycleStatus}
              aria-label="Cycle status"
              className={cn(
                "rounded-sm font-mono text-[10px] uppercase tracking-[0.2em] transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-hq-accent",
                STATUS_LABEL_CLASS[optimisticStatus] ?? "text-hq-text-muted"
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
