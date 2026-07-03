import Link from "next/link"

import type { Phase, Skill } from "@/db/schema"
import type { Progress } from "@/lib/progress"
import { formatAltitude, type RouteGeometry } from "@/lib/route"
import { NavLinks } from "@/components/hq/nav-links"
import { ThinProgress } from "@/components/hq/thin-progress"
import { ThemeToggle } from "@/components/hq/theme-toggle"
import { SignOutButton } from "@/components/hq/sign-out-button"
import { isSupabaseConfigured } from "@/lib/supabase/config"

export function SidebarInner({
  phase,
  skill,
  overall,
  geo,
  onNavigate,
}: {
  phase: Phase | null
  skill: Skill | null
  overall: Progress
  geo: RouteGeometry
  onNavigate?: () => void
}) {
  return (
    <div className="flex h-full flex-col">
      {/* Wordmark */}
      <div className="flex items-start justify-between border-b border-hq-border p-4">
        <div>
          <div className="hq-overline text-hq-text-muted">Cracked Dev</div>
          <div className="hq-display mt-0.5 text-xl font-extrabold text-hq-text">
            HQ
          </div>
        </div>
        <ThemeToggle />
      </div>

      {/* Camp chip */}
      {phase && (
        <div className="p-4">
          <Link
            href="/roadmap"
            onClick={onNavigate}
            className="inline-flex items-center gap-2 rounded-sm border border-hq-border bg-hq-elevated px-2.5 py-1.5 font-mono text-xs transition-colors duration-150 hover:border-hq-accent/50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-hq-accent"
          >
            <span className="text-hq-accent">CAMP {phase.number}</span>
            <span className="text-hq-text-secondary">· {phase.focus}</span>
          </Link>
        </div>
      )}

      {/* Navigation */}
      <div className="flex-1 overflow-y-auto pb-4">
        <NavLinks onNavigate={onNavigate} />
      </div>

      {/* Altitude readout */}
      <div className="border-t border-hq-border p-4">
        {skill && (
          <div className="mb-2 truncate font-mono text-xs text-hq-text-secondary">
            <span className="text-hq-text-muted">On the wall: </span>
            <span className="text-hq-accent">{skill.id.toUpperCase()}</span>
          </div>
        )}
        <div className="font-mono text-xs text-hq-text tabular-nums">
          {formatAltitude(geo)}
        </div>
        <ThinProgress
          className="mt-2"
          value={Math.round((geo.altitude / geo.maxAltitude) * 100)}
        />
        <div className="mt-1.5 flex items-center justify-between gap-2">
          <span className="font-mono text-[10px] tracking-[0.15em] text-hq-text-muted">
            CAMP {geo.currentCampNumber} · DAY {geo.daysIn}/{geo.totalDays} ·{" "}
            {overall.percentage}%
          </span>
          {isSupabaseConfigured() && <SignOutButton />}
        </div>
      </div>
    </div>
  )
}
