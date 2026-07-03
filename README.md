# upDev

Collins's personal engineering growth platform ("Cracked Dev HQ") — a single
place to track the journey from full-stack TypeScript engineer to AI + Cloud
specialist. Roadmap content (tracks, phases, skills, projects) is fixed and
lives in the database seed.

## Stack

- **Next.js 16** (App Router, React Server Components) + **TypeScript** (strict)
- **Tailwind CSS v4** (CSS `@theme` tokens — no `tailwind.config.ts`) + **shadcn/ui**
- **Drizzle ORM** over **PostgreSQL** (local-first; Supabase-ready)
- Warm terminal / graph-paper design system, light + dark themes (light by default)

## Local setup

The app reads from a local Postgres via Drizzle. Fastest path is Docker.

1. **Install deps**

   ```bash
   npm install
   ```

2. **Start a local Postgres** (isolated container on port 5433):

   ```bash
   docker run -d --name updev-pg \
     -e POSTGRES_USER=updev -e POSTGRES_PASSWORD=updev -e POSTGRES_DB=updev \
     -p 5433:5432 postgres:16
   ```

   Already created it once? Just start it again with `docker start updev-pg`.

3. **Configure env** — copy the example and keep the default local URL:

   ```bash
   cp .env.local.example .env.local
   # DATABASE_URL=postgres://updev:updev@localhost:5433/updev
   ```

4. **Create the schema and seed the roadmap**

   ```bash
   npx drizzle-kit push      # create tables from db/schema.ts
   npx tsx db/seed.ts        # load tracks, phases, skills, projects, sprints, career items
   ```

5. **Run the app**
   ```bash
   npm run dev               # http://localhost:3000
   ```

## Scripts

| Command                           | Purpose                                      |
| --------------------------------- | -------------------------------------------- |
| `npm run dev`                     | Dev server                                   |
| `npm run build` / `npm run start` | Production build / serve                     |
| `npm run typecheck`               | `tsc --noEmit`                               |
| `npm run lint`                    | ESLint                                       |
| `npm run format`                  | Prettier                                     |
| `npx tsx db/seed.ts`              | Re-seed (idempotent — clears and re-inserts) |

## Notes

- **Data is local-first for now.** The schema stays on the Postgres dialect so
  migrating to **Supabase** later is mostly pointing `DATABASE_URL` at the
  Supabase connection string and adding the Auth layer. See `.env.local.example`.
- `.env.local` is gitignored; `.env.local.example` is committed.
- **Supabase auth:** once `NEXT_PUBLIC_SUPABASE_URL` and the anon/publishable
  key are set, the login gate turns on. Set `OWNER_EMAIL` to restrict
  mutations to a single signed-in account — server actions call `requireOwner()`
  and reject any other user (or any caller when Supabase isn't configured in
  production).
