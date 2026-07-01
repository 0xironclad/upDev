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
