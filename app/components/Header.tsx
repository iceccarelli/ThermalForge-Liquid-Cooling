"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, LogIn, Snowflake } from "lucide-react";
import { NAV } from "../data";
import { useUI } from "../ui-context";

export default function Header() {
  const { openAudit, openPortal } = useUI();
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("hero");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting && e.target.id) setActive(e.target.id);
        });
      },
      { threshold: 0.2, rootMargin: "-72px 0px -55% 0px" }
    );
    document.querySelectorAll("section[id]").forEach((s) => obs.observe(s));
    return () => obs.disconnect();
  }, []);

  const go = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const y = el.getBoundingClientRect().top + window.scrollY - 72;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
    setOpen(false);
  };

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-colors duration-300 ${
        scrolled ? "bg-[#070a0f]/90 backdrop-blur-xl border-b border-[var(--hairline)]" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-6 h-[72px] flex items-center justify-between gap-4">
        <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className="flex items-center gap-2.5 group">
          <span className="relative w-9 h-9 rounded-lg flex items-center justify-center overflow-hidden"
            style={{ background: "var(--grad-cool)" }}>
            <Snowflake className="w-5 h-5 text-[#04222a]" strokeWidth={2.4} />
          </span>
          <span className="text-left leading-none">
            <span className="font-display block text-[1.18rem] font-semibold tracking-tight">ThermalForge</span>
            <span className="data block text-[9px] tracking-[0.28em] text-[var(--ink-3)] mt-0.5">PRECISION&nbsp;LIQUID&nbsp;COOLING</span>
          </span>
        </button>

        <nav className="hidden lg:flex items-center gap-7">
          {NAV.map((n) => (
            <button key={n.id} onClick={() => go(n.id)} className={`nav-link ${active === n.id ? "active" : ""}`}>
              {n.label}
            </button>
          ))}
        </nav>

        <div className="hidden lg:flex items-center gap-2.5">
          <button onClick={() => openPortal()} className="btn btn-ghost flex items-center gap-1.5">
            <LogIn className="w-4 h-4" /> Portal
          </button>
          <button onClick={() => openAudit()} className="btn btn-primary text-sm px-5 py-2.5">
            Request audit
          </button>
        </div>

        <button onClick={() => setOpen((o) => !o)} className="lg:hidden w-10 h-10 flex items-center justify-center text-[var(--ink-2)]" aria-label="Toggle menu">
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden overflow-hidden border-t border-[var(--hairline)] bg-[#070a0f]/97 backdrop-blur-xl"
          >
            <div className="px-6 py-6 flex flex-col gap-1">
              {NAV.map((n) => (
                <button key={n.id} onClick={() => go(n.id)} className="text-left py-2.5 text-[var(--ink)] text-lg font-medium">
                  {n.label}
                </button>
              ))}
              <div className="pt-4 mt-2 border-t border-[var(--hairline)] flex flex-col gap-2.5">
                <button onClick={() => { setOpen(false); openPortal(); }} className="btn btn-secondary w-full py-3">
                  <LogIn className="w-4 h-4" /> Client portal
                </button>
                <button onClick={() => { setOpen(false); openAudit(); }} className="btn btn-primary w-full py-3">
                  Request cooling audit
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
