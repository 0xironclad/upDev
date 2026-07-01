import { cn } from "@/lib/utils"
import { accent, type Accent } from "@/lib/ui"

/** Thin 4px progress bar. Percentage is shown by callers as separate text. */
export function ThinProgress({
  value,
  tone = "amber",
  className,
}: {
  value: number
  tone?: Accent
  className?: string
}) {
  const a = accent(tone)
  const pct = Math.max(0, Math.min(100, value))
  return (
    <div
      className={cn("h-1 w-full overflow-hidden rounded-sm bg-hq-elevated", className)}
      role="progressbar"
      aria-valuenow={pct}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      <div
        className={cn("h-full rounded-sm transition-all duration-500", a.dot)}
        style={{ width: `${pct}%` }}
      />
    </div>
  )
}
