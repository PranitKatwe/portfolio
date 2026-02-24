"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

type LineType = "command" | "error" | "output" | "empty" | "link";

interface SequenceLine {
  text: string;
  type: LineType;
  href?: string;
  delay?: number; // extra pause before this line starts (ms)
}

const PHASE1: SequenceLine[] = [
  { text: "$ cd /page-not-found", type: "command" },
  { text: "bash: cd: /page-not-found: No such file or directory", type: "error" },
  { text: "", type: "empty" },
  { text: "$ find / -name 'this-page'", type: "command" },
  { text: "find: no results found", type: "error" },
  { text: "", type: "empty" },
  { text: "$ whoops.sh", type: "command" },
  { text: "> Error 404: This page got lost in the data pipeline", type: "output" },
  { text: "", type: "empty" },
  { text: "$ ls suggestions/", type: "command" },
  { text: "> home/", type: "link", href: "/" },
  { text: "> projects/", type: "link", href: "/#projects" },
  { text: "> contact/", type: "link", href: "/#contact" },
];

const PHASE2: SequenceLine[] = [
  { text: "$ sudo find-page --force", type: "command" },
  { text: "> Nice try. Even sudo can't fix this one.", type: "output" },
];

function useTypingSequence(lines: SequenceLine[], active: boolean) {
  const [texts, setTexts] = useState<string[]>([]);
  const [lineIdx, setLineIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const done = lineIdx >= lines.length;
  const currentLine = lineIdx;

  useEffect(() => {
    if (!active || done) return;
    const line = lines[lineIdx];

    if (line.type === "empty") {
      setTexts((p) => { const n = [...p]; n[lineIdx] = ""; return n; });
      const t = setTimeout(() => { setLineIdx((i) => i + 1); setCharIdx(0); }, 120);
      return () => clearTimeout(t);
    }

    if (charIdx <= line.text.length) {
      const speed = line.type === "command" ? 60 : 25;
      const t = setTimeout(() => {
        setTexts((p) => {
          const n = [...p];
          n[lineIdx] = line.text.slice(0, charIdx);
          return n;
        });
        setCharIdx((c) => c + 1);
      }, speed);
      return () => clearTimeout(t);
    } else {
      const pause = line.type === "command" ? 350 : 500;
      const t = setTimeout(() => { setLineIdx((i) => i + 1); setCharIdx(0); }, pause);
      return () => clearTimeout(t);
    }
  }, [active, lineIdx, charIdx, done, lines]);

  return { texts, done, lines, currentLine };
}

function renderLineContent(line: SequenceLine, text: string) {
  if (line.type === "command") {
    return <span className="text-[#38BDF8]">{text}</span>;
  }
  if (line.type === "error") {
    return <span className="text-[#666666]">{text}</span>;
  }
  if (line.type === "link") {
    return (
      <span className="text-[#E8E8E8]">
        {text.slice(0, 2)}
        <Link
          href={line.href!}
          className="hover:text-[#38BDF8] underline underline-offset-4 decoration-[#2a2a2a] hover:decoration-[#38BDF8] transition-colors duration-200"
        >
          {text.slice(2)}
        </Link>
      </span>
    );
  }
  if (line.type === "output") {
    // Highlight "Error 404" in green
    const parts = text.split("Error 404");
    if (parts.length === 2) {
      return (
        <span className="text-[#E8E8E8]">
          {parts[0]}
          <span className="text-[#38BDF8]">Error 404</span>
          {parts[1]}
        </span>
      );
    }
    return <span className="text-[#E8E8E8]">{text}</span>;
  }
  return <span className="text-[#E8E8E8]">{text}</span>;
}

export default function NotFound() {
  const [phase2Active, setPhase2Active] = useState(false);

  const p1 = useTypingSequence(PHASE1, true);
  const p2 = useTypingSequence(PHASE2, phase2Active);

  // Trigger easter egg 3 seconds after phase 1 completes
  useEffect(() => {
    if (!p1.done) return;
    const t = setTimeout(() => setPhase2Active(true), 3000);
    return () => clearTimeout(t);
  }, [p1.done]);

  const allDone = p2.done;

  return (
    <main className="min-h-screen bg-[#0A0A0A] text-[#E8E8E8] font-mono flex flex-col justify-center px-6 py-24">
      <div className="max-w-[600px] mx-auto w-full space-y-4 text-sm">

        {/* Phase 1 lines */}
        {p1.texts.map((text, i) => {
          const line = PHASE1[i];
          if (line.type === "empty") return <div key={i} className="h-3" />;
          return (
            <div key={i} className="leading-6">
              {renderLineContent(line, text)}
              {!p1.done && i === p1.texts.length - 1 && i === p1.currentLine && (
                <span className="cursor-blink" />
              )}
            </div>
          );
        })}

        {/* Cursor after phase 1 complete, before phase 2 */}
        {p1.done && !phase2Active && (
          <span className="cursor-blink" />
        )}

        {/* Phase 2 (easter egg) */}
        {phase2Active && (
          <>
            <div className="h-3" />
            {p2.texts.map((text, i) => {
              const line = PHASE2[i];
              return (
                <div key={`p2-${i}`} className="leading-6">
                  {renderLineContent(line, text)}
                  {!p2.done && i === p2.texts.length - 1 && (
                    <span className="cursor-blink" />
                  )}
                </div>
              );
            })}
            {allDone && <span className="cursor-blink" />}
          </>
        )}

        {/* Back home link */}
        {p1.done && (
          <div className="pt-12 border-t border-[#2a2a2a]">
            <Link
              href="/"
              className="text-[#666666] hover:text-[#38BDF8] transition-colors duration-200"
            >
              <span className="text-[#38BDF8]">$</span> cd ~
              <span className="text-[#2a2a2a] ml-4"># go back home</span>
            </Link>
          </div>
        )}
      </div>
    </main>
  );
}
