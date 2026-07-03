import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  ChevronRight,
  ExternalLink,
  FileText,
  FolderGit2,
  GraduationCap,
  Newspaper,
  PlayCircle,
  Target,
} from "lucide-react"

import type { SkillResource } from "@/db/schema"
import { getSkillDetail } from "@/lib/data/roadmap"
import { skillStatusMeta } from "@/lib/ui"
import { cn } from "@/lib/utils"
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

  const { skill, phase, track, prev, next, relatedProjects, resources } =
    detail
  const status = skillStatusMeta(skill.status)
  const isActive = skill.status === "in_progress"
  const learnItems = (skill.whatToLearn ?? "")
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean)

  const itemResources = new Map<number, SkillResource[]>()
  const generalResources: SkillResource[] = []
  for (const r of resources) {
    if (r.itemIndex === null) {
      generalResources.push(r)
    } else {
      const list = itemResources.get(r.itemIndex) ?? []
      list.push(r)
      itemResources.set(r.itemIndex, list)
    }
  }

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
        <div className="hq-overline text-hq-text-muted">
          Waypoint
          {phase && ` · Camp ${phase.number}`}
          {track && ` · ${track.name}`}
        </div>
        <div className="mt-2 flex flex-wrap items-start justify-between gap-3">
          <h1 className="hq-display text-4xl font-extrabold text-hq-text">
            {skill.title}
          </h1>
          <SkillStatusControl skillId={skill.id} status={skill.status} />
        </div>
        <p className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-xs text-hq-text-secondary">
          <span className="uppercase">{skill.id}</span>
          <span
            className={cn(
              "tracking-[0.2em]",
              isActive ? "text-hq-accent" : "text-hq-text-muted"
            )}
          >
            {status.label}
          </span>
          {skill.category && (
            <span className="text-hq-text-muted">{skill.category}</span>
          )}
          {skill.linearIssueId && (
            <span className="inline-flex items-center gap-1 text-hq-text-secondary">
              {skill.linearIssueId}
              <ExternalLink className="size-3" />
            </span>
          )}
        </p>
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
          <ul className="mt-2 space-y-2">
            {learnItems.map((item, i) => {
              const links = itemResources.get(i)
              return (
                <li key={i} className="text-sm text-hq-text">
                  <div className="flex gap-2">
                    <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-hq-text-muted" />
                    <span>{item}</span>
                  </div>
                  {links && links.length > 0 && (
                    <div className="mt-1 ml-3.5 flex flex-wrap gap-1.5">
                      {links.map((r) => (
                        <ResourceChip key={r.id} resource={r} />
                      ))}
                    </div>
                  )}
                </li>
              )
            })}
          </ul>
        </section>
      )}

      {/* Expected capability */}
      {skill.capabilityAfter && (
        <section className="mt-6 rounded-lg bg-hq-elevated p-4">
          <div className="hq-overline text-hq-text-muted">
            After Completing This
          </div>
          <p className="mt-2 text-sm text-hq-text">{skill.capabilityAfter}</p>
        </section>
      )}

      {/* Definition of done */}
      {skill.definitionOfDone && (
        <section className="mt-6 rounded-lg border border-hq-border p-4">
          <div className="hq-overline text-hq-text">Definition of Done</div>
          <p className="mt-2 text-sm text-hq-text-secondary">
            {skill.definitionOfDone}
          </p>
          {skill.status !== "completed" && (
            <div className="mt-3">
              <MarkCompleteButton skillId={skill.id} />
            </div>
          )}
        </section>
      )}

      {/* Resources */}
      {(skill.resourceUrl || generalResources.length > 0) && (
        <section className="mt-6">
          <SectionHeading>
            {generalResources.length > 0 ? "Resources" : "Resource"}
          </SectionHeading>
          {skill.resourceUrl && (
            <a
              href={skill.resourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 flex items-center gap-3 rounded-lg border border-hq-border bg-hq-surface p-3 transition-colors duration-150 hover:border-hq-accent/40 hover:bg-hq-elevated focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-hq-accent"
            >
              <ExternalLink className="size-4 shrink-0 text-hq-text-secondary" />
              <div className="min-w-0">
                <div className="text-sm text-hq-text">
                  {skill.resourceLabel ?? "Open resource"}
                </div>
                <div className="truncate font-mono text-xs text-hq-text-muted">
                  {skill.resourceUrl}
                </div>
              </div>
            </a>
          )}
          {generalResources.length > 0 && (
            <div className="mt-2 flex flex-wrap gap-1.5">
              {generalResources.map((r) => (
                <ResourceChip key={r.id} resource={r} />
              ))}
            </div>
          )}
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
          className="font-mono text-xs text-hq-text-secondary hover:text-hq-text hover:underline"
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

const RESOURCE_KIND_ICONS = {
  docs: FileText,
  video: PlayCircle,
  course: GraduationCap,
  book: BookOpen,
  repo: FolderGit2,
  practice: Target,
  article: Newspaper,
} as const

function ResourceChip({ resource }: { resource: SkillResource }) {
  const Icon =
    RESOURCE_KIND_ICONS[resource.kind as keyof typeof RESOURCE_KIND_ICONS] ??
    ExternalLink
  return (
    <a
      href={resource.url}
      target="_blank"
      rel="noopener noreferrer"
      title={`${resource.kind} · ${resource.url}`}
      className="inline-flex items-center gap-1 rounded-sm border border-hq-border bg-hq-surface px-1.5 py-0.5 font-mono text-[11px] text-hq-text-secondary transition-colors duration-150 hover:border-hq-accent/40 hover:bg-hq-elevated hover:text-hq-text focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-hq-accent"
    >
      <Icon className="size-3 shrink-0 text-hq-text-secondary" />
      {resource.label}
    </a>
  )
}

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <div className="hq-overline flex items-center gap-1.5 text-hq-text-muted">
      <span className="text-hq-accent">&gt;</span>
      {children}
    </div>
  )
}
