import { Skeleton } from "@/components/ui/skeleton"
import { cn } from "@/lib/utils"

/** Page header block (eyebrow + title + subtitle). */
export function SkeletonHeader() {
  return (
    <div className="space-y-2">
      <Skeleton className="h-3 w-28" />
      <Skeleton className="h-8 w-56" />
      <Skeleton className="h-4 w-72" />
    </div>
  )
}

/** A bordered card placeholder matching the app's panels. */
export function SkeletonCard({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "rounded-md border border-hq-border bg-hq-surface p-4",
        className
      )}
    >
      <Skeleton className="h-3 w-24" />
      <Skeleton className="mt-3 h-6 w-3/4" />
      <Skeleton className="mt-2 h-4 w-full" />
      <Skeleton className="mt-3 h-1 w-full" />
    </div>
  )
}

export function SkeletonRow() {
  return (
    <div className="flex items-center justify-between rounded-md border border-hq-border bg-hq-surface p-4">
      <div className="w-full space-y-2">
        <Skeleton className="h-4 w-20" />
        <Skeleton className="h-5 w-2/3" />
        <Skeleton className="h-4 w-1/2" />
      </div>
      <Skeleton className="ml-4 h-5 w-20 shrink-0" />
    </div>
  )
}
