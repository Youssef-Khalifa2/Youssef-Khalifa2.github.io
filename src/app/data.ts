export interface Project {
  id: string;
  title: string;
  oneLiner: string;
  description: string;
  moodColor: string;
  accentColor: string;
  techStack: string[];
  link: string;
  mermaidConfig: string;
}

export const projects: Project[] = [
  {
    id: "openflow",
    title: "Openflow",
    oneLiner: "A multi-agent AI ecosystem that autonomously replicates an entire software product team.",
    description: "Most dev teams are bottlenecked by handoffs. Openflow eliminates them. Contributed to the deployment pipeline and DevOps agent within an enterprise-grade multi-agent system that simulates a complete product organization — business analysts, UI/UX designers, front-end and back-end engineers, all running as coordinated agentic workflows. Built on Azure AI Foundry with orchestrated LLM agents, Openflow doesn't assist developers — it replaces the coordination layer entirely, autonomously driving the software lifecycle from spec to ship.",
    moodColor: "#0f172a",
    accentColor: "#10b981",
    techStack: ["Python", "Azure AI Foundry", "Agentic Workflows", "LLMs", "Multi-Agent Orchestration"],
    link: "Internal / Enterprise",
    mermaidConfig: `graph TD
      A[Spec/Requirement] --> B[Supervisor Agent]
      B --> C[BA Agent]
      B --> D[UX Agent]
      B --> E[Eng Agents]
      C & D & E --> F[Coordinated Workflow]
      F --> G[Deployment Pipeline]
      G --> H[Production Ship]
      style B fill:#10b981,stroke:#333,stroke-width:2px`,
  },
  {
    id: "mlops-platform",
    title: "MLOps Platform — 70+ Models",
    oneLiner: "Solo-architected a production MLOps platform from zero — CI/CD, drift monitoring, and LLMOps.",
    description: "No existing infrastructure. No team. Just a mandate to make it work. Built the full MLOps lifecycle from scratch at Power Holding International — CI/CD pipelines via GitHub Actions, container orchestration on Kubernetes (AKS), and experiment tracking with model registry via MLflow on Azure Container Apps. Owns retraining schedules, automated quality gates, and drift detection across 70+ live forecasting and classification models. Extended into LLMOps territory: automated tracing, deployment pipelines, and active guardrails for agentic and LLM-based solutions through Azure AI Foundry.",
    moodColor: "#050d1a",
    accentColor: "#0078d4",
    techStack: ["Python", "GitHub Actions", "Kubernetes", "MLflow", "Azure Container Apps", "LLMOps"],
    link: "Enterprise Infrastructure",
    mermaidConfig: `graph LR
      A[Data Store] --> B[Training Pipeline]
      B --> C[MLflow Registry]
      C --> D{Quality Gate}
      D -->|Pass| E[AKS Deployment]
      E --> F[Drift Monitoring]
      F -->|Alert| B
      style C fill:#0078d4,stroke:#333,stroke-width:2px`,
  },
  {
    id: "surveillance-intelligence",
    title: "AI Surveillance Intelligence",
    oneLiner: "Real-time facial recognition and license plate detection at 30 FPS across 50,000+ residents.",
    description: "Emaar Misr needed a production-grade surveillance system. Designed the full architecture and wrote 75% of the codebase. Built a multi-stage pipeline: face detection → embedding extraction → FAISS similarity search → identity verification, running at 30 FPS with sub-200ms latency. Optimized similarity search from O(n) to O(log n). Deployed as a distributed microservices architecture on FastAPI with async processing. Outcome: security response time cut by 75%, manual monitoring reduced by 90%.",
    moodColor: "#0a0f1e",
    accentColor: "#00d4ff",
    techStack: ["TensorFlow", "FAISS", "OpenCV", "FastAPI", "Microservices", "Async"],
    link: "Proprietary",
    mermaidConfig: `graph TD
      A[IP Camera Stream] --> B[Face Detection]
      B --> C[Embedding Extraction]
      C --> D[FAISS O-log-n Search]
      D --> E[Identity Verification]
      E --> F[Security Alert]
      style D fill:#00d4ff,stroke:#333,stroke-width:2px`,
  },
  {
    id: "career-nexus",
    title: "Career Nexus",
    oneLiner: "A supervisor-led multi-agent system that optimizes CVs and matches candidates using RAG and self-reflection.",
    description: "Built a full multi-agent orchestration system in LangGraph with a supervisor agent coordinating five specialized critic agents. On the recruiter side, a high-performance RAG pipeline built on Qdrant with a mixed LLM stack (Claude, Mistral) implements self-reflection loops that iterate until candidate matching clears a 90+ quality score threshold. The system doesn't just suggest edits — it generates evidence-backed, role-specific responses and CV optimizations autonomously.",
    moodColor: "#0d1117",
    accentColor: "#7c3aed",
    techStack: ["LangGraph", "Qdrant", "Claude API", "RAG", "Multi-Agent", "Vector Search"],
    link: "https://github.com/Youssef-Khalifa2/Job-Seek-Agentic-Platform",
    mermaidConfig: `graph TD
      A[Input CV/Job] --> B[Supervisor]
      B --> C[Critic Agents]
      C --> D{Reflection Loop}
      D -->|Retry| B
      D -->|Pass| E[Qdrant RAG]
      E --> F[Optimized Output]
      style D fill:#7c3aed,stroke:#333,stroke-width:2px`,
  },
  {
    id: "emi-chatbot",
    title: "EMI — Emaar Misr Intelligence",
    oneLiner: "Natural language to SQL to insight — an agentic BI assistant for enterprise real-estate data.",
    description: "Co-developed an AI-powered BI chatbot enabling any team member to query complex data schemas using plain language. Multi-step agentic framework handling intent detection → entity extraction → SQL generation → data analysis → answer synthesis. Outputs interactive visualizations or exportable CSVs. Data engineering layer joins tables across two separate enterprise systems, built on SQLAlchemy with Apache Spark experimentation for scale.",
    moodColor: "#0f1a2e",
    accentColor: "#f59e0b",
    techStack: ["LangChain", "SQLAlchemy", "Apache Spark", "SQL", "FastAPI", "NLP"],
    link: "Internal Enterprise Tool",
    mermaidConfig: `graph LR
      A[Natural Language] --> B[Intent Detector]
      B --> C[SQL Generator]
      C --> D[SQLAlchemy Execution]
      D --> E[Data Synthesis]
      E --> F[Visualization/CSV]
      style C fill:#f59e0b,stroke:#333,stroke-width:2px`,
  },
  {
    id: "nlp-complaint-classification",
    title: "NLP Complaint Classification",
    oneLiner: "BERT + BiLSTM classifier auto-routing 258,000+ support tickets across 158 categories.",
    description: "Built a production complaint classification system using a BiLSTM architecture with BERT embeddings, purpose-built for a long-tail, multilingual category distribution. Hyperparameter optimization via Optuna with 8-worker parallelization. Applied SMOTE to handle severe class imbalance. Integrated directly into Snowflake data warehouse. Final performance: 78% accuracy across all 158 categories, 60% of manual routing eliminated.",
    moodColor: "#0f172a",
    accentColor: "#10b981",
    techStack: ["BERT", "BiLSTM", "TensorFlow", "Hugging Face", "Optuna", "Snowflake"],
    link: "Proprietary",
    mermaidConfig: `graph TD
      A[Support Ticket] --> B[BERT Embedding]
      B --> C[BiLSTM Classifier]
      C --> D[Optuna HPO]
      D --> E[Final Routing]
      style C fill:#10b981,stroke:#333,stroke-width:2px`,
  },
  {
    id: "x-ray-bone-detection",
    title: "X-Ray Bone Abnormality Detection",
    oneLiner: "Multiview CNN architectures for patient-level reasoning over per-image classification.",
    description: "Benchmarked single-view vs. multiview CNN architectures on Stanford's MURA dataset. Designed a multiview multimodal architecture treating all images in a patient folder as a unified input, pushing accuracy to 85% compared to 82% for single-view models. This project demonstrates the value of patient-level diagnostic context in medical imaging classifiers.",
    moodColor: "#0a1628",
    accentColor: "#e11d48",
    techStack: ["ResNet50", "Keras", "TensorFlow", "OpenCV", "NumPy", "Medical Imaging"],
    link: "https://github.com/Youssef-Khalifa2/Bone-abnoramilty-detection-using-multimodal-multistage-system-",
    mermaidConfig: `graph TD
      A[Multiple Joint Views] --> B[ResNet50 Backbone]
      B --> C[Feature Fusion]
      C --> D[Multiview Classifier]
      D --> E[Patient-Level Diagnosis]
      style C fill:#e11d48,stroke:#333,stroke-width:2px`,
  },
];
