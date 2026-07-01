"use client"

import * as React from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes"

// upDev is a dark, terminal-style engineering tool — single forced dark theme,
// no toggle. forcedTheme keeps the `dark` class on <html> so the HQ palette applies.
function ThemeProvider({
  children,
  ...props
}: React.ComponentProps<typeof NextThemesProvider>) {
  return (
    <NextThemesProvider
      attribute="class"
      forcedTheme="dark"
      enableSystem={false}
      disableTransitionOnChange
      {...props}
    >
      {children}
    </NextThemesProvider>
  )
}

export { ThemeProvider }
