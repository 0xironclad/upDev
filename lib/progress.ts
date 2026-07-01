import "server-only"

import { asc, eq } from "drizzle-orm"

import { db } from "@/db"
import { phases, skills, tracks } from "@/db/schema"
import type { Phase, Skill } from "@/db/schema"

export type Progress = {
  percentage: number
  completed: number
  total: number
}

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
  const rows = await db.select({ isDone: skills.isDone }).from(skills)
  return toProgress(rows)
}

export async function getPhaseProgress(phaseId: string): Promise<Progress> {
  const rows = await db
    .select({ isDone: skills.isDone })
    .from(skills)
    .where(eq(skills.phaseId, phaseId))
  return toProgress(rows)
}

export async function getTrackProgress(trackId: string): Promise<Progress> {
  const rows = await db
    .select({ isDone: skills.isDone })
    .from(skills)
    .where(eq(skills.trackId, trackId))
  return toProgress(rows)
}

/** Active skill: the one in progress, else the first not-yet-done skill in order. */
export async function getCurrentSkill(): Promise<Skill | null> {
  const all = await db.select().from(skills).orderBy(asc(skills.order))
  const inProgress = all.find((s) => s.status === "in_progress")
  if (inProgress) return inProgress
  return all.find((s) => !s.isDone) ?? null
}

/** The phase that contains the current active skill (fallback: first phase). */
export async function getCurrentPhase(): Promise<Phase | null> {
  const current = await getCurrentSkill()
  if (current?.phaseId) {
    const [phase] = await db
      .select()
      .from(phases)
      .where(eq(phases.id, current.phaseId))
    if (phase) return phase
  }
  const [first] = await db
    .select()
    .from(phases)
    .orderBy(asc(phases.order))
    .limit(1)
  return first ?? null
}

/** The next not-done skill after the current active one, in global order. */
export async function getNextSkill(): Promise<Skill | null> {
  const all = await db.select().from(skills).orderBy(asc(skills.order))
  const current = await getCurrentSkill()
  if (!current) return null
  const idx = all.findIndex((s) => s.id === current.id)
  for (let i = idx + 1; i < all.length; i++) {
    if (!all[i].isDone) return all[i]
  }
  return null
}

/** Track metadata keyed by id, for color/name lookups in the UI. */
export async function getTrackMap() {
  const rows = await db.select().from(tracks)
  return new Map(rows.map((t) => [t.id, t]))
}
