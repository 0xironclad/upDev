"use client"

import * as React from "react"
import { Menu } from "lucide-react"

import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

/**
 * Mobile header bar (lg:hidden) with a hamburger that opens the sidebar in a
 * Sheet. `children` is the server-rendered SidebarInner instance.
 */
export function MobileNav({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = React.useState(false)

  return (
    <div className="flex items-center gap-3 border-b border-hq-border bg-hq-surface px-4 py-3 lg:hidden">
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger
          aria-label="Open navigation"
          className="rounded-sm p-1 text-hq-text-secondary transition-colors hover:bg-hq-elevated hover:text-hq-text"
        >
          <Menu className="size-5" />
        </SheetTrigger>
        <SheetContent
          side="left"
          className="w-64 border-hq-border bg-hq-surface p-0"
        >
          <SheetTitle className="sr-only">Navigation</SheetTitle>
          <div onClick={() => setOpen(false)} className="h-full">
            {children}
          </div>
        </SheetContent>
      </Sheet>
      <div className="font-mono text-xs uppercase tracking-widest text-hq-text-muted">
        Cracked Dev <span className="hq-glow text-hq-amber">HQ</span>
      </div>
    </div>
  )
}
