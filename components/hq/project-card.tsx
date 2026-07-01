import Link from "next/link"

import type { Project } from "@/db/schema"
import { cn } from "@/lib/utils"
import { projectStatusMeta, projectTypeMeta } from "@/lib/ui"
import { StatusBadge } from "@/components/hq/status-badge"

export function ProjectCard({ project }: { project: Project }) {
  const type = projectTypeMeta(project.type)
  const status = projectStatusMeta(project.status)
  const isFlagship = project.type === "flagship"

  return (
    <Link
      href={`/projects/${project.slug}`}
      className={cn(
        "group flex flex-col rounded-md border border-hq-border bg-hq-surface p-4 transition-colors duration-150 hover:border-hq-amber/40 hover:bg-hq-elevated",
        isFlagship && "border-t-2 border-t-hq-amber"
      )}
    >
      <div className="mb-2 flex items-center justify-between gap-2">
        <StatusBadge label={type.label} tone={type.accent} />
        <span className="font-mono text-xs text-hq-text-muted uppercase">
          {project.id}
        </span>
      </div>

      <h3 className="text-base font-semibold text-hq-text">{project.title}</h3>
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

      <div className="mt-3 flex items-center justify-between pt-1">
        <StatusBadge label={status.label} tone={status.accent} />
      </div>
    </Link>
  )
}
