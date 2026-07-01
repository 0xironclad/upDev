# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Next.js 16 — read the bundled docs first

This project uses Next.js 16.2.6, which has breaking changes vs. common training data (APIs, conventions, file structure). **Before writing any Next.js code, read the relevant guide in `node_modules/next/dist/docs/`** (`01-app` for the App Router) and heed deprecation notices. Do not assume older Next.js patterns still apply.

## Commands

- `npm run typecheck` — `tsc --noEmit` (no build output; use this to check types)
- `npm run lint` — ESLint (`eslint-config-next`)
- `npm run format` — Prettier write over all `.ts`/`.tsx`
- `npm run dev` / `npm run build` / `npm run start`

## Code style

Enforced by Prettier (`.prettierrc`) — these differ from common defaults:

- **No semicolons**
- Double quotes, 2-space indent, `printWidth` 80, trailing commas `es5`
- Compose Tailwind classes with `cn()` from `@/lib/utils` (uses `clsx` + `tailwind-merge`)

## UI components (shadcn/ui)

- Add components with `npx shadcn@latest add <name>` — they land in `components/ui/`
- Style is `radix-nova`; icon library is `lucide-react`
- Import via aliases: `@/components/ui`, `@/lib`, `@/hooks` (`@/*` → repo root)
- App Router with React Server Components enabled (`rsc: true`)
