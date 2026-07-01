"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  Bot,
  CalendarDays,
  Cloud,
  FolderGit2,
  LayoutDashboard,
  Map,
  Target,
  TrendingUp,
  type LucideIcon,
} from "lucide-react"

import { cn } from "@/lib/utils"

type NavItem = { href: string; icon: LucideIcon; label: string }

const NAV: NavItem[] = [
  { href: "/", icon: LayoutDashboard, label: "HQ" },
  { href: "/roadmap", icon: Map, label: "Roadmap" },
  { href: "/tracks/ai", icon: Bot, label: "AI Engineering" },
  { href: "/tracks/cloud", icon: Cloud, label: "Cloud Engineering" },
  { href: "/tracks/career", icon: Target, label: "Fusion & Career" },
  { href: "/projects", icon: FolderGit2, label: "Projects" },
  { href: "/sprints", icon: CalendarDays, label: "Weekly Sprints" },
  { href: "/career", icon: TrendingUp, label: "Career Growth" },
]

export function NavLinks({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname()

  return (
    <nav className="flex flex-col gap-1 px-2">
      {NAV.map(({ href, icon: Icon, label }) => {
        const active =
          href === "/" ? pathname === "/" : pathname.startsWith(href)
        return (
          <Link
            key={href}
            href={href}
            onClick={onNavigate}
            className={cn(
              "flex items-center gap-2.5 rounded-sm border-l-2 px-3 py-2 text-sm transition-colors duration-150",
              active
                ? "border-hq-amber bg-hq-elevated text-hq-text"
                : "border-transparent text-hq-text-secondary hover:bg-hq-elevated hover:text-hq-text"
            )}
          >
            <Icon className="size-4 shrink-0" />
            <span className="truncate">{label}</span>
          </Link>
        )
      })}
    </nav>
  )
}
