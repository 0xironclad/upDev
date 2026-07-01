import { config } from "dotenv"

config({ path: ".env.local" })

import {
  careerItems,
  phases,
  projects,
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
    color: "indigo",
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
      "Linux/networking, AWS, Kubernetes, IaC — grounded in roadmap.sh/devops + /aws + /kubernetes",
    order: 2,
  },
  {
    id: "track-c",
    name: "Fusion & Career",
    slug: "fusion-career",
    icon: "🎯",
    color: "amber",
    description:
      "Capstone systems, system design, portfolio, job applications",
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
    window: "Months 4–7",
    goal: 'Move from "deploys with Docker Compose" to real cloud-native infrastructure: AWS SAA certified, Kubernetes, and Terraform/IaC.',
    completionCriteria:
      "AWS Solutions Architect Associate passed; can deploy a containerized service to EKS provisioned via Terraform; CKA-level Kubernetes competence.",
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
      "Flagship Project #2 (agentic system on EKS with tracing + guardrails) shipped; comprehensive test suite; one open-source contribution merged.",
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
      "Portfolio site + 2 flagship case studies live; resume rewritten around AI + backend + cloud; 10+ targeted applications out.",
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
      "Python core: typing, async/await, packaging with uv, virtual environments\nModel landscape: OpenAI, Claude, Gemini, Hugging Face — capabilities, context length, cutoffs\nOpenAI Platform: Chat Completions API, token management, pricing considerations\nCost-aware LLM calls: logging tokens and cost per request",
    capabilityAfter:
      "You can write a typed Python service that calls an LLM API correctly, handles errors and rate limits, and tracks token cost.",
    definitionOfDone:
      "A typed Python service that calls an LLM API with proper error handling and logs token/cost per call. Already scaffolded — see the llm-wrapper-service repo.",
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
      "Prompt engineering: roles, few-shot examples, chain-of-thought, structured/JSON output\nAI safety: prompt injection attacks, bias and fairness, adversarial testing\nOpenAI Moderation API, input/output constraints, end-user ID tracking",
    capabilityAfter:
      "You can write a production system prompt that resists common injection patterns and constrains output to a safe, structured format.",
    definitionOfDone:
      "A documented system prompt with at least 3 named attack vectors defended against, with passing tests proving the defense works.",
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
      "Working semantic search over a real dataset backed by pgvector.",
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
      "RAG vs fine-tuning: when each is the right call\nThe full pipeline: chunking → embedding → vector database → retrieval → generation\nDirect SDK vs LangChain — when to use each\nHybrid search (keyword + vector) and re-ranking as the production pattern",
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
      "ReAct prompting: the core reason + act loop behind almost every agent framework\nBuilding agents with LangGraph: state machines, nodes, edges, memory\nMulti-agent architecture patterns: routing, orchestrator-worker, evaluator-optimizer, reflection\nModel Context Protocol (MCP): the emerging standard for tool/data connectors\nVercel AI SDK for TypeScript-native agents",
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
      "Your sharpest differentiator. Your Alignerr work (RLHF, preference data, rubric design) is exactly the methodology hiring managers consider the #1 signal of real LLM engineering maturity.",
    whatToLearn:
      "Eval frameworks: Ragas, DeepEval — faithfulness, context precision/recall, answer relevancy\nGolden datasets and LLM-as-judge: building labeled sets, writing judge prompts, measuring agreement\nLLM observability: LangSmith and Arize Phoenix — connects to your existing OpenTelemetry experience",
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
      "Networking formalized: DNS, HTTP/HTTPS, SSL/TLS, SSH, OSI model\nNginx / reverse proxy fundamentals: prerequisite for understanding ALBs and Kubernetes Ingress\nAWS account setup correctly: IAM users/groups/roles, no root-key development",
    capabilityAfter:
      "You can debug a remote Linux box over SSH with no GUI, and your AWS account is set up the way a real engineering org would require.",
    definitionOfDone:
      "Correctly scoped IAM setup with no root key use, and a documented network debugging checklist you trust.",
    resourceUrl: "https://roadmap.sh/aws",
    resourceLabel: "roadmap.sh — AWS Roadmap",
    linearIssueId: "COL-10",
    order: 8,
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
      "IAM: policies, roles, identity-based vs resource-based, instance profiles\nVPC: CIDR blocks, subnets, route tables, security groups, internet gateway, NAT gateway\nEC2: instance types, auto-scaling groups, elastic load balancers (already used — formalize the model)\nS3, Route53, CloudWatch, CloudFront\nRDS, DynamoDB, ElastiCache\nECR/ECS/Fargate, Lambda, EventBridge, API Gateway",
    capabilityAfter:
      "You can stand up a real backend entirely via CLI/IaC with no console clicking, and understand container and serverless deploy paths well enough to choose correctly.",
    definitionOfDone:
      "A service deployed with a real VPC, RDS-backed database, S3 storage, and CloudWatch alarms — built with Terraform, not the console.",
    resourceUrl: "https://developer.hashicorp.com/terraform/tutorials",
    resourceLabel: "HashiCorp — Terraform Tutorials",
    linearIssueId: "COL-11",
    order: 9,
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
      "Core objects: Pods, ReplicaSets, Deployments, StatefulSets, Jobs\nNetworking: Services, Ingress, load balancing, pod-to-pod communication\nConfiguration: ConfigMaps, Secrets (zero plaintext credentials)\nSecurity: RBAC, network policies\nAutoscaling: HPA, VPA, cluster autoscaling\nDeployment patterns: Helm, GitOps with ArgoCD, canary/blue-green deployments\nEKS: managed Kubernetes on AWS",
    capabilityAfter:
      "You can take a multi-service application and run it on a real, production-shaped Kubernetes cluster — not a toy single-pod demo.",
    definitionOfDone:
      "Your existing microservices project deployed to EKS via Helm, with autoscaling, RBAC, and secrets properly configured.",
    resourceUrl: "https://kubernetes.io/docs/tutorials/",
    resourceLabel: "Kubernetes — Official Tutorials",
    linearIssueId: "COL-12",
    order: 10,
  },
  {
    id: "b3",
    phaseId: "phase-3",
    trackId: "track-b",
    title: "Infrastructure as Code & Production Operations",
    slug: "iac-production-ops",
    category: "Terraform",
    priority: "high",
    whyItMatters:
      'This is what separates "I can deploy" from "this is reproducible and operable by someone other than me."',
    whatToLearn:
      "Terraform: provisioning AWS infrastructure in code\nGitHub Actions: extending from \"runs my tests\" to \"provisions infra and deploys app\"\nMonitoring: Prometheus, Grafana, CloudWatch\nLogging: Loki or Elastic Stack\nTracing: extend your existing OpenTelemetry/Jaeger to the full three pillars\nSecrets management: Vault, Sealed Secrets, or AWS Secrets Manager\nService mesh concepts: Istio, Linkerd — know what problem they solve",
    capabilityAfter:
      "You can hand your infrastructure to another engineer and have them reproduce it from code alone, with full visibility when something breaks.",
    definitionOfDone:
      "Entire cloud environment reproducible from terraform apply plus a GitHub Actions pipeline; deployed service has full observability and a documented incident-response runbook.",
    resourceUrl: "https://developer.hashicorp.com/terraform/tutorials",
    resourceLabel: "HashiCorp — Terraform Tutorials",
    linearIssueId: "COL-13",
    order: 11,
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
    order: 12,
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
    skillsDemonstrated: "b2,b3",
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
    skillsDemonstrated: "a5,a6,b2,b3",
    techStack: [
      "Python",
      "LangGraph",
      "EKS",
      "Kubernetes",
      "Terraform",
      "OpenTelemetry",
      "Ragas",
      "GitHub Actions",
    ],
    implementationSteps:
      "1. Take the agent system from P3\n2. Containerize it and deploy onto the Kubernetes cluster from P5\n3. Wire eval suite from P3 into the GitOps pipeline from P5 — failed eval blocks the deploy\n4. Add cost/usage dashboards tracking LLM spend alongside infra spend\n5. Load-test the agent endpoint and confirm autoscaling under concurrent agent runs\n6. Write the full case study: problem → architecture → tradeoffs → eval results → what you would change",
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
]

async function seed() {
  console.log("Seeding upDev roadmap data…")

  // Import the DB client lazily so dotenv (above) has populated env first.
  const { db } = await import("./index")

  // Idempotent: clear in FK-safe order, then insert.
  await db.delete(careerItems)
  await db.delete(weeklySprints)
  await db.delete(projects)
  await db.delete(skills)
  await db.delete(phases)
  await db.delete(tracks)

  await db.insert(tracks).values(trackSeed)
  await db.insert(phases).values(phaseSeed)
  await db.insert(skills).values(skillSeed)
  await db.insert(projects).values(projectSeed)
  await db.insert(weeklySprints).values(sprintSeed)
  await db.insert(careerItems).values(careerSeed)

  console.log(
    `Seeded ${trackSeed.length} tracks, ${phaseSeed.length} phases, ${skillSeed.length} skills, ${projectSeed.length} projects, ${sprintSeed.length} sprints, ${careerSeed.length} career items.`
  )
  process.exit(0)
}

seed().catch((err) => {
  console.error(err)
  process.exit(1)
})
