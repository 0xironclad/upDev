import {
  getCurrentPhase,
  getCurrentSkill,
  getOverallProgress,
} from "@/lib/progress"
import { SidebarInner } from "@/components/hq/sidebar-inner"
import { MobileNav } from "@/components/hq/mobile-nav"

/** Persistent two-column app shell wrapping every page. */
export async function AppFrame({ children }: { children: React.ReactNode }) {
  const [phase, skill, overall] = await Promise.all([
    getCurrentPhase(),
    getCurrentSkill(),
    getOverallProgress(),
  ])

  return (
    <div className="flex min-h-svh">
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-64 border-r border-hq-border bg-hq-surface lg:block">
        <SidebarInner phase={phase} skill={skill} overall={overall} />
      </aside>

      <div className="flex min-w-0 flex-1 flex-col lg:pl-64">
        <MobileNav>
          <SidebarInner phase={phase} skill={skill} overall={overall} />
        </MobileNav>
        <main className="flex-1">{children}</main>
      </div>
    </div>
  )
}
