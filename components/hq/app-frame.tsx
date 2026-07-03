import {
  getCurrentPhase,
  getCurrentSkill,
  getOverallProgress,
} from "@/lib/progress"
import { getPhasesWithContent } from "@/lib/data/roadmap"
import { buildRoute } from "@/lib/route"
import { SidebarInner } from "@/components/hq/sidebar-inner"
import { MobileNav } from "@/components/hq/mobile-nav"

/** Persistent two-column app shell wrapping every page. */
export async function AppFrame({ children }: { children: React.ReactNode }) {
  const [phase, skill, overall, phasesWithContent] = await Promise.all([
    getCurrentPhase(),
    getCurrentSkill(),
    getOverallProgress(),
    getPhasesWithContent(),
  ])
  const geo = buildRoute(phasesWithContent)

  return (
    <div className="flex min-h-svh">
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-64 border-r border-hq-border bg-hq-surface lg:block">
        <SidebarInner phase={phase} skill={skill} overall={overall} geo={geo} />
      </aside>

      <div className="flex min-w-0 flex-1 flex-col lg:pl-64">
        <MobileNav>
          <SidebarInner
            phase={phase}
            skill={skill}
            overall={overall}
            geo={geo}
          />
        </MobileNav>
        <main className="flex-1">{children}</main>
      </div>
    </div>
  )
}
