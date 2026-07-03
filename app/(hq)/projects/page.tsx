import type { Metadata } from "next"

import { getProjects } from "@/lib/data/roadmap"
import { ProjectsFilter } from "@/components/hq/projects-filter"

export const metadata: Metadata = { title: "Projects" }
export const dynamic = "force-dynamic"

export default async function ProjectsPage() {
  const projects = await getProjects()

  return (
    <div className="mx-auto max-w-4xl px-6 py-8">
      <header className="mb-6">
        <div className="hq-overline text-hq-text-muted">
          Cracked Dev HQ · Destinations
        </div>
        <h1 className="hq-display mt-2 text-4xl font-extrabold text-hq-text">
          Projects
        </h1>
        <p className="mt-2 font-mono text-xs text-hq-text-secondary">
          {projects.length} builds that turn skills into proof, experiment to
          flagship
        </p>
      </header>

      <ProjectsFilter projects={projects} />
    </div>
  )
}
