"use client"

import * as React from "react"

import type { Project } from "@/db/schema"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ProjectCard } from "@/components/hq/project-card"

type Filter = "all" | "building" | "shipped"

export function ProjectsFilter({ projects }: { projects: Project[] }) {
  const [filter, setFilter] = React.useState<Filter>("all")

  const visible = projects.filter((p) => {
    if (filter === "all") return true
    if (filter === "shipped") return p.status === "shipped"
    return p.status === "building" || p.status === "polishing"
  })

  return (
    <div>
      <Tabs value={filter} onValueChange={(v) => setFilter(v as Filter)}>
        <TabsList className="font-mono text-xs">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="building">Building</TabsTrigger>
          <TabsTrigger value="shipped">Shipped</TabsTrigger>
        </TabsList>
      </Tabs>

      {visible.length > 0 ? (
        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {visible.map((p) => (
            <ProjectCard key={p.id} project={p} />
          ))}
        </div>
      ) : (
        <p className="mt-6 text-sm text-hq-text-muted">
          No projects in this view yet.
        </p>
      )}
    </div>
  )
}
