"use client"

import * as React from "react"

import type { RouteGeometry } from "@/lib/route"
import { cn } from "@/lib/utils"

const DRAWN_FLAG = "hq-route-drawn"

/**
 * The Route (DESIGN.md §5): the year's elevation profile. Purely
 * presentational; all geometry comes from lib/route. Client-side only for
 * the draw-once animation and camp anchors.
 */
export function RouteChart({
  geo,
  variant = "full",
  className,
}: {
  geo: RouteGeometry
  variant?: "full" | "mini"
  className?: string
}) {
  const climbedRef = React.useRef<SVGPathElement>(null)
  const [drawn, setDrawn] = React.useState(false)

  React.useEffect(() => {
    const path = climbedRef.current
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches
    const already = window.sessionStorage.getItem(DRAWN_FLAG) === "1"
    if (!path || reduced || already) {
      setDrawn(true)
      return
    }
    const len = path.getTotalLength()
    path.style.strokeDasharray = `${len}`
    path.style.strokeDashoffset = `${len}`
    const anim = path.animate(
      [{ strokeDashoffset: len }, { strokeDashoffset: 0 }],
      { duration: 600, easing: "cubic-bezier(0.22, 1, 0.36, 1)", fill: "forwards" }
    )
    anim.onfinish = () => {
      path.style.strokeDasharray = ""
      path.style.strokeDashoffset = ""
      window.sessionStorage.setItem(DRAWN_FLAG, "1")
      setDrawn(true)
    }
    return () => anim.cancel()
  }, [])

  const full = variant === "full"
  const { view } = geo
  const gridYs = [0.25, 0.5, 0.75].map(
    (f) => 28 + f * (view.height - 28 - 18)
  )

  return (
    <svg
      viewBox={`0 0 ${view.width} ${view.height}`}
      role="img"
      aria-label={geo.ariaLabel}
      className={cn("block w-full", className)}
    >
      {/* altitude grid */}
      <g stroke="var(--hq-border)" strokeWidth="1">
        {gridYs.map((y) => (
          <line key={y} x1="0" y1={y} x2={view.width} y2={y} />
        ))}
        {full &&
          geo.camps.map((c) => (
            <line
              key={c.id}
              x1={c.point.x}
              y1={c.point.y + 8}
              x2={c.point.x}
              y2={view.height - 18}
              strokeDasharray="1 5"
            />
          ))}
      </g>

      {/* the whole route, unclimbed */}
      <path
        d={geo.fullPath}
        fill="none"
        stroke="var(--hq-text-muted)"
        strokeOpacity="0.55"
        strokeWidth={full ? 2 : 1.5}
        strokeDasharray="1 6"
        strokeLinecap="round"
      />

      {/* climbed segment + soft fill */}
      {geo.areaPath && drawn && (
        <path d={geo.areaPath} fill="var(--hq-accent)" fillOpacity="0.10" />
      )}
      {geo.climbedPath && (
        <path
          ref={climbedRef}
          d={geo.climbedPath}
          fill="none"
          stroke="var(--hq-accent)"
          strokeWidth={full ? 2.5 : 2}
          strokeLinecap="round"
        />
      )}

      {/* camps */}
      {geo.camps.map((camp) => {
        const marker = (
          <g>
            <circle
              cx={camp.point.x}
              cy={camp.point.y}
              r={full ? 4.5 : 3}
              fill={
                camp.state === "cleared" ? "var(--hq-text)" : "var(--hq-bg)"
              }
              stroke={
                camp.state === "active"
                  ? "var(--hq-accent)"
                  : camp.state === "cleared"
                    ? "var(--hq-text)"
                    : "var(--hq-text-muted)"
              }
              strokeWidth="1.75"
            />
            {full && (
              <text
                x={camp.point.x}
                y={camp.point.y - 12}
                textAnchor="middle"
                className="fill-hq-text-secondary font-mono text-[20px] sm:text-[11px]"
              >
                C{camp.number}
              </text>
            )}
          </g>
        )
        return full ? (
          <a
            key={camp.id}
            href={`#${camp.id}`}
            aria-label={`Camp ${camp.number}: ${camp.name}`}
            className="focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-hq-accent"
          >
            {marker}
          </a>
        ) : (
          <g key={camp.id}>{marker}</g>
        )
      })}

      {/* summit (the final phase's endpoint; no separate camp node) */}
      {(() => {
        const flag = (
          <g>
            <path
              d={`M${geo.summit.x - 6},${geo.summit.y} L${geo.summit.x},${geo.summit.y - 11} L${geo.summit.x + 6},${geo.summit.y} Z`}
              fill="var(--hq-text)"
            />
            {full && (
              <text
                x={geo.summit.x - 12}
                y={geo.summit.y - 4}
                textAnchor="end"
                className="fill-hq-text font-mono text-[20px] sm:text-[11px]"
              >
                SUMMIT
              </text>
            )}
          </g>
        )
        return full && geo.summitPhaseId ? (
          <a
            href={`#${geo.summitPhaseId}`}
            aria-label="Summit: final phase"
            className="focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-hq-accent"
          >
            {flag}
          </a>
        ) : (
          flag
        )
      })()}

      {/* you are here */}
      {geo.head && (
        <g>
          <circle
            cx={geo.head.x}
            cy={geo.head.y}
            r={full ? 11 : 8}
            fill="none"
            stroke="var(--hq-accent)"
            strokeWidth="1"
            opacity="0.4"
            className="motion-safe:animate-pulse"
          />
          <circle
            cx={geo.head.x}
            cy={geo.head.y}
            r={full ? 5 : 3.5}
            fill="var(--hq-bg)"
            stroke="var(--hq-accent)"
            strokeWidth="2.5"
          />
        </g>
      )}
    </svg>
  )
}
