"use client";

import { useState, useEffect } from "react";
import { useInView } from "react-intersection-observer";

type Line =
  | { t: "cmd" }
  | { t: "item"; label: string; value: string; href: string }
  | { t: "ps" };

const LINES: Line[] = [
  { t: "cmd" },
  { t: "item", label: "Email   ", value: "pranitskatwe@gmail.com",       href: "mailto:pranitskatwe@gmail.com" },
  { t: "item", label: "LinkedIn", value: "linkedin.com/in/pranit-katwe/", href: "https://linkedin.com/in/pranit-katwe/" },
  { t: "item", label: "GitHub  ", value: "github.com/PranitKatwe",        href: "https://github.com/PranitKatwe" },
  { t: "item", label: "Phone   ", value: "(720)-331-9939",                href: "tel:+17203319939" },
  { t: "ps" },
];

function renderLine(line: Line) {
  switch (line.t) {
    case "cmd":
      return <span className="text-[#38BDF8]">$ ./contact.sh</span>;
    case "item":
      return (
        <span className="flex gap-3">
          <span className="text-[#666666] shrink-0 whitespace-pre">{line.label}</span>
          <span className="text-[#444444]">—</span>
          <a
            href={line.href}
            target={line.href.startsWith("mailto") || line.href.startsWith("tel") ? undefined : "_blank"}
            rel="noopener noreferrer"
            className="text-[#E8E8E8] hover:text-[#38BDF8] underline underline-offset-4 decoration-[#2a2a2a] hover:decoration-[#38BDF8] transition-colors duration-200"
          >
            {line.value}
          </a>
        </span>
      );
    case "ps":
      return (
        <span className="text-[#444444]">
          &gt; PS — I reply fast. Probably too fast. It&apos;s a problem.
        </span>
      );
  }
}

export default function ContactSection() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [revealed, setRevealed] = useState(0);

  useEffect(() => {
    if (!inView) return;
    if (revealed >= LINES.length) return;
    const t = setTimeout(() => setRevealed(r => r + 1), 80);
    return () => clearTimeout(t);
  }, [inView, revealed]);

  return (
    <section id="contact" className="scroll-mt-16 py-32 px-6 relative overflow-hidden">
      <div
        className="absolute top-6 right-4 text-[100px] font-bold leading-none select-none pointer-events-none"
        style={{ color: "#141414" }}
        aria-hidden
      >
        06
      </div>

      <div className="max-w-content mx-auto" ref={ref}>
        <style>{`@keyframes fadeIn { from { opacity: 0 } to { opacity: 1 } }`}</style>
        <div className="space-y-0.5 text-sm leading-6 pl-4 border-l border-[#2a2a2a]">
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
