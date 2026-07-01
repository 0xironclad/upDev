import { Check } from "lucide-react"

import { cn } from "@/lib/utils"
import type { PhaseNode } from "@/components/hq/phase-timeline"

/**
 * The signature vertical progress spine: a glowing line that fills top→bottom
 * as skills complete, with a node marker per phase (active node pulses).
 * Nodes are anchor links that scroll the content to the matching phase section.
 */
export function ProgressSpine({
  nodes,
  fillPercent,
}: {
  nodes: PhaseNode[]
  fillPercent: number
}) {
  return (
    <div className="sticky top-8 hidden h-[75vh] w-44 shrink-0 lg:block">
      <div className="relative flex h-full flex-col items-stretch justify-between py-3">
        {/* base line */}
        <div className="absolute inset-y-3 left-3 w-1 -translate-x-1/2 rounded-full bg-hq-border" />
        {/* animated fill */}
        <div
          className="absolute top-3 left-3 w-1 -translate-x-1/2 rounded-full bg-gradient-to-b from-hq-green to-hq-amber transition-all duration-700"
          style={{ height: `calc(${Math.max(2, fillPercent)}% - 0.75rem)` }}
        />

        {nodes.map((node) => (
          <a
            key={node.id}
            href={`#${node.id}`}
            className="group relative z-10 flex items-center gap-3"
          >
            <span className="relative flex size-6 items-center justify-center">
              {node.state === "active" && (
                <span className="absolute inset-0 animate-ping rounded-full bg-hq-amber/50" />
              )}
              <span
                className={cn(
                  "relative flex size-5 items-center justify-center rounded-full border-2 transition-colors",
                  node.state === "completed" &&
                    "border-hq-green bg-hq-green/20 text-hq-green",
                  node.state === "active" &&
                    "border-hq-amber bg-hq-bg text-hq-amber",
                  node.state === "future" &&
                    "border-hq-border bg-hq-bg text-hq-text-muted"
                )}
              >
                {node.state === "completed" && <Check className="size-3" />}
              </span>
            </span>
            <span className="min-w-0">
              <span
                className={cn(
                  "block font-mono text-[10px] uppercase tracking-widest",
                  node.state === "future"
                    ? "text-hq-text-muted"
                    : "text-hq-amber"
                )}
              >
                Phase {node.number}
              </span>
              <span className="block truncate text-xs text-hq-text-secondary group-hover:text-hq-text">
                {node.name}
              </span>
            </span>
          </a>
        ))}
      </div>
    </div>
  )
}
