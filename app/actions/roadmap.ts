"use server"

import { revalidatePath } from "next/cache"
import { eq } from "drizzle-orm"
import { z } from "zod"

import { db } from "@/db"
import { projects, skills } from "@/db/schema"

export type ActionResult = { success: boolean; error?: string }

const skillStatusSchema = z.enum([
  "not_started",
  "in_progress",
  "reviewing",
  "completed",
  "blocked",
])

const projectStatusSchema = z.enum([
  "not_started",
  "building",
  "polishing",
  "shipped",
])

const idSchema = z.string().min(1)

/** Revalidate everything under the root layout (dashboard, sidebar, roadmap). */
function revalidateAll() {
  revalidatePath("/", "layout")
}

export async function updateSkillStatus(
  skillId: string,
  status: string
): Promise<ActionResult> {
  const parsedId = idSchema.safeParse(skillId)
  const parsedStatus = skillStatusSchema.safeParse(status)
  if (!parsedId.success || !parsedStatus.success) {
    return { success: false, error: "Invalid skill or status." }
  }

  try {
    await db
      .update(skills)
      .set({
        status: parsedStatus.data,
        isDone: parsedStatus.data === "completed",
      })
      .where(eq(skills.id, parsedId.data))
    revalidateAll()
    return { success: true }
  } catch (err) {
    console.error("updateSkillStatus failed", err)
    return { success: false, error: "Could not update skill status." }
  }
}

export async function markSkillComplete(
  skillId: string
): Promise<ActionResult> {
  return updateSkillStatus(skillId, "completed")
}

export async function updateProjectStatus(
  projectId: string,
  status: string
): Promise<ActionResult> {
  const parsedId = idSchema.safeParse(projectId)
  const parsedStatus = projectStatusSchema.safeParse(status)
  if (!parsedId.success || !parsedStatus.success) {
    return { success: false, error: "Invalid project or status." }
  }

  try {
    await db
      .update(projects)
      .set({
        status: parsedStatus.data,
        isDone: parsedStatus.data === "shipped",
      })
      .where(eq(projects.id, parsedId.data))
    revalidateAll()
    return { success: true }
  } catch (err) {
    console.error("updateProjectStatus failed", err)
    return { success: false, error: "Could not update project status." }
  }
}
