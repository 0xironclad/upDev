import type { Metadata } from "next"

import { getCurrentPhase } from "@/lib/progress"
import { getPhasesWithContent } from "@/lib/data/roadmap"
import {
  buildRoute,
  formatAltitude,
  CLIMB_PER_PROJECT,
  CLIMB_PER_SKILL,
} from "@/lib/route"
import { phaseStatus } from "@/lib/ui"
import { SectionLabel } from "@/components/hq/section-label"
import { StatusBadge } from "@/components/hq/status-badge"
import { ThinProgress } from "@/components/hq/thin-progress"
import { SkillCard } from "@/components/hq/skill-card"
import { ProjectCard } from "@/components/hq/project-card"
import { RouteChart } from "@/components/hq/route-chart"

export const metadata: Metadata = { title: "Roadmap" }

export const dynamic = "force-dynamic"

export default async function RoadmapPage() {
  const [phases, currentPhase] = await Promise.all([
    getPhasesWithContent(),
    getCurrentPhase(),
  ])

  const geo = buildRoute(phases)

  const progressOf = (skills: { isDone: boolean }[]) => {
    const total = skills.length
    const completed = skills.filter((s) => s.isDone).length
    return {
      total,
      completed,
      percentage: total === 0 ? 0 : Math.round((completed / total) * 100),
    }
  }

  return (
    <div className="mx-auto max-w-4xl px-6 py-8">
      <header>
        <div className="hq-overline text-hq-text-muted">
          Cracked Dev HQ · Expedition
        </div>
        <h1 className="hq-display mt-2 text-4xl font-extrabold text-hq-text">
          Roadmap
        </h1>
        <p className="mt-2 font-mono text-xs text-hq-text-secondary">
          {formatAltitude(geo)} · CAMP {geo.currentCampNumber} · DAY{" "}
          {geo.daysIn}/{geo.totalDays}
        </p>
      </header>

      {/* The Route */}
      <div className="mt-6 rounded-lg border border-hq-border bg-hq-surface p-4 sm:p-6">
        {/* Keeps its proportions on phones: the chart scrolls sideways
            instead of shrinking into a sparkline. */}
        <div className="overflow-x-auto">
          <div className="min-w-[560px]">
            <RouteChart geo={geo} variant="full" />
          </div>
        </div>
        <div className="mt-3 flex items-center justify-between font-mono text-[11px] text-hq-text-muted">
          <span>JUL 2026</span>
          <span>{geo.camps.length} CAMPS · 1 SUMMIT</span>
          <span>JUN 2027</span>
        </div>
        <div className="sr-only">
          Camp markers link to their phase sections below.
        </div>
      </div>

      <div className="mt-12 space-y-14">
        {phases.map((phase) => {
          const prog = progressOf(phase.skills)
          const isCurrent = phase.id === currentPhase?.id
          const status = phaseStatus(prog, isCurrent)
          const band =
            phase.skills.length * CLIMB_PER_SKILL +
            phase.projects.length * CLIMB_PER_PROJECT

          return (
            <section key={phase.id} id={phase.id} className="scroll-mt-8">
              {/* Camp header */}
              <div className="border-b border-hq-border pb-4">
                <div className="flex flex-wrap items-baseline justify-between gap-3">
                  <div className="hq-overline text-hq-text-muted">
                    Camp {String(phase.number).padStart(2, "0")} ·{" "}
                    {phase.window}
                  </div>
                  <StatusBadge label={status.label} tone={status.accent} />
                </div>
                <div className="mt-2 flex flex-wrap items-baseline justify-between gap-3">
                  <h2 className="hq-display text-2xl font-bold text-hq-text">
                    {phase.name}
                  </h2>
                  <span className="font-mono text-xs text-hq-text-secondary">
                    +{band.toLocaleString("en-US")}m ·{" "}
                    <span className="text-hq-text-muted">
                      {prog.completed}/{prog.total} waypoints
                    </span>
                  </span>
                </div>
                <div className="mt-3 flex items-center gap-3">
                  <ThinProgress value={prog.percentage} className="max-w-xs" />
                  <span className="font-mono text-xs text-hq-text-secondary">
                    {prog.percentage}%
                  </span>
                </div>
                {phase.goal && (
                  <details
                    className="mt-3"
                    open={!(prog.completed === prog.total && prog.total > 0)}
                  >
                    <summary className="hq-overline cursor-pointer text-hq-text-muted">
                      Camp goal
                    </summary>
                    <p className="mt-2 max-w-[68ch] text-sm text-hq-text-secondary">
                      {phase.goal}
                    </p>
                  </details>
                )}
              </div>

              {/* Waypoints: ruled rows, not cards */}
              <div className="mt-4">
                {phase.skills.map((skill) => (
                  <SkillCard key={skill.id} skill={skill} />
                ))}
              </div>

              {/* Projects */}
              {phase.projects.length > 0 && (
                <div className="mt-6">
                  <SectionLabel>Projects</SectionLabel>
                  <div className="mt-2 grid grid-cols-1 gap-4 sm:grid-cols-2">
                    {phase.projects.map((project) => (
                      <ProjectCard key={project.id} project={project} />
                    ))}
                  </div>
                </div>
              )}
            </section>
          )
        })}
      </div>
    </div>
  )
}
