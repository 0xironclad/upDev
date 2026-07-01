import { cn } from "@/lib/utils"
import { accent, type Accent } from "@/lib/ui"

export function StatusBadge({
  label,
  tone,
  className,
}: {
  label: string
  tone: Accent
  className?: string
}) {
  const a = accent(tone)
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-sm border px-1.5 py-0.5 font-mono text-[10px] uppercase tracking-widest transition-colors duration-150",
        a.text,
        a.border,
        a.bg,
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
