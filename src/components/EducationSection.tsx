"use client";

import { useState, useEffect } from "react";
import { useInView } from "react-intersection-observer";

type Line =
  | { t: "cmd" }
  | { t: "header"; period: string; institution: string }
  | { t: "degree"; text: string }
  | { t: "empty" };

const LINES: Line[] = [
  { t: "cmd" },
  { t: "empty" },
  { t: "header", period: "Aug 2023 \u2013 May 2025", institution: "University of Colorado Boulder" },
  { t: "degree", text: "M.S. in Data Science" },
  { t: "empty" },
  { t: "header", period: "Jun 2014 \u2013 Jul 2018", institution: "Savitribai Phule Pune University" },
  { t: "degree", text: "B.E. in Computer Engineering" },
];

function renderLine(line: Line) {
  switch (line.t) {
    case "empty":  return <span>&nbsp;</span>;
    case "cmd":    return <span className="text-[#38BDF8]">$ cat education.txt</span>;
    case "header": return (
      <span>
        <span className="text-[#666666]">[{line.period}]</span>
        {"  "}
        <span className="text-[#E8E8E8]">{line.institution}</span>
      </span>
    );
    case "degree": return (
      <span className="pl-4">
        <span className="text-[#444444]">\u2514\u2500\u2500 </span>
        <span className="text-[#666666]">{line.text}</span>
      </span>
    );
  }
}

export default function EducationSection() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [revealed, setRevealed] = useState(0);

  useEffect(() => {
    if (!inView) return;
    if (revealed >= LINES.length) return;
    const t = setTimeout(() => setRevealed(r => r + 1), 60);
    return () => clearTimeout(t);
  }, [inView, revealed]);

  return (
    <section id="education" className="scroll-mt-16 py-32 px-6 relative overflow-hidden">
      <div
        className="absolute top-6 right-4 text-[100px] font-bold leading-none select-none pointer-events-none"
        style={{ color: "#141414" }}
        aria-hidden
      >
        02
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
