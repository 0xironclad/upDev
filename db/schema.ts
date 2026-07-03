import {
  boolean,
  date,
  integer,
  pgTable,
  text,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core"

// Roadmap content tables (fixed, seeded) ------------------------------------

export const tracks = pgTable("tracks", {
  id: text("id").primaryKey(), // 'track-a', 'track-b', 'track-c'
  name: text("name").notNull(),
  slug: text("slug").unique().notNull(),
  description: text("description"),
  icon: text("icon"), // emoji
  color: text("color"), // 'indigo' | 'cyan' | 'amber'
  order: integer("order"),
})

export const phases = pgTable("phases", {
  id: text("id").primaryKey(), // 'phase-1' .. 'phase-5'
  number: integer("number"),
  name: text("name").notNull(),
  window: text("window"),
  goal: text("goal"),
  completionCriteria: text("completion_criteria"),
  focus: text("focus"),
  dateStart: date("date_start", { mode: "string" }),
  dateEnd: date("date_end", { mode: "string" }),
  order: integer("order"),
})

export const skills = pgTable("skills", {
  id: text("id").primaryKey(), // 'a0', 'a1', ...
  phaseId: text("phase_id").references(() => phases.id),
  trackId: text("track_id").references(() => tracks.id),
  title: text("title").notNull(),
  slug: text("slug").unique().notNull(),
  category: text("category"),
  status: text("status").default("not_started").notNull(), // not_started|in_progress|reviewing|completed|blocked
  priority: text("priority").default("medium").notNull(), // high|medium|low
  whyItMatters: text("why_it_matters"),
  whatToLearn: text("what_to_learn"), // newline-separated
  capabilityAfter: text("capability_after"),
  definitionOfDone: text("definition_of_done"),
  resourceUrl: text("resource_url"),
  resourceLabel: text("resource_label"),
  linearIssueId: text("linear_issue_id"),
  order: integer("order"),
  isDone: boolean("is_done").default(false).notNull(),
})

export const projects = pgTable("projects", {
  id: text("id").primaryKey(), // 'p1' .. 'p6'
  phaseId: text("phase_id").references(() => phases.id),
  title: text("title").notNull(),
  slug: text("slug").unique().notNull(),
  type: text("type"), // experiment|intermediate|production|flagship
  status: text("status").default("not_started").notNull(), // not_started|building|polishing|shipped
  purpose: text("purpose"),
  skillsDemonstrated: text("skills_demonstrated"), // comma-separated skill IDs
  techStack: text("tech_stack").array(),
  implementationSteps: text("implementation_steps"), // newline-separated numbered steps
  whatProductionMeans: text("what_production_means"),
  repoUrl: text("repo_url"),
  demoUrl: text("demo_url"),
  isDone: boolean("is_done").default(false).notNull(),
  order: integer("order"),
})

export const skillResources = pgTable("skill_resources", {
  id: text("id").primaryKey(), // '<skillId>-<itemIndex>-<n>'
  skillId: text("skill_id")
    .references(() => skills.id, { onDelete: "cascade" })
    .notNull(),
  // Index into the skill's newline-split what_to_learn list; null = general.
  itemIndex: integer("item_index"),
  label: text("label").notNull(),
  url: text("url").notNull(),
  kind: text("kind").default("article").notNull(), // docs|video|course|article|book|repo|practice
  order: integer("order"),
})

// Mutable, user-owned tables ------------------------------------------------

export const weeklySprints = pgTable("weekly_sprints", {
  id: uuid("id").primaryKey().defaultRandom(),
  weekLabel: text("week_label"),
  weekStart: date("week_start", { mode: "string" }).unique(),
  status: text("status").default("planned").notNull(), // planned|active|done
  focus: text("focus"),
  wins: text("wins"),
  blockers: text("blockers"),
  revisit: text("revisit"),
  daysStudied: integer("days_studied").default(0).notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
})

export const careerItems = pgTable("career_items", {
  id: uuid("id").primaryKey().defaultRandom(),
  title: text("title").notNull(),
  category: text("category"), // resume|portfolio|skill_proven|interview_prep|application
  status: text("status").default("todo").notNull(), // todo|in_progress|done
  targetDate: date("target_date", { mode: "string" }),
  notes: text("notes"),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
})

// Inferred types ------------------------------------------------------------

export type Track = typeof tracks.$inferSelect
export type Phase = typeof phases.$inferSelect
export type Skill = typeof skills.$inferSelect
export type SkillResource = typeof skillResources.$inferSelect
export type Project = typeof projects.$inferSelect
export type WeeklySprint = typeof weeklySprints.$inferSelect
export type CareerItem = typeof careerItems.$inferSelect

export type NewTrack = typeof tracks.$inferInsert
export type NewPhase = typeof phases.$inferInsert
export type NewSkill = typeof skills.$inferInsert
export type NewSkillResource = typeof skillResources.$inferInsert
export type NewProject = typeof projects.$inferInsert
export type NewWeeklySprint = typeof weeklySprints.$inferInsert
export type NewCareerItem = typeof careerItems.$inferInsert

export type SkillStatus =
  | "not_started"
  | "in_progress"
  | "reviewing"
  | "completed"
  | "blocked"
export type ProjectStatus = "not_started" | "building" | "polishing" | "shipped"
