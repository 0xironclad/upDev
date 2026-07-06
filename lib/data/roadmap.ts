import "server-only"

import { cache } from "react"
import { asc, desc, eq } from "drizzle-orm"

import { db } from "@/db"
import {
  careerItems,
  phases,
  projects,
  skillResources,
  skills,
  tracks,
  weeklySprints,
} from "@/db/schema"
import type { Phase, Project, Skill, SkillResource, Track } from "@/db/schema"

// Base fetchers, deduped per request with React cache(): the layout and the
// page both read these, so each table is hit at most once per render pass.
// Everything else below derives from them without extra queries.

export const getTracks = cache(async (): Promise<Track[]> => {
  return db.select().from(tracks).orderBy(asc(tracks.order))
})

export const getPhases = cache(async (): Promise<Phase[]> => {
  return db.select().from(phases).orderBy(asc(phases.order))
})

export const getSkills = cache(async (): Promise<Skill[]> => {
  return db.select().from(skills).orderBy(asc(skills.order))
})

export const getProjects = cache(async (): Promise<Project[]> => {
  return db.select().from(projects).orderBy(asc(projects.order))
})

export const getSprints = cache(async () => {
  return db
    .select()
    .from(weeklySprints)
    .orderBy(desc(weeklySprints.weekStart))
})

export const getCareerItems = cache(async () => {
  // Stable tiebreak on title so cards don't reshuffle after a mutation
  // (seeded rows can share createdAt timestamps).
  return db
    .select()
    .from(careerItems)
    .orderBy(asc(careerItems.createdAt), asc(careerItems.title))
})

const getResourcesForSkill = cache(
  async (skillId: string): Promise<SkillResource[]> => {
    return db
      .select()
      .from(skillResources)
      .where(eq(skillResources.skillId, skillId))
      .orderBy(asc(skillResources.order), asc(skillResources.id))
  }
)

export type PhaseWithContent = Phase & {
  skills: Skill[]
  projects: Project[]
}

/** All phases in order, each with its skills and projects nested. */
export async function getPhasesWithContent(): Promise<PhaseWithContent[]> {
  const [allPhases, allSkills, allProjects] = await Promise.all([
    getPhases(),
    getSkills(),
    getProjects(),
  ])

  return allPhases.map((phase) => ({
    ...phase,
    skills: allSkills.filter((s) => s.phaseId === phase.id),
    projects: allProjects.filter((p) => p.phaseId === phase.id),
  }))
}

export async function getActiveSprint() {
  const all = await getSprints()
  return all.find((s) => s.status === "active") ?? null
}

/** Projects not yet shipped, in order — for the dashboard "upcoming" row. */
export async function getUpcomingProjects(limit = 3): Promise<Project[]> {
  const all = await getProjects()
  return all.filter((p) => p.status !== "shipped").slice(0, limit)
}

export async function getSkillBySlug(slug: string): Promise<Skill | null> {
  const all = await getSkills()
  return all.find((s) => s.slug === slug) ?? null
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  const all = await getProjects()
  return all.find((p) => p.slug === slug) ?? null
}

/** Skills for a comma-separated id list, preserving the given order. */
export async function getSkillsByIds(ids: string[]): Promise<Skill[]> {
  if (ids.length === 0) return []
  const all = await getSkills()
  const byId = new Map(all.map((s) => [s.id, s]))
  return ids.map((id) => byId.get(id)).filter((s): s is Skill => Boolean(s))
}

export type TrackPageData = {
  track: Track
  groups: { phase: Phase; skills: Skill[] }[]
  stats: { total: number; completed: number; inProgress: number }
}

/** A track with its skills grouped by phase, plus summary stats. */
export async function getTrackPageData(
  trackId: string
): Promise<TrackPageData | null> {
  const [allTracks, allSkills, allPhases] = await Promise.all([
    getTracks(),
    getSkills(),
    getPhases(),
  ])
  const track = allTracks.find((t) => t.id === trackId)
  if (!track) return null

  const trackSkills = allSkills.filter((s) => s.trackId === trackId)

  const groups = allPhases
    .map((phase) => ({
      phase,
      skills: trackSkills.filter((s) => s.phaseId === phase.id),
    }))
    .filter((g) => g.skills.length > 0)

  const stats = {
    total: trackSkills.length,
    completed: trackSkills.filter((s) => s.isDone).length,
    inProgress: trackSkills.filter((s) => s.status === "in_progress").length,
  }

  return { track, groups, stats }
}

export type SkillDetail = {
  skill: Skill
  phase: Phase | null
  track: Track | null
  prev: Skill | null
  next: Skill | null
  relatedProjects: Project[]
  resources: SkillResource[]
}

/** Everything the skill detail page needs, composed in one place. */
export async function getSkillDetail(
  slug: string
): Promise<SkillDetail | null> {
  const skill = await getSkillBySlug(slug)
  if (!skill) return null

  const [allSkills, allPhases, allTracks, allProjects, resources] =
    await Promise.all([
      getSkills(),
      getPhases(),
      getTracks(),
      getProjects(),
      getResourcesForSkill(skill.id),
    ])

  const phase = allPhases.find((p) => p.id === skill.phaseId) ?? null
  const track = allTracks.find((t) => t.id === skill.trackId) ?? null
  const phaseSkills = allSkills.filter((s) => s.phaseId === skill.phaseId)

  const idx = phaseSkills.findIndex((s) => s.id === skill.id)
  const prev = idx > 0 ? phaseSkills[idx - 1] : null
  const next =
    idx >= 0 && idx < phaseSkills.length - 1 ? phaseSkills[idx + 1] : null

  const relatedProjects = allProjects.filter((p) =>
    (p.skillsDemonstrated ?? "")
      .split(",")
      .map((s) => s.trim())
      .includes(skill.id)
  )

  return { skill, phase, track, prev, next, relatedProjects, resources }
}
