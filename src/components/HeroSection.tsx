"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

type Line = { text: string; isCmd: boolean };

const LINES: Line[] = [
  { text: "$ whoami", isCmd: true },
  { text: "> Pranit Katwe — Data Scientist & AI Engineer", isCmd: false },
  { text: "$ cat status.txt", isCmd: true },
  { text: "> Currently: Building AI pipelines and turning data into decisions ☕", isCmd: false },
  { text: "$ cat focus.txt", isCmd: true },
  { text: "> Machine Learning · LLMs & Agents · Data Engineering · NLP", isCmd: false },
];

export default function HeroSection() {
  const [texts, setTexts] = useState<string[]>([]);
  const [lineIdx, setLineIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [started, setStarted] = useState(false);
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });

  const done = lineIdx >= LINES.length;

  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, -60]);

  useEffect(() => {
    const t = setTimeout(() => setStarted(true), 800);
    return () => clearTimeout(t);
  }, []);

  // Typing engine
  useEffect(() => {
    if (!started || done) return;
    const line = LINES[lineIdx];

    if (charIdx <= line.text.length) {
      const speed = line.isCmd ? 65 : 30;
      const t = setTimeout(() => {
        setTexts(prev => {
          const next = [...prev];
          next[lineIdx] = line.text.slice(0, charIdx);
          return next;
        });
        setCharIdx(c => c + 1);
      }, speed);
      return () => clearTimeout(t);
    } else {
      const pause = line.isCmd ? 380 : 560;
      const t = setTimeout(() => {
        setLineIdx(i => i + 1);
        setCharIdx(0);
      }, pause);
      return () => clearTimeout(t);
    }
  }, [started, lineIdx, charIdx, done]);

  // Parallax watermark
  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      setMouseOffset({
        x: ((e.clientX - innerWidth / 2) / innerWidth) * 10,
        y: ((e.clientY - innerHeight / 2) / innerHeight) * 8,
      });
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <section id="hero" className="relative min-h-[80vh] overflow-hidden" ref={heroRef}>
      <motion.div
        className="absolute inset-0 flex flex-col justify-center px-6 py-24"
        style={{ y }}
      >
        {/* Parallax watermark — top: DATA + AI */}
        <div
          className="absolute inset-x-0 top-0 flex justify-center pointer-events-none select-none overflow-hidden"
          style={{ height: "30%" }}
          aria-hidden
        >
          <div
            className="flex flex-col items-center justify-end gap-1 text-[clamp(48px,9vw,120px)] font-bold leading-none"
            style={{
              color: "#131313",
              transform: `translate(${mouseOffset.x}px, ${mouseOffset.y}px)`,
              transition: "transform 0.12s ease-out",
              letterSpacing: "-0.02em",
            }}
          >
            <span className="whitespace-nowrap">{"< DATA />"}</span>
            <span className="whitespace-nowrap">{"< AI />"}</span>
          </div>
        </div>

        {/* Parallax watermark — bottom: ML + STATISTICS */}
        <div
          className="absolute inset-x-0 bottom-0 flex justify-center pointer-events-none select-none overflow-hidden"
          style={{ height: "30%" }}
          aria-hidden
        >
          <div
            className="flex flex-col items-center justify-start gap-1 text-[clamp(48px,9vw,120px)] font-bold leading-none"
            style={{
              color: "#131313",
              transform: `translate(${mouseOffset.x}px, ${mouseOffset.y}px)`,
              transition: "transform 0.12s ease-out",
              letterSpacing: "-0.02em",
            }}
          >
            <span className="whitespace-nowrap">{"< ML />"}</span>
            <span className="whitespace-nowrap">{"< STATISTICS />"}</span>
          </div>
        </div>

        <div className="max-w-content mx-auto w-full space-y-5 relative z-10">
        {/* Boot lines — appear immediately before typing starts */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="space-y-0.5 text-xs text-[#2e2e2e] mb-1 select-none"
          aria-hidden
        >
          <div>&gt; Loading personality module...{"   "}Done ✓</div>
          <div>&gt; Checking ego levels...{"          "}Optimal ✓</div>
          <div className="h-2" />
        </motion.div>

        {/* Typed lines */}
        {texts.map((text, i) => {
          const line = LINES[i];
          const isTyping = !done && i === lineIdx;
          return (
            <div key={i} className="text-base sm:text-lg leading-relaxed">
              <span className={line.isCmd ? "text-[#38BDF8]" : "text-[#E8E8E8]"}>
                {text}
              </span>
              {isTyping && <span className="cursor-blink" />}
            </div>
          );
        })}

        {done && <span className="cursor-blink" />}
        </div>

      </motion.div>
    </section>
  );
}
