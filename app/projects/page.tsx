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
        <div className="font-mono text-xs uppercase tracking-widest text-hq-text-muted">
          Cracked Dev HQ
        </div>
        <h1 className="mt-1 text-3xl font-bold text-hq-text">Projects</h1>
        <p className="mt-1 text-sm text-hq-text-secondary">
          Six builds that turn skills into proof — experiment → flagship.
        </p>
      </header>

      <ProjectsFilter projects={projects} />
    </div>
  )
}
