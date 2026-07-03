"use client"

import * as React from "react"
import { toast } from "sonner"

import type { CareerItem } from "@/db/schema"
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { CAREER_CATEGORIES, CATEGORY_META, type CareerCategory } from "@/lib/career"
import { careerStatusMeta } from "@/lib/ui"
import { upsertCareerItem } from "@/app/actions/career"

const STATUSES = ["todo", "in_progress", "done"] as const
type CareerStatus = (typeof STATUSES)[number]

export function CareerItemDialog({
  trigger,
  item,
  defaultCategory,
}: {
  trigger: React.ReactNode
  item?: CareerItem
  defaultCategory?: CareerCategory
}) {
  const [open, setOpen] = React.useState(false)
  const [title, setTitle] = React.useState(item?.title ?? "")
  const [category, setCategory] = React.useState<CareerCategory>(
    (item?.category as CareerCategory) ?? defaultCategory ?? "resume"
  )
  const [status, setStatus] = React.useState<CareerStatus>(
    (item?.status as CareerStatus) ?? "todo"
  )
  const [targetDate, setTargetDate] = React.useState(item?.targetDate ?? "")
  const [notes, setNotes] = React.useState(item?.notes ?? "")
  const [pending, startTransition] = React.useTransition()

  function submit() {
    if (!title.trim()) {
      toast.error("Title is required")
      return
    }
    startTransition(async () => {
      const res = await upsertCareerItem({
        id: item?.id,
        title: title.trim(),
        category,
        status,
        targetDate,
        notes,
      })
      if (res.success) {
        toast.success(item ? "Item updated" : "Item added")
        setOpen(false)
      } else {
        toast.error(res.error ?? "Could not save")
      }
    })
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{item ? "Edit item" : "Add career item"}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <Label htmlFor="ci-title" className="hq-overline text-hq-text-muted">
              Title
            </Label>
            <Input
              id="ci-title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="mt-1.5"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label className="hq-overline text-hq-text-muted">Category</Label>
              <Select
                value={category}
                onValueChange={(v) => setCategory(v as CareerCategory)}
              >
                <SelectTrigger className="mt-1.5 w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {CAREER_CATEGORIES.map((c) => (
                    <SelectItem key={c} value={c}>
                      {CATEGORY_META[c].label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="hq-overline text-hq-text-muted">Status</Label>
              <Select
                value={status}
                onValueChange={(v) => setStatus(v as CareerStatus)}
              >
                <SelectTrigger className="mt-1.5 w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {STATUSES.map((s) => (
                    <SelectItem key={s} value={s}>
                      {careerStatusMeta(s).label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <Label htmlFor="ci-date" className="hq-overline text-hq-text-muted">
              Target date
            </Label>
            <Input
              id="ci-date"
              type="date"
              value={targetDate ?? ""}
              onChange={(e) => setTargetDate(e.target.value)}
              className="mt-1.5 font-mono"
            />
          </div>

          <div>
            <Label htmlFor="ci-notes" className="hq-overline text-hq-text-muted">
              Notes
            </Label>
            <Textarea
              id="ci-notes"
              value={notes ?? ""}
              onChange={(e) => setNotes(e.target.value)}
              className="mt-1.5 min-h-20"
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
            {pending ? "Saving…" : item ? "Save changes" : "Add item"}
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
