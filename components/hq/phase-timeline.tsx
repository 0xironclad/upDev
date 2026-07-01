import Link from "next/link"
import { Check } from "lucide-react"

import { cn } from "@/lib/utils"

export type PhaseNode = {
  id: string
  number: number | null
  name: string
  state: "completed" | "active" | "future"
}

/** Horizontal phase timeline: nodes connected by a line that fills to current. */
export function PhaseTimeline({ nodes }: { nodes: PhaseNode[] }) {
  return (
    <div className="flex items-start">
      {nodes.map((node, i) => {
        const isLast = i === nodes.length - 1
        const filled = node.state !== "future"
        return (
          <div key={node.id} className="flex flex-1 flex-col items-center">
            <div className="flex w-full items-center">
              {/* left connector */}
              <div
                className={cn(
                  "h-0.5 flex-1",
                  i === 0
                    ? "opacity-0"
                    : filled
                      ? "bg-hq-green"
                      : "bg-hq-border"
                )}
              />
              {/* node */}
              <div className="relative">
                {node.state === "active" && (
                  <span className="absolute inset-0 animate-ping rounded-full bg-hq-amber/60" />
                )}
                <span
                  className={cn(
                    "relative flex size-5 items-center justify-center rounded-full border-2",
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
              </div>
              {/* right connector */}
              <div
                className={cn(
                  "h-0.5 flex-1",
                  isLast
                    ? "opacity-0"
                    : node.state === "completed"
                      ? "bg-hq-green"
                      : "bg-hq-border"
                )}
              />
            </div>
            <Link
              href="/roadmap"
              className={cn(
                "mt-2 text-center font-mono text-[10px] uppercase tracking-wider transition-colors hover:text-hq-text",
                node.state === "future"
                  ? "text-hq-text-muted"
                  : "text-hq-text-secondary"
              )}
            >
              P{node.number}
              <span className="mt-0.5 hidden max-w-[7rem] truncate sm:block">
                {node.name}
              </span>
            </Link>
          </div>
        )
      })}
    </div>
  )
}
