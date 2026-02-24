"use client";

import { motion } from "framer-motion";

export default function PhotoSection() {
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
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/Pranit.jpg"
            alt="Pranit Katwe"
            className="max-h-[65vh] max-w-full w-auto border border-[#2a2a2a]"
            style={{ filter: "grayscale(12%)" }}
          />
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
