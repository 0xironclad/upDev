import { SkeletonHeader, SkeletonRow } from "@/components/hq/skeletons"

export default function RoadmapLoading() {
  return (
    <div className="px-6 py-8">
      <div className="mx-auto max-w-5xl">
        <SkeletonHeader />
        <div className="mt-8 space-y-3">
          {Array.from({ length: 4 }).map((_, i) => (
            <SkeletonRow key={i} />
          ))}
        </div>
      </div>
    </div>
  )
}
