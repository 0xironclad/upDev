import type { WeeklySprint } from "@/db/schema"
import { formatShortDate } from "@/lib/format"
import { cn } from "@/lib/utils"
import { SectionLabel } from "@/components/hq/section-label"

const DAY_MS = 24 * 60 * 60 * 1000

function sumRecentDays(
  weeks: (WeeklySprint & { weekStart: string })[],
  now = new Date()
): number {
  const nowMs = now.getTime()
  return weeks.reduce((sum, week) => {
    const start = new Date(`${week.weekStart}T00:00:00`).getTime()
    const withinFourWeeks = Math.abs(nowMs - start) <= 28 * DAY_MS
    return withinFourWeeks ? sum + week.daysStudied : sum
  }, 0)
}

/** Streak view: last 12 sprints as one dot-column per week. */
export function StudyActivity({ sprints }: { sprints: WeeklySprint[] }) {
  const weeks = sprints
    .filter(
      (s): s is WeeklySprint & { weekStart: string } => s.weekStart !== null
    )
    .sort((a, b) => a.weekStart.localeCompare(b.weekStart))
    .slice(-12)

  if (weeks.length === 0) return null

  const recentDays = sumRecentDays(weeks)

  return (
    <div>
      <SectionLabel>Study Activity</SectionLabel>
      <p className="mt-1 font-mono text-xs text-hq-text-secondary">
        {recentDays} days studied in the last 4 weeks
      </p>
      <div className="mt-3 overflow-x-auto">
        <div className="flex gap-3">
          {weeks.map((week) => (
            <div key={week.id} className="flex flex-col items-center gap-1.5">
              <div className="flex flex-col gap-1">
                {Array.from({ length: 7 }).map((_, i) => (
                  <div
                    key={i}
                    className={cn(
                      "size-2 rounded-full transition-colors duration-150",
                      i < week.daysStudied ? "bg-hq-text" : "bg-hq-border"
                    )}
                  />
                ))}
              </div>
              <span className="font-mono text-[10px] text-hq-text-muted">
                {formatShortDate(week.weekStart)}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
