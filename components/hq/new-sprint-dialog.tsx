"use client"

import * as React from "react"
import { Plus } from "lucide-react"
import { toast } from "sonner"

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { createSprint } from "@/app/actions/sprints"
import { formatWeekLabel } from "@/lib/format"

export function NewSprintDialog({
  defaultWeekStart,
}: {
  defaultWeekStart: string
}) {
  const [open, setOpen] = React.useState(false)
  const [weekStart, setWeekStart] = React.useState(defaultWeekStart)
  const [focus, setFocus] = React.useState("")
  const [pending, startTransition] = React.useTransition()

  function submit() {
    const weekLabel = formatWeekLabel(weekStart)
    startTransition(async () => {
      const res = await createSprint({ weekStart, weekLabel, focus })
      if (res.success) {
        toast.success("Sprint created")
        setOpen(false)
        setFocus("")
      } else {
        toast.error(res.error ?? "Could not create sprint")
      }
    })
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm" variant="outline" className="gap-1.5">
          <Plus className="size-4" /> New Sprint
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>New weekly sprint</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <Label htmlFor="week-start" className="hq-overline text-hq-text-muted">
              Week start (Monday)
            </Label>
            <Input
              id="week-start"
              type="date"
              value={weekStart}
              onChange={(e) => setWeekStart(e.target.value)}
              className="mt-1.5 font-mono"
            />
            <p className="mt-1 font-mono text-xs text-hq-text-muted">
              {formatWeekLabel(weekStart)}
            </p>
          </div>
          <div>
            <Label htmlFor="week-focus" className="hq-overline text-hq-text-muted">
              Focus (optional)
            </Label>
            <Textarea
              id="week-focus"
              value={focus}
              onChange={(e) => setFocus(e.target.value)}
              placeholder="What's the theme of this week?"
              className="mt-1.5 min-h-16"
            />
          </div>
        </div>
        <DialogFooter>
          <button
            type="button"
            onClick={submit}
            disabled={pending}
            className="hq-display inline-flex items-center justify-center rounded-sm bg-hq-accent px-4 py-2.5 text-xs font-bold text-hq-bg transition-colors duration-150 hover:bg-hq-accent/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-hq-accent disabled:opacity-50"
          >
            {pending ? "Creating…" : "Create sprint"}
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
