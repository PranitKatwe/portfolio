"use client";

import { useEffect } from "react";

export default function ClientEffects() {
  useEffect(() => {
    console.log(
      "%c👀 Inspecting my code? Respect.\n   I'm Pranit — Data Scientist & AI Engineer.\n   Let's build something: pranitskatwe@gmail.com\n   github.com/PranitKatwe",
      "color: #38BDF8; font-family: 'JetBrains Mono', monospace; font-size: 13px; line-height: 2; padding: 4px 0;"
    );
  }, []);
  return null;
}
