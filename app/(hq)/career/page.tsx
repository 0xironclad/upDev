import type { Metadata } from "next"
import { Plus } from "lucide-react"

import { getCareerItems } from "@/lib/data/roadmap"
import { CAREER_CATEGORIES, CATEGORY_META } from "@/lib/career"
import { CareerItemCard } from "@/components/hq/career-item-card"
import { CareerItemDialog } from "@/components/hq/career-item-dialog"

export const metadata: Metadata = { title: "Career Growth" }
export const dynamic = "force-dynamic"

export default async function CareerPage() {
  const items = await getCareerItems()
  const doneCount = items.filter((i) => i.status === "done").length

  return (
    <div className="mx-auto max-w-6xl px-6 py-8">
      <header className="mb-8">
        <div className="hq-overline text-hq-text-muted">Cracked Dev HQ</div>
        <h1 className="hq-display mt-2 text-4xl font-extrabold text-hq-text">
          Career Growth
        </h1>
        <p className="mt-2 font-mono text-xs text-hq-text-secondary">
          {doneCount} of {items.length} items done
        </p>
        <p className="mt-2 max-w-[68ch] text-sm text-hq-text-secondary">
          The bridge from learning to hired: every skill becomes a resume edit,
          a portfolio piece, or an application.
        </p>
      </header>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {CAREER_CATEGORIES.map((category) => {
          const meta = CATEGORY_META[category]
          const Icon = meta.icon
          const columnItems = items.filter((i) => i.category === category)
          return (
            <div key={category} className="flex flex-col">
              <div className="mb-3 flex items-center justify-between gap-2 border-b border-hq-border pb-2">
                <div className="flex items-center gap-1.5">
                  <Icon className="size-4 text-hq-text-muted" />
                  <span className="hq-overline text-hq-text">{meta.label}</span>
                  <span className="font-mono text-xs text-hq-text-muted tabular-nums">
                    {columnItems.length}
                  </span>
                </div>
                <CareerItemDialog
                  defaultCategory={category}
                  trigger={
                    <button
                      type="button"
                      aria-label={`Add ${meta.label} item`}
                      className="rounded-sm p-1 text-hq-text-muted transition-colors duration-150 hover:bg-hq-elevated hover:text-hq-text focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-hq-accent"
                    >
                      <Plus className="size-4" />
                    </button>
                  }
                />
              </div>

              <div className="flex flex-col gap-2">
                {columnItems.length > 0 ? (
                  columnItems.map((item) => (
                    <CareerItemCard key={item.id} item={item} />
                  ))
                ) : (
                  <p className="rounded-md border border-dashed border-hq-border p-3 text-xs text-hq-text-muted">
                    {meta.empty}
                  </p>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
