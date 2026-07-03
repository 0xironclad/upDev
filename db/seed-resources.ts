import type { NewSkillResource } from "./schema"

/**
 * Curated learning resources, each anchored to a specific "what to learn"
 * bullet of its skill via itemIndex (index into the newline-split list;
 * null = general resource for the whole skill).
 *
 * Curated 2026-07-03: every URL was fetched and verified at curation time.
 */
export const skillResourceSeed: NewSkillResource[] = [
  // a0 — Python & LLM API Foundations
  { id: "a0-0-1", skillId: "a0", itemIndex: 0, label: "uv — Official Docs", url: "https://docs.astral.sh/uv/", kind: "docs", order: 1 },
  { id: "a0-0-2", skillId: "a0", itemIndex: 0, label: "asyncio — Python Official Docs", url: "https://docs.python.org/3/library/asyncio.html", kind: "docs", order: 2 },
  { id: "a0-1-1", skillId: "a0", itemIndex: 1, label: "LLM Leaderboard — Artificial Analysis", url: "https://artificialanalysis.ai/leaderboards/models", kind: "article", order: 3 },
  { id: "a0-2-1", skillId: "a0", itemIndex: 2, label: "Chat Completions — OpenAI API Reference", url: "https://developers.openai.com/api/reference/resources/chat/subresources/completions/methods/create", kind: "docs", order: 4 },
  { id: "a0-2-2", skillId: "a0", itemIndex: 2, label: "API Pricing — OpenAI Docs", url: "https://developers.openai.com/api/docs/pricing", kind: "docs", order: 5 },
  { id: "a0-3-1", skillId: "a0", itemIndex: 3, label: "Count Tokens with Tiktoken — OpenAI Cookbook", url: "https://developers.openai.com/cookbook/examples/how_to_count_tokens_with_tiktoken", kind: "practice", order: 6 },
  { id: "a0-4-1", skillId: "a0", itemIndex: 4, label: "Streaming API Responses — OpenAI Docs", url: "https://developers.openai.com/api/docs/guides/streaming-responses", kind: "docs", order: 7 },
  { id: "a0-4-2", skillId: "a0", itemIndex: 4, label: "How to Stream Completions — OpenAI Cookbook", url: "https://developers.openai.com/cookbook/examples/how_to_stream_completions", kind: "practice", order: 8 },
  { id: "a0-5-1", skillId: "a0", itemIndex: 5, label: "Prompt Caching — Claude Platform Docs", url: "https://platform.claude.com/docs/en/build-with-claude/prompt-caching", kind: "docs", order: 9 },
  { id: "a0-5-2", skillId: "a0", itemIndex: 5, label: "Prompt Caching — OpenAI Docs", url: "https://developers.openai.com/api/docs/guides/prompt-caching", kind: "docs", order: 10 },

  // a1 — Prompt Engineering & AI Safety
  { id: "a1-0-1", skillId: "a1", itemIndex: 0, label: "Prompt Engineering — OpenAI Docs", url: "https://developers.openai.com/api/docs/guides/prompt-engineering", kind: "docs", order: 1 },
  { id: "a1-0-2", skillId: "a1", itemIndex: 0, label: "Interactive Prompt Engineering Tutorial — Anthropic", url: "https://github.com/anthropics/prompt-eng-interactive-tutorial", kind: "repo", order: 2 },
  { id: "a1-1-1", skillId: "a1", itemIndex: 1, label: "Function Calling — OpenAI Docs", url: "https://developers.openai.com/api/docs/guides/function-calling", kind: "docs", order: 3 },
  { id: "a1-1-2", skillId: "a1", itemIndex: 1, label: "Tool Use — Claude Platform Docs", url: "https://platform.claude.com/docs/en/agents-and-tools/tool-use/overview", kind: "docs", order: 4 },
  { id: "a1-2-1", skillId: "a1", itemIndex: 2, label: "Mitigating Prompt Injection — Anthropic Research", url: "https://www.anthropic.com/research/prompt-injection-defenses", kind: "article", order: 5 },
  { id: "a1-2-2", skillId: "a1", itemIndex: 2, label: "Mitigate Jailbreaks & Injections — Claude Docs", url: "https://platform.claude.com/docs/en/test-and-evaluate/strengthen-guardrails/mitigate-jailbreaks", kind: "docs", order: 6 },
  { id: "a1-3-1", skillId: "a1", itemIndex: 3, label: "Presidio — PII Detection & Redaction (GitHub)", url: "https://github.com/data-privacy-stack/presidio", kind: "repo", order: 7 },
  { id: "a1-3-2", skillId: "a1", itemIndex: 3, label: "Presidio PII Masking — LiteLLM Tutorial", url: "https://docs.litellm.ai/docs/tutorials/presidio_pii_masking", kind: "docs", order: 8 },
  { id: "a1-4-1", skillId: "a1", itemIndex: 4, label: "Moderation API — OpenAI Docs", url: "https://developers.openai.com/api/docs/guides/moderation", kind: "docs", order: 9 },
  { id: "a1-4-2", skillId: "a1", itemIndex: 4, label: "Safety Best Practices — OpenAI Docs", url: "https://developers.openai.com/api/docs/guides/safety-best-practices", kind: "docs", order: 10 },

  // a2-eval — Ship a Tiny Eval Experiment
  { id: "a2-eval-0-1", skillId: "a2-eval", itemIndex: 0, label: "Intro to Evals — Anthropic Courses", url: "https://github.com/anthropics/courses/blob/master/prompt_evaluations/01_intro_to_evals/01_intro_to_evals.ipynb", kind: "repo", order: 1 },
  { id: "a2-eval-0-2", skillId: "a2-eval", itemIndex: 0, label: "Your AI Product Needs Evals — Hamel's Blog", url: "https://hamel.dev/blog/posts/evals/", kind: "article", order: 2 },
  { id: "a2-eval-1-1", skillId: "a2-eval", itemIndex: 1, label: "Writing Human-Graded Evals — Anthropic Courses", url: "https://github.com/anthropics/courses/blob/master/prompt_evaluations/02_workbench_evals/02_workbench_evals.ipynb", kind: "repo", order: 3 },
  { id: "a2-eval-2-1", skillId: "a2-eval", itemIndex: 2, label: "Building Evals — Anthropic Cookbook", url: "https://github.com/anthropics/claude-cookbooks/blob/main/misc/building_evals.ipynb", kind: "repo", order: 4 },

  // a3 — Embeddings & Vector Databases
  { id: "a3-0-1", skillId: "a3", itemIndex: 0, label: "Vector Embeddings — OpenAI Docs", url: "https://developers.openai.com/api/docs/guides/embeddings", kind: "docs", order: 1 },
  { id: "a3-1-1", skillId: "a3", itemIndex: 1, label: "Sentence Transformers — Official Docs", url: "https://www.sbert.net/", kind: "docs", order: 2 },
  { id: "a3-2-1", skillId: "a3", itemIndex: 2, label: "pgvector — GitHub", url: "https://github.com/pgvector/pgvector", kind: "repo", order: 3 },
  { id: "a3-3-1", skillId: "a3", itemIndex: 3, label: "7 Best Vector Databases — DataCamp", url: "https://www.datacamp.com/blog/the-top-5-vector-databases", kind: "article", order: 4 },

  // a4 — RAG Pipeline Design
  { id: "a4-0-1", skillId: "a4", itemIndex: 0, label: "RAG vs Fine-Tuning — Glean Blog", url: "https://www.glean.com/blog/retrieval-augemented-generation-vs-fine-tuning", kind: "article", order: 1 },
  { id: "a4-1-1", skillId: "a4", itemIndex: 1, label: "Building & Evaluating Advanced RAG — DeepLearning.AI", url: "https://www.deeplearning.ai/courses/building-evaluating-advanced-rag", kind: "course", order: 2 },
  { id: "a4-1-2", skillId: "a4", itemIndex: 1, label: "Production RAG with LangChain — freeCodeCamp", url: "https://www.youtube.com/watch?v=mHxLXzYjQRE", kind: "video", order: 3 },
  { id: "a4-2-1", skillId: "a4", itemIndex: 2, label: "LangChain vs Vercel AI SDK vs OpenAI SDK — Strapi", url: "https://strapi.io/blog/langchain-vs-vercel-ai-sdk-vs-openai-sdk-comparison-guide", kind: "article", order: 4 },
  { id: "a4-3-1", skillId: "a4", itemIndex: 3, label: "Hybrid Search — Pinecone Docs", url: "https://docs.pinecone.io/guides/search/hybrid-search", kind: "docs", order: 5 },
  { id: "a4-3-2", skillId: "a4", itemIndex: 3, label: "Hybrid Search — Weaviate Docs", url: "https://docs.weaviate.io/weaviate/concepts/search/hybrid-search", kind: "docs", order: 6 },
  { id: "a4-4-1", skillId: "a4", itemIndex: 4, label: "Effective Context Engineering for AI Agents — Anthropic", url: "https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents", kind: "article", order: 7 },
  { id: "a4-5-1", skillId: "a4", itemIndex: 5, label: "GPTCache — Semantic Cache for LLMs (GitHub)", url: "https://github.com/zilliztech/GPTCache", kind: "repo", order: 8 },
  { id: "a4-5-2", skillId: "a4", itemIndex: 5, label: "What Is Semantic Caching — Redis Blog", url: "https://redis.io/blog/what-is-semantic-caching/", kind: "article", order: 9 },

  // a5 — AI Agents with LangGraph
  { id: "a5-0-1", skillId: "a5", itemIndex: 0, label: "ReAct: Synergizing Reasoning and Acting — arXiv", url: "https://arxiv.org/abs/2210.03629", kind: "article", order: 1 },
  { id: "a5-0-2", skillId: "a5", itemIndex: 0, label: "ReAct Prompting — Prompt Engineering Guide", url: "https://www.promptingguide.ai/techniques/react", kind: "docs", order: 2 },
  { id: "a5-1-1", skillId: "a5", itemIndex: 1, label: "Intro to LangGraph — LangChain Academy", url: "https://academy.langchain.com/courses/intro-to-langgraph", kind: "course", order: 3 },
  { id: "a5-2-1", skillId: "a5", itemIndex: 2, label: "Building Effective Agents — Anthropic", url: "https://www.anthropic.com/research/building-effective-agents", kind: "article", order: 4 },
  { id: "a5-2-2", skillId: "a5", itemIndex: 2, label: "How We Built Our Multi-Agent Research System — Anthropic", url: "https://www.anthropic.com/engineering/multi-agent-research-system", kind: "article", order: 5 },
  { id: "a5-3-1", skillId: "a5", itemIndex: 3, label: "Model Context Protocol — Official Docs", url: "https://modelcontextprotocol.io/docs/getting-started/intro", kind: "docs", order: 6 },
  { id: "a5-4-1", skillId: "a5", itemIndex: 4, label: "AI SDK — Vercel Docs", url: "https://ai-sdk.dev/docs/introduction", kind: "docs", order: 7 },
  { id: "a5-5-1", skillId: "a5", itemIndex: 5, label: "Voice Agents — OpenAI Docs", url: "https://developers.openai.com/api/docs/guides/voice-agents", kind: "docs", order: 8 },
  { id: "a5-6-1", skillId: "a5", itemIndex: 6, label: "Computer Use Tool — Claude Platform Docs", url: "https://platform.claude.com/docs/en/agents-and-tools/tool-use/computer-use-tool", kind: "docs", order: 9 },
  { id: "a5-6-2", skillId: "a5", itemIndex: 6, label: "Computer Use — OpenAI Docs", url: "https://developers.openai.com/api/docs/guides/tools-computer-use", kind: "docs", order: 10 },

  // a6 — Evals & LLM Observability
  { id: "a6-0-1", skillId: "a6", itemIndex: 0, label: "Available Metrics — Ragas Docs", url: "https://docs.ragas.io/en/stable/concepts/metrics/available_metrics/", kind: "docs", order: 1 },
  { id: "a6-0-2", skillId: "a6", itemIndex: 0, label: "Introduction — DeepEval Docs", url: "https://deepeval.com/docs/introduction", kind: "docs", order: 2 },
  { id: "a6-1-1", skillId: "a6", itemIndex: 1, label: "Using LLM-as-a-Judge for Evaluation — Hamel's Blog", url: "https://hamel.dev/blog/posts/llm-judge/", kind: "article", order: 3 },
  { id: "a6-2-1", skillId: "a6", itemIndex: 2, label: "LangSmith Observability — LangChain Docs", url: "https://docs.langchain.com/langsmith/observability", kind: "docs", order: 4 },
  { id: "a6-2-2", skillId: "a6", itemIndex: 2, label: "Arize Phoenix — Official Docs", url: "https://arize.com/docs/phoenix", kind: "docs", order: 5 },
  { id: "a6-3-1", skillId: "a6", itemIndex: 3, label: "LLM Evaluation Guide — Braintrust", url: "https://www.braintrust.dev/articles/llm-evaluation-guide", kind: "article", order: 6 },

  // a7 — Model Serving & Inference Optimization
  { id: "a7-0-1", skillId: "a7", itemIndex: 0, label: "Quickstart — vLLM Docs", url: "https://docs.vllm.ai/en/latest/getting_started/quickstart/", kind: "docs", order: 1 },
  { id: "a7-1-1", skillId: "a7", itemIndex: 1, label: "LLM Course — Hugging Face Learn", url: "https://huggingface.co/learn/llm-course/chapter1/1", kind: "course", order: 2 },
  { id: "a7-2-1", skillId: "a7", itemIndex: 2, label: "Quantization Overview — Hugging Face Docs", url: "https://huggingface.co/docs/transformers/en/quantization/overview", kind: "docs", order: 3 },
  { id: "a7-2-2", skillId: "a7", itemIndex: 2, label: "Quantization Fundamentals — DeepLearning.AI", url: "https://www.deeplearning.ai/short-courses/quantization-fundamentals-with-hugging-face/", kind: "course", order: 4 },
  { id: "a7-3-1", skillId: "a7", itemIndex: 3, label: "Continuous Batching — Hugging Face Blog", url: "https://huggingface.co/blog/continuous_batching", kind: "article", order: 5 },
  { id: "a7-4-1", skillId: "a7", itemIndex: 4, label: "LLM Latency & Throughput Metrics — Anyscale Docs", url: "https://docs.anyscale.com/llm/serving/benchmarking/metrics", kind: "docs", order: 6 },
  { id: "a7-6-1", skillId: "a7", itemIndex: 6, label: "Schedule GPUs — Kubernetes Docs", url: "https://kubernetes.io/docs/tasks/manage-gpus/scheduling-gpus/", kind: "docs", order: 7 },
  { id: "a7-6-2", skillId: "a7", itemIndex: 6, label: "Taints and Tolerations — Kubernetes Docs", url: "https://kubernetes.io/docs/concepts/scheduling-eviction/taint-and-toleration/", kind: "docs", order: 8 },
  { id: "a7-7-1", skillId: "a7", itemIndex: 7, label: "PEFT — Hugging Face GitHub", url: "https://github.com/huggingface/peft", kind: "repo", order: 9 },
  { id: "a7-7-2", skillId: "a7", itemIndex: 7, label: "Fine-Tune Gemma with QLoRA — Google AI Docs", url: "https://ai.google.dev/gemma/docs/core/huggingface_text_finetune_qlora", kind: "docs", order: 10 },

  // c2 — AI System Design
  { id: "c2-0-1", skillId: "c2", itemIndex: 0, label: "RAG vs Fine-Tuning — Glean Blog", url: "https://www.glean.com/blog/retrieval-augemented-generation-vs-fine-tuning", kind: "article", order: 1 },
  { id: "c2-0-2", skillId: "c2", itemIndex: 0, label: "AI Engineering — Chip Huyen (O'Reilly Book)", url: "https://www.oreilly.com/library/view/ai-engineering/9781098166298/", kind: "book", order: 2 },
  { id: "c2-1-1", skillId: "c2", itemIndex: 1, label: "Key Metrics for LLM Inference — BentoML", url: "https://bentoml.com/llm/llm-inference-basics/llm-inference-metrics", kind: "docs", order: 3 },
  { id: "c2-2-1", skillId: "c2", itemIndex: 2, label: "NeMo Guardrails — NVIDIA GitHub", url: "https://github.com/NVIDIA-NeMo/Guardrails", kind: "repo", order: 4 },
  { id: "c2-3-1", skillId: "c2", itemIndex: 3, label: "LLM Evals: Everything You Need to Know — Hamel's Blog", url: "https://hamel.dev/blog/posts/evals-faq/", kind: "article", order: 5 },
  { id: "c2-4-1", skillId: "c2", itemIndex: 4, label: "Reduce Hallucinations — Claude Platform Docs", url: "https://platform.claude.com/docs/en/test-and-evaluate/strengthen-guardrails/reduce-hallucinations", kind: "docs", order: 6 },
  { id: "c2-5-1", skillId: "c2", itemIndex: 5, label: "Generative AI System Design Interview — Guide", url: "https://www.systemdesignhandbook.com/guides/generative-ai-system-design-interview/", kind: "article", order: 7 },

  // b0 — Linux, Networking & AWS Bootstrap
  { id: "b0-0-1", skillId: "b0", itemIndex: 0, label: "Overview of HTTP — MDN Web Docs", url: "https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/Overview", kind: "docs", order: 1 },
  { id: "b0-0-2", skillId: "b0", itemIndex: 0, label: "Computer Networking Fundamentals — freeCodeCamp", url: "https://www.youtube.com/watch?v=fQbBPa0ADvs", kind: "video", order: 2 },
  { id: "b0-1-1", skillId: "b0", itemIndex: 1, label: "Reverse Proxy — NGINX Docs", url: "https://docs.nginx.com/nginx/admin-guide/web-server/reverse-proxy/", kind: "docs", order: 3 },
  { id: "b0-1-2", skillId: "b0", itemIndex: 1, label: "Full NGINX Tutorial — TechWorld with Nana", url: "https://www.youtube.com/watch?v=q8OleYuqntY", kind: "video", order: 4 },
  { id: "b0-2-1", skillId: "b0", itemIndex: 2, label: "IAM Security Best Practices — AWS Docs", url: "https://docs.aws.amazon.com/IAM/latest/UserGuide/best-practices.html", kind: "docs", order: 5 },
  { id: "b0-2-2", skillId: "b0", itemIndex: 2, label: "Setting Up Your AWS Account — IAM Docs", url: "https://docs.aws.amazon.com/IAM/latest/UserGuide/getting-started_create-admin-group.html", kind: "docs", order: 6 },
  { id: "b0-3-1", skillId: "b0", itemIndex: 3, label: "Getting Started with Ansible — Docs", url: "https://docs.ansible.com/ansible/latest/getting_started/index.html", kind: "docs", order: 7 },

  // b1 — AWS Core Services
  { id: "b1-0-1", skillId: "b1", itemIndex: 0, label: "Policies and Permissions — IAM Docs", url: "https://docs.aws.amazon.com/IAM/latest/UserGuide/access_policies.html", kind: "docs", order: 1 },
  { id: "b1-0-2", skillId: "b1", itemIndex: 0, label: "IAM Roles — AWS Docs", url: "https://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles.html", kind: "docs", order: 2 },
  { id: "b1-1-1", skillId: "b1", itemIndex: 1, label: "What Is Amazon VPC — AWS Docs", url: "https://docs.aws.amazon.com/vpc/latest/userguide/what-is-amazon-vpc.html", kind: "docs", order: 3 },
  { id: "b1-2-1", skillId: "b1", itemIndex: 2, label: "EC2 Auto Scaling — AWS Docs", url: "https://docs.aws.amazon.com/autoscaling/ec2/userguide/what-is-amazon-ec2-auto-scaling.html", kind: "docs", order: 4 },
  { id: "b1-2-2", skillId: "b1", itemIndex: 2, label: "Elastic Load Balancing — AWS Docs", url: "https://docs.aws.amazon.com/elasticloadbalancing/latest/userguide/what-is-load-balancing.html", kind: "docs", order: 5 },
  { id: "b1-3-1", skillId: "b1", itemIndex: 3, label: "What Is Amazon S3 — AWS Docs", url: "https://docs.aws.amazon.com/AmazonS3/latest/userguide/Welcome.html", kind: "docs", order: 6 },
  { id: "b1-3-2", skillId: "b1", itemIndex: 3, label: "What Is Amazon Route 53 — AWS Docs", url: "https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/Welcome.html", kind: "docs", order: 7 },
  { id: "b1-4-1", skillId: "b1", itemIndex: 4, label: "What Is Amazon RDS — AWS Docs", url: "https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/Welcome.html", kind: "docs", order: 8 },
  { id: "b1-4-2", skillId: "b1", itemIndex: 4, label: "What Is Amazon DynamoDB — AWS Docs", url: "https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/Introduction.html", kind: "docs", order: 9 },
  { id: "b1-5-1", skillId: "b1", itemIndex: 5, label: "What Is Amazon ECS — AWS Docs", url: "https://docs.aws.amazon.com/AmazonECS/latest/developerguide/Welcome.html", kind: "docs", order: 10 },
  { id: "b1-5-2", skillId: "b1", itemIndex: 5, label: "What Is AWS Lambda — AWS Docs", url: "https://docs.aws.amazon.com/lambda/latest/dg/welcome.html", kind: "docs", order: 11 },
  { id: "b1-x-1", skillId: "b1", itemIndex: null, label: "SAA-C03 Full Course — freeCodeCamp", url: "https://www.youtube.com/watch?v=c3Cn4xYfxJY", kind: "course", order: 12 },

  // b2 — Kubernetes
  { id: "b2-0-1", skillId: "b2", itemIndex: 0, label: "Workloads — Kubernetes Docs", url: "https://kubernetes.io/docs/concepts/workloads/", kind: "docs", order: 1 },
  { id: "b2-0-2", skillId: "b2", itemIndex: 0, label: "Kubernetes Tutorial — TechWorld with Nana", url: "https://www.youtube.com/watch?v=X48VuDVv0do", kind: "video", order: 2 },
  { id: "b2-1-1", skillId: "b2", itemIndex: 1, label: "Service — Kubernetes Docs", url: "https://kubernetes.io/docs/concepts/services-networking/service/", kind: "docs", order: 3 },
  { id: "b2-1-2", skillId: "b2", itemIndex: 1, label: "Ingress — Kubernetes Docs", url: "https://kubernetes.io/docs/concepts/services-networking/ingress/", kind: "docs", order: 4 },
  { id: "b2-2-1", skillId: "b2", itemIndex: 2, label: "ConfigMaps — Kubernetes Docs", url: "https://kubernetes.io/docs/concepts/configuration/configmap/", kind: "docs", order: 5 },
  { id: "b2-2-2", skillId: "b2", itemIndex: 2, label: "Secrets — Kubernetes Docs", url: "https://kubernetes.io/docs/concepts/configuration/secret/", kind: "docs", order: 6 },
  { id: "b2-3-1", skillId: "b2", itemIndex: 3, label: "RBAC Authorization — Kubernetes Docs", url: "https://kubernetes.io/docs/reference/access-authn-authz/rbac/", kind: "docs", order: 7 },
  { id: "b2-3-2", skillId: "b2", itemIndex: 3, label: "Network Policies — Kubernetes Docs", url: "https://kubernetes.io/docs/concepts/services-networking/network-policies/", kind: "docs", order: 8 },
  { id: "b2-4-1", skillId: "b2", itemIndex: 4, label: "Taints and Tolerations — Kubernetes Docs", url: "https://kubernetes.io/docs/concepts/scheduling-eviction/taint-and-toleration/", kind: "docs", order: 9 },
  { id: "b2-4-2", skillId: "b2", itemIndex: 4, label: "Assigning Pods to Nodes — Kubernetes Docs", url: "https://kubernetes.io/docs/concepts/scheduling-eviction/assign-pod-node/", kind: "docs", order: 10 },
  { id: "b2-5-1", skillId: "b2", itemIndex: 5, label: "Persistent Volumes — Kubernetes Docs", url: "https://kubernetes.io/docs/concepts/storage/persistent-volumes/", kind: "docs", order: 11 },
  { id: "b2-6-1", skillId: "b2", itemIndex: 6, label: "Horizontal Pod Autoscaling — Kubernetes Docs", url: "https://kubernetes.io/docs/tasks/run-application/horizontal-pod-autoscale/", kind: "docs", order: 12 },
  { id: "b2-6-2", skillId: "b2", itemIndex: 6, label: "Cluster Autoscaler — GitHub", url: "https://github.com/kubernetes/autoscaler/tree/master/cluster-autoscaler", kind: "repo", order: 13 },
  { id: "b2-7-1", skillId: "b2", itemIndex: 7, label: "Helm Docs", url: "https://helm.sh/docs/", kind: "docs", order: 14 },
  { id: "b2-7-2", skillId: "b2", itemIndex: 7, label: "Getting Started — Argo CD Docs", url: "https://argo-cd.readthedocs.io/en/stable/getting_started/", kind: "docs", order: 15 },
  { id: "b2-8-1", skillId: "b2", itemIndex: 8, label: "Custom Resources — Kubernetes Docs", url: "https://kubernetes.io/docs/concepts/extend-kubernetes/api-extension/custom-resources/", kind: "docs", order: 16 },
  { id: "b2-9-1", skillId: "b2", itemIndex: 9, label: "What Is Amazon EKS — AWS Docs", url: "https://docs.aws.amazon.com/eks/latest/userguide/what-is-eks.html", kind: "docs", order: 17 },
  { id: "b2-9-2", skillId: "b2", itemIndex: 9, label: "Amazon EKS Workshop", url: "https://www.eksworkshop.com/", kind: "course", order: 18 },

  // b3 — Terraform & Multi-Environment IaC
  { id: "b3-0-1", skillId: "b3", itemIndex: 0, label: "Terraform Language Docs", url: "https://developer.hashicorp.com/terraform/language", kind: "docs", order: 1 },
  { id: "b3-1-1", skillId: "b3", itemIndex: 1, label: "S3 Backend & State Locking — Terraform Docs", url: "https://developer.hashicorp.com/terraform/language/backend/s3", kind: "docs", order: 2 },
  { id: "b3-2-1", skillId: "b3", itemIndex: 2, label: "Workspaces — Terraform Docs", url: "https://developer.hashicorp.com/terraform/language/state/workspaces", kind: "docs", order: 3 },
  { id: "b3-2-2", skillId: "b3", itemIndex: 2, label: "Quick Start — Terragrunt Docs", url: "https://docs.terragrunt.com/getting-started/quick-start/", kind: "docs", order: 4 },
  { id: "b3-3-1", skillId: "b3", itemIndex: 3, label: "What Is AWS Secrets Manager — AWS Docs", url: "https://docs.aws.amazon.com/secretsmanager/latest/userguide/intro.html", kind: "docs", order: 5 },
  { id: "b3-4-1", skillId: "b3", itemIndex: 4, label: "terraform plan — Terraform CLI Docs", url: "https://developer.hashicorp.com/terraform/cli/commands/plan", kind: "docs", order: 6 },
  { id: "b3-4-2", skillId: "b3", itemIndex: 4, label: "terraform import — Terraform CLI Docs", url: "https://developer.hashicorp.com/terraform/cli/import", kind: "docs", order: 7 },
  { id: "b3-5-1", skillId: "b3", itemIndex: 5, label: "Quick Start — Checkov Docs", url: "https://www.checkov.io/1.Welcome/Quick%20Start.html", kind: "docs", order: 8 },
  { id: "b3-5-2", skillId: "b3", itemIndex: 5, label: "User Guide — Trivy Docs", url: "https://trivy.dev/latest/docs/", kind: "docs", order: 9 },
  { id: "b3-6-1", skillId: "b3", itemIndex: 6, label: "Quick Start — Terratest Docs", url: "https://terratest.gruntwork.io/docs/getting-started/quick-start/", kind: "docs", order: 10 },
  { id: "b3-6-2", skillId: "b3", itemIndex: 6, label: "Terratest — GitHub", url: "https://github.com/gruntwork-io/terratest", kind: "repo", order: 11 },

  // b4 — CI/CD & Container Delivery
  { id: "b4-0-1", skillId: "b4", itemIndex: 0, label: "Dockerfile Best Practices — Docker Docs", url: "https://docs.docker.com/build/building/best-practices/", kind: "docs", order: 1 },
  { id: "b4-1-1", skillId: "b4", itemIndex: 1, label: "Matrix Builds — GitHub Actions Docs", url: "https://docs.github.com/en/actions/using-jobs/using-a-matrix-for-your-jobs", kind: "docs", order: 2 },
  { id: "b4-1-2", skillId: "b4", itemIndex: 1, label: "Caching Dependencies — GitHub Actions Docs", url: "https://docs.github.com/en/actions/using-workflows/caching-dependencies-to-speed-up-workflows", kind: "docs", order: 3 },
  { id: "b4-2-1", skillId: "b4", itemIndex: 2, label: "User Guide — Trivy Docs", url: "https://trivy.dev/latest/docs/", kind: "docs", order: 4 },
  { id: "b4-2-2", skillId: "b4", itemIndex: 2, label: "Distroless Images — GitHub", url: "https://github.com/GoogleContainerTools/distroless", kind: "repo", order: 5 },
  { id: "b4-3-1", skillId: "b4", itemIndex: 3, label: "Image Tag Mutability — Amazon ECR Docs", url: "https://docs.aws.amazon.com/AmazonECR/latest/userguide/image-tag-mutability.html", kind: "docs", order: 6 },
  { id: "b4-4-1", skillId: "b4", itemIndex: 4, label: "helm rollback — Helm Docs", url: "https://helm.sh/docs/helm/helm_rollback/", kind: "docs", order: 7 },
  { id: "b4-5-1", skillId: "b4", itemIndex: 5, label: "Configuring OIDC for AWS — GitHub Actions Docs", url: "https://docs.github.com/en/actions/security-for-github-actions/security-hardening-your-deployments/configuring-openid-connect-in-amazon-web-services", kind: "docs", order: 8 },

  // b5 — Observability, DR & Production Operations
  { id: "b5-0-1", skillId: "b5", itemIndex: 0, label: "Overview — Prometheus Docs", url: "https://prometheus.io/docs/introduction/overview/", kind: "docs", order: 1 },
  { id: "b5-0-2", skillId: "b5", itemIndex: 0, label: "Getting Started — Grafana Docs", url: "https://grafana.com/docs/grafana/latest/getting-started/", kind: "docs", order: 2 },
  { id: "b5-1-1", skillId: "b5", itemIndex: 1, label: "Grafana Loki Docs", url: "https://grafana.com/docs/loki/latest/", kind: "docs", order: 3 },
  { id: "b5-2-1", skillId: "b5", itemIndex: 2, label: "OpenTelemetry Docs", url: "https://opentelemetry.io/docs/", kind: "docs", order: 4 },
  { id: "b5-2-2", skillId: "b5", itemIndex: 2, label: "Jaeger Tracing Docs", url: "https://www.jaegertracing.io/docs/latest/", kind: "docs", order: 5 },
  { id: "b5-3-1", skillId: "b5", itemIndex: 3, label: "Backing Up and Restoring — RDS Docs", url: "https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/CHAP_CommonTasks.BackupRestore.html", kind: "docs", order: 6 },
  { id: "b5-4-1", skillId: "b5", itemIndex: 4, label: "AWS Billing and Cost Management Docs", url: "https://docs.aws.amazon.com/cost-management/latest/userguide/what-is-costmanagement.html", kind: "docs", order: 7 },
  { id: "b5-4-2", skillId: "b5", itemIndex: 4, label: "What Is FinOps — FinOps Foundation", url: "https://www.finops.org/introduction/what-is-finops/", kind: "article", order: 8 },
  { id: "b5-5-1", skillId: "b5", itemIndex: 5, label: "What Is Istio — Istio Docs", url: "https://istio.io/latest/docs/concepts/what-is-istio/", kind: "docs", order: 9 },
  { id: "b5-5-2", skillId: "b5", itemIndex: 5, label: "Linkerd Overview Docs", url: "https://linkerd.io/2/overview/", kind: "docs", order: 10 },

  // c1 — System Design & Interview Readiness
  { id: "c1-0-1", skillId: "c1", itemIndex: 0, label: "Designing Data-Intensive Applications — Kleppmann", url: "https://dataintensive.net/", kind: "book", order: 1 },
  { id: "c1-1-1", skillId: "c1", itemIndex: 1, label: "System Design Primer — GitHub", url: "https://github.com/donnemartin/system-design-primer", kind: "repo", order: 2 },

  // c3 — Coding Interview Maintenance
  { id: "c3-0-1", skillId: "c3", itemIndex: 0, label: "Roadmap — NeetCode", url: "https://neetcode.io/roadmap", kind: "course", order: 1 },
  { id: "c3-1-1", skillId: "c3", itemIndex: 1, label: "collections — Python Docs", url: "https://docs.python.org/3/library/collections.html", kind: "docs", order: 2 },
  { id: "c3-1-2", skillId: "c3", itemIndex: 1, label: "heapq — Python Docs", url: "https://docs.python.org/3/library/heapq.html", kind: "docs", order: 3 },
]
