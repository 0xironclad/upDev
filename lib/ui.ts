// Warm-palette accent maps shared across the app. Keeps status/track/category
// coloring consistent with the terminal/graph-paper concept.

export type Accent = "amber" | "green" | "cyan" | "red" | "muted"

type AccentClasses = {
  text: string
  border: string
  bg: string
  dot: string
}

const ACCENTS: Record<Accent, AccentClasses> = {
  amber: {
    text: "text-hq-amber",
    border: "border-hq-amber/40",
    bg: "bg-hq-amber/10",
    dot: "bg-hq-amber",
  },
  green: {
    text: "text-hq-green",
    border: "border-hq-green/40",
    bg: "bg-hq-green/10",
    dot: "bg-hq-green",
  },
  cyan: {
    text: "text-hq-cyan",
    border: "border-hq-cyan/40",
    bg: "bg-hq-cyan/10",
    dot: "bg-hq-cyan",
  },
  red: {
    text: "text-hq-red",
    border: "border-hq-red/40",
    bg: "bg-hq-red/10",
    dot: "bg-hq-red",
  },
  muted: {
    text: "text-hq-text-muted",
    border: "border-hq-border",
    bg: "bg-hq-elevated",
    dot: "bg-hq-text-muted",
  },
}

export function accent(a: Accent): AccentClasses {
  return ACCENTS[a]
}

export function trackAccent(trackId: string | null): Accent {
  switch (trackId) {
    case "track-a":
      return "amber"
    case "track-b":
      return "cyan"
    case "track-c":
      return "green"
    default:
      return "muted"
  }
}

export function categoryAccent(category: string | null): Accent {
  switch (category) {
    case "AWS":
    case "Kubernetes":
    case "Terraform":
    case "CI/CD":
    case "Operations":
      return "cyan"
    case "Evals":
    case "System Design":
    case "Interview Prep":
      return "green"
    default:
      return "amber"
  }
}

type StatusMeta = { label: string; accent: Accent }

export function skillStatusMeta(status: string): StatusMeta {
  // Expedition vocabulary (DESIGN.md §6); data values are unchanged.
  switch (status) {
    case "in_progress":
      return { label: "CLIMBING", accent: "amber" }
    case "reviewing":
      return { label: "REVIEWING", accent: "cyan" }
    case "completed":
      return { label: "CLEARED", accent: "green" }
    case "blocked":
      return { label: "BLOCKED", accent: "red" }
    default:
      return { label: "QUEUED", accent: "muted" }
  }
}

export function projectStatusMeta(status: string): StatusMeta {
  switch (status) {
    case "building":
      return { label: "BUILDING", accent: "amber" }
    case "polishing":
      return { label: "POLISHING", accent: "cyan" }
    case "shipped":
      return { label: "SHIPPED", accent: "green" }
    default:
      return { label: "NOT STARTED", accent: "muted" }
  }
}

export function projectTypeMeta(type: string | null): StatusMeta {
  switch (type) {
    case "flagship":
      return { label: "FLAGSHIP", accent: "amber" }
    case "production":
      return { label: "PRODUCTION", accent: "cyan" }
    case "intermediate":
      return { label: "INTERMEDIATE", accent: "green" }
    default:
      return { label: "EXPERIMENT", accent: "muted" }
  }
}

export function sprintStatusMeta(status: string): StatusMeta {
  switch (status) {
    case "active":
      return { label: "ACTIVE", accent: "amber" }
    case "done":
      return { label: "DONE", accent: "green" }
    default:
      return { label: "PLANNED", accent: "muted" }
  }
}

export function careerStatusMeta(status: string): StatusMeta {
  switch (status) {
    case "in_progress":
      return { label: "IN PROGRESS", accent: "amber" }
    case "done":
      return { label: "DONE", accent: "green" }
    default:
      return { label: "TODO", accent: "muted" }
  }
}

export function priorityAccent(priority: string): Accent {
  switch (priority) {
    case "high":
      return "red"
    case "low":
      return "muted"
    default:
      return "amber"
  }
}

export function phaseStatus(
  progress: { completed: number; total: number },
  isCurrent: boolean
): StatusMeta {
  if (progress.total > 0 && progress.completed === progress.total) {
    return { label: "COMPLETED", accent: "green" }
  }
  if (isCurrent || progress.completed > 0) {
    return { label: "IN PROGRESS", accent: "amber" }
  }
  return { label: "NOT STARTED", accent: "muted" }
}
