import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight, ExternalLink } from "lucide-react"

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
import { greeting, formatLongDate } from "@/lib/format"
import { skillStatusMeta } from "@/lib/ui"
import { SectionLabel } from "@/components/hq/section-label"
import { StatusBadge } from "@/components/hq/status-badge"
import { ThinProgress } from "@/components/hq/thin-progress"
import { ProjectCard } from "@/components/hq/project-card"
import { PhaseTimeline, type PhaseNode } from "@/components/hq/phase-timeline"

export const metadata: Metadata = { title: "Dashboard" }
export const dynamic = "force-dynamic"

const panel = "rounded-md border border-hq-border bg-hq-surface p-4"

export default async function DashboardPage() {
  const [phasesWithContent, currentPhase, currentSkill, overall, nextSkill, sprint, upcoming] =
    await Promise.all([
      getPhasesWithContent(),
      getCurrentPhase(),
      getCurrentSkill(),
      getOverallProgress(),
      getNextSkill(),
      getActiveSprint(),
      getUpcomingProjects(3),
    ])

  const phaseProgressOf = (phaseId: string) => {
    const p = phasesWithContent.find((x) => x.id === phaseId)
    const total = p?.skills.length ?? 0
    const completed = p?.skills.filter((s) => s.isDone).length ?? 0
    return {
      total,
      completed,
      percentage: total === 0 ? 0 : Math.round((completed / total) * 100),
    }
  }

  const currentPhaseProgress = currentPhase
    ? phaseProgressOf(currentPhase.id)
    : { total: 0, completed: 0, percentage: 0 }

  const nodes: PhaseNode[] = phasesWithContent.map((p): PhaseNode => {
    const prog = phaseProgressOf(p.id)
    const done = prog.total > 0 && prog.completed === prog.total
    return {
      id: p.id,
      number: p.number,
      name: p.name,
      state: done ? "completed" : p.id === currentPhase?.id ? "active" : "future",
    }
  })

  const nextAction = nextSkill ?? currentSkill
  const activeMeta = currentSkill ? skillStatusMeta(currentSkill.status) : null

  return (
    <div className="mx-auto max-w-4xl px-6 py-8">
      {/* HQ Header */}
      <header>
        <div className="font-mono text-xs uppercase tracking-widest text-hq-text-muted">
          Cracked Dev HQ
        </div>
        <h1 className="mt-1 text-3xl font-bold text-hq-text">
          {greeting()}, Collins.
        </h1>
        <p className="mt-1 text-sm text-hq-text-secondary">{formatLongDate()}</p>
      </header>

      {/* Status strip */}
      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
        {/* Current Phase */}
        <div className={panel}>
          <div className="font-mono text-[10px] uppercase tracking-widest text-hq-text-muted">
            Current Phase
          </div>
          {currentPhase ? (
            <>
              <div className="mt-1 font-mono text-4xl font-bold text-hq-amber">
                {String(currentPhase.number).padStart(2, "0")}
              </div>
              <div className="mt-1 text-sm font-semibold text-hq-text">
                {currentPhase.name}
              </div>
              <div className="text-xs text-hq-text-secondary">
                {currentPhase.window}
              </div>
              <ThinProgress
                className="mt-3"
                value={currentPhaseProgress.percentage}
              />
            </>
          ) : (
            <p className="mt-2 text-sm text-hq-text-muted">No active phase.</p>
          )}
        </div>

        {/* Active Skill */}
        <div className={panel}>
          <div className="font-mono text-[10px] uppercase tracking-widest text-hq-text-muted">
            Active Skill
          </div>
          {currentSkill ? (
            <>
              <div className="mt-1 font-mono text-xs uppercase text-hq-text-muted">
                {currentSkill.id} · {currentSkill.category}
              </div>
              <div className="mt-1 text-sm font-semibold text-hq-text">
                {currentSkill.title}
              </div>
              {activeMeta && (
                <div className="mt-2">
                  <StatusBadge label={activeMeta.label} tone={activeMeta.accent} />
                </div>
              )}
              {currentSkill.linearIssueId && (
                <div className="mt-2 inline-flex items-center gap-1 rounded-sm bg-hq-elevated px-1.5 py-0.5 font-mono text-xs text-hq-cyan">
                  {currentSkill.linearIssueId}
                  <ExternalLink className="size-3" />
                </div>
              )}
            </>
          ) : (
            <p className="mt-2 text-sm text-hq-text-muted">No active skill.</p>
          )}
        </div>

        {/* Overall Progress */}
        <div className={panel}>
          <div className="font-mono text-[10px] uppercase tracking-widest text-hq-text-muted">
            Overall Progress
          </div>
          <div className="mt-1 font-mono text-4xl font-bold text-hq-green">
            {overall.percentage}%
          </div>
          <div className="text-sm text-hq-text-secondary">
            {overall.completed} of {overall.total} skills completed
          </div>
          <ThinProgress className="mt-3" value={overall.percentage} tone="green" />
          <div className="mt-1.5 font-mono text-xs text-hq-text-muted">
            Phase {currentPhase?.number ?? "–"} of {phasesWithContent.length}
          </div>
        </div>
      </div>

      {/* Next action */}
      {nextAction && (
        <section className="mt-6">
          <SectionLabel>Next Action</SectionLabel>
          <div
            className={`${panel} mt-2 flex items-center gap-4 bg-hq-elevated`}
          >
            <div className="flex size-10 shrink-0 items-center justify-center rounded-sm bg-hq-amber/15 font-mono text-sm font-bold text-hq-amber uppercase">
              {nextAction.id}
            </div>
            <div className="min-w-0 flex-1">
              <div className="text-lg font-semibold text-hq-text">
                {nextAction.title}
              </div>
              {nextAction.whyItMatters && (
                <p className="mt-0.5 line-clamp-1 text-sm text-hq-text-secondary">
                  {nextAction.whyItMatters}
                </p>
              )}
            </div>
            <Link
              href={`/roadmap/skills/${nextAction.slug}`}
              className="inline-flex shrink-0 items-center gap-1.5 rounded-sm border border-hq-amber/40 bg-hq-amber/10 px-3 py-1.5 text-sm text-hq-amber transition-colors hover:bg-hq-amber/20"
            >
              Open in Roadmap
              <ArrowRight className="size-4" />
            </Link>
          </div>
        </section>
      )}

      {/* This week */}
      <section className="mt-6">
        <SectionLabel>This Week</SectionLabel>
        <div className={`${panel} mt-2`}>
          {sprint ? (
            <>
              <div className="flex items-center justify-between gap-3">
                <div className="font-mono text-xs text-hq-text-secondary">
                  {sprint.weekLabel}
                </div>
                <div className="flex gap-1">
                  {Array.from({ length: 7 }).map((_, i) => (
                    <span
                      key={i}
                      className={
                        i < sprint.daysStudied
                          ? "size-2 rounded-full bg-hq-green"
                          : "size-2 rounded-full border border-hq-border"
                      }
                    />
                  ))}
                </div>
              </div>
              <p className="mt-2 text-sm text-hq-text">{sprint.focus}</p>
              {!sprint.wins && (
                <p className="mt-2 text-sm text-hq-text-muted">
                  No wins logged yet. Open the sprint to add.
                </p>
              )}
              <Link
                href="/sprints"
                className="mt-3 inline-block font-mono text-xs text-hq-cyan hover:underline"
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
        <section className="mt-6">
          <SectionLabel>Upcoming Projects</SectionLabel>
          <div className="mt-2 grid grid-cols-1 gap-4 sm:grid-cols-3">
            {upcoming.map((p) => (
              <ProjectCard key={p.id} project={p} />
            ))}
          </div>
        </section>
      )}

      {/* Phase timeline */}
      <section className="mt-8">
        <SectionLabel>Phase Timeline</SectionLabel>
        <div className={`${panel} mt-2`}>
          <PhaseTimeline nodes={nodes} />
        </div>
      </section>
    </div>
  )
}
