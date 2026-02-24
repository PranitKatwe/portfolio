"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";

const projects = [
  {
    id: "repo-oracle",
    dir: "repo-oracle/",
    description: "GitHub Intelligence MCP Server — 6-tool MCP server enabling LLMs to query GitHub repos inside Cursor IDE via FastMCP stdio. Built at Cursor Hackathon Denver 2025. Features PR risk detection, recursive git tree scanner, and TODO/FIXME scanner across 20+ file extensions, cutting redundant API calls by ~40%.",
    stack: ["Python", "FastMCP", "GitHub API", "LRU Cache"],
    github: "https://github.com/PranitKatwe/repo-oracle",
    demo: "#",
    status: "OPEN SOURCE",
    finished: true,
  },
  {
    id: "docsumAI",
    dir: "docsumAI/",
    description: "Cloud-based LLM document summarization platform with user-controlled length and model selection. Cut response time from 10s to 6s, supports PDF/DOCX/TXT, handles 10K+ word documents via token-safe chunking.",
    stack: ["Python", "Flask", "GCP Pub/Sub", "BART", "GPT-4o", "Docker"],
    github: "https://github.com/PranitKatwe/DocSumAI-LLM-Powered-Summary",
    demo: "#",
    status: "DEPLOYED",
    finished: true,
  },
  {
    id: "sba-loan",
    dir: "sba-loan-eligibility/",
    description: "AI-driven SBA loan eligibility system using stacked ensemble achieving 87% accuracy across 4 loan types. 30%+ minority class recall improvement, SHAP/LIME explainability, engineered financial risk features (DSCR, debt-to-income).",
    stack: ["Python", "XGBoost", "LightGBM", "TabTransformer", "SHAP", "SMOTE"],
    github: "https://github.com/PranitKatwe/ai-driven-sba-loan-eligibility-system",
    demo: "#",
    status: "RESEARCH",
    finished: true,
  },
  {
    id: "electromobility",
    dir: "electromobility-dashboard/",
    description: "Interactive Power BI dashboard analyzing 7 years of EV adoption across 300+ U.S. counties. Revealed 40% urban uptake increase, uncovered 5 key regional adoption drivers.",
    stack: ["Power BI", "DAX", "Data Analysis"],
    github: "https://github.com/PranitKatwe/ElectroMobility-Dashboard-",
    demo: "#",
    status: "DASHBOARD",
    finished: true,
  },
  {
    id: "shoptalk",
    dir: "shoptalk-sentiment/",
    description: "E-commerce sentiment analysis on 23K+ clothing reviews benchmarking Logistic Regression vs SVM. 95% LR accuracy, identified ages 30–40 as 60% of reviewers, surfaced Trend dept with 25% low-rated reviews.",
    stack: ["Python", "Scikit-learn", "NLTK", "CountVectorizer"],
    github: "https://github.com/PranitKatwe/ShopTalk-E-commerce-Sentiment-Analysis",
    demo: "#",
    status: "RESEARCH",
    finished: true,
  },
  {
    id: "unipredict",
    dir: "unipredict-admission-analytics/",
    description: "Graduate admission analytics on 500 applications — identified CGPA (r=0.72) and LOR as top predictors using F-test, t-test, and Cook's Distance diagnostics. Welch t-test confirmed university rating 5 yields significantly higher admission odds (p < 3.39e-16). Compared 7 GLM candidates via MSPE, achieving R²=0.80.",
    stack: ["Python", "R", "GLM", "Statistical Testing", "ANOVA"],
    github: "https://github.com/PranitKatwe/UniPredict-Admission-Analytics",
    demo: "#",
    status: "RESEARCH",
    finished: true,
  },
  {
    id: "ray-contrib",
    dir: "ray-framework-contrib/",
    description: "Contributed to Apache Ray open source framework — resolved ArrowNotImplementedError enabling PyArrow compatibility with distributed data APIs. Built high-level duplicate removal API now used in large-scale ML preprocessing pipelines. (Anyscale / Ray Framework)",
    stack: ["Python", "PyArrow", "Ray Datasets", "Distributed Computing"],
    github: "https://github.com/PranitKatwe/ray",
    demo: "#",
    status: "OPEN SOURCE",
    finished: false,
  },
];

// Subtle graph paper pattern for card texture
const gridBg = {
  backgroundImage: "linear-gradient(#111111 1px, transparent 1px), linear-gradient(90deg, #111111 1px, transparent 1px)",
  backgroundSize: "24px 24px",
  backgroundColor: "#0A0A0A",
};

export default function ProjectsSection() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [openId, setOpenId] = useState<string | null>(null);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [revealed, setRevealed] = useState(0);

  // +1 for the command line, then one per project
  const total = projects.length + 1;

  useEffect(() => {
    if (!inView) return;
    if (revealed >= total) return;
    const t = setTimeout(() => setRevealed(r => r + 1), 150);
    return () => clearTimeout(t);
  }, [inView, revealed, total]);

  return (
    <section id="projects" className="scroll-mt-16 py-32 px-6 relative overflow-hidden">
      {/* Section number watermark */}
      <div
        className="absolute top-6 right-4 text-[100px] font-bold leading-none select-none pointer-events-none"
        style={{ color: "#141414" }}
        aria-hidden
      >
        05
      </div>

      <div className="max-w-content mx-auto space-y-8" ref={ref}>
        <style>{`@keyframes fadeIn { from { opacity: 0 } to { opacity: 1 } }`}</style>

        {revealed > 0 && (
          <div style={{ opacity: 0, animation: "fadeIn 0.15s ease forwards" }}>
            <p className="text-[#38BDF8] text-base">$ ls -la projects/</p>
          </div>
        )}

        <div className="space-y-3">
          {projects.slice(0, Math.max(0, revealed - 1)).map((p) => {
            const isOpen = openId === p.id;
            const isHovered = hoveredId === p.id;
            const active = isOpen || isHovered;

            return (
              <div
                key={p.id}
                style={{ opacity: 0, animation: "fadeIn 0.15s ease forwards" }}
              >
                {/* Directory row */}
                <button
                  onClick={() => setOpenId(isOpen ? null : p.id)}
                  onMouseEnter={() => setHoveredId(p.id)}
                  onMouseLeave={() => setHoveredId(null)}
                  className="w-full text-left"
                >
                  <div
                    className="flex items-center gap-3 text-sm py-2.5 px-4 transition-all duration-200"
                    style={{
                      border: `1px solid ${active ? "#38BDF8" : "#2a2a2a"}`,
                      boxShadow: active ? "0 0 0 1px #38BDF8" : "none",
                      transform: active ? "translateY(-3px)" : "translateY(0)",
                    }}
                  >
                    <span className="text-[#444444] text-xs">drwxr-xr-x</span>
                    <span
                      className="transition-colors duration-200"
                      style={{ color: active ? "#38BDF8" : "#E8E8E8" }}
                    >
                      {p.dir}
                    </span>
                    {/* Status indicator */}
                    <div className="ml-auto flex items-center gap-2 text-xs">
                      <span
                        className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                        style={{
                          backgroundColor: p.finished ? "#38BDF8" : "#666666",
                          animation: "blink 1.4s step-end infinite",
                        }}
                      />
                      <span className="text-[#444444] hidden sm:inline">{p.status}</span>
                      <span className="text-[#444444] ml-1">{isOpen ? "[-]" : "[+]"}</span>
                    </div>
                  </div>
                </button>

                {/* Expanded content */}
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <div
                        className="border border-t-0 border-[#38BDF8] px-4 py-4 space-y-4 text-sm"
                        style={gridBg}
                      >
                        <p className="text-[#38BDF8] text-xs">
                          $ cat {p.dir}README.md
                        </p>
                        <p className="text-[#E8E8E8] leading-6 pl-2 border-l border-[#2a2a2a]">
                          {p.description}
                        </p>
                        <div className="pl-2 border-l border-[#2a2a2a] space-y-2">
                          {/* Tech stack as [tag] format */}
                          <div className="flex flex-wrap gap-1.5">
                            {p.stack.map(tech => (
                              <span key={tech} className="text-[#666666] text-xs">[{tech}]</span>
                            ))}
                          </div>
                          <div className="flex gap-4 pt-0.5">
                            <a
                              href={p.github}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-[#666666] hover:text-[#38BDF8] underline underline-offset-4 transition-colors"
                            >
                              [github]
                            </a>
                            {p.demo !== "#" && (
                              <a
                                href={p.demo}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-[#666666] hover:text-[#38BDF8] underline underline-offset-4 transition-colors"
                              >
                                [demo]
                              </a>
                            )}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
          {revealed < total && inView && <span className="cursor-blink" />}
        </div>

      </div>
    </section>
  );
}
