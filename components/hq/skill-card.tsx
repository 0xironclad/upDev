import Link from "next/link"

import type { Skill } from "@/db/schema"
import { cn } from "@/lib/utils"
import {
  accent,
  categoryAccent,
  priorityAccent,
  skillStatusMeta,
} from "@/lib/ui"
import { StatusBadge, MonoTag } from "@/components/hq/status-badge"

export function SkillCard({ skill }: { skill: Skill }) {
  const status = skillStatusMeta(skill.status)
  const cat = accent(categoryAccent(skill.category))
  const prio = accent(priorityAccent(skill.priority))
  const isActive = skill.status === "in_progress"
  const isDone = skill.isDone

  return (
    <Link
      href={`/roadmap/skills/${skill.slug}`}
      className={cn(
        "group block rounded-md border bg-hq-surface p-4 transition-colors duration-150",
        isActive
          ? "border-hq-amber/50 bg-hq-elevated"
          : "border-hq-border hover:border-hq-amber/40 hover:bg-hq-elevated",
        isDone && "opacity-60"
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <div className="mb-1.5 flex flex-wrap items-center gap-2">
            <MonoTag className="uppercase">{skill.id}</MonoTag>
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
          </div>
          <h3 className="text-base font-semibold text-hq-text">{skill.title}</h3>
          {skill.whyItMatters && (
            <p className="mt-1 line-clamp-1 text-sm text-hq-text-secondary">
              {skill.whyItMatters}
            </p>
          )}
        </div>

        <div className="flex shrink-0 flex-col items-end gap-2">
          <StatusBadge label={status.label} tone={status.accent} />
          <span
            className={cn("size-2 rounded-full", prio.dot)}
            title={`${skill.priority} priority`}
          />
        </div>
      </div>
    </Link>
  )
}
