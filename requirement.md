# upDev — Full Build Prompt for Fable

## What you are building

A personal engineering growth platform called **upDev** for a software engineer named Collins who is transitioning from full-stack TypeScript/Node.js development into AI Engineering and Cloud Engineering. This is not a task manager, not a Notion clone, not a course tracker. It is a personal engineering OS — a single place where Collins opens the app every day, immediately knows where he is in his journey, and knows exactly what to do next. The experience should feel like a serious engineering tool, not a productivity toy.

The roadmap content, phase structure, and project definitions below are real and fixed. Do not invent roadmap content. Every skill, phase, project, and track described in this prompt is the actual content this app will display.

---

## Tech stack

- **Framework:** Next.js 14+ (App Router)
- **Language:** TypeScript (strict mode throughout — no `any`, no skipped types)
- **Styling:** Tailwind CSS
- **Components:** ShadCN UI
- **Database:** Supabase (PostgreSQL)
- **ORM:** Drizzle ORM
- **Auth:** Supabase Auth (email/password, single user — Collins only)

---

## Visual design direction

**Aesthetic:** Dark, precise, terminal-meets-engineering-tool. Not gamer dark. Not generic SaaS dark. Think: the kind of interface a senior infrastructure engineer would design for himself — every element earns its place, nothing decorative, high information density done with restraint.

**Color palette:**
- Background primary: `#0a0a0f` (near-black with a blue undertone)
- Background surface: `#111118` (cards, panels)
- Background elevated: `#1a1a24` (hover states, active items)
- Border: `#2a2a3a` (subtle structural dividers)
- Accent primary: `#6366f1` (indigo — AI/purple connotation)
- Accent secondary: `#22d3ee` (cyan — cloud/infra connotation)
- Accent success: `#10b981` (emerald green — completion)
- Accent warning: `#f59e0b` (amber — in progress)
- Text primary: `#f1f5f9`
- Text secondary: `#94a3b8`
- Text muted: `#475569`

**Typography:**
- Display/headings: `Inter` (tight tracking on large sizes, weight 600-700)
- Body: `Inter` (weight 400, relaxed line height)
- Code/technical labels: `JetBrains Mono` (for skill names, terminal-style status labels, identifiers like "A0", "COL-5")
- Type scale: Use Tailwind's scale exactly. `text-xs` for metadata, `text-sm` for body, `text-base` for primary content, `text-lg/xl` for subheadings, `text-2xl/3xl` for section headings, `text-4xl+` for the HQ header only.

**Signature element:** A continuous vertical progress spine on the left side of the roadmap view — a glowing line that fills from top to bottom as phases complete, with node markers at each phase that pulse when that phase is active. This is the single most memorable visual element of the app.

**Design rules:**
- Border radius: `rounded-md` (8px) for cards, `rounded-sm` (4px) for badges and buttons. Never `rounded-full` on anything except circular avatars.
- No gradients except on the progress spine and phase completion celebrations.
- No shadows — use borders and background color shifts for depth instead.
- All status badges use `font-mono text-xs uppercase tracking-widest` styling.
- Progress bars: thin (4px height), no labels on the bar itself — percentage shown as text next to it.
- Hover states: `bg-elevated` background shift + `border-indigo-500/50` border color shift. No scale transforms.
- Transitions: `transition-colors duration-150` only. No bouncing, no spring physics, no scroll animations.
- Empty states: always include a specific call to action, never a generic "nothing here" message.

---

## Commit sequence

Build and commit in exactly this sequence. Each commit should be atomic and leave the app in a working state. Do not combine commits. Commit messages follow conventional commits format.

---

### COMMIT 1: `chore: initialize project`

Set up the base project with all dependencies installed and configured, but no application code yet.

**Steps:**
1. `npx create-next-app@latest cracked-dev-hq --typescript --tailwind --eslint --app --src-dir --import-alias "@/*"`
2. Install ShadCN UI: `npx shadcn@latest init` — choose dark theme, slate base color, CSS variables enabled.
3. Install dependencies:
   ```
   npm install drizzle-orm @supabase/supabase-js @supabase/ssr drizzle-kit dotenv
   npm install -D @types/node
   ```
4. Install the following ShadCN components: `button`, `card`, `badge`, `progress`, `separator`, `tooltip`, `skeleton`, `scroll-area`, `tabs`, `sheet`, `avatar`, `dialog`
5. Configure `tailwind.config.ts` to extend the theme:
   - Add the custom color palette defined above under `colors.hq.*` (e.g. `hq-bg`, `hq-surface`, `hq-elevated`, `hq-border`, `hq-indigo`, `hq-cyan`, `hq-green`, `hq-amber`)
   - Add `JetBrains Mono` as `fontFamily.mono` (import from Google Fonts via `next/font/google` in layout)
   - Keep all default Tailwind utilities
6. Create `.env.local` with placeholders: `NEXT_PUBLIC_SUPABASE_URL=`, `NEXT_PUBLIC_SUPABASE_ANON_KEY=`, `DATABASE_URL=`
7. Create `src/lib/supabase/client.ts` and `src/lib/supabase/server.ts` following the official Supabase SSR pattern for Next.js App Router (using `createBrowserClient` and `createServerClient`).
8. Update `src/app/globals.css` to set the background to `#0a0a0f` and remove all default Next.js boilerplate styles.
9. Replace `src/app/page.tsx` with a single `<h1>HQ Loading...</h1>` placeholder.
10. Verify: `npm run dev` starts without errors, `npm run build` succeeds.

---

### COMMIT 2: `feat(db): define schema and seed roadmap data`

Define the complete database schema and the full roadmap seed data. This is the most important commit — everything else reads from this data.

**File: `src/db/schema.ts`**

Define the following tables using Drizzle ORM's `pgTable`:

```
tracks
  id: text PRIMARY KEY  -- 'track-a', 'track-b', 'track-c'
  name: text NOT NULL   -- 'AI Engineering', 'Cloud Engineering', 'Fusion & Career'
  slug: text UNIQUE     -- 'ai-engineering', 'cloud-engineering', 'fusion-career'
  description: text
  icon: text            -- emoji: '🤖', '☁️', '🎯'
  color: text           -- 'indigo', 'cyan', 'amber'
  order: integer

phases
  id: text PRIMARY KEY  -- 'phase-1' through 'phase-5'
  number: integer
  name: text            -- 'Foundations & Reframe', 'Core AI Engineering', etc.
  window: text          -- 'Month 1', 'Months 2–4', etc.
  goal: text
  completion_criteria: text
  focus: text           -- 'Foundations', 'AI Engineering', 'Cloud Engineering', 'Production Projects', 'Career Prep'
  date_start: date
  date_end: date
  order: integer

skills
  id: text PRIMARY KEY  -- 'a0', 'a1', 'a2', etc.
  phase_id: text REFERENCES phases(id)
  track_id: text REFERENCES tracks(id)
  title: text           -- 'Python & LLM API Foundations'
  slug: text UNIQUE
  category: text        -- 'Python', 'AI / LLM Core', 'RAG', 'Agents', 'Evals', 'AWS', 'Kubernetes', etc.
  status: text DEFAULT 'not_started'  -- 'not_started', 'in_progress', 'reviewing', 'completed', 'blocked'
  priority: text DEFAULT 'medium'  -- 'high', 'medium', 'low'
  why_it_matters: text
  what_to_learn: text   -- newline-separated list of learning points
  capability_after: text
  definition_of_done: text
  resource_url: text
  resource_label: text
  linear_issue_id: text  -- e.g. 'COL-5'
  order: integer
  is_done: boolean DEFAULT false

projects
  id: text PRIMARY KEY  -- 'p1' through 'p6'
  phase_id: text REFERENCES phases(id)
  title: text
  slug: text UNIQUE
  type: text            -- 'experiment', 'intermediate', 'production', 'flagship'
  status: text DEFAULT 'not_started'  -- 'not_started', 'building', 'polishing', 'shipped'
  purpose: text
  skills_demonstrated: text  -- comma-separated skill IDs
  tech_stack: text[]
  implementation_steps: text  -- newline-separated numbered steps
  what_production_means: text
  repo_url: text
  demo_url: text
  is_done: boolean DEFAULT false
  order: integer

weekly_sprints
  id: uuid PRIMARY KEY DEFAULT gen_random_uuid()
  week_label: text      -- 'Week of Jun 30 – Jul 6'
  week_start: date
  status: text DEFAULT 'planned'  -- 'planned', 'active', 'done'
  focus: text
  wins: text
  blockers: text
  revisit: text
  days_studied: integer DEFAULT 0
  created_at: timestamptz DEFAULT now()

career_items
  id: uuid PRIMARY KEY DEFAULT gen_random_uuid()
  title: text
  category: text  -- 'resume', 'portfolio', 'skill_proven', 'interview_prep', 'application'
  status: text DEFAULT 'todo'  -- 'todo', 'in_progress', 'done'
  target_date: date
  notes: text
  created_at: timestamptz DEFAULT now()
```

**File: `src/db/seed.ts`**

Seed the database with the complete roadmap content exactly as defined below. Use `drizzle-orm`'s insert operations. Run this once with `npx ts-node src/db/seed.ts` or equivalent.

**Full seed data:**

**tracks:**
```
{ id: 'track-a', name: 'AI Engineering', slug: 'ai-engineering', icon: '🤖', color: 'indigo', description: 'Python, LLMs, RAG, agents, evals — grounded in roadmap.sh/ai-engineer', order: 1 }
{ id: 'track-b', name: 'Cloud Engineering', slug: 'cloud-engineering', icon: '☁️', color: 'cyan', description: 'Linux/networking, AWS, Kubernetes, IaC — grounded in roadmap.sh/devops + /aws + /kubernetes', order: 2 }
{ id: 'track-c', name: 'Fusion & Career', slug: 'fusion-career', icon: '🎯', color: 'amber', description: 'Capstone systems, system design, portfolio, job applications', order: 3 }
```

**phases:**
```
{ id: 'phase-1', number: 1, name: 'Foundations & Reframe', window: 'Month 1', goal: 'Get genuinely fluent in Python for backend/AI work, lock in AWS fundamentals, and reframe your existing experience around specialization rather than generalist full-stack.', completion_criteria: 'Can build a typed FastAPI service from scratch; AWS SAA study underway; LinkedIn + CV reframed; first tiny eval experiment shipped to GitHub.', focus: 'Foundations', date_start: '2026-07-01', date_end: '2026-07-31', order: 1 }
{ id: 'phase-2', number: 2, name: 'Core AI Engineering', window: 'Months 2–4', goal: 'Build real LLM application skills — RAG, agents, and especially evals — on top of your backend foundation.', completion_criteria: 'Flagship Project #1 (RAG assistant + eval harness) shipped with documented eval metrics; comfortable with embeddings, vector search, hybrid retrieval, and LLM-as-judge.', focus: 'AI Engineering', date_start: '2026-08-01', date_end: '2026-10-31', order: 2 }
{ id: 'phase-3', number: 3, name: 'Cloud Engineering & Infrastructure', window: 'Months 4–7', goal: 'Move from "deploys with Docker Compose" to real cloud-native infrastructure: AWS SAA certified, Kubernetes, and Terraform/IaC.', completion_criteria: 'AWS Solutions Architect Associate passed; can deploy a containerized service to EKS provisioned via Terraform; CKA-level Kubernetes competence.', focus: 'Cloud Engineering', date_start: '2026-11-01', date_end: '2027-01-31', order: 3 }
{ id: 'phase-4', number: 4, name: 'Production Systems & Advanced Projects', window: 'Months 7–10', goal: 'Fuse AI + cloud into a production-grade agentic system, with real testing rigor and observability.', completion_criteria: 'Flagship Project #2 (agentic system on EKS with tracing + guardrails) shipped; comprehensive test suite; one open-source contribution merged.', focus: 'Production Projects', date_start: '2027-02-01', date_end: '2027-04-30', order: 4 }
{ id: 'phase-5', number: 5, name: 'Portfolio & Job Prep', window: 'Months 10–12', goal: 'Convert everything into a sharp specialist profile and land interviews.', completion_criteria: 'Portfolio site + 2 flagship case studies live; resume rewritten around AI + backend + cloud; 10+ targeted applications out.', focus: 'Career Prep', date_start: '2027-05-01', date_end: '2027-06-30', order: 5 }
```

**skills (all 12 — use these exact values):**

Track A skills (phase-1):
```
{ id: 'a0', phase_id: 'phase-1', track_id: 'track-a', title: 'Python & LLM API Foundations', slug: 'python-llm-foundations', category: 'Python', priority: 'high', status: 'in_progress', why_it_matters: 'Python is the lingua franca of every AI tool, framework, and eval library you will touch. You know the syntax from Alignerr — this closes the gap to TypeScript-level fluency.', what_to_learn: 'Python core: typing, async/await, packaging with uv, virtual environments\nModel landscape: OpenAI, Claude, Gemini, Hugging Face — capabilities, context length, cutoffs\nOpenAI Platform: Chat Completions API, token management, pricing considerations\nCost-aware LLM calls: logging tokens and cost per request', capability_after: 'You can write a typed Python service that calls an LLM API correctly, handles errors and rate limits, and tracks token cost.', definition_of_done: 'A typed Python service that calls an LLM API with proper error handling and logs token/cost per call. Already scaffolded — see the llm-wrapper-service repo.', resource_url: 'https://realpython.com/python-uv/', resource_label: 'Real Python — Managing Projects With uv', linear_issue_id: 'COL-5', order: 1 }

{ id: 'a1', phase_id: 'phase-1', track_id: 'track-a', title: 'Prompt Engineering & AI Safety', slug: 'prompt-engineering-safety', category: 'AI / LLM Core', priority: 'high', why_it_matters: 'A baseline skill now, not a specialization — but a real production system without safety constraints is a liability.', what_to_learn: 'Prompt engineering: roles, few-shot examples, chain-of-thought, structured/JSON output\nAI safety: prompt injection attacks, bias and fairness, adversarial testing\nOpenAI Moderation API, input/output constraints, end-user ID tracking', capability_after: 'You can write a production system prompt that resists common injection patterns and constrains output to a safe, structured format.', definition_of_done: 'A documented system prompt with at least 3 named attack vectors defended against, with passing tests proving the defense works.', resource_url: 'https://www.promptingguide.ai/', resource_label: 'Prompt Engineering Guide', linear_issue_id: 'COL-6', order: 2 }

{ id: 'a2-eval', phase_id: 'phase-1', track_id: 'track-a', title: 'Ship a Tiny Eval Experiment', slug: 'tiny-eval-experiment', category: 'Evals', priority: 'medium', why_it_matters: 'Your first proof-of-eval on GitHub. Compare two prompts on a small labeled dataset, report accuracy. Tiny but real — it signals the eval mindset publicly.', what_to_learn: 'What evaluation methodology means in practice\nBuilding a small labeled dataset\nComparing two prompt variants and measuring which performs better\nDocumenting results in a readable format', capability_after: 'You have a GitHub repo with a real eval — labeled data, two prompts, measured accuracy difference.', definition_of_done: 'A public GitHub repo with a small golden dataset, two prompt variants tested against it, and documented accuracy metrics in the README.', linear_issue_id: 'COL-6', order: 3 }
```

Track A skills (phase-2):
```
{ id: 'a3', phase_id: 'phase-2', track_id: 'track-a', title: 'Embeddings & Vector Databases', slug: 'embeddings-vector-dbs', category: 'RAG', priority: 'high', why_it_matters: 'The foundation under every retrieval system, semantic search, and most agent memory. You already know Postgres — pgvector gives you a major head start.', what_to_learn: 'What embeddings are and their use cases: semantic search, recommendations, anomaly detection\nOpenAI Embeddings API vs open-source (Sentence Transformers)\npgvector: indexing, similarity search, implementing vector search in Postgres\nVector database landscape: Pinecone, Weaviate, FAISS, Qdrant — know what exists', capability_after: 'You can build real semantic search over your own data, backed by pgvector, with measurably relevant results.', definition_of_done: 'Working semantic search over a real dataset backed by pgvector.', resource_url: 'https://github.com/pgvector/pgvector', resource_label: 'pgvector — Official GitHub', linear_issue_id: 'COL-7', order: 4 }

{ id: 'a4', phase_id: 'phase-2', track_id: 'track-a', title: 'RAG Pipeline Design', slug: 'rag-pipeline', category: 'RAG', priority: 'high', why_it_matters: 'The single most common real-world LLM application pattern. Your distributed-backend instincts map directly into AI systems here.', what_to_learn: 'RAG vs fine-tuning: when each is the right call\nThe full pipeline: chunking → embedding → vector database → retrieval → generation\nDirect SDK vs LangChain — when to use each\nHybrid search (keyword + vector) and re-ranking as the production pattern', capability_after: 'You can ship a RAG service that answers questions over real documents with cited sources, not hallucinated ones.', definition_of_done: 'A working RAG API that returns source citations and handles "I don\'t know" gracefully when retrieval finds nothing relevant.', resource_url: 'https://github.com/pgvector/pgvector', resource_label: 'pgvector — Official GitHub', linear_issue_id: 'COL-7', order: 5 }

{ id: 'a5', phase_id: 'phase-2', track_id: 'track-a', title: 'AI Agents with LangGraph', slug: 'ai-agents-langgraph', category: 'Agents', priority: 'high', why_it_matters: 'Agents are the fastest-growing pattern in applied AI. Your async/event-driven backend experience (BullMQ, queues, retries) maps almost directly.', what_to_learn: 'ReAct prompting: the core reason + act loop behind almost every agent framework\nBuilding agents with LangGraph: state machines, nodes, edges, memory\nMulti-agent architecture patterns: routing, orchestrator-worker, evaluator-optimizer, reflection\nModel Context Protocol (MCP): the emerging standard for tool/data connectors\nVercel AI SDK for TypeScript-native agents', capability_after: 'You can design and build a multi-step agent that uses real tools, recovers from failures, and does not run away with unbounded cost.', definition_of_done: 'A working agent using at least 2 distinct tools, with a tested failure/retry path and a hard cost/iteration cap.', resource_url: 'https://academy.langchain.com/courses/intro-to-langgraph', resource_label: 'LangChain Academy — Intro to LangGraph', linear_issue_id: 'COL-8', order: 6 }

{ id: 'a6', phase_id: 'phase-2', track_id: 'track-a', title: 'Evals & LLM Observability', slug: 'evals-observability', category: 'Evals', priority: 'high', why_it_matters: 'Your sharpest differentiator. Your Alignerr work (RLHF, preference data, rubric design) is exactly the methodology hiring managers consider the #1 signal of real LLM engineering maturity.', what_to_learn: 'Eval frameworks: Ragas, DeepEval — faithfulness, context precision/recall, answer relevancy\nGolden datasets and LLM-as-judge: building labeled sets, writing judge prompts, measuring agreement\nLLM observability: LangSmith and Arize Phoenix — connects to your existing OpenTelemetry experience', capability_after: 'You can prove, with numbers, that an LLM system works — and catch regressions before they ship.', definition_of_done: 'An eval suite with at least 3 measurable metrics, run against a golden dataset, wired into CI to block merges on regression.', resource_url: 'https://docs.ragas.io/en/latest/getstarted/evals/', resource_label: 'Ragas — Official Quickstart', linear_issue_id: 'COL-8', order: 7 }
```

Track B skills (phase-2 and phase-3):
```
{ id: 'b0', phase_id: 'phase-2', track_id: 'track-b', title: 'Linux, Networking & AWS Bootstrap', slug: 'linux-networking-aws', category: 'AWS', priority: 'high', why_it_matters: 'Every cloud and Kubernetes skill downstream assumes fluency here. Most of this is already proven from your Docker/Linux/CI usage — this closes specific gaps.', what_to_learn: 'Networking formalized: DNS, HTTP/HTTPS, SSL/TLS, SSH, OSI model\nNginx / reverse proxy fundamentals: prerequisite for understanding ALBs and Kubernetes Ingress\nAWS account setup correctly: IAM users/groups/roles, no root-key development', capability_after: 'You can debug a remote Linux box over SSH with no GUI, and your AWS account is set up the way a real engineering org would require.', definition_of_done: 'Correctly scoped IAM setup with no root key use, and a documented network debugging checklist you trust.', resource_url: 'https://roadmap.sh/aws', resource_label: 'roadmap.sh — AWS Roadmap', linear_issue_id: 'COL-10', order: 8 }

{ id: 'b1', phase_id: 'phase-3', track_id: 'track-b', title: 'AWS Core Services', slug: 'aws-core-services', category: 'AWS', priority: 'high', why_it_matters: 'roadmap.sh deliberately scopes this to an opinionated subset — AWS has hundreds of services, you need a working subset deeply, not shallow exposure to everything.', what_to_learn: 'IAM: policies, roles, identity-based vs resource-based, instance profiles\nVPC: CIDR blocks, subnets, route tables, security groups, internet gateway, NAT gateway\nEC2: instance types, auto-scaling groups, elastic load balancers (already used — formalize the model)\nS3, Route53, CloudWatch, CloudFront\nRDS, DynamoDB, ElastiCache\nECR/ECS/Fargate, Lambda, EventBridge, API Gateway', capability_after: 'You can stand up a real backend entirely via CLI/IaC with no console clicking, and understand container and serverless deploy paths well enough to choose correctly.', definition_of_done: 'A service deployed with a real VPC, RDS-backed database, S3 storage, and CloudWatch alarms — built with Terraform, not the console.', resource_url: 'https://developer.hashicorp.com/terraform/tutorials', resource_label: 'HashiCorp — Terraform Tutorials', linear_issue_id: 'COL-11', order: 9 }

{ id: 'b2', phase_id: 'phase-3', track_id: 'track-b', title: 'Kubernetes', slug: 'kubernetes', category: 'Kubernetes', priority: 'high', why_it_matters: 'The single biggest gap on your current resume. You have deployed with Docker Compose, never to a real orchestrator. 80% of large orgs are expected to have platform teams by 2026.', what_to_learn: 'Core objects: Pods, ReplicaSets, Deployments, StatefulSets, Jobs\nNetworking: Services, Ingress, load balancing, pod-to-pod communication\nConfiguration: ConfigMaps, Secrets (zero plaintext credentials)\nSecurity: RBAC, network policies\nAutoscaling: HPA, VPA, cluster autoscaling\nDeployment patterns: Helm, GitOps with ArgoCD, canary/blue-green deployments\nEKS: managed Kubernetes on AWS', capability_after: 'You can take a multi-service application and run it on a real, production-shaped Kubernetes cluster — not a toy single-pod demo.', definition_of_done: 'Your existing microservices project deployed to EKS via Helm, with autoscaling, RBAC, and secrets properly configured.', resource_url: 'https://kubernetes.io/docs/tutorials/', resource_label: 'Kubernetes — Official Tutorials', linear_issue_id: 'COL-12', order: 10 }

{ id: 'b3', phase_id: 'phase-3', track_id: 'track-b', title: 'Infrastructure as Code & Production Operations', slug: 'iac-production-ops', category: 'Terraform', priority: 'high', why_it_matters: 'This is what separates "I can deploy" from "this is reproducible and operable by someone other than me."', what_to_learn: 'Terraform: provisioning AWS infrastructure in code\nGitHub Actions: extending from "runs my tests" to "provisions infra and deploys app"\nMonitoring: Prometheus, Grafana, CloudWatch\nLogging: Loki or Elastic Stack\nTracing: extend your existing OpenTelemetry/Jaeger to the full three pillars\nSecrets management: Vault, Sealed Secrets, or AWS Secrets Manager\nService mesh concepts: Istio, Linkerd — know what problem they solve', capability_after: 'You can hand your infrastructure to another engineer and have them reproduce it from code alone, with full visibility when something breaks.', definition_of_done: 'Entire cloud environment reproducible from terraform apply plus a GitHub Actions pipeline; deployed service has full observability and a documented incident-response runbook.', resource_url: 'https://developer.hashicorp.com/terraform/tutorials', resource_label: 'HashiCorp — Terraform Tutorials', linear_issue_id: 'COL-13', order: 11 }
```

Track C skill (phase-5):
```
{ id: 'c1', phase_id: 'phase-5', track_id: 'track-c', title: 'System Design & Interview Readiness', slug: 'system-design-interview', category: 'System Design', priority: 'high', why_it_matters: 'Interviews test depth of reasoning, not just whether you shipped something. You already have a genuinely advanced system — the gap is articulation, not capability.', what_to_learn: 'Designing Data-Intensive Applications by Kleppmann — read slowly, not as a checklist\nCaching, queueing, and scaling patterns at depth — the why, not just "I used Redis once"\nPracticing tradeoff articulation using your own real projects as worked examples\nSystem design primer: common patterns and distributed systems fundamentals', capability_after: 'You can narrate the tradeoffs in your own Multi-Tenant Expense Management System the way a staff engineer would defend a design decision.', definition_of_done: 'A 10-minute unscripted system-design walkthrough of your own capstone project, including at least 3 tradeoffs you would reconsider with more time.', resource_url: 'https://github.com/donnemartin/system-design-primer', resource_label: 'System Design Primer — GitHub', linear_issue_id: 'COL-15', order: 12 }
```

**projects (all 6):**
```
{ id: 'p1', phase_id: 'phase-1', title: 'Safety-Hardened LLM Wrapper Service', slug: 'llm-wrapper-service', type: 'experiment', status: 'building', purpose: 'Your first real piece of AI infrastructure — a typed Python service that wraps LLM API calls correctly: typed contracts, error handling, and per-call token/cost logging. Foundation for everything else in Track A.', skills_demonstrated: 'a0,a1', tech_stack: ['Python', 'FastAPI', 'Pydantic', 'OpenAI SDK', 'Ollama'], implementation_steps: '1. FastAPI service with typed Pydantic request/response contract\n2. Single endpoint accepting prompt + context, calling an LLM, returning structured output\n3. Token counting and per-request cost logging\n4. Input/output guardrails: reject injection patterns, constrain output to declared schema\n5. Config flag to swap between paid API and local Ollama model\n6. 3 test cases proving injection defenses work', what_production_means: 'You can explain why each guardrail exists, not just that it is present — and you can show a failing test before the guardrail existed.', order: 1 }

{ id: 'p2', phase_id: 'phase-2', title: 'Document Q&A RAG Service', slug: 'rag-document-qa', type: 'intermediate', purpose: 'A real retrieval-augmented generation system over real documents. The most common production LLM pattern — where your backend instincts (5-database microservices) start compounding with AI skills.', skills_demonstrated: 'a3,a4', tech_stack: ['Python', 'FastAPI', 'PostgreSQL', 'pgvector', 'OpenAI Embeddings', 'Docker'], implementation_steps: '1. Pick a real document corpus — not a toy dataset\n2. Build ingestion pipeline: chunking strategy → embeddings → pgvector storage\n3. Build retrieval: vector search, add keyword (hybrid) search and a re-ranking step\n4. Build generation: retrieved context → LLM → answer with cited sources\n5. Handle "no relevant context found" explicitly — no hallucinated answers\n6. Add basic latency/cost logging per query', what_production_means: 'You can explain your chunking strategy choice and what you would change for a different document type — not just that chunking happened.', order: 2 }

{ id: 'p3', phase_id: 'phase-2', title: 'Eval-Gated Multi-Agent Research Assistant', slug: 'eval-gated-agent', type: 'flagship', purpose: 'Your sharpest differentiator project. Very few candidates can show an agent system with a real eval suite gating deployment. This directly productizes your Alignerr eval/RLHF intuition.', skills_demonstrated: 'a5,a6', tech_stack: ['Python', 'LangGraph', 'Ragas', 'DeepEval', 'LangSmith', 'GitHub Actions'], implementation_steps: '1. Design a multi-step agent task requiring multiple tool calls\n2. Build with LangGraph: at least 2 distinct tools, explicit state, retry/fallback on tool failure\n3. Add a hard cost/iteration cap — no runaway agent loops\n4. Build a golden dataset of test cases with expected outcomes\n5. Build eval suite scoring the agent on at least 3 metrics\n6. Wire eval suite into CI — a regression blocks the merge\n7. Add tracing via LangSmith or Arize Phoenix', what_production_means: 'You can pull up a trace of a failed run, diagnose why the eval caught it, and explain what you would change.', order: 3 }

{ id: 'p4', phase_id: 'phase-3', title: 'Infrastructure-as-Code Cloud Foundation', slug: 'iac-cloud-foundation', type: 'production', purpose: 'Move from "clicked around the AWS console" to "I can stand up real infrastructure from code, reproducibly." The prerequisite foundation under everything in Track B that follows.', skills_demonstrated: 'b0,b1', tech_stack: ['Terraform', 'AWS VPC', 'EC2', 'RDS', 'S3', 'CloudWatch'], implementation_steps: '1. Terraform for a VPC with public + private subnets, correct route tables, internet gateway\n2. Security groups following least-privilege — no 0.0.0.0/0 on anything that does not need it\n3. EC2 instance in private subnet, reachable only via load balancer\n4. RDS instance connected to the app\n5. S3 bucket with a sane lifecycle policy\n6. CloudWatch alarms for CPU, error rate, disk\n7. Destroy and bring back up from terraform apply alone — prove reproducibility', what_production_means: 'You can explain every security group rule and why it exists, and you have actually destroyed and recreated the environment at least once.', order: 4 }

{ id: 'p5', phase_id: 'phase-3', title: 'Kubernetes Production Deployment', slug: 'k8s-production-deploy', type: 'production', purpose: 'Closes the single biggest gap on your current resume. Take your existing Multi-Tenant Expense Management System from Docker Compose to a real, production-shaped Kubernetes cluster.', skills_demonstrated: 'b2,b3', tech_stack: ['Terraform', 'EKS', 'Kubernetes', 'Helm', 'ArgoCD', 'Prometheus', 'Grafana', 'OpenTelemetry'], implementation_steps: '1. Provision EKS cluster via Terraform (extends P4)\n2. Write Helm charts for each service: Deployments, Services, Ingress\n3. Move all secrets out of plaintext env files into Kubernetes Secrets\n4. Configure RBAC: least-privilege service accounts per service\n5. Add Horizontal Pod Autoscaling on at least one service, prove it scales under load\n6. Set up GitOps: ArgoCD deploys triggered by git push, not manual kubectl apply\n7. Wire full observability: Prometheus + Grafana for metrics, OpenTelemetry/Jaeger for traces, log aggregator for logs\n8. Write an incident-response runbook for at least one likely failure mode', what_production_means: 'You can intentionally break something and use your own observability stack to diagnose it without looking at the code.', order: 5 }

{ id: 'p6', phase_id: 'phase-4', title: 'Autonomous Agent Platform on Kubernetes', slug: 'agent-platform-capstone', type: 'flagship', purpose: 'The flagship. Almost no candidate at your level can show agents + evals + cloud-native deployment + observability in one coherent system. This is the project that gets you past resume screening.', skills_demonstrated: 'a5,a6,b2,b3', tech_stack: ['Python', 'LangGraph', 'EKS', 'Kubernetes', 'Terraform', 'OpenTelemetry', 'Ragas', 'GitHub Actions'], implementation_steps: '1. Take the agent system from P3\n2. Containerize it and deploy onto the Kubernetes cluster from P5\n3. Wire eval suite from P3 into the GitOps pipeline from P5 — failed eval blocks the deploy\n4. Add cost/usage dashboards tracking LLM spend alongside infra spend\n5. Load-test the agent endpoint and confirm autoscaling under concurrent agent runs\n6. Write the full case study: problem → architecture → tradeoffs → eval results → what you would change', what_production_means: 'You can give an unscripted 10-minute walkthrough of this system to an interviewer, including 3 deliberate tradeoffs and what would break first under 10x load.', order: 6 }
```

**weekly_sprints seed (3 initial rows):**
```
{ week_label: 'Week of Jun 30 – Jul 6', week_start: '2026-06-30', status: 'active', focus: 'Set up Python env with uv, build a typed FastAPI service with Pydantic models, start AWS SAA intro. Reframe the Alignerr CV bullet around RLHF/eval methodology.' }
{ week_label: 'Week of Jul 7 – Jul 13', week_start: '2026-07-07', status: 'planned', focus: 'FastAPI deeper: dependency injection, error handling. First tiny eval experiment scaffold. Continue SAA.' }
{ week_label: 'Week of Jul 14 – Jul 20', week_start: '2026-07-14', status: 'planned', focus: 'Ship the Eval Harness Starter to GitHub. pytest basics. SAA: IAM + core services.' }
```

**career_items seed (6 initial rows):**
```
{ title: 'Reframe Alignerr bullet around RLHF / eval methodology', category: 'resume', status: 'in_progress', target_date: '2026-07-13', notes: 'Lead with rubric design, preference data, LLM output evaluation, failure-mode analysis. Not "data labeling".' }
{ title: 'Cut the 9-language list; lead with one specialist identity', category: 'resume', status: 'todo', target_date: '2027-05-15', notes: 'Reposition headline to AI Application Engineer / Backend.' }
{ title: 'Publish Eval Harness Starter to GitHub with a clear README', category: 'portfolio', status: 'todo', target_date: '2026-07-31', notes: 'A working eval demo with metrics beats any certificate for AI roles.' }
{ title: 'Write case studies for both flagship projects', category: 'portfolio', status: 'todo', target_date: '2027-05-31', notes: 'Format: problem → architecture → tradeoffs → eval results → next steps.' }
{ title: 'Earn AWS Solutions Architect Associate', category: 'skill_proven', status: 'todo', target_date: '2027-01-31', notes: 'Highest-ROI cloud credential for this path.' }
{ title: 'Build system-design talking points from the Multi-Tenant project', category: 'interview_prep', status: 'todo', target_date: '2027-05-31', notes: 'Narrate the tradeoffs: gateway pattern, queue swap, Redis on auth path, 5-DB split.' }
```

Also create `src/db/index.ts` exporting the Drizzle client connected to `DATABASE_URL` from env, and `drizzle.config.ts` at the project root.

---

### COMMIT 3: `feat(auth): add Supabase authentication`

Set up authentication with a simple login page. Only one user (Collins) will ever use this app.

**Routes:**
- `/login` — email/password form
- Middleware at `src/middleware.ts` protecting all routes except `/login`

**Login page design:**
- Centered card on the dark background
- "upDev" in `font-mono text-sm text-muted` above the form
- `text-2xl font-semibold` title: "Welcome back, Collins."
- Standard email + password fields from ShadCN
- No sign-up link (single user)
- On success: redirect to `/`

**Middleware:** Use the official Supabase SSR middleware pattern for Next.js App Router. Redirect unauthenticated users to `/login`, redirect authenticated users away from `/login` to `/`.

---

### COMMIT 4: `feat(layout): add root app shell and navigation`

Create the persistent app shell that wraps every authenticated page.

**Layout structure:**

The app uses a two-column layout at `lg` breakpoints and above:
- Left column: fixed, narrow sidebar (`w-64`, full height, `bg-hq-surface border-r border-hq-border`)
- Right column: main content area, scrollable

On mobile (`< lg`): sidebar collapses into a hamburger menu using ShadCN `Sheet` component opening from the left.

**Sidebar content (top to bottom):**

1. **App identity** (top, `p-4 border-b border-hq-border`):
   - `font-mono text-xs text-muted uppercase tracking-widest` → "CRACKED DEV"
   - `text-lg font-semibold` → "HQ"
   - Combined: "CRACKED DEV HQ" is the wordmark

2. **Phase indicator pill** (below identity, `p-4`):
   - A pill badge showing current phase name and number
   - E.g. `badge` with indigo background: "Phase 1 · Foundations"
   - Clicking it navigates to the roadmap

3. **Navigation items** (`px-2`, spaced with `space-y-1`):
   Each nav item is a styled link with icon + label:
   ```
   / (Dashboard)      → icon: LayoutDashboard  → "HQ"
   /roadmap           → icon: Map              → "Roadmap"
   /tracks/ai         → icon: Bot              → "AI Engineering"
   /tracks/cloud      → icon: Cloud            → "Cloud Engineering"
   /tracks/career     → icon: Target           → "Fusion & Career"
   /projects          → icon: FolderGit2       → "Projects"
   /sprints           → icon: CalendarDays     → "Weekly Sprints"
   /career            → icon: TrendingUp       → "Career Growth"
   ```
   Active state: `bg-hq-elevated text-primary border-l-2 border-hq-indigo`
   Inactive: `text-secondary hover:bg-hq-elevated hover:text-primary`

4. **Quick status widget** (bottom of sidebar, `absolute bottom-0`, `p-4 border-t border-hq-border`):
   - Small text showing current active skill in `font-mono text-xs`
   - E.g. "Currently: A0 · Python Foundations"
   - A thin progress bar (4px) showing overall roadmap progress percentage
   - Text `text-xs text-muted` → "23% complete"

**Icons:** Use `lucide-react` for all icons throughout the app.

---

### COMMIT 5: `feat(dashboard): build the HQ homepage`

The main dashboard at `/`. This is what Collins sees every time he opens the app.

**Page layout:** Single column, `max-w-4xl mx-auto px-6 py-8`

**Section 1 — HQ Header** (no card, raw text):
- `text-xs font-mono text-muted uppercase tracking-widest` → "CRACKED DEV HQ"
- `text-3xl font-bold` → dynamic greeting: "Good morning, Collins." or afternoon/evening based on time
- `text-secondary text-sm mt-1` → day and date, e.g. "Monday · July 1, 2026"

**Section 2 — Status strip** (3 cards in a row, `grid grid-cols-3 gap-4 mt-8`):

Card A: "Current Phase"
- Phase number in `text-4xl font-bold text-indigo-400 font-mono` → "01"
- Phase name → "Foundations & Reframe"
- Window → "Month 1"
- A thin progress bar showing phase progress (skills done / skills total in that phase)

Card B: "Active Skill"
- Skill ID in `font-mono text-xs text-muted` → "A0 · PYTHON"
- Skill title → "Python & LLM API Foundations"
- Status badge `IN PROGRESS` in amber
- Linear issue link as a small clickable pill → "COL-5 ↗"

Card C: "Overall Progress"
- Large percentage in `text-4xl font-bold font-mono text-emerald-400` → "8%"
- `text-secondary text-sm` → "1 of 12 skills completed"
- Thin progress bar
- `text-xs text-muted` → "Phase 1 of 5"

**Section 3 — What to do next** (full width card, `mt-6`):
Title: `text-sm text-muted uppercase tracking-widest font-mono` → "NEXT ACTION"
Inside:
- A single prominent card (slightly elevated background) with:
  - Skill/action icon on left
  - `text-lg font-semibold` → the next uncompleted skill title
  - `text-sm text-secondary` → one-sentence why it matters
  - On the right: a button "Open in Roadmap →" navigating to that skill's detail

**Section 4 — This Week** (full width, `mt-6`):
Title: "THIS WEEK" in the same muted mono style
Show the active weekly sprint card:
- Week label
- Focus area as the primary text
- `days_studied` shown as small dots: filled circles for days studied, empty for 7 − days_studied
- Wins/blockers if filled, otherwise a `text-muted` empty state: "No wins logged yet. Open the sprint to add."
- Edit button navigating to `/sprints`

**Section 5 — Upcoming projects** (`mt-6`, horizontal scroll on mobile):
Title: "UPCOMING PROJECTS"
3 project cards in a row (`grid grid-cols-3 gap-4`):
- Show the next 3 not-yet-shipped projects
- Each card: project type badge (`FLAGSHIP` / `PRODUCTION` / `INTERMEDIATE`), project title, 3 tech stack tags, status badge
- Clicking navigates to `/projects/[slug]`

**Section 6 — Phase timeline** (full width, `mt-6`):
A horizontal timeline showing all 5 phases as nodes connected by a line:
- Completed phases: filled circle + green color
- Active phase: pulsing ring (CSS animation: `animate-pulse`) + indigo color
- Future phases: empty circle + muted color
- Phase name below each node
- The connecting line fills from left up to the current active phase

---

### COMMIT 6: `feat(roadmap): build the full roadmap view`

The roadmap page at `/roadmap`. This is the most complex and most important page.

**Page layout:** Two-column at `lg`: left spine (fixed) + right content (scrollable).

**Left column — The Progress Spine** (`w-1 bg-hq-border relative`, full viewport height):

This is the signature visual element. A vertical 4px-wide line running the full height of the page on the left edge of the main content area. The line has two sections:
- Completed: `bg-gradient-to-b from-emerald-500 to-indigo-500` fills from top down to the completion point
- Remaining: `bg-hq-border`

At each phase's vertical position, there is a circular node:
- Completed phase: filled circle with checkmark icon, green border
- Active phase: circle with pulsing CSS ring (`animate-ping` on a pseudo-element), indigo border, white center
- Future phase: empty circle, muted border

Clicking a phase node scrolls the right panel to that phase section.

**Right content — Phase accordion:**

For each of the 5 phases, render a `Phase Section`:

Phase section structure:
```
Phase header:
  - Phase number: `text-xs font-mono text-muted` → "PHASE 01"
  - Phase name: `text-xl font-semibold`
  - Window: badge → "Month 1"
  - Focus badge → color-coded by track
  - Status badge → "IN PROGRESS" / "NOT STARTED" / "COMPLETED"
  - Progress bar + percentage

Phase goal:
  - Collapsible `text-sm text-secondary` block showing the goal text
  - Collapsed by default for completed phases, expanded for active and future phases

Skills grid:
  - `grid grid-cols-1 gap-3` (single column — each skill card is full width)
  - Each skill card (see below)

Projects within this phase:
  - Shown below the skills
  - `text-xs font-mono text-muted` section label → "PROJECTS"
  - Horizontal cards for each project in this phase
```

**Skill card design:**

Each skill card is a bordered card (`border border-hq-border bg-hq-surface rounded-md p-4`) with:

Left side:
- Skill ID badge: `font-mono text-xs bg-hq-elevated` → "A0"
- Category badge: color-coded by category (indigo for AI, cyan for cloud, green for evals, amber for Python)
- Skill title: `text-base font-semibold`
- One-line why_it_matters preview in `text-sm text-secondary`

Right side:
- Status badge: `NOT STARTED` (gray) / `IN PROGRESS` (amber) / `REVIEWING` (blue) / `COMPLETED` (green) / `BLOCKED` (red)
- Priority indicator: small colored dot (red=high, yellow=medium, gray=low)
- Checkbox: when checked, sets `is_done = true` and `status = 'completed'` via a server action

Active state (when status is `in_progress`): card has `border-indigo-500/50` and `bg-hq-elevated`
Completed state: card has reduced opacity (`opacity-60`) and a subtle checkmark watermark

Clicking the card body (not the checkbox) navigates to `/roadmap/skills/[slug]`.

---

### COMMIT 7: `feat(skill-detail): build the skill detail page`

Route: `/roadmap/skills/[slug]`

This is the full detail view for a single skill. It answers every question Collins needs when working on a skill.

**Page layout:** Single column, `max-w-3xl mx-auto px-6 py-8`

**Breadcrumb:**
`Roadmap → Phase 1 → A0 · Python & LLM API Foundations`
Each segment is a link. The chevron separator is `text-muted`.

**Skill header:**
- Track badge + phase badge in `font-mono text-xs`
- `text-3xl font-bold` → skill title
- Category badge (color-coded)
- Status badge (current status)
- Linear issue pill: `font-mono text-xs bg-hq-elevated rounded-sm px-2 py-1` → "COL-5 ↗" (links to Linear)

**Section: Why It Matters** (`mt-8`):
- Section label in muted mono uppercase
- The `why_it_matters` text in `text-base text-secondary`
- This should feel like a mentor explaining the point, not a marketing pitch

**Section: What to Learn** (`mt-6`):
- Bullet list derived from splitting `what_to_learn` on newlines
- Each bullet: small indigo dot + `text-sm` text
- No checkboxes here — this is reference material, not a task list

**Section: Expected Capability** (`mt-6`):
- A slightly elevated box (`bg-hq-elevated rounded-md p-4`)
- `text-xs font-mono text-muted uppercase tracking-widest` → "AFTER COMPLETING THIS"
- `text-sm` → the `capability_after` text

**Section: Definition of Done** (`mt-6`):
- A green-tinted box (`bg-emerald-950/30 border border-emerald-800/30 rounded-md p-4`)
- `text-xs font-mono text-emerald-400 uppercase tracking-widest` → "DEFINITION OF DONE"
- `text-sm text-secondary` → the `definition_of_done` text
- A button at the bottom: "Mark as Completed" (sets status and is_done) — only shown if status is not completed

**Section: Resource** (`mt-6`):
- If `resource_url` exists: a card with external link icon + `resource_label` + URL
- Opens in new tab

**Section: Related Project** (`mt-6`):
- If this skill is in `skills_demonstrated` of any project, show a project card
- The card has the project type badge, title, and "View Project →" link

**Navigation:**
- At the bottom: `← Previous Skill` and `Next Skill →` links based on `order` within the same phase
- A "Back to Roadmap" link

**Status update:**
- A `<select>` or ShadCN dropdown at the top right of the page to change status
- Changes are applied immediately via a server action with optimistic UI update
- When set to `completed`, `is_done` is also set to `true`

---

### COMMIT 8: `feat(projects): build the projects page and project detail`

**Route: `/projects`**

Grid of all 6 projects. `grid grid-cols-2 gap-6` on desktop, single column on mobile.

Each project card:
- Type badge at top: `FLAGSHIP` (purple), `PRODUCTION` (orange), `INTERMEDIATE` (blue), `EXPERIMENT` (gray)
- Project number: `font-mono text-xs text-muted` → "P1"
- Title: `text-lg font-semibold`
- Purpose: first sentence only, `text-sm text-secondary`
- Tech stack tags: `flex flex-wrap gap-1`, each tag in `font-mono text-xs bg-hq-elevated rounded-sm px-2 py-0.5`
- Status badge: `NOT STARTED` / `BUILDING` / `POLISHING` / `SHIPPED`
- Phase badge
- A thin line at the bottom of flagship cards colored indigo — visual marker of importance

Filter tabs at the top: All / Building / Shipped. Uses ShadCN `Tabs`.

**Route: `/projects/[slug]`**

Full project detail. Single column, `max-w-3xl mx-auto`.

**Header:**
- Project ID: `font-mono text-xs text-muted` → "P1 · EXPERIMENT"
- Title: `text-3xl font-bold`
- Status badge + update dropdown
- Phase badge

**Section: Purpose** — the full purpose text in an elevated card, with an icon

**Section: Skills This Proves:**
- Grid of skill badges for all skills in `skills_demonstrated`
- Each badge links to that skill's detail page
- On hover: tooltip showing the skill's `capability_after`

**Section: Tech Stack:**
- `flex flex-wrap gap-2`
- Each tech as a `font-mono text-sm bg-hq-elevated` pill

**Section: Implementation Steps:**
- Numbered list from `implementation_steps` split on newlines
- Each step: step number in `font-mono text-indigo-400` + step text in `text-sm`
- Steps have checkboxes — state stored in localStorage (no DB column needed for step-level granularity)

**Section: What Production-Level Understanding Means:**
- Amber-tinted box (`bg-amber-950/30 border border-amber-800/30`)
- `text-xs font-mono text-amber-400 uppercase` → "WHAT PRODUCTION MEANS"
- The `what_production_means` text

**Section: Links:**
- Repo URL (GitHub link)
- Demo URL if present
- Both shown as external link cards

**Status update:** Same dropdown pattern as skill detail.

---

### COMMIT 9: `feat(tracks): build the three track detail pages`

Routes: `/tracks/ai`, `/tracks/cloud`, `/tracks/career`

Each track page shows all skills in that track, filtered and grouped by phase.

**Track header:**
- Track icon (large, `text-4xl`)
- Track name: `text-3xl font-bold`
- Track description
- Color-coded accent line under the header (indigo for AI, cyan for cloud, amber for career)
- Stats: total skills / completed / in progress

**Phase groups:**
For each phase that contains skills from this track:
- Phase label + window
- Skills list (same skill card design as roadmap, but without the phase context — it's already set by the group)

**Track progress summary:**
At the top: a horizontal breakdown showing what percentage of this track is not started / in progress / completed. Use a segmented bar (not a pie chart — keep it inline).

---

### COMMIT 10: `feat(sprints): build the weekly sprints section`

Route: `/sprints`

**List view:**
- Show all sprints with most recent at top
- Status column: ACTIVE (amber), PLANNED (muted), DONE (green)
- Clicking a sprint opens its detail/edit

**Active sprint editor (full-page form for current week):**
- Week label as page title
- Editable fields:
  - `focus` — textarea, "What are you focused on this week?"
  - `days_studied` — number input 0–7, with a visual 7-dot tracker (filled dots = days studied)
  - `wins` — textarea, "What worked well?"
  - `blockers` — textarea, "What are you stuck on?"
  - `revisit` — textarea, "What do you need to come back to?"
- All fields auto-save on blur (server action with debounce, no save button needed)
- A small `text-xs text-muted` "Saved" indicator appears briefly after each save

**New sprint button:**
- Opens a dialog to create the next sprint
- Pre-fills `week_label` and `week_start` as the following Monday

**Calendar view:**
- Simple month grid showing which weeks had a sprint with `days_studied > 0`
- Days with study activity get a small indigo dot
- This is the closest thing to a streak tracker without requiring automation

---

### COMMIT 11: `feat(career): build the career growth tracker`

Route: `/career`

**Purpose of this page:** The bridge from "learning" to "hired." Every skill should eventually show up here as a resume edit, a portfolio piece, or an application.

**Board layout:**
- `grid grid-cols-5 gap-4` — one column per category: Resume, Portfolio, Skill Proven, Interview Prep, Application
- Each column has a category header with icon and count badge
- Items within each column are stacked vertically

**Career item card:**
- Title (`text-sm font-medium`)
- Status badge: TODO / IN PROGRESS / DONE
- Target date if set: `font-mono text-xs text-muted` → "Jul 13"
- Notes truncated to 2 lines, full text on hover tooltip
- Click to open an edit dialog

**Add item:**
- `+` button at top right of each column
- Opens ShadCN Dialog with form fields: title, category (pre-filled by column), status, target_date, notes
- Creates via server action

**Edit/update:**
- Clicking a card opens the same dialog pre-filled with existing values
- Status can be dragged (simple onClick cycle: todo → in_progress → done) or updated via the dialog

**Completion celebration:**
When an item is marked DONE, show a brief (2s) toast notification: `✓ {item title}` — use ShadCN `Sonner` toast.

---

### COMMIT 12: `feat(progress): wire up real-time progress calculations`

This commit adds the server-side logic that calculates real progress numbers used throughout the app, and surfaces them on all relevant pages.

Create `src/lib/progress.ts` with the following functions:

```typescript
// Returns percentage of skills completed (is_done = true)
getOverallProgress(): Promise<{ percentage: number; completed: number; total: number }>

// Returns progress for a specific phase
getPhaseProgress(phaseId: string): Promise<{ percentage: number; completed: number; total: number }>

// Returns progress for a specific track
getTrackProgress(trackId: string): Promise<{ percentage: number; completed: number; total: number }>

// Returns the current active skill (status = 'in_progress', or first not_started in current phase)
getCurrentSkill(): Promise<Skill | null>

// Returns the current phase (phase containing the current active skill)
getCurrentPhase(): Promise<Phase | null>

// Returns the next skill to work on after the current one
getNextSkill(): Promise<Skill | null>
```

All functions query the database directly. No caching at this stage — Supabase queries are fast enough.

Integrate these into all dashboard cards, sidebar progress bar, roadmap phase headers, and track pages using Next.js server components (no client-side fetching for static data).

---

### COMMIT 13: `feat(status-updates): add skill and project status mutations`

Wire up all the status-changing interactions using Next.js Server Actions.

Create `src/app/actions/roadmap.ts`:

```typescript
// Update skill status
updateSkillStatus(skillId: string, status: SkillStatus): Promise<void>

// Mark skill as done (sets is_done = true, status = 'completed')
markSkillComplete(skillId: string): Promise<void>

// Update project status
updateProjectStatus(projectId: string, status: ProjectStatus): Promise<void>

// Update sprint fields
updateSprint(sprintId: string, fields: Partial<WeeklySprint>): Promise<void>

// Create new sprint
createSprint(data: NewSprint): Promise<void>

// Upsert career item
upsertCareerItem(data: CareerItemInput): Promise<void>
```

All actions:
- Validate input with Zod before touching the database
- Revalidate the relevant Next.js cache paths after mutation (`revalidatePath`)
- Return typed results (no `any`)

Apply optimistic updates on the client for the checkbox and status dropdown interactions so the UI feels instant.

---

### COMMIT 14: `feat(polish): final UI polish and empty states`

Apply the final layer of polish across all pages.

**Empty states:**
- Skills list: "No skills in this track yet." (should never happen given seed data)
- Weekly sprints: "No sprints yet. Create your first one to start tracking." with a create button
- Career items: per-column empty states. Example for Resume column: "No resume items yet. Add your first one — start with the Alignerr reframe."
- Projects list: "No projects in this phase." (should never happen)

**Loading states:**
- Use ShadCN `Skeleton` components for all data-dependent sections
- The skeleton shapes should match the actual content dimensions — not generic bars

**Responsive behavior:**
- `/roadmap`: on mobile, the progress spine is hidden, phases stack vertically
- `/career`: on mobile, single column with a tab switcher for categories
- `/projects`: on mobile, single column grid
- All sidebar navigation accessible via Sheet drawer on mobile

**Typography pass:**
Review every page and ensure:
- `font-mono` is used for: skill IDs (A0, B1), issue IDs (COL-5), status badges, phase numbers, percentages, dates, code-like labels
- `font-sans` (Inter) is used for: all descriptive text, titles, body
- No text is `text-white` — always `text-primary` or `text-secondary` using the defined palette

**Micro-interactions:**
- Status badge updates: brief color transition (150ms) when changing
- Progress bars: animate to new value with `transition-all duration-500`
- Completed skill cards: fade to reduced opacity with `transition-opacity duration-300`
- The active sprint days tracker: dots fill with a small scale animation when `days_studied` is updated

**Favicon and metadata:**
- Favicon: use a simple terminal `>_` symbol as SVG
- `<title>` per page: "HQ · Dashboard", "HQ · Roadmap", "HQ · AI Engineering", etc.
- Meta description: "upDev — Collins's engineering growth system"

---

### COMMIT 15: `docs: add README and deployment notes`

**README.md at project root:**

```markdown
# upDev

Collins's personal engineering growth platform. Tracks the journey from full-stack TypeScript engineer to AI + Cloud specialist.

## Stack
- Next.js 14 (App Router)
- TypeScript (strict)
- Tailwind CSS + ShadCN UI
- Supabase (PostgreSQL + Auth)
- Drizzle ORM

## Local setup
1. Clone the repo
2. `npm install`
3. Copy `.env.local.example` to `.env.local` and fill in your Supabase credentials
4. `npx drizzle-kit push` to create the schema
5. `npx ts-node src/db/seed.ts` to seed the roadmap data
6. `npm run dev`

## Supabase setup
1. Create a new Supabase project
2. Copy the Project URL and anon key to `.env.local`
3. Copy the database connection string (Transaction mode, port 6543) to `DATABASE_URL`
4. Enable email auth in the Supabase dashboard (no email confirmation needed for single-user)
5. Create one user via the Supabase dashboard with your email + password

## Deployment (Vercel)
1. Push to GitHub
2. Connect repo to Vercel
3. Add the three env vars from `.env.local` to Vercel's environment variables
4. Deploy — Vercel auto-detects Next.js
```

---

## Global rules for Fable to follow throughout all commits

1. **TypeScript strict mode throughout.** No `any`. No `// @ts-ignore`. Every component prop, server action parameter, and database result is typed.

2. **Server components by default.** Use `'use client'` only when a component needs interactivity (onClick, onChange, useState). Data fetching happens in server components using async/await directly.

3. **No prop drilling.** If data needs to reach a deeply nested component, either fetch it in that component (if server) or pass it via context (if client).

4. **Drizzle for all DB operations.** No raw SQL strings except in migrations. No `supabase.from()` for data queries — only Drizzle ORM. Supabase client is only used for Auth.

5. **ShadCN components as the base.** Do not build custom UI primitives for things ShadCN covers (buttons, cards, badges, dialogs, tabs, tooltips). Extend ShadCN with Tailwind classes, do not replace it.

6. **`font-mono` for all identifiers.** Every skill ID, phase number, percentage, status badge, date, and code-like label uses `font-mono`. Everything else uses the default sans.

7. **No lorem ipsum, no placeholder content.** The seed data above is the real content. Every screen should render real roadmap content, never placeholder text.

8. **Navigation state.** The sidebar highlights the currently active route. Use `usePathname()` from `next/navigation` in a client component wrapper for the nav links.

9. **Error handling on server actions.** Every server action returns `{ success: boolean; error?: string }`. The calling client component displays the error in a toast if `success` is false.

10. **Mobile-first responsive.** Build Tailwind classes mobile-first (`base` → `sm:` → `lg:`). The app must be usable on a phone, not just desktop.

---

## Addendum — 2026-07-03 (post-audit)

This section supersedes the parts of the original prompt it conflicts with. It codifies (a) the design system the app actually shipped with, and (b) roadmap v2, applied after an adversarial audit of the original curriculum.

### A. Shipped design system (supersedes "Visual design direction")

The build deliberately replaced the indigo/cyan palette with a **warm terminal / graph-paper** system, now the canonical design language. Tokens (dark theme, the primary one):

- Background: `#0a0a0a` · Surface: `#141311` · Elevated: `#1e1b17` · Border: `#2a2723`
- Accents: amber `#f5a524` (primary/AI), green `#8fc97f` (success/career), cyan `#5cb3c9` (cloud/infra), red `#e5644e` (destructive)
- Text: `#e8e3d6` / secondary `#9b968a` / muted `#6b6659`
- Track color map: **A = amber, B = cyan, C = green** (see `lib/ui.ts`)
- A full **light theme** exists and is toggleable (`next-themes`); dark remains the reference theme.
- Sanctioned exceptions to the "no gradients" rule: the progress spine (green→amber) and the faint graph-paper grid on `body`.
- All other original design rules (radius, mono identifiers, thin progress bars, `transition-colors duration-150` only, no scale transforms) remain in force.

### B. Roadmap v2 (supersedes the 12-skill seed)

The audit found the original curriculum thin where 2026 hiring is thickest. v2 was then cross-checked topic-by-topic against the current roadmap.sh AI Engineer, DevOps, AWS, Kubernetes, and Terraform roadmaps (fetched from source, 2026-07-03); justified gaps were folded in (multimodal/computer-use agents, HF ecosystem + hands-on LoRA, K8s scheduling/storage internals, Terraform testing + IaC scanning, Docker depth, SES), while multi-cloud, Chef/Puppet, and Assistants-API-era topics were deliberately left out of scope. Changes, all reflected in `db/seed.ts`:

- **17 skills, up from 12.** New: `a7` Model Serving & Inference Optimization (vLLM, quantization, batching, cost math), `b4` CI/CD & Container Delivery (pipelines, Trivy, OIDC, rollback), `b5` Observability, DR & Production Operations (alerts, restore drills, FinOps, runbooks), `c2` AI System Design (the LLM-system interview round), `c3` Coding Interview Maintenance (2 problems/week from Phase 2).
- **B3 narrowed** to Terraform & Multi-Environment IaC (remote state, workspaces, promotion) — its former grab-bag of CI/CD + observability + secrets is now `b4`/`b5`.
- **Existing skills deepened:** a0 gains streaming + prompt caching; a1 gains tool/function-calling depth + PII handling; a4 gains context engineering + semantic caching; a6 gains online evaluation (feedback, A/B, drift); a3/b0 got measurable definitions of done.
- **Job search pulled forward:** first 10 applications land in Phase 3 (calibration), Phase 5 targets 50+ cumulative, referral-first. The "CKA-level" claim is softened to CKA-curriculum coverage (cert optional).
- **P6 upgraded:** now serves an open-weights model via vLLM on the cluster (`a7`), and demonstrates `b4`/`b5`.
- **6 new career items:** target list, calibration applications, referral pipeline, post-per-project, mock interviews, negotiation prep.
- **Seeding is now state-preserving:** re-running `db/seed.ts` refreshes roadmap content but keeps skill/project statuses and never touches `weekly_sprints` / `career_items` rows you've created.