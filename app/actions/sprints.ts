"use server"

import { revalidatePath } from "next/cache"
import { eq } from "drizzle-orm"
import { z } from "zod"

import { db } from "@/db"
import { weeklySprints } from "@/db/schema"
import type { ActionResult } from "@/app/actions/roadmap"

const updateSchema = z.object({
  focus: z.string().max(4000).optional(),
  wins: z.string().max(4000).optional(),
  blockers: z.string().max(4000).optional(),
  revisit: z.string().max(4000).optional(),
  daysStudied: z.number().int().min(0).max(7).optional(),
  status: z.enum(["planned", "active", "done"]).optional(),
})

export async function updateSprint(
  sprintId: string,
  fields: z.input<typeof updateSchema>
): Promise<ActionResult> {
  const id = z.string().uuid().safeParse(sprintId)
  const parsed = updateSchema.safeParse(fields)
  if (!id.success || !parsed.success) {
    return { success: false, error: "Invalid sprint update." }
  }
  if (Object.keys(parsed.data).length === 0) return { success: true }

  try {
    await db
      .update(weeklySprints)
      .set(parsed.data)
      .where(eq(weeklySprints.id, id.data))
    revalidatePath("/", "layout")
    return { success: true }
  } catch (err) {
    console.error("updateSprint failed", err)
    return { success: false, error: "Could not save sprint." }
  }
}

const createSchema = z.object({
  weekLabel: z.string().min(1).max(200),
  weekStart: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  focus: z.string().max(4000).optional(),
})

export async function createSprint(
  data: z.input<typeof createSchema>
): Promise<ActionResult> {
  const parsed = createSchema.safeParse(data)
  if (!parsed.success) {
    return { success: false, error: "Invalid sprint details." }
  }

  try {
    await db.insert(weeklySprints).values({
      weekLabel: parsed.data.weekLabel,
      weekStart: parsed.data.weekStart,
      focus: parsed.data.focus ?? null,
      status: "planned",
    })
    revalidatePath("/", "layout")
    return { success: true }
  } catch (err) {
    console.error("createSprint failed", err)
    return { success: false, error: "Could not create sprint." }
  }
}
