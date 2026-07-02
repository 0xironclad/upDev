import type { LucideIcon } from "lucide-react"
import { BadgeCheck, FileText, FolderGit2, MessagesSquare, Send } from "lucide-react"

export const CAREER_CATEGORIES = [
  "resume",
  "portfolio",
  "skill_proven",
  "interview_prep",
  "application",
] as const

export type CareerCategory = (typeof CAREER_CATEGORIES)[number]

export const CATEGORY_META: Record<
  CareerCategory,
  { label: string; icon: LucideIcon }
> = {
  resume: { label: "Resume", icon: FileText },
  portfolio: { label: "Portfolio", icon: FolderGit2 },
  skill_proven: { label: "Skill Proven", icon: BadgeCheck },
  interview_prep: { label: "Interview Prep", icon: MessagesSquare },
  application: { label: "Application", icon: Send },
}
