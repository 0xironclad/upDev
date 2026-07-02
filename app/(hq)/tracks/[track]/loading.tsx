import { Skeleton } from "@/components/ui/skeleton"
import { SkeletonRow } from "@/components/hq/skeletons"

export default function TrackLoading() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-8">
      <Skeleton className="h-9 w-64" />
      <Skeleton className="mt-3 h-4 w-80" />
      <Skeleton className="mt-4 h-2 w-full" />
      <div className="mt-8 space-y-3">
        {Array.from({ length: 3 }).map((_, i) => (
          <SkeletonRow key={i} />
        ))}
      </div>
    </div>
  )
}
