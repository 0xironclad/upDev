import { Check, Slash } from "lucide-react"

import { cn } from "@/lib/utils"

/**
 * Waypoint state marker (DESIGN.md §6). Shape + fill carry the state so it
 * never relies on color alone: queued = outline, climbing = accent ring
 * (pulsing), reviewing = half fill, cleared = solid warm-white + check,
 * blocked = danger slash.
 */
export function WaypointMarker({
  status,
  className,
}: {
  status: string
  className?: string
}) {
  const base =
    "relative flex size-4 shrink-0 items-center justify-center rounded-full border-2"

  switch (status) {
    case "completed":
      return (
        <span
          className={cn(base, "border-hq-text bg-hq-text", className)}
          aria-hidden
        >
          <Check className="size-2.5 text-hq-bg" strokeWidth={3.5} />
        </span>
      )
    case "in_progress":
      return (
        <span
          className={cn(base, "border-hq-accent bg-hq-bg", className)}
          aria-hidden
        >
          <span className="absolute -inset-1 rounded-full border border-hq-accent/40 motion-safe:animate-pulse" />
          <span className="size-1.5 rounded-full bg-hq-accent" />
        </span>
      )
    case "reviewing":
      return (
        <span
          className={cn(
            base,
            "overflow-hidden border-hq-accent bg-hq-bg",
            className
          )}
          aria-hidden
        >
          <span className="absolute inset-y-0 left-0 w-1/2 bg-hq-accent/70" />
        </span>
      )
    case "blocked":
      return (
        <span
          className={cn(base, "border-hq-danger bg-hq-bg", className)}
          aria-hidden
        >
          <Slash className="size-2.5 text-hq-danger" strokeWidth={3} />
        </span>
      )
    default:
      return (
        <span
          className={cn(base, "border-hq-text-muted bg-hq-bg", className)}
          aria-hidden
        />
      )
  }
}
