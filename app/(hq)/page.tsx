import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

import {
  getCurrentPhase,
  getCurrentSkill,
  getNextSkill,
  getOverallProgress,
} from "@/lib/progress"
import {
  getActiveSprint,
  getPhasesWithContent,
  getUpcomingProjects,
} from "@/lib/data/roadmap"
import { buildRoute, formatAltitude } from "@/lib/route"
import { greeting, formatLongDate } from "@/lib/format"
import { skillStatusMeta } from "@/lib/ui"
import { SectionLabel } from "@/components/hq/section-label"
import { ProjectCard } from "@/components/hq/project-card"
import { RouteChart } from "@/components/hq/route-chart"

export const metadata: Metadata = { title: "Dashboard" }
export const dynamic = "force-dynamic"

const DAY = 86_400_000

function daysUntil(date: string, now: Date = new Date()): number {
  return Math.max(
    0,
    Math.ceil((Date.parse(`${date}T00:00:00Z`) - now.getTime()) / DAY)
  )
}

export default async function DashboardPage() {
  const [
    phasesWithContent,
    currentPhase,
    currentSkill,
    overall,
    nextSkill,
    sprint,
    upcoming,
  ] = await Promise.all([
    getPhasesWithContent(),
    getCurrentPhase(),
    getCurrentSkill(),
    getOverallProgress(),
    getNextSkill(),
    getActiveSprint(),
    getUpcomingProjects(3),
  ])

  const geo = buildRoute(phasesWithContent)
  const nextAction = nextSkill ?? currentSkill
  const activeMeta = currentSkill ? skillStatusMeta(currentSkill.status) : null

  const daysToCamp = currentPhase?.dateEnd
    ? daysUntil(currentPhase.dateEnd)
    : null

  return (
    <div className="mx-auto max-w-4xl px-6 py-8">
      {/* Header: where am I, at a glance */}
      <header>
        <div className="hq-overline text-hq-text-muted">
          {formatLongDate()}
        </div>
        <h1 className="hq-display mt-2 text-4xl font-extrabold text-hq-text">
          {greeting()}, Collins
        </h1>
        <p className="mt-2 font-mono text-xs text-hq-text-secondary">
          {overall.completed} of {overall.total} waypoints cleared ·{" "}
          {currentPhase
            ? `Camp ${currentPhase.number}: ${currentPhase.name}`
            : "Route complete"}
        </p>
      </header>

      {/* The Route, mini */}
      <div className="mt-6 rounded-lg border border-hq-border bg-hq-surface p-4">
        <div className="flex items-baseline justify-between">
          <span className="hq-overline text-hq-text-muted">The Route</span>
          <span className="font-mono text-xs text-hq-text-secondary">
            {formatAltitude(geo)}
          </span>
        </div>
        <Link
          href="/roadmap"
          aria-label="Open the roadmap"
          className="mt-2 block rounded-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-hq-accent"
        >
          <RouteChart geo={geo} variant="mini" />
        </Link>
      </div>

      {/* Status strip: one bordered band, not three hero cards */}
      <div className="mt-6 grid grid-cols-1 divide-y divide-hq-border rounded-lg border border-hq-border sm:grid-cols-3 sm:divide-x sm:divide-y-0">
        <div className="p-4">
          <div className="hq-overline text-hq-text-muted">
            Current waypoint
          </div>
          {currentSkill ? (
            <Link
              href={`/roadmap/skills/${currentSkill.slug}`}
              className="group mt-2 block"
            >
              <div className="font-mono text-lg text-hq-accent">
                {currentSkill.id.toUpperCase()}
                {activeMeta && (
                  <span className="ml-2 align-middle font-mono text-[10px] tracking-[0.2em] text-hq-text-muted">
                    {activeMeta.label}
                  </span>
                )}
              </div>
              <div className="mt-0.5 truncate text-sm text-hq-text group-hover:underline">
                {currentSkill.title}
              </div>
            </Link>
          ) : (
            <p className="mt-2 text-sm text-hq-text-muted">
              Nothing on the wall.
            </p>
          )}
        </div>
        <div className="p-4">
          <div className="hq-overline text-hq-text-muted">This week</div>
          <div className="mt-2 font-mono text-lg text-hq-text tabular-nums">
            {sprint?.daysStudied ?? 0}
            <span className="text-hq-text-muted">/7</span>
          </div>
          <div className="mt-1 flex gap-1.5" aria-hidden>
            {Array.from({ length: 7 }).map((_, i) => (
              <span
                key={i}
                className={
                  i < (sprint?.daysStudied ?? 0)
                    ? "size-2 rounded-full bg-hq-text"
                    : "size-2 rounded-full border border-hq-border"
                }
              />
            ))}
          </div>
        </div>
        <div className="p-4">
          <div className="hq-overline text-hq-text-muted">Next camp</div>
          <div className="mt-2 font-mono text-lg text-hq-text tabular-nums">
            {currentPhase && daysToCamp !== null ? (
              <>
                C{currentPhase.number}
                <span className="text-hq-text-muted">
                  {" "}
                  · {daysToCamp} days out
                </span>
              </>
            ) : (
              <span className="text-hq-text-muted">–</span>
            )}
          </div>
          <div className="mt-1 text-xs text-hq-text-secondary">
            {currentPhase?.window ?? "No active phase"}
          </div>
        </div>
      </div>

      {/* Next action */}
      {nextAction && (
        <section className="mt-10">
          <SectionLabel>Next Action</SectionLabel>
          <div className="mt-2 flex flex-wrap items-center gap-4 rounded-lg border border-hq-border bg-hq-surface p-5">
            <div className="min-w-0 flex-1">
              <div className="font-mono text-xs text-hq-accent">
                {nextAction.id.toUpperCase()}
              </div>
              <div className="mt-1 text-lg font-semibold text-hq-text">
                {nextAction.title}
              </div>
              {nextAction.whyItMatters && (
                <p className="mt-1 line-clamp-2 max-w-[60ch] text-sm text-hq-text-secondary">
                  {nextAction.whyItMatters}
                </p>
              )}
            </div>
            <Link
              href={`/roadmap/skills/${nextAction.slug}`}
              className="hq-display inline-flex shrink-0 items-center gap-2 rounded-sm bg-hq-accent px-4 py-2.5 text-xs font-bold text-hq-bg transition-colors duration-150 hover:bg-hq-accent/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-hq-accent"
            >
              Climb
              <ArrowRight className="size-4" />
            </Link>
          </div>
        </section>
      )}

      {/* This week, in words */}
      <section className="mt-10">
        <SectionLabel>This Week</SectionLabel>
        <div className="mt-2 border-t border-hq-border pt-3">
          {sprint ? (
            <>
              <div className="font-mono text-xs text-hq-text-muted">
                {sprint.weekLabel}
              </div>
              <p className="mt-1.5 max-w-[68ch] text-sm text-hq-text">
                {sprint.focus}
              </p>
              {!sprint.wins && (
                <p className="mt-1.5 text-sm text-hq-text-muted">
                  No wins logged yet. Open the sprint to add.
                </p>
              )}
              <Link
                href="/sprints"
                className="mt-2 inline-block font-mono text-xs text-hq-text-secondary underline-offset-4 hover:text-hq-text hover:underline"
              >
                Edit sprint →
              </Link>
            </>
          ) : (
            <p className="text-sm text-hq-text-muted">
              No active sprint. Create one to start tracking your week.
            </p>
          )}
        </div>
      </section>

      {/* Upcoming projects */}
      {upcoming.length > 0 && (
        <section className="mt-10">
          <SectionLabel>Upcoming Projects</SectionLabel>
          <div className="mt-2 grid grid-cols-1 gap-4 sm:grid-cols-3">
            {upcoming.map((p) => (
              <ProjectCard key={p.id} project={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  )
}
