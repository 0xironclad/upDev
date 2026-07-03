import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import {
  ArrowLeft,
  ArrowRight,
  ChevronRight,
  ExternalLink,
} from "lucide-react"

import { getSkillDetail } from "@/lib/data/roadmap"
import { accent, categoryAccent, skillStatusMeta, trackAccent } from "@/lib/ui"
import { cn } from "@/lib/utils"
import { StatusBadge } from "@/components/hq/status-badge"
import { ProjectCard } from "@/components/hq/project-card"
import { SkillStatusControl } from "@/components/hq/skill-status-control"
import { MarkCompleteButton } from "@/components/hq/mark-complete-button"

export const dynamic = "force-dynamic"

type Params = { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params
  const detail = await getSkillDetail(slug)
  return { title: detail ? detail.skill.title : "Skill" }
}

export default async function SkillDetailPage({ params }: Params) {
  const { slug } = await params
  const detail = await getSkillDetail(slug)
  if (!detail) notFound()

  const { skill, phase, track, prev, next, relatedProjects } = detail
  const status = skillStatusMeta(skill.status)
  const cat = accent(categoryAccent(skill.category))
  const trackTone = accent(trackAccent(skill.trackId))
  const learnItems = (skill.whatToLearn ?? "")
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean)

  return (
    <div className="mx-auto max-w-3xl px-6 py-8">
      {/* Breadcrumb */}
      <nav className="flex flex-wrap items-center gap-1.5 font-mono text-xs text-hq-text-muted">
        <Link href="/roadmap" className="hover:text-hq-text">
          Roadmap
        </Link>
        <ChevronRight className="size-3" />
        {phase && (
          <>
            <Link href={`/roadmap#${phase.id}`} className="hover:text-hq-text">
              Phase {phase.number}
            </Link>
            <ChevronRight className="size-3" />
          </>
        )}
        <span className="text-hq-text-secondary uppercase">
          {skill.id} · {skill.title}
        </span>
      </nav>

      {/* Header */}
      <header className="mt-6">
        <div className="flex flex-wrap items-center gap-2 font-mono text-xs">
          {track && (
            <span className={cn("uppercase", trackTone.text)}>{track.name}</span>
          )}
          {phase && (
            <span className="text-hq-text-muted">· Phase {phase.number}</span>
          )}
        </div>

        <div className="mt-2 flex flex-wrap items-start justify-between gap-3">
          <h1 className="text-3xl font-bold text-hq-text">{skill.title}</h1>
          <SkillStatusControl skillId={skill.id} status={skill.status} />
        </div>

        <div className="mt-3 flex flex-wrap items-center gap-2">
          {skill.category && (
            <span
              className={cn(
                "rounded-sm border px-1.5 py-0.5 font-mono text-[10px] uppercase tracking-wider",
                cat.text,
                cat.border,
                cat.bg
              )}
            >
              {skill.category}
            </span>
          )}
          <StatusBadge label={status.label} tone={status.accent} />
          {skill.linearIssueId && (
            <span className="inline-flex items-center gap-1 rounded-sm bg-hq-elevated px-2 py-1 font-mono text-xs text-hq-cyan">
              {skill.linearIssueId}
              <ExternalLink className="size-3" />
            </span>
          )}
        </div>
      </header>

      {/* Why it matters */}
      {skill.whyItMatters && (
        <section className="mt-8">
          <SectionHeading>Why It Matters</SectionHeading>
          <p className="mt-2 text-base text-hq-text-secondary">
            {skill.whyItMatters}
          </p>
        </section>
      )}

      {/* What to learn */}
      {learnItems.length > 0 && (
        <section className="mt-6">
          <SectionHeading>What to Learn</SectionHeading>
          <ul className="mt-2 space-y-1.5">
            {learnItems.map((item, i) => (
              <li key={i} className="flex gap-2 text-sm text-hq-text">
                <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-hq-amber" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Expected capability */}
      {skill.capabilityAfter && (
        <section className="mt-6 rounded-md bg-hq-elevated p-4">
          <div className="font-mono text-[10px] uppercase tracking-widest text-hq-text-muted">
            After Completing This
          </div>
          <p className="mt-1.5 text-sm text-hq-text">{skill.capabilityAfter}</p>
        </section>
      )}

      {/* Definition of done */}
      {skill.definitionOfDone && (
        <section className="mt-6 rounded-md border border-hq-green/30 bg-hq-green/10 p-4">
          <div className="font-mono text-[10px] uppercase tracking-widest text-hq-green">
            Definition of Done
          </div>
          <p className="mt-1.5 text-sm text-hq-text-secondary">
            {skill.definitionOfDone}
          </p>
          {skill.status !== "completed" && (
            <div className="mt-3">
              <MarkCompleteButton skillId={skill.id} />
            </div>
          )}
        </section>
      )}

      {/* Resource */}
      {skill.resourceUrl && (
        <section className="mt-6">
          <SectionHeading>Resource</SectionHeading>
          <a
            href={skill.resourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 flex items-center gap-3 rounded-md border border-hq-border bg-hq-surface p-3 transition-colors hover:border-hq-amber/40 hover:bg-hq-elevated"
          >
            <ExternalLink className="size-4 shrink-0 text-hq-cyan" />
            <div className="min-w-0">
              <div className="text-sm text-hq-text">
                {skill.resourceLabel ?? "Open resource"}
              </div>
              <div className="truncate font-mono text-xs text-hq-text-muted">
                {skill.resourceUrl}
              </div>
            </div>
          </a>
        </section>
      )}

      {/* Related project */}
      {relatedProjects.length > 0 && (
        <section className="mt-6">
          <SectionHeading>Related Project</SectionHeading>
          <div className="mt-2 grid grid-cols-1 gap-4 sm:grid-cols-2">
            {relatedProjects.map((p) => (
              <ProjectCard key={p.id} project={p} />
            ))}
          </div>
        </section>
      )}

      {/* Prev / next nav */}
      <nav className="mt-10 flex items-center justify-between border-t border-hq-border pt-4">
        {prev ? (
          <Link
            href={`/roadmap/skills/${prev.slug}`}
            className="inline-flex items-center gap-1.5 text-sm text-hq-text-secondary hover:text-hq-text"
          >
            <ArrowLeft className="size-4" />
            <span className="font-mono text-xs uppercase">{prev.id}</span>
          </Link>
        ) : (
          <span />
        )}
        <Link
          href="/roadmap"
          className="font-mono text-xs text-hq-cyan hover:underline"
        >
          Back to Roadmap
        </Link>
        {next ? (
          <Link
            href={`/roadmap/skills/${next.slug}`}
            className="inline-flex items-center gap-1.5 text-sm text-hq-text-secondary hover:text-hq-text"
          >
            <span className="font-mono text-xs uppercase">{next.id}</span>
            <ArrowRight className="size-4" />
          </Link>
        ) : (
          <span />
        )}
      </nav>
    </div>
  )
}

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-1.5 font-mono text-xs uppercase tracking-widest text-hq-text-muted">
      <span className="text-hq-green">&gt;</span>
      {children}
    </div>
  )
}
