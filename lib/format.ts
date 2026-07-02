export function greeting(date = new Date()): string {
  const h = date.getHours()
  if (h < 12) return "Good morning"
  if (h < 18) return "Good afternoon"
  return "Good evening"
}

export function formatLongDate(date = new Date()): string {
  const weekday = date.toLocaleDateString("en-US", { weekday: "long" })
  const rest = date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  })
  return `${weekday} · ${rest}`
}

/** 'Jul 13' style short date from a 'YYYY-MM-DD' string. */
export function formatShortDate(iso: string | null): string | null {
  if (!iso) return null
  const d = new Date(`${iso}T00:00:00`)
  if (Number.isNaN(d.getTime())) return null
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric" })
}

export function toISODate(d: Date): string {
  return d.toISOString().slice(0, 10)
}

/** The Monday strictly after the given 'YYYY-MM-DD' (or after today if null). */
export function nextMonday(fromIso: string | null): string {
  const base = fromIso ? new Date(`${fromIso}T00:00:00`) : new Date()
  const day = base.getDay() // 0 Sun … 6 Sat
  const daysUntilNextMon = ((8 - day) % 7) || 7
  const d = new Date(base)
  d.setDate(base.getDate() + daysUntilNextMon)
  return toISODate(d)
}

/** 'Week of Jun 30 – Jul 6' from a Monday 'YYYY-MM-DD'. */
export function formatWeekLabel(startIso: string): string {
  const start = new Date(`${startIso}T00:00:00`)
  const end = new Date(start)
  end.setDate(start.getDate() + 6)
  const fmt = (d: Date) =>
    d.toLocaleDateString("en-US", { month: "short", day: "numeric" })
  return `Week of ${fmt(start)} – ${fmt(end)}`
}
