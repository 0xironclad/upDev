import { Skeleton } from "@/components/ui/skeleton"
import { SkeletonHeader } from "@/components/hq/skeletons"

export default function CareerLoading() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-8">
      <SkeletonHeader />
      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {Array.from({ length: 5 }).map((_, col) => (
          <div key={col} className="space-y-3">
            <Skeleton className="h-6 w-full" />
            <Skeleton className="h-24 w-full rounded-md" />
            <Skeleton className="h-24 w-full rounded-md" />
          </div>
        ))}
      </div>
    </div>
  )
}
