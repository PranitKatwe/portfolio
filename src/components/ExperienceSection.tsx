"use client";

import { useState, useEffect } from "react";
import { useInView } from "react-intersection-observer";

type Line =
  | { t: "cmd" }
  | { t: "header"; period: string; title: string; company: string }
  | { t: "loc"; text: string }
  | { t: "bullet"; text: string }
  | { t: "empty" };

const LINES: Line[] = [
  { t: "cmd" },
  { t: "empty" },

  { t: "header", period: "Sep 2025 \u2013 Present", title: "Data Science Intern", company: "ExodusPoint Capital Management" },
  { t: "loc",    text: "New York, NY" },
  { t: "bullet", text: "\u251c\u2500\u2500 Built parser framework for 68 vendor Excel formats across 20+ institutions into Snowflake schema" },
  { t: "bullet", text: "\u251c\u2500\u2500 Replaced $10K/month external vendor with in-house pipeline delivering ~$120K in annual cost savings" },
  { t: "bullet", text: "\u251c\u2500\u2500 Implemented 3-level deduplication (SHA-256, Message ID, 7-column key) \u2014 zero duplicates" },
  { t: "bullet", text: "\u2514\u2500\u2500 Cut email-to-Snowflake latency to near-real-time via Microsoft Graph API + async batching" },
  { t: "empty" },

  { t: "header", period: "Feb 2025 \u2013 Dec 2025", title: "AI/Data Scientist Intern", company: "Goodie Bag Food Co." },
  { t: "loc",    text: "Boulder, CO" },
  { t: "bullet", text: "\u251c\u2500\u2500 Architected production multi-agent system (LangGraph + CrewAI) with 5 domain agents served via FastAPI gateway" },
  { t: "bullet", text: "\u251c\u2500\u2500 Built MoE intent router with rules, embeddings + LLM \u2014 achieving 25% token savings" },
  { t: "bullet", text: "\u251c\u2500\u2500 Implemented RAG (LangChain + FAISS), Redis session memory, and Kafka A2A bus" },
  { t: "bullet", text: "\u2514\u2500\u2500 Built Tableau dashboards uncovering $10K+ growth opportunities across 8+ U.S. markets" },
  { t: "empty" },

  { t: "header", period: "Dec 2024 \u2013 Aug 2025", title: "Data Analyst & Web Dev Intern", company: "mHealth Impact Lab" },
  { t: "loc",    text: "Aurora, CO" },
  { t: "bullet", text: "\u251c\u2500\u2500 Built Dash + Plotly dashboard with 15+ KPIs for Long COVID research (CO-SEAL project)" },
  { t: "bullet", text: "\u251c\u2500\u2500 Engineered Python ingestion scripts across 4 Qualtrics survey waves \u2014 5 min per wave" },
  { t: "bullet", text: "\u2514\u2500\u2500 Built PENFast allergy assessment platform (Django + PostgreSQL) cutting clinician review time by 40%" },
  { t: "empty" },

  { t: "header", period: "Aug 2024 \u2013 May 2025", title: "Graduate Head Teaching Assistant", company: "CU Boulder" },
  { t: "loc",    text: "Boulder, CO" },
  { t: "bullet", text: "\u251c\u2500\u2500 Led 4 graduate ML/NLP courses as Head TA managing a team of 7 teaching assistants" },
  { t: "bullet", text: "\u251c\u2500\u2500 Conducted office hours on Python, ML algorithms and math foundations for grad students" },
  { t: "bullet", text: "\u251c\u2500\u2500 Authored quizzes, midterms, and finals; delivered in-class session on AI ethics" },
  { t: "bullet", text: "\u2514\u2500\u2500 Standardized grading rubrics ensuring fairness and consistency across all courses" },
];

function renderLine(line: Line) {
  switch (line.t) {
    case "empty":  return <span>&nbsp;</span>;
    case "cmd":    return <span className="text-[#38BDF8]">$ cat experience.log</span>;
    case "header": return (
      <span>
        <span className="text-[#666666]">[{line.period}]</span>
        {"  "}
        <span className="text-[#444444]">INFO</span>
        {"  "}
        <span className="text-[#E8E8E8]">{line.title}</span>
        <span className="text-[#444444]"> @ </span>
        <span className="text-[#E8E8E8]">{line.company}</span>
      </span>
    );
    case "loc":    return <span className="text-[#444444] pl-4">{line.text}</span>;
    case "bullet": return (
      <span className="pl-4">
        <span className="text-[#444444]">{line.text.slice(0, 4)}</span>
        <span className="text-[#666666]">{line.text.slice(4)}</span>
      </span>
    );
  }
}

export default function ExperienceSection() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [revealed, setRevealed] = useState(0);

  useEffect(() => {
    if (!inView) return;
    if (revealed >= LINES.length) return;
    const t = setTimeout(() => setRevealed(r => r + 1), 60);
    return () => clearTimeout(t);
  }, [inView, revealed]);

  return (
    <section id="experience" className="scroll-mt-16 py-32 px-6 relative overflow-hidden">
      <div
        className="absolute top-6 right-4 text-[100px] font-bold leading-none select-none pointer-events-none"
        style={{ color: "#141414" }}
        aria-hidden
      >
        03
      </div>

      <div className="max-w-content mx-auto" ref={ref}>
        <style>{`@keyframes fadeIn { from { opacity: 0 } to { opacity: 1 } }`}</style>
        <div className="space-y-0.5 text-sm leading-6">
          {LINES.slice(0, revealed).map((line, i) => (
            <div key={i} style={{ opacity: 0, animation: "fadeIn 0.15s ease forwards" }}>
              {renderLine(line)}
            </div>
          ))}
          {revealed < LINES.length && inView && <span className="cursor-blink" />}
        </div>
      </div>
    </section>
  );
}
