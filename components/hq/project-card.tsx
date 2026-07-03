import Link from "next/link"

import type { Project } from "@/db/schema"
import { projectStatusMeta, projectTypeMeta } from "@/lib/ui"
import { StatusBadge } from "@/components/hq/status-badge"

export function ProjectCard({ project }: { project: Project }) {
  const type = projectTypeMeta(project.type)
  const status = projectStatusMeta(project.status)
  const isFlagship = project.type === "flagship"

  return (
    <Link
      href={`/projects/${project.slug}`}
      className="group flex flex-col rounded-lg border border-hq-border bg-hq-surface p-4 transition-colors duration-150 hover:border-hq-accent/40 hover:bg-hq-elevated focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-hq-accent"
    >
      <div className="flex items-center justify-between gap-2 font-mono text-[10px] uppercase tracking-[0.2em] text-hq-text-muted">
        <span>{project.id}</span>
        <span className="inline-flex items-center gap-1.5">
          {isFlagship && (
            <svg
              viewBox="0 0 10 10"
              className="size-2.5 fill-hq-accent"
              aria-hidden
            >
              <polygon points="0,10 5,0 10,10" />
            </svg>
          )}
          {type.label}
        </span>
      </div>

      <h3 className="mt-2 text-base font-semibold text-hq-text">
        {project.title}
      </h3>
      {project.purpose && (
        <p className="mt-1 line-clamp-2 text-sm text-hq-text-secondary">
          {project.purpose.split(".")[0]}.
        </p>
      )}

      {project.techStack && project.techStack.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-1">
          {project.techStack.slice(0, 3).map((tech) => (
            <span
              key={tech}
              className="rounded-sm bg-hq-elevated px-1.5 py-0.5 font-mono text-[10px] text-hq-text-secondary"
            >
              {tech}
            </span>
          ))}
        </div>
      )}

      <div className="mt-3 pt-1">
        <StatusBadge label={status.label} tone={status.accent} />
      </div>
    </Link>
  )
}
