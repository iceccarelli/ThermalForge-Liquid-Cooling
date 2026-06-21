"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Activity } from "lucide-react";
import { HERO_IMAGES, TRUST_STATS } from "../data";
import { useUI } from "../ui-context";
import ThermalInstrument from "./ThermalInstrument";

export default function Hero() {
  const { openAudit } = useUI();
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    const reduce = typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    const id = setInterval(() => setIdx((i) => (i + 1) % HERO_IMAGES.length), 6000);
    return () => clearInterval(id);
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 72, behavior: "smooth" });
  };

  return (
    <section id="hero" className="relative min-h-[100svh] flex items-center pt-[72px] overflow-hidden">
      {/* rotating imagery */}
      {HERO_IMAGES.map((src, i) => (
        <div key={i} aria-hidden
          className="absolute inset-0 bg-cover bg-center transition-opacity duration-[1600ms]"
          style={{ backgroundImage: `url(${src})`, opacity: i === idx ? 0.28 : 0 }} />
      ))}
      <div className="absolute inset-0 bg-gradient-to-b from-[#070a0f]/70 via-[#070a0f]/85 to-[#070a0f]" />
      <div className="absolute inset-0 hero-glow" />
      <div className="absolute inset-0 schematic opacity-60" />

      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-6 w-full py-16 lg:py-0">
        <div className="grid lg:grid-cols-[1.05fr_0.95fr] gap-12 lg:gap-10 items-center">
          {/* left: thesis */}
          <div>
            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
              className="chip mb-6">
              <Activity className="w-3.5 h-3.5" /> The AI density era
            </motion.div>

            <motion.h1 initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.05 }}
              className="h-display text-[2.7rem] sm:text-6xl lg:text-[4.4rem] mb-6">
              Air cooling stops at <span className="text-heat-grad">40&nbsp;kW</span>.
              <br />
              Your GPUs <span className="text-cool-grad">don&apos;t</span>.
            </motion.h1>

            <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.12 }}
              className="text-lg sm:text-xl text-[var(--ink-2)] max-w-xl leading-relaxed mb-9">
              ThermalForge designs, retrofits, and operates direct-to-chip liquid cooling for
              30–130&nbsp;kW racks. Push PUE below 1.10, triple your density, and bring a live hall
              over in weeks — without going dark.
            </motion.p>

            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.18 }}
              className="flex flex-col sm:flex-row gap-3 mb-12">
              <button onClick={() => openAudit()} className="btn btn-primary text-base px-7 py-3.5 group">
                Request a cooling audit
                <ArrowRight className="w-4.5 h-4.5 group-hover:translate-x-0.5 transition-transform" />
              </button>
              <button onClick={() => scrollTo("calculator")} className="btn btn-secondary text-base px-6 py-3.5">
                Model my savings
              </button>
            </motion.div>

            {/* trust stats */}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.28 }}
              className="grid grid-cols-2 sm:grid-cols-4 gap-px bg-[var(--hairline)] border border-[var(--hairline)] rounded-xl overflow-hidden">
              {TRUST_STATS.map((s) => (
                <div key={s.label} className="bg-[var(--panel)] px-4 py-3.5">
                  <div className="data text-2xl font-semibold text-[var(--ink)] tabular-nums leading-none mb-1">{s.value}</div>
                  <div className="text-[11px] text-[var(--ink-3)] leading-tight">{s.label}</div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* right: live instrument signature */}
          <motion.div initial={{ opacity: 0, scale: 0.97, y: 18 }} animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25 }} className="w-full max-w-md mx-auto lg:max-w-none">
            <ThermalInstrument />
            <p className="data text-[10px] text-[var(--ink-3)] text-center mt-3 tracking-wider">
              LIVE THERMAL TWIN · AIR vs. LIQUID ON THE SAME RACK
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
