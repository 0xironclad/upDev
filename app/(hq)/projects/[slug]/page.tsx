import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ChevronRight, ExternalLink, GitBranch, Target } from "lucide-react"

import { db } from "@/db"
import { phases } from "@/db/schema"
import { eq } from "drizzle-orm"
import { getProjectBySlug, getSkillsByIds } from "@/lib/data/roadmap"
import { projectStatusMeta, projectTypeMeta } from "@/lib/ui"
import { StatusBadge } from "@/components/hq/status-badge"
import { SectionLabel } from "@/components/hq/section-label"
import { ProjectStatusControl } from "@/components/hq/project-status-control"
import { ProjectSteps } from "@/components/hq/project-steps"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"

export const dynamic = "force-dynamic"

type Params = { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params
  const project = await getProjectBySlug(slug)
  return { title: project ? project.title : "Project" }
}

export default async function ProjectDetailPage({ params }: Params) {
  const { slug } = await params
  const project = await getProjectBySlug(slug)
  if (!project) notFound()

  const type = projectTypeMeta(project.type)
  const status = projectStatusMeta(project.status)

  const skillIds = (project.skillsDemonstrated ?? "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean)
  const [provenSkills, phase] = await Promise.all([
    getSkillsByIds(skillIds),
    project.phaseId
      ? db
          .select()
          .from(phases)
          .where(eq(phases.id, project.phaseId))
          .then((r) => r[0] ?? null)
      : Promise.resolve(null),
  ])

  const steps = (project.implementationSteps ?? "")
    .split("\n")
    .map((s) => s.trim())
    .filter(Boolean)

  return (
    <div className="mx-auto max-w-3xl px-6 py-8">
      {/* Breadcrumb */}
      <nav className="flex flex-wrap items-center gap-1.5 font-mono text-xs text-hq-text-muted">
        <Link href="/projects" className="hover:text-hq-text">
          Projects
        </Link>
        <ChevronRight className="size-3" />
        <span className="text-hq-text-secondary uppercase">
          {project.id} · {project.title}
        </span>
      </nav>

      {/* Header */}
      <header className="mt-6">
        <div className="hq-overline text-hq-text-muted">
          {project.id} · {type.label}
          {phase && ` · Camp ${phase.number}`}
        </div>
        <div className="mt-2 flex flex-wrap items-start justify-between gap-3">
          <h1 className="hq-display text-4xl font-extrabold text-hq-text">
            {project.title}
          </h1>
          <ProjectStatusControl projectId={project.id} status={project.status} />
        </div>
        <div className="mt-2 flex flex-wrap items-center gap-2">
          <StatusBadge label={status.label} tone={status.accent} />
        </div>
      </header>

      {/* Purpose */}
      {project.purpose && (
        <section className="mt-8 flex gap-3 rounded-lg bg-hq-elevated p-4">
          <Target className="mt-0.5 size-4 shrink-0 text-hq-text-secondary" />
          <p className="text-sm text-hq-text">{project.purpose}</p>
        </section>
      )}

      {/* Skills this proves */}
      {provenSkills.length > 0 && (
        <section className="mt-6">
          <SectionLabel>Skills This Proves</SectionLabel>
          <div className="mt-2 flex flex-wrap gap-2">
            {provenSkills.map((skill) => (
              <Tooltip key={skill.id}>
                <TooltipTrigger asChild>
                  <Link
                    href={`/roadmap/skills/${skill.slug}`}
                    className="inline-flex items-center gap-1.5 rounded-sm border border-hq-border bg-hq-surface px-2 py-1 text-sm text-hq-text transition-colors duration-150 hover:border-hq-accent/40 hover:bg-hq-elevated focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-hq-accent"
                  >
                    <span className="font-mono text-xs uppercase text-hq-text-secondary">
                      {skill.id}
                    </span>
                    {skill.title}
                  </Link>
                </TooltipTrigger>
                {skill.capabilityAfter && (
                  <TooltipContent className="max-w-xs">
                    {skill.capabilityAfter}
                  </TooltipContent>
                )}
              </Tooltip>
            ))}
          </div>
        </section>
      )}

      {/* Tech stack */}
      {project.techStack && project.techStack.length > 0 && (
        <section className="mt-6">
          <SectionLabel>Tech Stack</SectionLabel>
          <div className="mt-2 flex flex-wrap gap-2">
            {project.techStack.map((tech) => (
              <span
                key={tech}
                className="rounded-sm bg-hq-elevated px-2 py-1 font-mono text-sm text-hq-text-secondary"
              >
                {tech}
              </span>
            ))}
          </div>
        </section>
      )}

      {/* Implementation steps */}
      {steps.length > 0 && (
        <section className="mt-6">
          <SectionLabel>Implementation Steps</SectionLabel>
          <div className="mt-2">
            <ProjectSteps projectId={project.id} steps={steps} />
          </div>
        </section>
      )}

      {/* What production means */}
      {project.whatProductionMeans && (
        <section className="mt-6 rounded-lg border border-hq-border p-4">
          <div className="hq-overline text-hq-accent">What Production Means</div>
          <p className="mt-2 text-sm text-hq-text-secondary">
            {project.whatProductionMeans}
          </p>
        </section>
      )}

      {/* Links */}
      <section className="mt-6">
        <SectionLabel>Links</SectionLabel>
        {project.repoUrl || project.demoUrl ? (
          <div className="mt-2 grid grid-cols-1 gap-3 sm:grid-cols-2">
            {project.repoUrl && (
              <a
                href={project.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 rounded-lg border border-hq-border bg-hq-surface p-3 text-sm text-hq-text transition-colors duration-150 hover:border-hq-accent/40 hover:bg-hq-elevated focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-hq-accent"
              >
                <GitBranch className="size-4 text-hq-text-secondary" /> Repository
              </a>
            )}
            {project.demoUrl && (
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 rounded-lg border border-hq-border bg-hq-surface p-3 text-sm text-hq-text transition-colors duration-150 hover:border-hq-accent/40 hover:bg-hq-elevated focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-hq-accent"
              >
                <ExternalLink className="size-4 text-hq-text-secondary" /> Live Demo
              </a>
            )}
          </div>
        ) : (
          <p className="mt-2 text-sm text-hq-text-muted">
            No links yet — add a repo or demo URL once this project ships.
          </p>
        )}
      </section>

      <nav className="mt-10 border-t border-hq-border pt-4">
        <Link
          href="/projects"
          className="font-mono text-xs text-hq-text-secondary hover:text-hq-text hover:underline"
        >
          ← Back to Projects
        </Link>
      </nav>
    </div>
  )
}
