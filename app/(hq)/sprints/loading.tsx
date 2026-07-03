import { SkeletonHeader, SkeletonCard } from "@/components/hq/skeletons"

export default function SprintsLoading() {
  return (
    <div className="mx-auto max-w-4xl px-6 py-8">
      <SkeletonHeader />
      <div className="mt-8 space-y-4">
        {Array.from({ length: 3 }).map((_, i) => (
          <SkeletonCard key={i} className="h-56" />
        ))}
      </div>
    </div>
  )
}
