"use client";

import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";

const links = [
  { href: "#about", label: "about" },
  { href: "#education", label: "education" },
  { href: "#experience", label: "experience" },
  { href: "#skills", label: "skills" },
  { href: "#projects", label: "projects" },
  { href: "#contact", label: "contact" },
];

function scrollToSection(href: string) {
  const el = document.querySelector(href);
  if (!el) return;
  const top = el.getBoundingClientRect().top + window.scrollY - 60;
  window.scrollTo({ top, behavior: "smooth" });
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
      const ids = links.map((l) => l.href.slice(1));
      for (const id of [...ids].reverse()) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= 120) {
          setActiveSection(id);
          return;
        }
      }
      setActiveSection("");
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 bg-[#0A0A0A] transition-all duration-300 ${
          scrolled ? "border-b border-[#2a2a2a]" : ""
        }`}
      >
        <div className="max-w-content mx-auto px-6 flex items-center justify-between h-14">
          {/* Logo */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="text-sm text-[#E8E8E8] hover:text-[#38BDF8] transition-colors duration-200"
          >
            pranit@katwe-portfolio:&nbsp;~
          </button>

          {/* Desktop links */}
          <ul className="hidden md:flex items-center gap-7">
            {links.map((link) => (
              <li key={link.href}>
                <button
                  onClick={() => scrollToSection(link.href)}
                  className={`text-xs transition-colors duration-200 ${
                    activeSection === link.href.slice(1)
                      ? "text-[#38BDF8]"
                      : "text-[#666666] hover:text-[#E8E8E8]"
                  }`}
                >
                  {link.label}
                </button>
              </li>
            ))}
          </ul>

          {/* Mobile toggle */}
          <button
            onClick={() => setMobileOpen((v) => !v)}
            className="md:hidden text-xs text-[#666666] hover:text-[#E8E8E8] transition-colors"
          >
            {mobileOpen ? "[x]" : "[≡]"}
          </button>
        </div>
      </nav>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.15 }}
            className="fixed top-14 left-0 right-0 z-40 bg-[#0A0A0A] border-b border-[#2a2a2a] px-6 py-6"
          >
            <ul className="flex flex-col gap-4">
              {links.map((link, i) => (
                <motion.li
                  key={link.href}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.04 }}
                >
                  <button
                    onClick={() => {
                      setMobileOpen(false);
                      setTimeout(() => scrollToSection(link.href), 80);
                    }}
                    className={`text-sm w-full text-left transition-colors ${
                      activeSection === link.href.slice(1)
                        ? "text-[#38BDF8]"
                        : "text-[#666666] hover:text-[#E8E8E8]"
                    }`}
                  >
                    <span className="text-[#38BDF8]">$</span> {link.label}
                  </button>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
