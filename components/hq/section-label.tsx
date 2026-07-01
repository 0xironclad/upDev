import { cn } from "@/lib/utils"

/** Muted mono section header, e.g. "NEXT ACTION", with a subtle terminal chevron. */
export function SectionLabel({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <div
      className={cn(
        "flex items-center gap-1.5 font-mono text-xs uppercase tracking-widest text-hq-text-muted",
        className
      )}
    >
      <span className="text-hq-green">&gt;</span>
      {children}
    </div>
  )
}
