"use client";

import { motion } from "framer-motion";
import { useState, useEffect, useRef, useCallback } from "react";

export default function PhotoSection() {
  const imgRef = useRef<HTMLImageElement>(null);

  // ── Page-load: terminal scanline reveal ──
  const loadCanvasRef = useRef<HTMLCanvasElement>(null);
  const loadRafRef = useRef<number | null>(null);
  const [imgVisible, setImgVisible] = useState(false);
  const [loadDone, setLoadDone] = useState(false);

  // ── Hover: cursor-local binary spotlight ──
  const hoverCanvasRef = useRef<HTMLCanvasElement>(null);
  const hoverRafRef = useRef<number | null>(null);
  const hoverActiveRef = useRef(false);
  const mousePos = useRef<{ x: number; y: number } | null>(null);

  // Page-load scanline
  useEffect(() => {
    const img = imgRef.current;
    const canvas = loadCanvasRef.current;
    if (!img || !canvas) return;

    const start = () => {
      const W = img.clientWidth;
      const H = img.clientHeight;
      if (W === 0) return;

      canvas.width = W;
      canvas.height = H;
      const ctx = canvas.getContext("2d")!;
      ctx.fillStyle = "#0A0A0A";
      ctx.fillRect(0, 0, W, H);
      setImgVisible(true);

      const LINE_H = 4;
      const totalLines = Math.ceil(H / LINE_H);
      const DURATION = 900;
      const startTime = performance.now();

      const animate = (now: number) => {
        const progress = Math.min((now - startTime) / DURATION, 1);
        const revealedLines = Math.floor(progress * totalLines);
        ctx.clearRect(0, 0, W, revealedLines * LINE_H);
        if (progress < 1) {
          loadRafRef.current = requestAnimationFrame(animate);
        } else {
          setLoadDone(true);
        }
      };
      loadRafRef.current = requestAnimationFrame(animate);
    };

    if (img.complete && img.naturalWidth > 0) start();
    else img.addEventListener("load", start, { once: true });
  }, []);

  // Hover: start RAF loop drawing spotlight on mouse enter
  const handleMouseEnter = useCallback(() => {
    if (!loadDone) return;
    const canvas = hoverCanvasRef.current;
    const img = imgRef.current;
    if (!canvas || !img) return;

    const W = img.clientWidth;
    const H = img.clientHeight;
    canvas.width = W;
    canvas.height = H;

    const CELL = 10;
    const cols = Math.ceil(W / CELL);
    const rows = Math.ceil(H / CELL);
    const cW = W / cols;
    const cH = H / rows;
    const ctx = canvas.getContext("2d")!;
    const RADIUS = 60;
    const FONT = `${Math.floor(cH * 0.75)}px "JetBrains Mono", monospace`;

    hoverActiveRef.current = true;
    let lastDraw = 0;

    const drawFrame = (now: number) => {
      if (!hoverActiveRef.current) return;

      if (now - lastDraw >= 80 && mousePos.current) {
        lastDraw = now;
        const { x: mx, y: my } = mousePos.current;

        ctx.clearRect(0, 0, W, H);
        ctx.font = FONT;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.shadowColor = "#38BDF8";
        ctx.shadowBlur = 6;

        for (let r = 0; r < rows; r++) {
          for (let c = 0; c < cols; c++) {
            const cx = c * cW + cW / 2;
            const cy = r * cH + cH / 2;
            const dist = Math.sqrt((cx - mx) ** 2 + (cy - my) ** 2);
            if (dist <= RADIUS) {
              const alpha = 1 - dist / RADIUS;
              // Dark cell bg
              ctx.globalAlpha = alpha * 0.75;
              ctx.fillStyle = "#0A0A0A";
              ctx.fillRect(c * cW, r * cH, cW, cH);
              // Blue binary char
              ctx.globalAlpha = 0.5 + alpha * 0.5;
              ctx.fillStyle = "#38BDF8";
              ctx.fillText(Math.random() > 0.5 ? "1" : "0", cx, cy);
            }
          }
        }
        ctx.globalAlpha = 1;
      }

      hoverRafRef.current = requestAnimationFrame(drawFrame);
    };

    hoverRafRef.current = requestAnimationFrame(drawFrame);
  }, [loadDone]);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mousePos.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
  }, []);

  const handleMouseLeave = useCallback(() => {
    hoverActiveRef.current = false;
    if (hoverRafRef.current) {
      cancelAnimationFrame(hoverRafRef.current);
      hoverRafRef.current = null;
    }
    const canvas = hoverCanvasRef.current;
    if (canvas) canvas.getContext("2d")?.clearRect(0, 0, canvas.width, canvas.height);
    mousePos.current = null;
  }, []);

  // Cleanup
  useEffect(() => () => {
    if (loadRafRef.current) cancelAnimationFrame(loadRafRef.current);
    if (hoverRafRef.current) cancelAnimationFrame(hoverRafRef.current);
  }, []);

  return (
    <section className="relative flex flex-col justify-center px-6 pt-20 pb-12 overflow-hidden">
      <div className="max-w-content mx-auto w-full space-y-4">

        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="text-[#38BDF8] text-base"
        >
          $ open pranit.jpg
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="space-y-2"
        >
          {/* Image wrapper */}
          <div
            className="relative inline-block cursor-crosshair select-none"
            onMouseEnter={handleMouseEnter}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              ref={imgRef}
              src="/images/Pranit.jpg"
              alt="Pranit Katwe"
              className="max-h-[65vh] max-w-full w-auto border border-[#2a2a2a] block"
              style={{
                filter: "grayscale(12%)",
                visibility: imgVisible ? "visible" : "hidden",
              }}
            />

            {/* Terminal scanline canvas — removed after load */}
            {!loadDone && (
              <canvas ref={loadCanvasRef} className="absolute inset-0 pointer-events-none" />
            )}

            {/* Hover spotlight canvas — transparent when idle */}
            {loadDone && (
              <canvas ref={hoverCanvasRef} className="absolute inset-0 pointer-events-none" />
            )}
          </div>

          <p className="text-[10px] text-[#444444]">pranit.jpg</p>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.9 }}
          className="text-sm text-[#666666]"
        >
          &gt; NPC? Never. I build the AI that runs them.
        </motion.p>

      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 1.4 }}
        className="max-w-content mx-auto w-full pt-6"
      >
        <span className="text-[#333333] text-lg animate-bounce inline-block select-none">↓</span>
      </motion.div>
    </section>
  );
}
