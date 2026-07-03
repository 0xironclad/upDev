import { SkeletonHeader, SkeletonCard } from "@/components/hq/skeletons"

export default function ProjectsLoading() {
  return (
    <div className="mx-auto max-w-4xl px-6 py-8">
      <SkeletonHeader />
      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
        {Array.from({ length: 6 }).map((_, i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
    </div>
  )
}
