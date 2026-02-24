"use client";

import { useEffect, useRef } from "react";

export default function ProgressBar() {
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
      const total = scrollHeight - clientHeight;
      const pct = total > 0 ? (scrollTop / total) * 100 : 0;
      if (barRef.current) {
        barRef.current.style.width = `${pct}%`;
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 z-[10000] h-[1px] pointer-events-none bg-transparent">
      <div
        ref={barRef}
        className="h-full bg-[#38BDF8]"
        style={{ width: "0%", transition: "width 80ms linear" }}
      />
    </div>
  );
}
