import { config } from "dotenv"

config({ path: ".env.local" })

import { skillResourceSeed } from "./seed-resources"
import {
  careerItems,
  phases,
  projects,
  skillResources,
  skills,
  tracks,
  weeklySprints,
  type NewCareerItem,
  type NewPhase,
  type NewProject,
  type NewSkill,
  type NewTrack,
  type NewWeeklySprint,
} from "./schema"

const trackSeed: NewTrack[] = [
  {
    id: "track-a",
    name: "AI Engineering",
    slug: "ai-engineering",
    icon: "🤖",
    color: "amber",
    description:
      "Python, LLMs, RAG, agents, evals — grounded in roadmap.sh/ai-engineer",
    order: 1,
  },
  {
    id: "track-b",
    name: "Cloud Engineering",
    slug: "cloud-engineering",
    icon: "☁️",
    color: "cyan",
    description:
      "Linux/networking, AWS, Kubernetes, IaC, CI/CD, observability — grounded in roadmap.sh/devops + /aws + /kubernetes",
    order: 2,
  },
  {
    id: "track-c",
    name: "Fusion & Career",
    slug: "fusion-career",
    icon: "🎯",
    color: "green",
    description:
      "Capstone systems, system design (classic + AI), interview craft, portfolio, job applications",
    order: 3,
  },
]

const phaseSeed: NewPhase[] = [
  {
    id: "phase-1",
    number: 1,
    name: "Foundations & Reframe",
    window: "Month 1",
    goal: "Get genuinely fluent in Python for backend/AI work, lock in AWS fundamentals, and reframe your existing experience around specialization rather than generalist full-stack.",
    completionCriteria:
      "Can build a typed FastAPI service from scratch; AWS SAA study underway; LinkedIn + CV reframed; first tiny eval experiment shipped to GitHub.",
    focus: "Foundations",
    dateStart: "2026-07-01",
    dateEnd: "2026-07-31",
    order: 1,
  },
  {
    id: "phase-2",
    number: 2,
    name: "Core AI Engineering",
    window: "Months 2–4",
    goal: "Build real LLM application skills — RAG, agents, and especially evals — on top of your backend foundation.",
    completionCriteria:
      "Flagship Project #1 (RAG assistant + eval harness) shipped with documented eval metrics; comfortable with embeddings, vector search, hybrid retrieval, and LLM-as-judge.",
    focus: "AI Engineering",
    dateStart: "2026-08-01",
    dateEnd: "2026-10-31",
    order: 2,
  },
  {
    id: "phase-3",
    number: 3,
    name: "Cloud Engineering & Infrastructure",
    window: "Months 5–7",
    goal: 'Move from "deploys with Docker Compose" to real cloud-native infrastructure: AWS SAA certified, Kubernetes, and Terraform/IaC. First real applications go out this phase — interviews are calibration, not the finale.',
    completionCriteria:
      "AWS Solutions Architect Associate passed; containerized service deployed to EKS provisioned via Terraform; CKA-curriculum coverage across workloads, networking, and storage (cert optional); first 10 targeted applications sent.",
    focus: "Cloud Engineering",
    dateStart: "2026-11-01",
    dateEnd: "2027-01-31",
    order: 3,
  },
  {
    id: "phase-4",
    number: 4,
    name: "Production Systems & Advanced Projects",
    window: "Months 7–10",
    goal: "Fuse AI + cloud into a production-grade agentic system, with real testing rigor and observability.",
    completionCriteria:
      "Flagship Project #2 (agentic system on EKS with tracing + guardrails) shipped; comprehensive test suite; one open-source contribution merged. Open-weights model served on your own cluster (A7); three AI-system-design write-ups done (C2).",
    focus: "Production Projects",
    dateStart: "2027-02-01",
    dateEnd: "2027-04-30",
    order: 4,
  },
  {
    id: "phase-5",
    number: 5,
    name: "Portfolio & Job Prep",
    window: "Months 10–12",
    goal: "Convert everything into a sharp specialist profile and land interviews.",
    completionCriteria:
      "Portfolio site + 2 flagship case studies live; resume rewritten around AI + backend + cloud; 50+ targeted applications cumulative, referral-first, with interview loops in progress.",
    focus: "Career Prep",
    dateStart: "2027-05-01",
    dateEnd: "2027-06-30",
    order: 5,
  },
]

const skillSeed: NewSkill[] = [
  {
    id: "a0",
    phaseId: "phase-1",
    trackId: "track-a",
    title: "Python & LLM API Foundations",
    slug: "python-llm-foundations",
    category: "Python",
    priority: "high",
    status: "in_progress",
    whyItMatters:
      "Python is the lingua franca of every AI tool, framework, and eval library you will touch. You know the syntax from Alignerr — this closes the gap to TypeScript-level fluency.",
    whatToLearn:
      "Python core: typing, async/await, packaging with uv, virtual environments\nModel landscape: OpenAI, Claude, Gemini, Hugging Face — capabilities, context length, cutoffs\nOpenAI Platform: Chat Completions API, token management, pricing considerations\nCost-aware LLM calls: logging tokens and cost per request\nStreaming responses: SSE/token streaming end-to-end from API to client\nPrompt caching: provider-side caching and when it changes the cost math",
    capabilityAfter:
      "You can write a typed Python service that calls an LLM API correctly, streams tokens, handles errors and rate limits, and tracks token cost.",
    definitionOfDone:
      "A typed Python service that calls an LLM API with proper error handling and logs token/cost per call, streams tokens, and logs cache hits/misses. Already scaffolded — see the llm-wrapper-service repo.",
    resourceUrl: "https://realpython.com/python-uv/",
    resourceLabel: "Real Python — Managing Projects With uv",
    linearIssueId: "COL-5",
    order: 1,
  },
  {
    id: "a1",
    phaseId: "phase-1",
    trackId: "track-a",
    title: "Prompt Engineering & AI Safety",
    slug: "prompt-engineering-safety",
    category: "AI / LLM Core",
    priority: "high",
    whyItMatters:
      "A baseline skill now, not a specialization — but a real production system without safety constraints is a liability.",
    whatToLearn:
      "Prompt engineering: roles, few-shot examples, chain-of-thought, structured/JSON output\nTool/function calling in depth: JSON-schema-constrained arguments, parallel calls, validate + retry on malformed output\nAI safety: prompt injection attacks, bias and fairness, adversarial testing\nPII handling: detect and redact personal data in prompts and logs; data-retention basics\nOpenAI Moderation API, input/output constraints, end-user ID tracking",
    capabilityAfter:
      "You can write a production system prompt that resists common injection patterns, constrains output to a safe, structured format, and drives tools through validated schema-constrained calls.",
    definitionOfDone:
      "A documented system prompt with at least 3 named attack vectors defended against, with passing tests proving the defense works. Includes one tool-calling endpoint that validates arguments against a schema and retries malformed calls.",
    resourceUrl: "https://www.promptingguide.ai/",
    resourceLabel: "Prompt Engineering Guide",
    linearIssueId: "COL-6",
    order: 2,
  },
  {
    id: "a2-eval",
    phaseId: "phase-1",
    trackId: "track-a",
    title: "Ship a Tiny Eval Experiment",
    slug: "tiny-eval-experiment",
    category: "Evals",
    priority: "medium",
    whyItMatters:
      "Your first proof-of-eval on GitHub. Compare two prompts on a small labeled dataset, report accuracy. Tiny but real — it signals the eval mindset publicly.",
    whatToLearn:
      "What evaluation methodology means in practice\nBuilding a small labeled dataset\nComparing two prompt variants and measuring which performs better\nDocumenting results in a readable format",
    capabilityAfter:
      "You have a GitHub repo with a real eval — labeled data, two prompts, measured accuracy difference.",
    definitionOfDone:
      "A public GitHub repo with a small golden dataset, two prompt variants tested against it, and documented accuracy metrics in the README.",
    linearIssueId: "COL-6",
    order: 3,
  },
  {
    id: "a3",
    phaseId: "phase-2",
    trackId: "track-a",
    title: "Embeddings & Vector Databases",
    slug: "embeddings-vector-dbs",
    category: "RAG",
    priority: "high",
    whyItMatters:
      "The foundation under every retrieval system, semantic search, and most agent memory. You already know Postgres — pgvector gives you a major head start.",
    whatToLearn:
      "What embeddings are and their use cases: semantic search, recommendations, anomaly detection\nOpenAI Embeddings API vs open-source (Sentence Transformers)\npgvector: indexing, similarity search, implementing vector search in Postgres\nVector database landscape: Pinecone, Weaviate, FAISS, Qdrant — know what exists",
    capabilityAfter:
      "You can build real semantic search over your own data, backed by pgvector, with measurably relevant results.",
    definitionOfDone:
      "Working semantic search over a real dataset backed by pgvector, with recall@5 ≥ 0.8 on 20 hand-labeled queries, documented in the README.",
    resourceUrl: "https://github.com/pgvector/pgvector",
    resourceLabel: "pgvector — Official GitHub",
    linearIssueId: "COL-7",
    order: 4,
  },
  {
    id: "a4",
    phaseId: "phase-2",
    trackId: "track-a",
    title: "RAG Pipeline Design",
    slug: "rag-pipeline",
    category: "RAG",
    priority: "high",
    whyItMatters:
      "The single most common real-world LLM application pattern. Your distributed-backend instincts map directly into AI systems here.",
    whatToLearn:
      "RAG vs fine-tuning: when each is the right call\nThe full pipeline: chunking → embedding → vector database → retrieval → generation\nDirect SDK vs LangChain — when to use each\nHybrid search (keyword + vector) and re-ranking as the production pattern\nContext engineering: retrieval vs long-context tradeoffs, context compression, conversation memory\nSemantic/response caching for repeated queries",
    capabilityAfter:
      "You can ship a RAG service that answers questions over real documents with cited sources, not hallucinated ones.",
    definitionOfDone:
      'A working RAG API that returns source citations and handles "I don\'t know" gracefully when retrieval finds nothing relevant.',
    resourceUrl: "https://github.com/pgvector/pgvector",
    resourceLabel: "pgvector — Official GitHub",
    linearIssueId: "COL-7",
    order: 5,
  },
  {
    id: "a5",
    phaseId: "phase-2",
    trackId: "track-a",
    title: "AI Agents with LangGraph",
    slug: "ai-agents-langgraph",
    category: "Agents",
    priority: "high",
    whyItMatters:
      "Agents are the fastest-growing pattern in applied AI. Your async/event-driven backend experience (BullMQ, queues, retries) maps almost directly.",
    whatToLearn:
      "ReAct prompting: the core reason + act loop behind almost every agent framework\nBuilding agents with LangGraph: state machines, nodes, edges, memory\nMulti-agent architecture patterns: routing, orchestrator-worker, evaluator-optimizer, reflection\nModel Context Protocol (MCP): the emerging standard for tool/data connectors\nVercel AI SDK for TypeScript-native agents\nMultimodal agents: vision input and voice (STT/TTS) in the agent loop\nComputer-use / browser agents: the emerging GUI-operating pattern — awareness level",
    capabilityAfter:
      "You can design and build a multi-step agent that uses real tools, recovers from failures, and does not run away with unbounded cost.",
    definitionOfDone:
      "A working agent using at least 2 distinct tools, with a tested failure/retry path and a hard cost/iteration cap.",
    resourceUrl: "https://academy.langchain.com/courses/intro-to-langgraph",
    resourceLabel: "LangChain Academy — Intro to LangGraph",
    linearIssueId: "COL-8",
    order: 6,
  },
  {
    id: "a6",
    phaseId: "phase-2",
    trackId: "track-a",
    title: "Evals & LLM Observability",
    slug: "evals-observability",
    category: "Evals",
    priority: "high",
    whyItMatters:
      "A core differentiator — and half of what makes the P6 fusion rare. Your Alignerr work (RLHF, preference data, rubric design) is exactly the methodology hiring managers consider the #1 signal of real LLM engineering maturity.",
    whatToLearn:
      "Eval frameworks: Ragas, DeepEval — faithfulness, context precision/recall, answer relevancy\nGolden datasets and LLM-as-judge: building labeled sets, writing judge prompts, measuring agreement\nLLM observability: LangSmith and Arize Phoenix — connects to your existing OpenTelemetry experience\nOnline evaluation: capturing user feedback, A/B-testing prompts in production, monitoring drift over time",
    capabilityAfter:
      "You can prove, with numbers, that an LLM system works — and catch regressions before they ship.",
    definitionOfDone:
      "An eval suite with at least 3 measurable metrics, run against a golden dataset, wired into CI to block merges on regression.",
    resourceUrl: "https://docs.ragas.io/en/latest/getstarted/evals/",
    resourceLabel: "Ragas — Official Quickstart",
    linearIssueId: "COL-8",
    order: 7,
  },
  {
    id: "b0",
    phaseId: "phase-2",
    trackId: "track-b",
    title: "Linux, Networking & AWS Bootstrap",
    slug: "linux-networking-aws",
    category: "AWS",
    priority: "high",
    whyItMatters:
      "Every cloud and Kubernetes skill downstream assumes fluency here. Most of this is already proven from your Docker/Linux/CI usage — this closes specific gaps.",
    whatToLearn:
      "Networking formalized: DNS, HTTP/HTTPS, SSL/TLS, SSH, OSI model\nNginx / reverse proxy fundamentals: prerequisite for understanding ALBs and Kubernetes Ingress\nAWS account setup correctly: IAM users/groups/roles, no root-key development\nConfiguration management awareness: what Ansible solves, and why containers/IaC replaced much of it",
    capabilityAfter:
      "You can debug a remote Linux box over SSH with no GUI, and your AWS account is set up the way a real engineering org would require.",
    definitionOfDone:
      "Correctly scoped IAM setup with no root-key use, plus three staged failures (broken DNS, expired TLS cert, bad security-group rule) diagnosed on a box you didn't break — written up as the debugging checklist.",
    resourceUrl: "https://roadmap.sh/aws",
    resourceLabel: "roadmap.sh — AWS Roadmap",
    linearIssueId: "COL-10",
    order: 9,
  },
  {
    id: "b1",
    phaseId: "phase-3",
    trackId: "track-b",
    title: "AWS Core Services",
    slug: "aws-core-services",
    category: "AWS",
    priority: "high",
    whyItMatters:
      "roadmap.sh deliberately scopes this to an opinionated subset — AWS has hundreds of services, you need a working subset deeply, not shallow exposure to everything.",
    whatToLearn:
      "IAM: policies, roles, identity-based vs resource-based, instance profiles\nVPC: CIDR blocks, subnets, route tables, security groups, internet gateway, NAT gateway\nEC2: instance types, auto-scaling groups, elastic load balancers (already used — formalize the model)\nS3, Route53, CloudWatch, CloudFront, SES\nRDS, DynamoDB, ElastiCache\nECR/ECS/Fargate, Lambda, EventBridge, API Gateway",
    capabilityAfter:
      "You can stand up a real backend entirely via CLI/IaC with no console clicking, and understand container and serverless deploy paths well enough to choose correctly.",
    definitionOfDone:
      "A service deployed with a real VPC, RDS-backed database, S3 storage, and CloudWatch alarms — built with Terraform, not the console.",
    resourceUrl: "https://developer.hashicorp.com/terraform/tutorials",
    resourceLabel: "HashiCorp — Terraform Tutorials",
    linearIssueId: "COL-11",
    order: 10,
  },
  {
    id: "b2",
    phaseId: "phase-3",
    trackId: "track-b",
    title: "Kubernetes",
    slug: "kubernetes",
    category: "Kubernetes",
    priority: "high",
    whyItMatters:
      "The single biggest gap on your current resume. You have deployed with Docker Compose, never to a real orchestrator. 80% of large orgs are expected to have platform teams by 2026.",
    whatToLearn:
      "Core objects: Pods, ReplicaSets, Deployments, StatefulSets, Jobs\nNetworking: Services, Ingress, load balancing, pod-to-pod communication\nConfiguration: ConfigMaps, Secrets (zero plaintext credentials)\nSecurity: RBAC, network policies\nScheduling: taints/tolerations, node affinity, topology spread, pod priorities & evictions\nStorage: PV/PVC, StorageClasses, CSI drivers, running stateful workloads\nAutoscaling: HPA, VPA, cluster autoscaling\nDeployment patterns: Helm, GitOps with ArgoCD, canary/blue-green deployments\nCRDs & operators — awareness of how platforms extend Kubernetes\nEKS: managed Kubernetes on AWS",
    capabilityAfter:
      "You can take a multi-service application and run it on a real, production-shaped Kubernetes cluster — not a toy single-pod demo.",
    definitionOfDone:
      "Your existing microservices project deployed to EKS via Helm, with autoscaling, RBAC, and secrets properly configured.",
    resourceUrl: "https://kubernetes.io/docs/tutorials/",
    resourceLabel: "Kubernetes — Official Tutorials",
    linearIssueId: "COL-12",
    order: 11,
  },
  {
    id: "b3",
    phaseId: "phase-3",
    trackId: "track-b",
    title: "Terraform & Multi-Environment IaC",
    slug: "terraform-multi-env-iac",
    category: "Terraform",
    priority: "high",
    whyItMatters:
      'This is what separates "I can deploy" from "this is reproducible and operable by someone other than me." State management and environment promotion are the #1 real-world Terraform pain — and the #1 interview probe.',
    whatToLearn:
      "Terraform depth: providers, modules, variables/outputs done cleanly\nRemote state on S3 with locking — why local state fails the moment a second machine exists\nWorkspaces and dev/staging/prod promotion patterns (know when Terragrunt earns its keep)\nSecrets via AWS Secrets Manager/SSM — nothing plaintext in state or repos (know what Vault solves)\nplan/apply discipline, drift detection, importing existing resources\nIaC scanning & policy: Checkov/tfsec in CI — the Terraform analog of image scanning\nTesting IaC: Terratest-style integration tests for modules you actually reuse",
    capabilityAfter:
      "You can hand your infrastructure to another engineer and have them reproduce dev AND prod from code alone, without ever seeing your laptop.",
    definitionOfDone:
      "The same environment stood up twice (dev + prod) from one module set with remote state and locking; secrets come from Secrets Manager; the promotion flow is documented.",
    resourceUrl: "https://developer.hashicorp.com/terraform/tutorials",
    resourceLabel: "HashiCorp — Terraform Tutorials",
    linearIssueId: "COL-13",
    order: 12,
  },
  {
    id: "b4",
    phaseId: "phase-3",
    trackId: "track-b",
    title: "CI/CD & Container Delivery",
    slug: "cicd-container-delivery",
    category: "CI/CD",
    priority: "high",
    whyItMatters:
      "Pipeline design is a core interview area for platform roles, and the delivery path is where security actually lives: scanned images, no long-lived credentials, one-command rollback.",
    whatToLearn:
      "Docker depth first: Dockerfile best practices, multi-stage builds, layer/image-size hygiene\nPipeline design in GitHub Actions: build → test → scan → deploy stages, caching, matrix builds\nContainer security: image scanning with Trivy, minimal/distroless base images, non-root containers\nECR tagging strategy and artifact promotion across environments\nRollback strategies: image pinning, helm rollback, when to roll forward\nOIDC federation from Actions to AWS — no long-lived access keys in CI\nEval gates as deploy gates: wiring the A6 eval suite in as a blocking pipeline stage",
    capabilityAfter:
      "You can design a delivery pipeline another team would trust: scanned, credential-less, promotable, and reversible in one command.",
    definitionOfDone:
      "A pipeline that builds, scans (fails on critical CVEs), pushes to ECR, and deploys to the cluster with a one-command rollback — authenticated via OIDC, no stored AWS keys.",
    resourceUrl:
      "https://docs.github.com/en/actions/deployment/security-hardening-your-deployments/about-security-hardening-with-openid-connect",
    resourceLabel: "GitHub — OIDC to Cloud Providers",
    linearIssueId: null,
    order: 13,
  },
  {
    id: "b5",
    phaseId: "phase-3",
    trackId: "track-b",
    title: "Observability, DR & Production Operations",
    slug: "observability-dr-operations",
    category: "Operations",
    priority: "high",
    whyItMatters:
      '"Production-shaped" is hollow without the operations half: alerts that page correctly, backups you have actually restored, and a cost report you can defend. Cloud interviews love exactly these questions.',
    whatToLearn:
      "Prometheus + Grafana: metrics, dashboards, alert design (page vs ticket, SLO-based alerts)\nLog aggregation: Loki or CloudWatch Logs\nTracing: extend your existing OpenTelemetry/Jaeger to the full three pillars\nBackups & DR: RDS snapshots, RTO/RPO, an actual restore drill — a backup you never restored is a hope, not a backup\nFinOps basics: resource tagging, budgets and alerts, right-sizing; LLM spend alongside infra spend\nIncident runbooks; service mesh concepts (Istio, Linkerd) — know what problem they solve",
    capabilityAfter:
      "You can operate what you deploy: detect a failure from your own alerts, diagnose it from your own telemetry, restore from your own backups, and explain the monthly bill.",
    definitionOfDone:
      "Dashboards + alerts live on the P5 cluster; one restore-from-backup drill completed and documented; one implemented cost saving from a tagged cost report; a runbook for one staged incident.",
    resourceUrl: "https://prometheus.io/docs/introduction/overview/",
    resourceLabel: "Prometheus — Official Docs",
    linearIssueId: null,
    order: 14,
  },
  {
    id: "c1",
    phaseId: "phase-5",
    trackId: "track-c",
    title: "System Design & Interview Readiness",
    slug: "system-design-interview",
    category: "System Design",
    priority: "high",
    whyItMatters:
      "Interviews test depth of reasoning, not just whether you shipped something. You already have a genuinely advanced system — the gap is articulation, not capability.",
    whatToLearn:
      "Designing Data-Intensive Applications by Kleppmann — read slowly, not as a checklist\nCaching, queueing, and scaling patterns at depth — the why, not just \"I used Redis once\"\nPracticing tradeoff articulation using your own real projects as worked examples\nSystem design primer: common patterns and distributed systems fundamentals",
    capabilityAfter:
      "You can narrate the tradeoffs in your own Multi-Tenant Expense Management System the way a staff engineer would defend a design decision.",
    definitionOfDone:
      "A 10-minute unscripted system-design walkthrough of your own capstone project, including at least 3 tradeoffs you would reconsider with more time.",
    resourceUrl: "https://github.com/donnemartin/system-design-primer",
    resourceLabel: "System Design Primer — GitHub",
    linearIssueId: "COL-15",
    order: 17,
  },
  {
    id: "c3",
    phaseId: "phase-2",
    trackId: "track-c",
    title: "Coding Interview Maintenance",
    slug: "coding-interview-maintenance",
    category: "Interview Prep",
    priority: "medium",
    whyItMatters:
      "Most loops still gate on a coding round — a 12-month roadmap with zero DSA practice fails at the first screen. Two problems a week from Phase 2 beats any Phase-5 cram, and doing them in Python doubles as language practice.",
    whatToLearn:
      "Core patterns: sliding window, two pointers, BFS/DFS, binary search, heaps, hashmaps\nPython interview idioms: collections, heapq, comprehensions, sorting with keys\nPacing: 25 minutes per problem with talk-aloud reasoning\nA simple log: problem, pattern, time taken, what you missed",
    capabilityAfter:
      "You can pass a standard 45-minute coding screen in Python without a panic week beforehand.",
    definitionOfDone:
      "80+ logged problems by Phase 5 at a steady ~2/week; one timed mock per month from Phase 3 onward.",
    resourceUrl: "https://neetcode.io/roadmap",
    resourceLabel: "NeetCode — Practice Roadmap",
    linearIssueId: null,
    order: 8,
  },
  {
    id: "a7",
    phaseId: "phase-4",
    trackId: "track-a",
    title: "Model Serving & Inference Optimization",
    slug: "model-serving-inference",
    category: "Serving",
    priority: "high",
    whyItMatters:
      "This is what separates \"calls an API\" from AI Engineer: serving a model yourself and arguing latency/cost tradeoffs with numbers. It is also the sharpest AI+cloud fusion in this roadmap — the skill P6 needs to be genuinely rare.",
    whatToLearn:
      "Serving an open-weights model with vLLM: OpenAI-compatible endpoints, model loading\nHugging Face ecosystem: Hub, Transformers, the open-weights landscape (Llama, Mistral, DeepSeek)\nQuantization: AWQ/GGUF formats, quality-vs-memory tradeoffs, when 4-bit is fine\nThroughput mechanics: continuous batching, KV cache, why naive serving wastes the GPU\nLatency budgets: TTFT vs tokens/sec, streaming as UX mitigation\nSelf-hosted vs API cost math: GPU-hour amortization vs per-token pricing\nGPUs on Kubernetes: node selectors, resource limits, taints for GPU pools\nHands-on fine-tuning: one LoRA/QLoRA run on a small model — earn the RAG-vs-fine-tune opinion from experience",
    capabilityAfter:
      "You can stand up an open-weights model behind an API on your own cluster, load-test it, and defend self-host vs API with measured numbers.",
    definitionOfDone:
      "An open-weights model served with vLLM on the P5 cluster (or a GPU VM), load-tested, with measured TTFT / tokens-per-sec / cost-per-1M-tokens compared against a hosted API in a short write-up. Plus one documented LoRA/QLoRA fine-tune of a small model with before/after eval scores.",
    resourceUrl: "https://docs.vllm.ai/",
    resourceLabel: "vLLM — Official Docs",
    linearIssueId: null,
    order: 15,
  },
  {
    id: "c2",
    phaseId: "phase-4",
    trackId: "track-c",
    title: "AI System Design",
    slug: "ai-system-design",
    category: "System Design",
    priority: "high",
    whyItMatters:
      "AI Engineer loops now run a design-an-LLM-system round — RAG vs fine-tune vs long-context under cost, latency, and quality budgets. Classic system design (C1) does not cover it, and you will be asked.",
    whatToLearn:
      "The decision tree: RAG vs fine-tuning vs long-context, and how to defend the choice\nToken math: cost and latency budgets, capacity estimation for LLM traffic\nWhere guardrails and caching layers sit in the architecture\nEval-in-the-loop design: how quality gets measured and regressions get caught\nHallucination containment and failure-mode design\nUsing your own P3/P6 as worked examples under interview constraints",
    capabilityAfter:
      "You can whiteboard an LLM system in 45 minutes with explicit tradeoffs, a cost model, and an eval plan — using your own shipped systems as evidence.",
    definitionOfDone:
      "Three written AI-system-design exercises (e.g. \"design a support copilot\"), each with a cost model and eval plan; one practiced aloud in 45 minutes.",
    resourceUrl: "https://huyenchip.com/books/",
    resourceLabel: "Chip Huyen — AI Engineering",
    linearIssueId: null,
    order: 16,
  },
]

const projectSeed: NewProject[] = [
  {
    id: "p1",
    phaseId: "phase-1",
    title: "Safety-Hardened LLM Wrapper Service",
    slug: "llm-wrapper-service",
    type: "experiment",
    status: "building",
    purpose:
      "Your first real piece of AI infrastructure — a typed Python service that wraps LLM API calls correctly: typed contracts, error handling, and per-call token/cost logging. Foundation for everything else in Track A.",
    skillsDemonstrated: "a0,a1",
    techStack: ["Python", "FastAPI", "Pydantic", "OpenAI SDK", "Ollama"],
    implementationSteps:
      "1. FastAPI service with typed Pydantic request/response contract\n2. Single endpoint accepting prompt + context, calling an LLM, returning structured output\n3. Token counting and per-request cost logging\n4. Input/output guardrails: reject injection patterns, constrain output to declared schema\n5. Config flag to swap between paid API and local Ollama model\n6. 3 test cases proving injection defenses work",
    whatProductionMeans:
      "You can explain why each guardrail exists, not just that it is present — and you can show a failing test before the guardrail existed.",
    order: 1,
  },
  {
    id: "p2",
    phaseId: "phase-2",
    title: "Document Q&A RAG Service",
    slug: "rag-document-qa",
    type: "intermediate",
    purpose:
      "A real retrieval-augmented generation system over real documents. The most common production LLM pattern — where your backend instincts (5-database microservices) start compounding with AI skills.",
    skillsDemonstrated: "a3,a4",
    techStack: [
      "Python",
      "FastAPI",
      "PostgreSQL",
      "pgvector",
      "OpenAI Embeddings",
      "Docker",
    ],
    implementationSteps:
      "1. Pick a real document corpus — not a toy dataset\n2. Build ingestion pipeline: chunking strategy → embeddings → pgvector storage\n3. Build retrieval: vector search, add keyword (hybrid) search and a re-ranking step\n4. Build generation: retrieved context → LLM → answer with cited sources\n5. Handle \"no relevant context found\" explicitly — no hallucinated answers\n6. Add basic latency/cost logging per query",
    whatProductionMeans:
      "You can explain your chunking strategy choice and what you would change for a different document type — not just that chunking happened.",
    order: 2,
  },
  {
    id: "p3",
    phaseId: "phase-2",
    title: "Eval-Gated Multi-Agent Research Assistant",
    slug: "eval-gated-agent",
    type: "flagship",
    purpose:
      "Your sharpest differentiator project. Very few candidates can show an agent system with a real eval suite gating deployment. This directly productizes your Alignerr eval/RLHF intuition.",
    skillsDemonstrated: "a5,a6",
    techStack: [
      "Python",
      "LangGraph",
      "Ragas",
      "DeepEval",
      "LangSmith",
      "GitHub Actions",
    ],
    implementationSteps:
      "1. Design a multi-step agent task requiring multiple tool calls\n2. Build with LangGraph: at least 2 distinct tools, explicit state, retry/fallback on tool failure\n3. Add a hard cost/iteration cap — no runaway agent loops\n4. Build a golden dataset of test cases with expected outcomes\n5. Build eval suite scoring the agent on at least 3 metrics\n6. Wire eval suite into CI — a regression blocks the merge\n7. Add tracing via LangSmith or Arize Phoenix",
    whatProductionMeans:
      "You can pull up a trace of a failed run, diagnose why the eval caught it, and explain what you would change.",
    order: 3,
  },
  {
    id: "p4",
    phaseId: "phase-3",
    title: "Infrastructure-as-Code Cloud Foundation",
    slug: "iac-cloud-foundation",
    type: "production",
    purpose:
      'Move from "clicked around the AWS console" to "I can stand up real infrastructure from code, reproducibly." The prerequisite foundation under everything in Track B that follows.',
    skillsDemonstrated: "b0,b1",
    techStack: ["Terraform", "AWS VPC", "EC2", "RDS", "S3", "CloudWatch"],
    implementationSteps:
      "1. Terraform for a VPC with public + private subnets, correct route tables, internet gateway\n2. Security groups following least-privilege — no 0.0.0.0/0 on anything that does not need it\n3. EC2 instance in private subnet, reachable only via load balancer\n4. RDS instance connected to the app\n5. S3 bucket with a sane lifecycle policy\n6. CloudWatch alarms for CPU, error rate, disk\n7. Destroy and bring back up from terraform apply alone — prove reproducibility",
    whatProductionMeans:
      "You can explain every security group rule and why it exists, and you have actually destroyed and recreated the environment at least once.",
    order: 4,
  },
  {
    id: "p5",
    phaseId: "phase-3",
    title: "Kubernetes Production Deployment",
    slug: "k8s-production-deploy",
    type: "production",
    purpose:
      "Closes the single biggest gap on your current resume. Take your existing Multi-Tenant Expense Management System from Docker Compose to a real, production-shaped Kubernetes cluster.",
    skillsDemonstrated: "b2,b3,b4,b5",
    techStack: [
      "Terraform",
      "EKS",
      "Kubernetes",
      "Helm",
      "ArgoCD",
      "Prometheus",
      "Grafana",
      "OpenTelemetry",
    ],
    implementationSteps:
      "1. Provision EKS cluster via Terraform (extends P4)\n2. Write Helm charts for each service: Deployments, Services, Ingress\n3. Move all secrets out of plaintext env files into Kubernetes Secrets\n4. Configure RBAC: least-privilege service accounts per service\n5. Add Horizontal Pod Autoscaling on at least one service, prove it scales under load\n6. Set up GitOps: ArgoCD deploys triggered by git push, not manual kubectl apply\n7. Wire full observability: Prometheus + Grafana for metrics, OpenTelemetry/Jaeger for traces, log aggregator for logs\n8. Write an incident-response runbook for at least one likely failure mode",
    whatProductionMeans:
      "You can intentionally break something and use your own observability stack to diagnose it without looking at the code.",
    order: 5,
  },
  {
    id: "p6",
    phaseId: "phase-4",
    title: "Autonomous Agent Platform on Kubernetes",
    slug: "agent-platform-capstone",
    type: "flagship",
    purpose:
      "The flagship. Almost no candidate at your level can show agents + evals + cloud-native deployment + observability in one coherent system. This is the project that gets you past resume screening.",
    skillsDemonstrated: "a5,a6,a7,b2,b4,b5",
    techStack: [
      "Python",
      "LangGraph",
      "vLLM",
      "EKS",
      "Kubernetes",
      "Terraform",
      "OpenTelemetry",
      "Ragas",
      "GitHub Actions",
    ],
    implementationSteps:
      "1. Take the agent system from P3\n2. Containerize it and deploy onto the Kubernetes cluster from P5\n3. Wire eval suite from P3 into the GitOps pipeline from P5 — failed eval blocks the deploy\n4. Serve one open-weights model with vLLM on the cluster and route agent calls to it behind a flag — measure cost vs the hosted API\n5. Add cost/usage dashboards tracking LLM spend alongside infra spend\n6. Load-test the agent endpoint and confirm autoscaling under concurrent agent runs\n7. Write the full case study: problem → architecture → tradeoffs → eval results → what you would change",
    whatProductionMeans:
      "You can give an unscripted 10-minute walkthrough of this system to an interviewer, including 3 deliberate tradeoffs and what would break first under 10x load.",
    order: 6,
  },
]

const sprintSeed: NewWeeklySprint[] = [
  {
    weekLabel: "Week of Jun 30 – Jul 6",
    weekStart: "2026-06-30",
    status: "active",
    focus:
      "Set up Python env with uv, build a typed FastAPI service with Pydantic models, start AWS SAA intro. Reframe the Alignerr CV bullet around RLHF/eval methodology.",
  },
  {
    weekLabel: "Week of Jul 7 – Jul 13",
    weekStart: "2026-07-07",
    status: "planned",
    focus:
      "FastAPI deeper: dependency injection, error handling. First tiny eval experiment scaffold. Continue SAA.",
  },
  {
    weekLabel: "Week of Jul 14 – Jul 20",
    weekStart: "2026-07-14",
    status: "planned",
    focus:
      "Ship the Eval Harness Starter to GitHub. pytest basics. SAA: IAM + core services.",
  },
]

const careerSeed: NewCareerItem[] = [
  {
    title: "Reframe Alignerr bullet around RLHF / eval methodology",
    category: "resume",
    status: "in_progress",
    targetDate: "2026-07-13",
    notes:
      'Lead with rubric design, preference data, LLM output evaluation, failure-mode analysis. Not "data labeling".',
  },
  {
    title: "Cut the 9-language list; lead with one specialist identity",
    category: "resume",
    status: "todo",
    targetDate: "2027-05-15",
    notes: "Reposition headline to AI Application Engineer / Backend.",
  },
  {
    title: "Publish Eval Harness Starter to GitHub with a clear README",
    category: "portfolio",
    status: "todo",
    targetDate: "2026-07-31",
    notes:
      "A working eval demo with metrics beats any certificate for AI roles.",
  },
  {
    title: "Write case studies for both flagship projects",
    category: "portfolio",
    status: "todo",
    targetDate: "2027-05-31",
    notes:
      "Format: problem → architecture → tradeoffs → eval results → next steps.",
  },
  {
    title: "Earn AWS Solutions Architect Associate",
    category: "skill_proven",
    status: "todo",
    targetDate: "2027-01-31",
    notes: "Highest-ROI cloud credential for this path.",
  },
  {
    title: "Build system-design talking points from the Multi-Tenant project",
    category: "interview_prep",
    status: "todo",
    targetDate: "2027-05-31",
    notes:
      "Narrate the tradeoffs: gateway pattern, queue swap, Redis on auth path, 5-DB split.",
  },
  {
    title: "Build a 20-company target list (AI-first + cloud-forward)",
    category: "application",
    status: "todo",
    targetDate: "2026-10-01",
    notes:
      "Rank by referral reachability, not prestige. Refresh monthly; every application should trace back to this list.",
  },
  {
    title: "Send first 10 targeted applications (calibration round)",
    category: "application",
    status: "todo",
    targetDate: "2027-01-15",
    notes:
      "Start applying in Phase 3 — interviews are feedback, not the finale. Log every rejection and every question you couldn't answer.",
  },
  {
    title: "Referral pipeline: 2 coffee chats / referral asks per month",
    category: "application",
    status: "todo",
    targetDate: "2026-10-31",
    notes:
      "From month 4 onward. Referrals convert roughly 10x better than cold applications. Track asks and outcomes here.",
  },
  {
    title: "Publish one technical post per shipped project",
    category: "portfolio",
    status: "todo",
    targetDate: "2026-08-31",
    notes:
      "P1 post first: injection defenses with failing-test receipts. A post per project compounds into a search surface recruiters actually hit.",
  },
  {
    title: "4 mock interviews before first real onsite",
    category: "interview_prep",
    status: "todo",
    targetDate: "2027-02-28",
    notes:
      "2x AI system design (use the C2 write-ups), 1x coding, 1x behavioral. Peers, Pramp, or paid — any is fine; volume matters.",
  },
  {
    title: "Negotiation prep: comp bands + ask-script",
    category: "interview_prep",
    status: "todo",
    targetDate: "2027-04-30",
    notes:
      "Levels.fyi bands for every company on the target list. Write the ask-script before the first offer call, not after.",
  },
]

async function seed() {
  console.log("Seeding upDev roadmap data…")

  // Import the DB client lazily so dotenv (above) has populated env first.
  const { db } = await import("./index")
  const { eq, inArray } = await import("drizzle-orm")

  // Capture user progress on content tables before reseeding, so re-running
  // the seed never resets statuses or loses links.
  const skillState = await db
    .select({ id: skills.id, status: skills.status, isDone: skills.isDone })
    .from(skills)
  const projectState = await db
    .select({
      id: projects.id,
      status: projects.status,
      isDone: projects.isDone,
      repoUrl: projects.repoUrl,
      demoUrl: projects.demoUrl,
    })
    .from(projects)

  // Content tables reseed wholesale (FK-safe order)…
  await db.delete(skillResources)
  await db.delete(projects)
  await db.delete(skills)
  await db.delete(phases)
  await db.delete(tracks)

  await db.insert(tracks).values(trackSeed)
  await db.insert(phases).values(phaseSeed)
  await db.insert(skills).values(skillSeed)
  if (skillResourceSeed.length > 0) {
    await db.insert(skillResources).values(skillResourceSeed)
  }
  await db.insert(projects).values(projectSeed)

  // …then user progress is re-applied for rows that still exist.
  const seededSkillIds = new Set(skillSeed.map((s) => s.id))
  for (const prev of skillState) {
    if (!seededSkillIds.has(prev.id)) continue
    await db
      .update(skills)
      .set({ status: prev.status, isDone: prev.isDone })
      .where(eq(skills.id, prev.id))
  }
  const seededProjectIds = new Set(projectSeed.map((p) => p.id))
  for (const prev of projectState) {
    if (!seededProjectIds.has(prev.id)) continue
    await db
      .update(projects)
      .set({
        status: prev.status,
        isDone: prev.isDone,
        repoUrl: prev.repoUrl,
        demoUrl: prev.demoUrl,
      })
      .where(eq(projects.id, prev.id))
  }

  // User-owned tables are never deleted. Sprints seed only into an empty
  // table; career items are merged by title.
  const existingSprints = await db
    .select({ id: weeklySprints.id })
    .from(weeklySprints)
    .limit(1)
  if (existingSprints.length === 0) {
    await db.insert(weeklySprints).values(sprintSeed)
    console.log(`Seeded ${sprintSeed.length} sprints (table was empty).`)
  } else {
    console.log("Sprints table not empty — preserved as-is.")
  }

  const existingTitles = await db
    .select({ title: careerItems.title })
    .from(careerItems)
    .where(
      inArray(
        careerItems.title,
        careerSeed.map((c) => c.title)
      )
    )
  const titleSet = new Set(existingTitles.map((r) => r.title))
  const missingCareer = careerSeed.filter((c) => !titleSet.has(c.title))
  if (missingCareer.length > 0) {
    await db.insert(careerItems).values(missingCareer)
  }
  console.log(
    `Career items: ${missingCareer.length} added, ${titleSet.size} already present.`
  )

  console.log(
    `Seeded ${trackSeed.length} tracks, ${phaseSeed.length} phases, ${skillSeed.length} skills, ${skillResourceSeed.length} resources, ${projectSeed.length} projects (progress preserved for ${skillState.length} skills / ${projectState.length} projects).`
  )
  process.exit(0)
}

seed().catch((err) => {
  console.error(err)
  process.exit(1)
})
