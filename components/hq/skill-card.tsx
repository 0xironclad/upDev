import Link from "next/link"

import type { Skill } from "@/db/schema"
import { cn } from "@/lib/utils"
import { skillStatusMeta } from "@/lib/ui"
import { WaypointMarker } from "@/components/hq/waypoint-marker"
import { SkillCompleteToggle } from "@/components/hq/skill-complete-toggle"

/**
 * Waypoint row (DESIGN.md §6): a ruled row, not a card. Marker + mono ID
 * left, title and one-line why in the middle, status label + complete
 * toggle right.
 */
export function SkillCard({ skill }: { skill: Skill }) {
  const status = skillStatusMeta(skill.status)
  const isActive =
    skill.status === "in_progress" || skill.status === "reviewing"

  return (
    <div
      className={cn(
        "group relative flex items-start gap-3 border-t border-hq-border px-2 py-3.5 transition-colors duration-150 last:border-b hover:bg-hq-elevated",
        isActive && "bg-hq-surface"
      )}
    >
      <WaypointMarker status={skill.status} className="mt-1" />
      <span
        className={cn(
          "mt-0.5 w-14 shrink-0 font-mono text-xs tracking-wider uppercase",
          isActive ? "text-hq-accent" : "text-hq-text-muted"
        )}
      >
        {skill.id}
      </span>
      <div className="min-w-0 flex-1">
        <Link
          href={`/roadmap/skills/${skill.slug}`}
          className="focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-hq-accent"
        >
          {/* Stretch the row's click target without nesting interactives */}
          <span className="absolute inset-0" aria-hidden />
          <span
            className={cn(
              "text-sm font-semibold",
              skill.isDone ? "text-hq-text-secondary" : "text-hq-text"
            )}
          >
            {skill.title}
          </span>
        </Link>
        {skill.whyItMatters && (
          <p className="mt-0.5 line-clamp-1 text-sm text-hq-text-secondary">
            {skill.whyItMatters}
          </p>
        )}
      </div>
      <div className="relative z-10 flex shrink-0 items-center gap-3">
        {skill.priority === "high" && !skill.isDone && (
          <span className="hidden font-mono text-[10px] tracking-[0.2em] text-hq-text-muted sm:inline">
            HIGH
          </span>
        )}
        <span
          className={cn(
            "font-mono text-[10px] tracking-[0.2em]",
            skill.status === "in_progress"
              ? "text-hq-accent"
              : "text-hq-text-muted"
          )}
        >
          {status.label}
        </span>
        <SkillCompleteToggle skillId={skill.id} isDone={skill.isDone} />
      </div>
    </div>
  )
}
