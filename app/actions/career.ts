"use server"

import { revalidatePath } from "next/cache"
import { eq } from "drizzle-orm"
import { z } from "zod"

import { db } from "@/db"
import { careerItems } from "@/db/schema"
import type { ActionResult } from "@/app/actions/roadmap"

const categorySchema = z.enum([
  "resume",
  "portfolio",
  "skill_proven",
  "interview_prep",
  "application",
])
const statusSchema = z.enum(["todo", "in_progress", "done"])

const upsertSchema = z.object({
  id: z.string().uuid().optional(),
  title: z.string().min(1).max(300),
  category: categorySchema,
  status: statusSchema.default("todo"),
  targetDate: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/)
    .optional()
    .or(z.literal("")),
  notes: z.string().max(4000).optional(),
})

export async function upsertCareerItem(
  data: z.input<typeof upsertSchema>
): Promise<ActionResult> {
  const parsed = upsertSchema.safeParse(data)
  if (!parsed.success) {
    return { success: false, error: "Invalid career item." }
  }
  const { id, title, category, status, targetDate, notes } = parsed.data
  const values = {
    title,
    category,
    status,
    targetDate: targetDate ? targetDate : null,
    notes: notes ?? null,
  }

  try {
    if (id) {
      await db.update(careerItems).set(values).where(eq(careerItems.id, id))
    } else {
      await db.insert(careerItems).values(values)
    }
    revalidatePath("/", "layout")
    return { success: true }
  } catch (err) {
    console.error("upsertCareerItem failed", err)
    return { success: false, error: "Could not save career item." }
  }
}

export async function updateCareerStatus(
  id: string,
  status: string
): Promise<ActionResult> {
  const parsedId = z.string().uuid().safeParse(id)
  const parsedStatus = statusSchema.safeParse(status)
  if (!parsedId.success || !parsedStatus.success) {
    return { success: false, error: "Invalid status update." }
  }
  try {
    await db
      .update(careerItems)
      .set({ status: parsedStatus.data })
      .where(eq(careerItems.id, parsedId.data))
    revalidatePath("/", "layout")
    return { success: true }
  } catch (err) {
    console.error("updateCareerStatus failed", err)
    return { success: false, error: "Could not update status." }
  }
}
