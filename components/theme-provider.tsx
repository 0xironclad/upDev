"use client"

import * as React from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes"

// Graphite (dark) is Ascent's native theme; Whiteout stays a manual toggle.
function ThemeProvider({
  children,
  ...props
}: React.ComponentProps<typeof NextThemesProvider>) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem={false}
      disableTransitionOnChange
      {...props}
    >
      {children}
    </NextThemesProvider>
  )
}

export { ThemeProvider }
