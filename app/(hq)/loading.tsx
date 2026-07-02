import { SkeletonHeader, SkeletonCard } from "@/components/hq/skeletons"

export default function DashboardLoading() {
  return (
    <div className="mx-auto max-w-4xl px-6 py-8">
      <SkeletonHeader />
      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
        <SkeletonCard />
        <SkeletonCard />
        <SkeletonCard />
      </div>
      <SkeletonCard className="mt-6" />
      <SkeletonCard className="mt-6" />
    </div>
  )
}
