import type { Metadata } from "next"

import { getCurrentPhase, getOverallProgress } from "@/lib/progress"
import { getPhasesWithContent } from "@/lib/data/roadmap"
import { phaseStatus, trackAccent, accent } from "@/lib/ui"
import { cn } from "@/lib/utils"
import { SectionLabel } from "@/components/hq/section-label"
import { StatusBadge } from "@/components/hq/status-badge"
import { ThinProgress } from "@/components/hq/thin-progress"
import { SkillCard } from "@/components/hq/skill-card"
import { ProjectCard } from "@/components/hq/project-card"
import { ProgressSpine } from "@/components/hq/progress-spine"
import { type PhaseNode } from "@/components/hq/phase-timeline"

export const metadata: Metadata = { title: "Roadmap" }

export const dynamic = "force-dynamic"

export default async function RoadmapPage() {
  const [phases, currentPhase, overall] = await Promise.all([
    getPhasesWithContent(),
    getCurrentPhase(),
    getOverallProgress(),
  ])

  const progressOf = (skills: { isDone: boolean }[]) => {
    const total = skills.length
    const completed = skills.filter((s) => s.isDone).length
    return {
      total,
      completed,
      percentage: total === 0 ? 0 : Math.round((completed / total) * 100),
    }
  }

  const nodes: PhaseNode[] = phases.map((p): PhaseNode => {
    const prog = progressOf(p.skills)
    const done = prog.total > 0 && prog.completed === prog.total
    return {
      id: p.id,
      number: p.number,
      name: p.name,
      state: done ? "completed" : p.id === currentPhase?.id ? "active" : "future",
    }
  })

  return (
    <div className="px-6 py-8">
      <header className="mx-auto max-w-5xl">
        <div className="font-mono text-xs uppercase tracking-widest text-hq-text-muted">
          Cracked Dev HQ
        </div>
        <h1 className="mt-1 text-3xl font-bold text-hq-text">Roadmap</h1>
        <p className="mt-1 text-sm text-hq-text-secondary">
          Full-stack → AI + Cloud specialist. 12 skills across 5 phases.
        </p>
      </header>

      <div className="mx-auto mt-8 flex max-w-5xl gap-8">
        <ProgressSpine nodes={nodes} fillPercent={overall.percentage} />

        <div className="min-w-0 flex-1 space-y-12">
          {phases.map((phase) => {
            const prog = progressOf(phase.skills)
            const isCurrent = phase.id === currentPhase?.id
            const status = phaseStatus(prog, isCurrent)
            const focusTone = accent(
              trackAccent(phase.skills[0]?.trackId ?? null)
            )

            return (
              <section key={phase.id} id={phase.id} className="scroll-mt-8">
                {/* Phase header */}
                <div className="border-b border-hq-border pb-4">
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="font-mono text-xs uppercase tracking-widest text-hq-text-muted">
                      Phase {String(phase.number).padStart(2, "0")}
                    </span>
                    <StatusBadge label={status.label} tone={status.accent} />
                  </div>
                  <h2 className="mt-1.5 text-xl font-semibold text-hq-text">
                    {phase.name}
                  </h2>
                  <div className="mt-2 flex flex-wrap items-center gap-2">
                    <span className="rounded-sm bg-hq-elevated px-1.5 py-0.5 font-mono text-[10px] uppercase tracking-wider text-hq-text-secondary">
                      {phase.window}
                    </span>
                    {phase.focus && (
                      <span
                        className={cn(
                          "rounded-sm border px-1.5 py-0.5 font-mono text-[10px] uppercase tracking-wider",
                          focusTone.text,
                          focusTone.border,
                          focusTone.bg
                        )}
                      >
                        {phase.focus}
                      </span>
                    )}
                    <span className="font-mono text-xs text-hq-text-muted">
                      {prog.completed}/{prog.total}
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
                      <summary className="cursor-pointer font-mono text-xs uppercase tracking-widest text-hq-text-muted">
                        Phase goal
                      </summary>
                      <p className="mt-1.5 text-sm text-hq-text-secondary">
                        {phase.goal}
                      </p>
                    </details>
                  )}
                </div>

                {/* Skills */}
                <div className="mt-4 grid grid-cols-1 gap-3">
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
    </div>
  )
}
