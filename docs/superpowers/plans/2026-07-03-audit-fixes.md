# upDev Audit Fixes Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Apply the 2026-07-03 audit's top fixes: auth hardening, seed-data safety, roadmap restructure (5 new skills, B3 split, tightened DoDs, earlier job search), new career items, sprint activity view, error boundaries, and spec codification of the shipped warm-terminal design.

**Architecture:** Three independent workstreams — (A) security/server code, (B) UI components, (C) database schema + seed content + spec doc — touching disjoint files so they can run in parallel. Seed becomes state-preserving: content tables reseed wholesale but skill/project statuses are captured and re-applied; user-owned tables (`weekly_sprints`, `career_items`) are never deleted.

**Tech Stack:** Next.js 16.2.6 (App Router), TypeScript strict, Tailwind v4 (CSS tokens), Drizzle ORM + Postgres, Supabase Auth, Zod.

## Global Constraints

- Prettier style: **no semicolons**, double quotes, 2-space indent, printWidth 80 (`.prettierrc`).
- Compose Tailwind classes with `cn()` from `@/lib/utils`.
- TypeScript strict — no `any`, no `@ts-ignore`.
- Server actions return `{ success: boolean; error?: string }` (`ActionResult` from `@/app/actions/roadmap`).
- Read `node_modules/next/dist/docs/` before writing Next.js-convention code (Next 16 breaking changes).
- Use existing `hq-*` design tokens (`bg-hq-surface`, `text-hq-amber`, etc.); `transition-colors duration-150`; no scale transforms.
- Roadmap content edits go in `db/seed.ts` only — schema stays text-based (no pgEnum migration in this pass; audit CODE-04 deferred).
- Do not commit; leave the working tree for user review.

---

## Task 1: Auth hardening + error boundaries (Workstream A — security)

**Files:**
- Create: `lib/supabase/auth.ts`
- Modify: `app/actions/roadmap.ts`, `app/actions/career.ts`, `app/actions/sprints.ts` (every exported action)
- Modify: `middleware.ts` (fail closed in production; check bundled Next 16 docs for `proxy` rename)
- Create: `app/(hq)/error.tsx`, `app/global-error.tsx`
- Modify: `.env.local` (add `OWNER_EMAIL=chemerilcollins@gmail.com`), `README.md` (document it)

**Interfaces:**
- Produces: `requireOwner(): Promise<{ ok: true } | { ok: false; error: string }>` from `@/lib/supabase/auth` — called first in every server action.

- [ ] **Step 1: Create `lib/supabase/auth.ts`**

```ts
import { isSupabaseConfigured } from "@/lib/supabase/config"
import { createClient } from "@/lib/supabase/server"

type OwnerCheck = { ok: true } | { ok: false; error: string }

/**
 * Authorization for mutations. Middleware only gates page navigation —
 * every server action must verify the caller's identity itself.
 * - Supabase unconfigured: allow in dev (dormant mode), refuse in prod.
 * - Configured: require a session; if OWNER_EMAIL is set, require it to match.
 */
export async function requireOwner(): Promise<OwnerCheck> {
  if (!isSupabaseConfigured()) {
    if (process.env.NODE_ENV === "production") {
      return { ok: false, error: "Auth is not configured." }
    }
    return { ok: true }
  }

  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) return { ok: false, error: "Not signed in." }

  const owner = process.env.OWNER_EMAIL?.trim().toLowerCase()
  if (owner && user.email?.toLowerCase() !== owner) {
    return { ok: false, error: "Not authorized." }
  }
  return { ok: true }
}
```

- [ ] **Step 2: Guard every exported action.** At the top of each exported async function in the three action files (`updateSkillStatus`, `updateProjectStatus`, `updateSprint`, `createSprint`, `upsertCareerItem`, and any others found — `markSkillComplete` delegates to `updateSkillStatus`, so it's covered transitively):

```ts
const auth = await requireOwner()
if (!auth.ok) return { success: false, error: auth.error }
```

- [ ] **Step 3: Fail closed in production** — `middleware.ts:7-9` becomes:

```ts
if (!isSupabaseConfigured()) {
  if (process.env.NODE_ENV === "production") {
    return new NextResponse("Auth is not configured.", { status: 503 })
  }
  return NextResponse.next()
}
```

- [ ] **Step 4: `createSprint` duplicate week** — map Postgres unique-violation (`code === "23505"` on the caught error) to `{ success: false, error: "A sprint for that week already exists." }`. (Task 3 in workstream C adds the unique constraint.)

- [ ] **Step 5: Error boundaries.** `app/(hq)/error.tsx` — client component: mono uppercase "SOMETHING BROKE" label, `error.message` in `text-sm text-hq-text-secondary`, and a `Retry` button calling `reset()`, styled like the existing empty states (`rounded-md border border-hq-border bg-hq-surface p-6`). `app/global-error.tsx` — same content but rendering its own `<html><body>`.

- [ ] **Step 6: `middleware` → `proxy` rename.** Read `node_modules/next/dist/docs/` for the Next 16 proxy convention. If confirmed, rename `middleware.ts` → `proxy.ts` and the export accordingly; otherwise leave as-is and note why.

- [ ] **Step 7: Verify** — `npm run typecheck && npm run lint` pass.

---

## Task 2: Sprint activity view + roadmap polish (Workstream B — UI)

**Files:**
- Create: `components/hq/study-activity.tsx`
- Modify: `app/(hq)/sprints/page.tsx` (mount it between header and Sprint Log)
- Modify: `app/(hq)/roadmap/page.tsx` (~line 110: collapsible phase goal)
- Modify: `components/hq/sprint-editor.tsx` (~line 88: remove scale transforms)

**Interfaces:**
- Consumes: `WeeklySprint` type from `@/db/schema`; sprints array already fetched in `sprints/page.tsx` via `getSprints()`.
- Produces: `<StudyActivity sprints={WeeklySprint[]} />` (server component, no client JS needed).

- [ ] **Step 1: `StudyActivity`** — the streak view the spec designed but the build dropped. Take the last 12 sprints by `weekStart` ascending; render a `SectionLabel` "Study Activity", a summary line `"{n} days studied in the last 4 weeks"` (sum `daysStudied` of sprints whose `weekStart` is within 28 days of today), and a row of one column per week: 7 stacked 8px dots, `daysStudied` of them `bg-hq-amber`, the rest `bg-hq-border`, with the week's start date under each column in `font-mono text-[10px] text-hq-text-muted`. Wrap in `overflow-x-auto`. No animations beyond `transition-colors`.

- [ ] **Step 2: Collapsible phase goals.** Replace the static `{phase.goal && <p>…</p>}` block in `roadmap/page.tsx` with a native `<details>` (no client component): `<summary>` styled `cursor-pointer font-mono text-xs uppercase tracking-widest text-hq-text-muted` reading "Phase goal", body is the existing `<p>`. Add the `open` attribute when the phase is active or future (the page already computes per-phase progress/state — completed = `prog.completed === prog.total && prog.total > 0`).

- [ ] **Step 3: Remove `hover:scale-110 active:scale-90`** from the day-tracker dots in `sprint-editor.tsx`, keep `transition-colors duration-150`.

- [ ] **Step 4: Verify** — `npm run typecheck && npm run lint` pass.

---

## Task 3: Schema + seed restructure (Workstream C — owned by orchestrator)

**Files:**
- Modify: `db/schema.ts` (unique `week_start`)
- Modify: `db/seed.ts` (state-preserving reseed + all content changes below)

- [ ] **Step 1: Schema** — `weekStart: date("week_start", { mode: "string" }).unique()`.

- [ ] **Step 2: State-preserving seed.** Before deleting `skills`/`projects`, capture `{ id, status, isDone }` (plus `repoUrl`/`demoUrl` for projects); after reinserting, re-apply captured values for ids that still exist. Never delete `weeklySprints` (insert seed rows only when the table is empty) or `careerItems` (insert only rows whose `title` is not already present).

- [ ] **Step 3: Content — edits to existing rows.**
  - `a0.whatToLearn` += `\nStreaming responses: SSE/token streaming end-to-end from API to client\nPrompt caching: provider-side caching and when it changes the cost math`; DoD += ` Streams tokens and logs cache hits/misses.`
  - `a1.whatToLearn` += `\nTool/function calling in depth: JSON-schema-constrained arguments, parallel calls, validate + retry on malformed output\nPII handling: detect and redact personal data in prompts and logs; data-retention basics`; DoD += ` Includes one tool-calling endpoint that validates arguments against a schema and retries malformed calls.`
  - `a3.definitionOfDone` → `"Working semantic search over a real dataset backed by pgvector, with recall@5 ≥ 0.8 on 20 hand-labeled queries, documented in the README."`
  - `a4.whatToLearn` += `\nContext engineering: retrieval vs long-context tradeoffs, context compression, conversation memory\nSemantic/response caching for repeated queries`
  - `a6.whyItMatters` → `"A core differentiator — and half of what makes the P6 fusion rare. Your Alignerr work (RLHF, preference data, rubric design) is exactly the methodology hiring managers consider the #1 signal of real LLM engineering maturity."`; `whatToLearn` += `\nOnline evaluation: capturing user feedback, A/B-testing prompts in production, monitoring drift over time`
  - `b0.definitionOfDone` → `"Correctly scoped IAM setup with no root-key use, plus three staged failures (broken DNS, expired TLS cert, bad security-group rule) diagnosed on a box you didn't break — written up as the debugging checklist."`
  - `b3` becomes **"Terraform & Multi-Environment IaC"** (slug `terraform-multi-env-iac`, category `Terraform`): whatToLearn = Terraform modules/providers; remote state on S3 with locking; workspaces and dev/staging/prod promotion; secrets via AWS Secrets Manager/SSM (nothing plaintext in state); plan/apply discipline and drift detection; importing existing resources. DoD = `"The same environment stood up twice (dev + prod) from one module set with remote state and locking; secrets come from Secrets Manager; the promotion flow is documented."` capabilityAfter = hand your infra to another engineer and they reproduce dev *and* prod from code alone.
  - Phases: `phase-3.window` → `"Months 5–7"`; `phase-3.goal` += ` First real applications go out this phase — interviews are calibration, not the finale.`; `phase-3.completionCriteria` → `"AWS Solutions Architect Associate passed; containerized service deployed to EKS provisioned via Terraform; CKA-curriculum coverage across workloads, networking, and storage (cert optional); first 10 targeted applications sent."`; `phase-4.completionCriteria` += ` Open-weights model served on your own cluster (A7); three AI-system-design write-ups done (C2).`; `phase-5.completionCriteria` → `"Portfolio site + 2 flagship case studies live; resume rewritten around AI + backend + cloud; 50+ targeted applications cumulative, referral-first, with interview loops in progress."`
  - Projects: `p5.skillsDemonstrated` → `"b2,b3,b4,b5"`; `p6.skillsDemonstrated` → `"a5,a6,a7,b2,b4,b5"`; `p6.techStack` += `"vLLM"`; `p6.implementationSteps` gains step 4 `"Serve one open-weights model with vLLM on the cluster and route agent calls to it behind a flag — measure cost vs the hosted API"` (renumber 4–6 → 5–7).

- [ ] **Step 4: Content — 5 new skills** (full copy lives in the seed diff; summary):
  - `a7` **Model Serving & Inference Optimization** — phase-4, track-a, category `Serving`, priority high, order 15. vLLM, quantization (AWQ/GGUF), continuous batching + KV cache, TTFT vs throughput, API-vs-self-hosted cost math, GPUs on K8s. DoD: open-weights model served with vLLM on the P5 cluster (or a GPU VM), load-tested, with measured TTFT / tokens-per-sec / cost-per-1M-tokens compared against a hosted API in a short write-up. Resource: docs.vllm.ai.
  - `b4` **CI/CD & Container Delivery** — phase-3, track-b, category `CI/CD`, priority high, order 13. Pipeline design in GitHub Actions; image scanning (Trivy) + minimal base images; ECR tagging + promotion across envs; rollback; OIDC to AWS (no long-lived keys); eval gates as deploy gates. DoD: pipeline that builds, scans (fails on critical CVEs), pushes to ECR, deploys to the cluster, and rolls back with one command — authenticated via OIDC.
  - `b5` **Observability, DR & Production Operations** — phase-3, track-b, category `Operations`, priority high, order 14. Prometheus/Grafana + alert design (page vs ticket); Loki or CloudWatch Logs; OTel traces; RDS backups, RTO/RPO, restore drills; FinOps basics (tagging, budgets, right-sizing); incident runbooks. DoD: dashboards + alerts live on the P5 cluster; one restore-from-backup drill completed and documented; one implemented cost saving from a tagged cost report; runbook for a staged incident.
  - `c2` **AI System Design** — phase-4, track-c, category `System Design`, priority high, order 16. The interview format AI-engineer loops actually run: RAG vs fine-tune vs long-context under cost/latency/quality budgets, token math, guardrail placement, eval-in-the-loop design, using P3/P6 as worked examples. DoD: three written design exercises each with a cost model and eval plan, one practiced aloud in 45 minutes. Resource: Chip Huyen, *AI Engineering*.
  - `c3` **Coding Interview Maintenance** — phase-2, track-c, category `Interview Prep`, priority medium, order 8. 2 problems/week in Python from phase 2 (not a phase-5 cram): core patterns (sliding window, two pointers, BFS/DFS, binary search, heaps), 25-min talk-aloud pacing. DoD: 80+ logged problems by phase 5 at ~2/week; one timed mock per month from phase 3. Resource: neetcode.io.
  - Reorder all skills: a0…a6 = 1–7, c3 = 8, b0 = 9, b1 = 10, b2 = 11, b3 = 12, b4 = 13, b5 = 14, a7 = 15, c2 = 16, c1 = 17.

- [ ] **Step 5: Content — 6 new career items** (categories stay within the existing five): 20-company target list (application, 2026-10-01); first-10 calibration applications (application, 2027-01-15); referral pipeline 2 chats/month (application, 2026-10-31); one technical post per shipped project (portfolio, 2026-08-31); 4 mock interviews before first onsite (interview_prep, 2027-02-28); negotiation prep — comp bands + ask-script (interview_prep, 2027-04-30).

- [ ] **Step 6: Apply to DB** — `npx drizzle-kit push` then `npx tsx db/seed.ts`. Expected output: `Seeded 3 tracks, 5 phases, 17 skills, 6 projects…` with sprints/career items reported as preserved/merged.

---

## Task 4: Spec codification (Workstream C)

**Files:**
- Modify: `requirement.md` (append an addendum; do not rewrite history)

- [ ] **Step 1:** Append a dated **"Addendum — 2026-07-03 (post-audit)"** section: (1) the shipped design system is the warm-terminal/graph-paper palette (list the actual `--hq-*` hex values from `app/globals.css` dark block, track color map amber/cyan/green, light theme exists, graph-paper background is a sanctioned exception to the no-gradients rule, spine gradient is green→amber) — this supersedes the original indigo palette section; (2) roadmap v2: 17 skills (B3 split into B3/B4/B5; A7, C2, C3 added), job search starts Phase 3, phase-5 application target 50+.

---

## Task 5: Verification

- [ ] `npm run typecheck` — clean
- [ ] `npm run lint` — clean
- [ ] `npm run build` — succeeds
- [ ] `npm run dev` on a free port; `curl` `/` (expect 307 → `/login` with Supabase configured) and `/login` (expect 200)
- [ ] Re-run `npx tsx db/seed.ts` a second time — confirm sprints/career items are not duplicated or wiped (idempotence proof)
- [ ] Suggested commit (only on user request): `fix(audit): auth hardening, safe reseed, roadmap v2 (17 skills), sprint activity view, error boundaries`
