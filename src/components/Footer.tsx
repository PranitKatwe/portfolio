"use client";

export default function Footer() {
  return (
    <footer className="py-16 px-6 border-t border-[#2a2a2a]">
      <div className="max-w-content mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <p className="text-sm text-[#E8E8E8]">pranit@katwe-portfolio:&nbsp;~</p>
          <p className="text-xs text-[#444444]">
            © {new Date().getFullYear()} — Built with Next.js & Framer Motion
          </p>
        </div>
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="text-xs text-[#444444] hover:text-[#38BDF8] transition-colors duration-200"
        >
          $ cd ~  <span className="text-[#2a2a2a]"># back to top</span>
        </button>
      </div>
    </footer>
  );
}
