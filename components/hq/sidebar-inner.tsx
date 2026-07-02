import Link from "next/link"

import type { Phase, Skill } from "@/db/schema"
import type { Progress } from "@/lib/progress"
import { NavLinks } from "@/components/hq/nav-links"
import { ThinProgress } from "@/components/hq/thin-progress"
import { ThemeToggle } from "@/components/hq/theme-toggle"
import { SignOutButton } from "@/components/hq/sign-out-button"
import { isSupabaseConfigured } from "@/lib/supabase/config"

export function SidebarInner({
  phase,
  skill,
  overall,
  onNavigate,
}: {
  phase: Phase | null
  skill: Skill | null
  overall: Progress
  onNavigate?: () => void
}) {
  return (
    <div className="flex h-full flex-col">
      {/* App identity */}
      <div className="flex items-start justify-between border-b border-hq-border p-4">
        <div>
          <div className="font-mono text-[10px] uppercase tracking-widest text-hq-text-muted">
            Cracked Dev
          </div>
          <div className="hq-glow text-lg font-semibold text-hq-amber">HQ</div>
        </div>
        <ThemeToggle />
      </div>

      {/* Phase indicator pill */}
      {phase && (
        <div className="p-4">
          <Link
            href="/roadmap"
            onClick={onNavigate}
            className="inline-flex items-center gap-2 rounded-sm border border-hq-amber/40 bg-hq-amber/10 px-2.5 py-1 font-mono text-xs text-hq-amber transition-colors duration-150 hover:bg-hq-amber/20"
          >
            <span className="tracking-widest uppercase">
              Phase {phase.number}
            </span>
            <span className="text-hq-text-secondary">· {phase.focus}</span>
          </Link>
        </div>
      )}

      {/* Navigation */}
      <div className="flex-1 overflow-y-auto pb-4">
        <NavLinks onNavigate={onNavigate} />
      </div>

      {/* Quick status widget */}
      <div className="border-t border-hq-border p-4">
        {skill && (
          <div className="mb-2 font-mono text-xs text-hq-text-secondary">
            <span className="text-hq-text-muted">Currently: </span>
            <span className="text-hq-amber">{skill.id.toUpperCase()}</span> ·{" "}
            {skill.title}
          </div>
        )}
        <ThinProgress value={overall.percentage} tone="green" />
        <div className="mt-1.5 flex items-center justify-between gap-2">
          <span className="font-mono text-xs text-hq-text-muted">
            {overall.percentage}% complete
          </span>
          {isSupabaseConfigured() && <SignOutButton />}
        </div>
      </div>
    </div>
  )
}
