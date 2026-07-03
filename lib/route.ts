import type { Phase, Project, Skill } from "@/db/schema"

/**
 * The Route (DESIGN.md §5): the year as an elevation profile. x = time
 * across the five phase windows, y = altitude. Each skill is a waypoint
 * worth 300 m of climb, each project a 200 m push; the summit is the final
 * altitude. The last phase has no camp node: its endpoint IS the summit.
 * Everything here is deterministic geometry in viewBox units so the chart
 * component stays purely presentational.
 */

export const CLIMB_PER_SKILL = 300
export const CLIMB_PER_PROJECT = 200

export const VIEW = { width: 1000, height: 260 }
const PAD = { top: 28, right: 14, bottom: 18, left: 14 }

export type RoutePoint = { x: number; y: number }

export type RouteCamp = {
  id: string
  number: number
  name: string
  state: "cleared" | "active" | "ahead"
  point: RoutePoint
  altitude: number
}

export type RouteGeometry = {
  view: typeof VIEW
  /** Whole route, base layer (dotted). */
  fullPath: string
  /** Climbed segment (accent), null when nothing is cleared yet. */
  climbedPath: string | null
  /** Soft fill under the climbed segment. */
  areaPath: string | null
  /** "You are here." */
  head: RoutePoint | null
  /** Camp nodes for every phase except the last. */
  camps: RouteCamp[]
  summit: RoutePoint
  /** Anchor target for the summit marker (the final phase). */
  summitPhaseId: string | null
  altitude: number
  maxAltitude: number
  daysIn: number
  totalDays: number
  currentCampNumber: number
  ariaLabel: string
}

type PhaseWithContent = Phase & { skills: Skill[]; projects?: Project[] }

const DAY = 86_400_000

function parseDate(value: string | null): number | null {
  if (!value) return null
  const t = Date.parse(`${value}T00:00:00Z`)
  return Number.isNaN(t) ? null : t
}

export function buildRoute(
  phases: PhaseWithContent[],
  now: Date = new Date()
): RouteGeometry {
  const ordered = [...phases].sort((a, b) => (a.order ?? 0) - (b.order ?? 0))

  type Item = {
    climb: number
    done: boolean
    working: boolean
  }
  const itemsOf = (p: PhaseWithContent): Item[] => [
    ...[...p.skills]
      .sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
      .map((s) => ({
        climb: CLIMB_PER_SKILL,
        done: s.isDone,
        working: s.status === "in_progress" || s.status === "reviewing",
      })),
    ...[...(p.projects ?? [])]
      .sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
      .map((pr) => ({
        climb: CLIMB_PER_PROJECT,
        done: pr.isDone,
        working: pr.status === "building" || pr.status === "polishing",
      })),
  ]

  const maxAltitude = Math.max(
    1,
    ordered.reduce(
      (n, p) => n + itemsOf(p).reduce((m, i) => m + i.climb, 0),
      0
    )
  )

  // Time axis: real phase windows when present, equal spans otherwise.
  const start = parseDate(ordered[0]?.dateStart ?? null)
  const end = parseDate(ordered.at(-1)?.dateEnd ?? null)
  const hasDates = start !== null && end !== null && end > start
  const totalDays = hasDates ? Math.round((end - start) / DAY) : 365

  const innerW = VIEW.width - PAD.left - PAD.right
  const innerH = VIEW.height - PAD.top - PAD.bottom
  const xOf = (frac: number) => PAD.left + frac * innerW
  const yOf = (alt: number) => PAD.top + (1 - alt / maxAltitude) * innerH

  const fracOfDate = (t: number | null, fallback: number) =>
    hasDates && t !== null
      ? Math.min(1, Math.max(0, (t - start) / (end - start)))
      : fallback

  // Waypoints: each phase's skills then projects, spread through its window.
  type Waypoint = { point: RoutePoint; altitude: number }
  const waypoints: Waypoint[] = []
  let altitude = 0
  let achieved = 0
  let working = false
  ordered.forEach((phase, pi) => {
    const p0 = fracOfDate(parseDate(phase.dateStart), pi / ordered.length)
    const p1 = fracOfDate(
      parseDate(phase.dateEnd),
      (pi + 1) / ordered.length
    )
    const items = itemsOf(phase)
    items.forEach((item, ii) => {
      altitude += item.climb
      if (item.done) achieved += item.climb
      if (item.working) working = true
      const frac = p0 + ((ii + 1) / (items.length + 1)) * (p1 - p0)
      waypoints.push({ altitude, point: { x: xOf(frac), y: yOf(altitude) } })
    })
  })
  if (working) achieved = Math.min(maxAltitude, achieved + 150)

  const origin: RoutePoint = { x: xOf(0), y: yOf(0) }
  const summit: RoutePoint = { x: xOf(1), y: yOf(maxAltitude) }

  const line = [origin, ...waypoints.map((w) => w.point), summit]
  const toPath = (pts: RoutePoint[]) =>
    pts
      .map(
        (p, i) => `${i === 0 ? "M" : "L"}${p.x.toFixed(1)},${p.y.toFixed(1)}`
      )
      .join(" ")
  const fullPath = toPath(line)

  // Walk the (monotonically rising) line to the achieved altitude.
  let head: RoutePoint | null = waypoints.length > 0 ? null : origin
  const climbedPts: RoutePoint[] = [origin]
  if (waypoints.length > 0) {
    let prev: Waypoint = { point: origin, altitude: 0 }
    for (const w of [...waypoints, { point: summit, altitude: maxAltitude }]) {
      if (achieved >= w.altitude) {
        climbedPts.push(w.point)
        prev = w
        continue
      }
      const span = w.altitude - prev.altitude
      const t = span <= 0 ? 0 : (achieved - prev.altitude) / span
      head = {
        x: prev.point.x + (w.point.x - prev.point.x) * t,
        y: prev.point.y + (w.point.y - prev.point.y) * t,
      }
      climbedPts.push(head)
      break
    }
    if (!head) head = summit
  }

  const climbedPath = achieved > 0 && head ? toPath(climbedPts) : null
  const areaPath =
    achieved > 0 && head
      ? `${toPath(climbedPts)} L${head.x.toFixed(1)},${yOf(0).toFixed(1)} L${origin.x.toFixed(1)},${origin.y.toFixed(1)} Z`
      : null

  // Camps at phase boundaries; the final phase's endpoint is the summit.
  let cum = 0
  const campStates = ordered.map((phase, pi) => {
    const items = itemsOf(phase)
    cum += items.reduce((m, i) => m + i.climb, 0)
    const done = items.length > 0 && items.every((i) => i.done)
    const active = !done && items.some((i) => i.working)
    return {
      phase,
      pi,
      altitude: cum,
      state: (done ? "cleared" : active ? "active" : "ahead") as
        | "cleared"
        | "active"
        | "ahead",
    }
  })
  // Without an explicitly active phase, the current camp is the first
  // uncleared one.
  if (!campStates.some((c) => c.state === "active")) {
    const firstAhead = campStates.find((c) => c.state === "ahead")
    if (firstAhead) firstAhead.state = "active"
  }
  const currentCampNumber =
    campStates.find((c) => c.state === "active")?.phase.number ??
    campStates.length

  const camps: RouteCamp[] = campStates.slice(0, -1).map((c) => ({
    id: c.phase.id,
    number: c.phase.number ?? c.pi + 1,
    name: c.phase.name,
    state: c.state,
    altitude: c.altitude,
    point: {
      x: xOf(
        fracOfDate(
          parseDate(c.phase.dateEnd),
          (c.pi + 1) / ordered.length
        )
      ),
      y: yOf(c.altitude),
    },
  }))

  const daysIn = hasDates
    ? Math.min(
        totalDays,
        Math.max(0, Math.round((now.getTime() - start) / DAY))
      )
    : 0

  return {
    view: VIEW,
    fullPath,
    climbedPath,
    areaPath,
    head,
    camps,
    summit,
    summitPhaseId: ordered.at(-1)?.id ?? null,
    altitude: achieved,
    maxAltitude,
    daysIn,
    totalDays,
    currentCampNumber,
    ariaLabel: `Route: ${Math.round(achieved)} of ${maxAltitude} meters climbed, camp ${currentCampNumber} of ${ordered.length}, day ${daysIn} of ${totalDays}.`,
  }
}

/** Mono-voice altitude readout, e.g. "ALT 750m / 6,300m". */
export function formatAltitude(geo: RouteGeometry): string {
  const fmt = (n: number) => Math.round(n).toLocaleString("en-US")
  return `ALT ${fmt(geo.altitude)}m / ${fmt(geo.maxAltitude)}m`
}
