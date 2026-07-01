import "server-only"

import { asc, desc, eq } from "drizzle-orm"

import { db } from "@/db"
import {
  careerItems,
  phases,
  projects,
  skills,
  tracks,
  weeklySprints,
} from "@/db/schema"
import type { Phase, Project, Skill, Track } from "@/db/schema"

export async function getTracks(): Promise<Track[]> {
  return db.select().from(tracks).orderBy(asc(tracks.order))
}

export async function getPhases(): Promise<Phase[]> {
  return db.select().from(phases).orderBy(asc(phases.order))
}

export async function getSkills(): Promise<Skill[]> {
  return db.select().from(skills).orderBy(asc(skills.order))
}

export async function getProjects(): Promise<Project[]> {
  return db.select().from(projects).orderBy(asc(projects.order))
}

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
  const [active] = await db
    .select()
    .from(weeklySprints)
    .where(eq(weeklySprints.status, "active"))
    .orderBy(desc(weeklySprints.weekStart))
    .limit(1)
  return active ?? null
}

/** Projects not yet shipped, in order — for the dashboard "upcoming" row. */
export async function getUpcomingProjects(limit = 3): Promise<Project[]> {
  const all = await getProjects()
  return all.filter((p) => p.status !== "shipped").slice(0, limit)
}

export async function getSkillBySlug(slug: string): Promise<Skill | null> {
  const [skill] = await db.select().from(skills).where(eq(skills.slug, slug))
  return skill ?? null
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  const [project] = await db
    .select()
    .from(projects)
    .where(eq(projects.slug, slug))
  return project ?? null
}

export async function getCareerItems() {
  return db.select().from(careerItems).orderBy(asc(careerItems.createdAt))
}

export type SkillDetail = {
  skill: Skill
  phase: Phase | null
  track: Track | null
  prev: Skill | null
  next: Skill | null
  relatedProjects: Project[]
}

/** Everything the skill detail page needs, composed in one place. */
export async function getSkillDetail(slug: string): Promise<SkillDetail | null> {
  const skill = await getSkillBySlug(slug)
  if (!skill) return null

  const [phase, track, phaseSkills, allProjects] = await Promise.all([
    skill.phaseId
      ? db
          .select()
          .from(phases)
          .where(eq(phases.id, skill.phaseId))
          .then((r) => r[0] ?? null)
      : Promise.resolve(null),
    skill.trackId
      ? db
          .select()
          .from(tracks)
          .where(eq(tracks.id, skill.trackId))
          .then((r) => r[0] ?? null)
      : Promise.resolve(null),
    skill.phaseId
      ? db
          .select()
          .from(skills)
          .where(eq(skills.phaseId, skill.phaseId))
          .orderBy(asc(skills.order))
      : Promise.resolve([] as Skill[]),
    getProjects(),
  ])

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

  return { skill, phase, track, prev, next, relatedProjects }
}
