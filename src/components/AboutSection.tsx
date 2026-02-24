"use client";

import { useState, useEffect } from "react";
import { useInView } from "react-intersection-observer";

// ASCII table dimensions: label col = 22 chars wide, value col = 9 chars wide
const L = 22;
const V = 9;
const pL = (s: string) => (" " + s).padEnd(L);
const pV = (s: string) => (" " + s).padEnd(V);

const SEP = "+" + "-".repeat(L) + "+" + "-".repeat(V) + "+";
const HEAD = `|${pL("Metric")}|${pV("Value")}|`;

const STATS: [string, string][] = [
  ["Experience",          "2+ yrs"],
  ["Roles & Internships", "4"],
  ["Projects Shipped",    "10+"],
  ["Students Mentored",   "200+"],
];

type Line =
  | { t: "cmd";  text: string }
  | { t: "bio";  text: string }
  | { t: "sep" }
  | { t: "head" }
  | { t: "stat"; label: string; value: string }
  | { t: "fact"; text: string }
  | { t: "empty" };

const LINES: Line[] = [
  { t: "cmd",  text: "$ cat about.txt" },
  { t: "bio",  text: "> MS in Data Science @ University of Colorado Boulder" },
  { t: "bio",  text: "> 2+ years building ML systems, data pipelines, and AI agents" },
  { t: "bio",  text: "> From multi-agent LLM systems to financial ETL pipelines \u2014" },
  { t: "bio",  text: "> I turn messy data into things that actually work in production" },
  { t: "bio",  text: "> Open to full-time roles in Data Science, ML Engineering & AI" },
  { t: "empty" },
  { t: "cmd",  text: "$ cat stats.txt" },
  { t: "sep" },
  { t: "head" },
  { t: "sep" },
  ...STATS.map(([label, value]) => ({ t: "stat" as const, label, value })),
  { t: "sep" },
  { t: "empty" },
  { t: "cmd",  text: "$ cat fun-facts.txt" },
  { t: "fact", text: "> Ran 3 jobs in parallel one semester \u2014 GPU at 100%, VRAM exhausted" },
  { t: "fact", text: "> Once replaced a $10K/month vendor with a Python script" },
  { t: "fact", text: "> Ex Head TA for 4 grad ML/NLP courses \u2014 yes, I graded your homework" },
  { t: "fact", text: "> Currently learning: whatever the AI community dropped last week" },
];

function renderLine(line: Line) {
  switch (line.t) {
    case "empty": return <span>&nbsp;</span>;
    case "cmd":   return <span className="text-[#38BDF8]">{line.text}</span>;
    case "bio":   return <span className="text-[#E8E8E8] pl-4">{line.text}</span>;
    case "sep":   return <span className="text-[#444444] pl-4 whitespace-pre">{SEP}</span>;
    case "head":  return <span className="text-[#666666] pl-4 whitespace-pre">{HEAD}</span>;
    case "stat":  return (
      <span className="text-[#666666] pl-4 whitespace-pre">
        {`|${pL(line.label)}|`}<span className="text-[#E8E8E8]">{" " + line.value}</span>{" ".repeat(V - 1 - line.value.length) + "|"}
      </span>
    );
    case "fact":  return <span className="text-[#666666] pl-4">{line.text}</span>;
  }
}


export default function AboutSection() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [revealed, setRevealed] = useState(0);

  useEffect(() => {
    if (!inView) return;
    if (revealed >= LINES.length) return;
    const t = setTimeout(() => setRevealed(r => r + 1), 60);
    return () => clearTimeout(t);
  }, [inView, revealed]);

  return (
    <section id="about" className="scroll-mt-16 py-32 px-6 relative overflow-hidden">
      <div
        className="absolute top-6 right-4 text-[100px] font-bold leading-none select-none pointer-events-none"
        style={{ color: "#141414" }}
        aria-hidden
      >
        01
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
