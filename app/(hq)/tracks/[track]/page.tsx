import type { Metadata } from "next"
import { notFound } from "next/navigation"

import { getTrackPageData } from "@/lib/data/roadmap"
import { SkillCard } from "@/components/hq/skill-card"

export const dynamic = "force-dynamic"

const TRACK_BY_SLUG: Record<string, string> = {
  ai: "track-a",
  cloud: "track-b",
  career: "track-c",
}

const TRACK_LETTER: Record<string, string> = {
  "track-a": "A",
  "track-b": "B",
  "track-c": "C",
}

type Params = { params: Promise<{ track: string }> }

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { track } = await params
  const trackId = TRACK_BY_SLUG[track]
  if (!trackId) return { title: "Track" }
  const data = await getTrackPageData(trackId)
  return { title: data ? data.track.name : "Track" }
}

export default async function TrackPage({ params }: Params) {
  const { track } = await params
  const trackId = TRACK_BY_SLUG[track]
  if (!trackId) notFound()

  const data = await getTrackPageData(trackId)
  if (!data) notFound()

  const { track: trackRow, groups, stats } = data
  const letter = TRACK_LETTER[trackRow.id] ?? ""
  const notStarted = Math.max(0, stats.total - stats.completed - stats.inProgress)
  const pct = (n: number) => (stats.total === 0 ? 0 : (n / stats.total) * 100)

  return (
    <div className="mx-auto max-w-3xl px-6 py-8">
      {/* Header */}
      <header>
        <div className="hq-overline text-hq-text-muted">
          Track {letter} · Expedition
        </div>
        <h1 className="hq-display mt-2 text-4xl font-extrabold text-hq-text">
          {trackRow.name}
        </h1>
        <p className="mt-2 font-mono text-xs text-hq-text-secondary">
          {stats.total} skills ·{" "}
          <span className="text-hq-text">{stats.completed}</span> cleared ·{" "}
          <span className="text-hq-accent">{stats.inProgress}</span> climbing
        </p>
        {trackRow.description && (
          <p className="mt-3 text-sm text-hq-text-secondary">
            {trackRow.description}
          </p>
        )}

        {/* Segmented progress bar */}
        <div className="mt-4 flex h-2 w-full overflow-hidden rounded-sm bg-hq-elevated">
          <div
            className="bg-hq-text"
            style={{ width: `${pct(stats.completed)}%` }}
          />
          <div
            className="bg-hq-accent"
            style={{ width: `${pct(stats.inProgress)}%` }}
          />
          <div
            className="bg-hq-border"
            style={{ width: `${pct(notStarted)}%` }}
          />
        </div>
      </header>

      {/* Phase groups */}
      <div className="mt-8 space-y-8">
        {groups.map(({ phase, skills }) => (
          <section key={phase.id}>
            <div className="flex flex-wrap items-baseline gap-2">
              <h2 className="hq-overline text-hq-text-muted">
                Phase {phase.number} · {phase.name}
              </h2>
              <span className="rounded-sm bg-hq-elevated px-1.5 py-0.5 font-mono text-[10px] uppercase tracking-wider text-hq-text-secondary">
                {phase.window}
              </span>
            </div>
            <div className="mt-3">
              {skills.map((skill) => (
                <SkillCard key={skill.id} skill={skill} />
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  )
}
