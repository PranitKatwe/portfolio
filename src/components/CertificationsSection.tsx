"use client";

import { useState, useEffect } from "react";
import { useInView } from "react-intersection-observer";

type Cert = {
  date: string;
  name: string;
  issuer: string;
  url?: string;
};

const CERTS: Cert[] = [
  { date: "2025-02", name: "Generative AI with Large Language Models", issuer: "DeepLearning.AI · AWS", url: "https://www.coursera.org/account/accomplishments/verify/S1LK5G3K2BXM" },
  { date: "2025-02", name: "Introduction to Computer Vision and Image Processing", issuer: "IBM", url: "https://www.coursera.org/account/accomplishments/verify/9FS9XVBU3GCF" },
  { date: "2024-08", name: "LangChain Chat with Your Data", issuer: "DeepLearning.AI", url: "https://learn.deeplearning.ai/accomplishments/e590a87f-2402-4cbb-9542-2414dcd9851b" },
  { date: "2024-08", name: "LangChain for LLM Application Development", issuer: "DeepLearning.AI", url: "https://learn.deeplearning.ai/accomplishments/647ea43b-d998-48d4-a22a-b00d69ae8403" },
  { date: "2024-07", name: "RAG and Fine-Tuning Explained", issuer: "LinkedIn Learning", url: "https://www.linkedin.com/learning/certificates/4c0531f32e8dd49f08232886fd125507adf94b9455f148942b6c7c12c9ab7210" },
  { date: "2024-04", name: "Database and SQL for Data Science with Python", issuer: "IBM", url: "https://www.coursera.org/account/accomplishments/verify/Y4AD288W4JUC" },
  { date: "2024-01", name: "Building Transformer-Based NLP Applications", issuer: "NVIDIA", url: "https://learn.nvidia.com/certificates?id=28a701b3565e4dea98a2f1d70a61952a" },
  { date: "2023-08", name: "Expressway to Data Science: R Programming and Tidyverse", issuer: "CU Boulder", url: "https://www.coursera.org/account/accomplishments/specialization/LJHQMKK9RSKC" },
  { date: "2023-05", name: "Mathematics for Machine Learning Specialization", issuer: "Imperial College London", url: "https://www.coursera.org/account/accomplishments/specialization/UKG3RHRVDGWU" },
  { date: "2023-05", name: "Introduction to Machine Learning", issuer: "Kaggle", url: "https://www.kaggle.com/learn/certification/pranitkatwe/intro-to-machine-learning" },
  { date: "2023-02", name: "Machine Learning Specialization", issuer: "DeepLearning.AI · Stanford", url: "https://www.coursera.org/account/accomplishments/specialization/QYEAK53PWY8Q" },
  { date: "2022-04", name: "Deep Learning Specialization", issuer: "DeepLearning.AI", url: "https://www.coursera.org/account/accomplishments/specialization/KUGJFW42Q9NT" },
  { date: "2020-05", name: "Data Science Math Skills", issuer: "Duke University", url: "https://www.coursera.org/account/accomplishments/verify/CB5W874R27WW" },
  { date: "2020-05", name: "Getting Started with AWS Machine Learning", issuer: "AWS", url: "https://www.coursera.org/account/accomplishments/verify/5DRD9ME79JTY" },
  { date: "2020-04", name: "Cloud Computing Basics", issuer: "Coursera", url: "https://www.coursera.org/account/accomplishments/verify/Y4Q3FQ9UN3QE" },
  { date: "2020-04", name: "Stanford Online: Machine Learning", issuer: "Stanford", url: "https://www.coursera.org/account/accomplishments/verify/2XQJ7CU5K376" },
];

export default function CertificationsSection() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [revealed, setRevealed] = useState(0);

  // +1 for the command line
  const total = CERTS.length + 1;

  useEffect(() => {
    if (!inView) return;
    if (revealed >= total) return;
    const t = setTimeout(() => setRevealed(r => r + 1), 60);
    return () => clearTimeout(t);
  }, [inView, revealed, total]);

  return (
    <section id="certifications" className="scroll-mt-16 py-32 px-6 relative overflow-hidden">
      <div
        className="absolute top-6 right-4 text-[100px] font-bold leading-none select-none pointer-events-none"
        style={{ color: "#141414" }}
        aria-hidden
      >
        03
      </div>

      <div className="max-w-content mx-auto" ref={ref}>
        <style>{`@keyframes fadeIn { from { opacity: 0 } to { opacity: 1 } }`}</style>
        <div className="space-y-0.5 text-sm leading-6">
          {revealed > 0 && (
            <div style={{ opacity: 0, animation: "fadeIn 0.15s ease forwards" }}>
              <span className="text-[#38BDF8]">$ ls certifications/ --sort=date</span>
            </div>
          )}
          {revealed > 0 && <div><span>&nbsp;</span></div>}
          {CERTS.slice(0, Math.max(0, revealed - 1)).map((c, i) => (
            <div key={i} style={{ opacity: 0, animation: "fadeIn 0.15s ease forwards" }}>
              <span className="flex items-baseline gap-3">
                <span className="text-[#666666] shrink-0">[{c.date}]</span>
                <span className="text-[#E8E8E8] min-w-0">{c.name}</span>
                <span className="text-[#444444] shrink-0 hidden sm:inline ml-auto">{c.issuer}</span>
                {c.url && (
                  <a
                    href={c.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#666666] hover:text-[#38BDF8] underline underline-offset-4 decoration-[#2a2a2a] hover:decoration-[#38BDF8] transition-colors duration-200 shrink-0"
                  >
                    [verify]
                  </a>
                )}
              </span>
            </div>
          ))}
          {revealed < total && inView && <span className="cursor-blink" />}
        </div>
      </div>
    </section>
  );
}
