import "server-only"

import { getPhases, getSkills, getTracks } from "@/lib/data/roadmap"
import type { Phase, Skill } from "@/db/schema"

export type Progress = {
  percentage: number
  completed: number
  total: number
}

// All progress reads derive from the request-cached base fetchers in
// lib/data/roadmap — none of these functions issue their own queries.

function toProgress(rows: { isDone: boolean }[]): Progress {
  const total = rows.length
  const completed = rows.filter((r) => r.isDone).length
  return {
    percentage: total === 0 ? 0 : Math.round((completed / total) * 100),
    completed,
    total,
  }
}

export async function getOverallProgress(): Promise<Progress> {
  return toProgress(await getSkills())
}

export async function getPhaseProgress(phaseId: string): Promise<Progress> {
  const all = await getSkills()
  return toProgress(all.filter((s) => s.phaseId === phaseId))
}

export async function getTrackProgress(trackId: string): Promise<Progress> {
  const all = await getSkills()
  return toProgress(all.filter((s) => s.trackId === trackId))
}

/** Active skill: the one in progress, else the first not-yet-done skill in order. */
export async function getCurrentSkill(): Promise<Skill | null> {
  const all = await getSkills()
  const inProgress = all.find((s) => s.status === "in_progress")
  if (inProgress) return inProgress
  return all.find((s) => !s.isDone) ?? null
}

/** The phase that contains the current active skill (fallback: first phase). */
export async function getCurrentPhase(): Promise<Phase | null> {
  const [current, allPhases] = await Promise.all([
    getCurrentSkill(),
    getPhases(),
  ])
  if (current?.phaseId) {
    const phase = allPhases.find((p) => p.id === current.phaseId)
    if (phase) return phase
  }
  return allPhases[0] ?? null
}

/** The next not-done skill after the current active one, in global order. */
export async function getNextSkill(): Promise<Skill | null> {
  const [all, current] = await Promise.all([getSkills(), getCurrentSkill()])
  if (!current) return null
  const idx = all.findIndex((s) => s.id === current.id)
  for (let i = idx + 1; i < all.length; i++) {
    if (!all[i].isDone) return all[i]
  }
  return null
}

/** Track metadata keyed by id, for color/name lookups in the UI. */
export async function getTrackMap() {
  const rows = await getTracks()
  return new Map(rows.map((t) => [t.id, t]))
}
