"use client";

import { useEffect, useRef, useState } from "react";

interface Dot { x: number; y: number; id: number }
interface Ripple { x: number; y: number; id: number }

const INTERACTIVE = "a, button, [role='button'], input, textarea, select, label, [tabindex]";

export default function CustomCursor() {
  const [pos, setPos] = useState({ x: -200, y: -200 });
  const [isPointer, setIsPointer] = useState(false);
  const [trail, setTrail] = useState<Dot[]>([]);
  const [ripples, setRipples] = useState<Ripple[]>([]);
  const idRef = useRef(0);
  const lastDotPos = useRef({ x: -200, y: -200 });
  const spotlightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      const { clientX: x, clientY: y } = e;
      setPos({ x, y });

      // Update spotlight directly via ref (avoid re-render)
      if (spotlightRef.current) {
        spotlightRef.current.style.background = `radial-gradient(600px circle at ${x}px ${y}px, rgba(56,189,248,0.028), transparent 40%)`;
      }

      // Hover detection
      const el = document.elementFromPoint(x, y) as Element | null;
      setIsPointer(!!(el?.closest(INTERACTIVE)));

      // Trail dot — only when moved ≥8px
      const dx = x - lastDotPos.current.x;
      const dy = y - lastDotPos.current.y;
      if (dx * dx + dy * dy >= 64) {
        lastDotPos.current = { x, y };
        const id = ++idRef.current;
        setTrail(prev => [...prev.slice(-7), { x, y, id }]);
      }
    };

    const onClick = (e: MouseEvent) => {
      const id = ++idRef.current;
      setRipples(prev => [...prev, { x: e.clientX, y: e.clientY, id }]);
      setTimeout(() => setRipples(prev => prev.filter(r => r.id !== id)), 550);
    };

    document.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("click", onClick);
    return () => {
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("click", onClick);
    };
  }, []);

  return (
    <>
      {/* Spotlight — updated directly via ref, no re-render */}
      <div
        ref={spotlightRef}
        className="fixed inset-0 pointer-events-none z-[1]"
      />

      {/* Trail dots */}
      {trail.map((dot, i) => (
        <div
          key={dot.id}
          className="fixed pointer-events-none rounded-full z-[9996]"
          style={{
            left: dot.x - 2,
            top: dot.y - 2,
            width: 4,
            height: 4,
            backgroundColor: "#38BDF8",
            opacity: ((i + 1) / trail.length) * 0.28,
          }}
        />
      ))}

      {/* Cursor symbol */}
      <div
        className="fixed pointer-events-none z-[9999] select-none"
        style={{
          left: pos.x - 8,
          top: pos.y - 9,
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: 14,
          fontWeight: 600,
          color: "#38BDF8",
          lineHeight: "1",
          whiteSpace: "nowrap",
        }}
      >
        {isPointer ? (
          <>
            {">"}{" "}
            <span
              style={{
                display: "inline-block",
                width: 7,
                height: "0.85em",
                backgroundColor: "#38BDF8",
                verticalAlign: "middle",
                animation: "blink 1s step-end infinite",
              }}
            />
          </>
        ) : (
          ">"
        )}
      </div>

      {/* Click ripples */}
      {ripples.map(r => (
        <div
          key={r.id}
          className="fixed pointer-events-none z-[9997] rounded-full"
          style={{
            left: r.x,
            top: r.y,
            transform: "translate(-50%, -50%)",
            border: "1px solid #38BDF8",
            animation: "cursorRipple 0.5s ease-out forwards",
          }}
        />
      ))}
    </>
  );
}
