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
