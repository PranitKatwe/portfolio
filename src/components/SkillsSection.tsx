"use client";

import { useState, useEffect } from "react";
import { useInView } from "react-intersection-observer";

type TreeLine = { raw: string; type: "command" | "root" | "folder" | "item" | "empty" };

function renderLine(line: TreeLine) {
  if (line.type === "command") {
    return <span className="text-[#38BDF8]">{line.raw}</span>;
  }
  if (line.type === "root") {
    return <span className="text-[#38BDF8]">{line.raw}</span>;
  }
  if (line.type === "empty") {
    return <span>&nbsp;</span>;
  }

  const match = line.raw.match(/^([│├└─\s]+)(.*)/);
  if (!match) return <span className="text-[#E8E8E8]">{line.raw}</span>;
  const [, treeChars, name] = match;
  return (
    <>
      <span className="text-[#444444] whitespace-pre">{treeChars}</span>
      <span className="text-[#E8E8E8]">{name}</span>
    </>
  );
}

const TREE_LINES: TreeLine[] = [
  { raw: "$ tree skills/", type: "command" },
  { raw: "", type: "empty" },
  { raw: "skills/", type: "root" },
  { raw: "├── languages/", type: "folder" },
  { raw: "│   ├── Python", type: "item" },
  { raw: "│   ├── SQL", type: "item" },
  { raw: "│   ├── R", type: "item" },
  { raw: "│   └── JavaScript", type: "item" },
  { raw: "├── machine-learning/", type: "folder" },
  { raw: "│   ├── Scikit-learn", type: "item" },
  { raw: "│   ├── XGBoost", type: "item" },
  { raw: "│   ├── LightGBM", type: "item" },
  { raw: "│   ├── SVM", type: "item" },
  { raw: "│   ├── Random Forest", type: "item" },
  { raw: "│   └── Ensemble Methods", type: "item" },
  { raw: "├── neural-networks/", type: "folder" },
  { raw: "│   ├── PyTorch", type: "item" },
  { raw: "│   ├── TensorFlow", type: "item" },
  { raw: "│   ├── Keras", type: "item" },
  { raw: "│   ├── CNNs", type: "item" },
  { raw: "│   ├── RNNs (LSTM/GRU)", type: "item" },
  { raw: "│   └── TabTransformer", type: "item" },
  { raw: "├── llms-and-agents/", type: "folder" },
  { raw: "│   ├── LangChain", type: "item" },
  { raw: "│   ├── LangGraph", type: "item" },
  { raw: "│   ├── CrewAI", type: "item" },
  { raw: "│   ├── HuggingFace Transformers", type: "item" },
  { raw: "│   ├── RAG + FAISS", type: "item" },
  { raw: "│   ├── Prompt Engineering", type: "item" },
  { raw: "│   ├── LangSmith", type: "item" },
  { raw: "│   ├── Vertex AI", type: "item" },
  { raw: "│   └── Bedrock", type: "item" },
  { raw: "├── data-engineering/", type: "folder" },
  { raw: "│   ├── PostgreSQL", type: "item" },
  { raw: "│   ├── Snowflake", type: "item" },
  { raw: "│   ├── MongoDB", type: "item" },
  { raw: "│   ├── MySQL", type: "item" },
  { raw: "│   ├── Redis", type: "item" },
  { raw: "│   ├── Kafka", type: "item" },
  { raw: "│   ├── Apache Spark", type: "item" },
  { raw: "│   └── Airflow", type: "item" },
  { raw: "├── apis-and-backend/", type: "folder" },
  { raw: "│   ├── FastAPI", type: "item" },
  { raw: "│   ├── Flask", type: "item" },
  { raw: "│   ├── Django", type: "item" },
  { raw: "│   ├── REST", type: "item" },
  { raw: "│   └── gRPC", type: "item" },
  { raw: "├── cloud-and-devops/", type: "folder" },
  { raw: "│   ├── AWS", type: "item" },
  { raw: "│   ├── GCP", type: "item" },
  { raw: "│   ├── Docker", type: "item" },
  { raw: "│   ├── Kubernetes", type: "item" },
  { raw: "│   └── GitHub CI/CD", type: "item" },
  { raw: "├── visualization/", type: "folder" },
  { raw: "│   ├── Tableau", type: "item" },
  { raw: "│   ├── Power BI", type: "item" },
  { raw: "│   ├── Dash + Plotly", type: "item" },
  { raw: "│   └── Streamlit", type: "item" },
  { raw: "├── statistics/", type: "folder" },
  { raw: "│   ├── Hypothesis Testing", type: "item" },
  { raw: "│   ├── A/B Testing", type: "item" },
  { raw: "│   ├── ANOVA", type: "item" },
  { raw: "│   ├── Time Series (ARIMA, Prophet)", type: "item" },
  { raw: "│   └── Causal Inference", type: "item" },
  { raw: "└── coffee/", type: "folder" },
  { raw: "    └── black-no-sugar", type: "item" },
];

export default function SkillsSection() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [revealed, setRevealed] = useState(0);

  useEffect(() => {
    if (!inView) return;
    if (revealed >= TREE_LINES.length) return;
    const t = setTimeout(() => setRevealed(r => r + 1), 55);
    return () => clearTimeout(t);
  }, [inView, revealed]);

  return (
    <section id="skills" className="scroll-mt-16 py-32 px-6 relative overflow-hidden">
      {/* Section number watermark */}
      <div
        className="absolute top-6 right-4 text-[100px] font-bold leading-none select-none pointer-events-none"
        style={{ color: "#141414" }}
        aria-hidden
      >
        04
      </div>

      <div className="max-w-content mx-auto" ref={ref}>
        <div className="space-y-0.5 text-sm leading-6 font-mono">
          {TREE_LINES.slice(0, revealed).map((line, i) => (
            <div
              key={i}
              style={{ opacity: 0, animation: "fadeIn 0.15s ease forwards" }}
            >
              <style>{`@keyframes fadeIn { from { opacity: 0 } to { opacity: 1 } }`}</style>
              {renderLine(line)}
            </div>
          ))}

          {revealed < TREE_LINES.length && inView && (
            <span className="cursor-blink" />
          )}
        </div>
      </div>
    </section>
  );
}
