import { cn } from "@/lib/utils"
import { type Accent } from "@/lib/ui"

// Semantic tone map (DESIGN.md §1). Accent border+text only for the active
// tone; every other state reads in neutral text with a hairline border.
const TONE: Record<Accent, string> = {
  amber: "border-hq-accent/40 text-hq-accent",
  green: "border-hq-border text-hq-text",
  cyan: "border-hq-border text-hq-text-secondary",
  red: "border-hq-danger/40 text-hq-danger",
  muted: "border-hq-border text-hq-text-muted",
}

export function StatusBadge({
  label,
  tone,
  className,
}: {
  label: string
  tone: Accent
  className?: string
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-sm border px-1.5 py-0.5 font-mono text-[10px] uppercase tracking-[0.2em] transition-colors duration-150",
        TONE[tone],
        className
      )}
    >
      {label}
    </span>
  )
}

/** Small monospace pill for identifiers like A0 / COL-5 / P1. */
export function MonoTag({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-sm bg-hq-elevated px-1.5 py-0.5 font-mono text-xs text-hq-text-secondary",
        className
      )}
    >
      {children}
    </span>
  )
}
