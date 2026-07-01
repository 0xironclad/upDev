"use client"

import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

import { cn } from "@/lib/utils"

export function ThemeToggle({ className }: { className?: string }) {
  const { setTheme } = useTheme()

  function toggle() {
    const isDark = document.documentElement.classList.contains("dark")
    setTheme(isDark ? "light" : "dark")
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label="Toggle theme"
      className={cn(
        "inline-flex size-7 items-center justify-center rounded-sm border border-hq-border text-hq-text-secondary transition-colors hover:bg-hq-elevated hover:text-hq-text",
        className
      )}
    >
      {/* Icon swaps via the `dark` class on <html> — no JS state, no hydration fl…*/}
      <Sun className="size-4 dark:hidden" />
      <Moon className="hidden size-4 dark:block" />
    </button>
  )
}
