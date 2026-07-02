import type { Metadata } from "next"

import { getSprints } from "@/lib/data/roadmap"
import { nextMonday } from "@/lib/format"
import { SectionLabel } from "@/components/hq/section-label"
import { SprintEditor } from "@/components/hq/sprint-editor"
import { NewSprintDialog } from "@/components/hq/new-sprint-dialog"

export const metadata: Metadata = { title: "Weekly Sprints" }
export const dynamic = "force-dynamic"

const statusRank: Record<string, number> = { active: 0, planned: 1, done: 2 }

export default async function SprintsPage() {
  const sprints = await getSprints()

  // active first, then planned, then done — each already newest-first by date
  const ordered = [...sprints].sort(
    (a, b) => (statusRank[a.status] ?? 3) - (statusRank[b.status] ?? 3)
  )

  const latestStart = sprints
    .map((s) => s.weekStart)
    .filter((d): d is string => Boolean(d))
    .sort()
    .at(-1)
  const suggestedStart = nextMonday(latestStart ?? null)

  const totalDays = sprints.reduce((sum, s) => sum + s.daysStudied, 0)

  return (
    <div className="mx-auto max-w-4xl px-6 py-8">
      <header className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <div className="font-mono text-xs uppercase tracking-widest text-hq-text-muted">
            Cracked Dev HQ
          </div>
          <h1 className="mt-1 text-3xl font-bold text-hq-text">Weekly Sprints</h1>
          <p className="mt-1 text-sm text-hq-text-secondary">
            {sprints.length} sprints · {totalDays} days studied total
          </p>
        </div>
        <NewSprintDialog defaultWeekStart={suggestedStart} />
      </header>

      {ordered.length > 0 ? (
        <div className="mt-8 space-y-4">
          <SectionLabel>Sprint Log</SectionLabel>
          {ordered.map((sprint) => (
            <SprintEditor key={sprint.id} sprint={sprint} />
          ))}
        </div>
      ) : (
        <div className="mt-8 rounded-md border border-hq-border bg-hq-surface p-6 text-center">
          <p className="text-sm text-hq-text-muted">
            No sprints yet. Create your first one to start tracking.
          </p>
        </div>
      )}
    </div>
  )
}
