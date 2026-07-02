import { Skeleton } from "@/components/ui/skeleton"

export default function SkillDetailLoading() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-8">
      <Skeleton className="h-3 w-64" />
      <Skeleton className="mt-6 h-9 w-2/3" />
      <div className="mt-3 flex gap-2">
        <Skeleton className="h-5 w-16" />
        <Skeleton className="h-5 w-24" />
      </div>
      <Skeleton className="mt-8 h-4 w-32" />
      <Skeleton className="mt-2 h-16 w-full" />
      <Skeleton className="mt-6 h-24 w-full rounded-md" />
      <Skeleton className="mt-6 h-24 w-full rounded-md" />
    </div>
  )
}
