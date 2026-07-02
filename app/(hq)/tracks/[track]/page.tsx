import type { Metadata } from "next"
import { notFound } from "next/navigation"

import { getTrackPageData } from "@/lib/data/roadmap"
import { accent, trackAccent } from "@/lib/ui"
import { cn } from "@/lib/utils"
import { SkillCard } from "@/components/hq/skill-card"

export const dynamic = "force-dynamic"

const TRACK_BY_SLUG: Record<string, string> = {
  ai: "track-a",
  cloud: "track-b",
  career: "track-c",
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
  const tone = accent(trackAccent(trackRow.id))
  const notStarted = Math.max(0, stats.total - stats.completed - stats.inProgress)
  const pct = (n: number) => (stats.total === 0 ? 0 : (n / stats.total) * 100)

  return (
    <div className="mx-auto max-w-3xl px-6 py-8">
      {/* Header */}
      <header>
        <div className="flex items-center gap-3">
          <span className="text-4xl">{trackRow.icon}</span>
          <h1 className="text-3xl font-bold text-hq-text">{trackRow.name}</h1>
        </div>
        {trackRow.description && (
          <p className="mt-2 text-sm text-hq-text-secondary">
            {trackRow.description}
          </p>
        )}
        <div className={cn("mt-4 h-0.5 w-24 rounded-full", tone.dot)} />

        {/* Stats + segmented bar */}
        <div className="mt-4 flex flex-wrap items-center gap-4 font-mono text-xs text-hq-text-secondary">
          <span>
            <span className="text-hq-text">{stats.total}</span> skills
          </span>
          <span>
            <span className="text-hq-green">{stats.completed}</span> completed
          </span>
          <span>
            <span className="text-hq-amber">{stats.inProgress}</span> in progress
          </span>
        </div>
        <div className="mt-2 flex h-2 w-full overflow-hidden rounded-sm bg-hq-elevated">
          <div className="bg-hq-green" style={{ width: `${pct(stats.completed)}%` }} />
          <div className="bg-hq-amber" style={{ width: `${pct(stats.inProgress)}%` }} />
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
              <h2 className="font-mono text-xs uppercase tracking-widest text-hq-text-muted">
                Phase {phase.number} · {phase.name}
              </h2>
              <span className="rounded-sm bg-hq-elevated px-1.5 py-0.5 font-mono text-[10px] uppercase tracking-wider text-hq-text-secondary">
                {phase.window}
              </span>
            </div>
            <div className="mt-3 grid grid-cols-1 gap-3">
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
