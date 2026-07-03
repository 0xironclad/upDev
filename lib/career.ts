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
  { label: string; icon: LucideIcon; empty: string }
> = {
  resume: {
    label: "Resume",
    icon: FileText,
    empty: "No resume items yet. Start with the Alignerr reframe.",
  },
  portfolio: {
    label: "Portfolio",
    icon: FolderGit2,
    empty: "No portfolio items yet. Ship the Eval Harness Starter first.",
  },
  skill_proven: {
    label: "Skill Proven",
    icon: BadgeCheck,
    empty: "No proofs yet. AWS SAA is the highest-ROI credential here.",
  },
  interview_prep: {
    label: "Interview Prep",
    icon: MessagesSquare,
    empty: "No prep yet. Build system-design talking points from a real project.",
  },
  application: {
    label: "Application",
    icon: Send,
    empty: "No applications out yet. Target one specialist role to start.",
  },
}
