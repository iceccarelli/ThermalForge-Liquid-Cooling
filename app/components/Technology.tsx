"use client";

import { motion } from "framer-motion";
import { TECH } from "../data";

export default function Technology() {
  return (
    <section id="technology" className="max-w-7xl mx-auto px-5 sm:px-6 py-24 sm:py-28">
      <div className="grid lg:grid-cols-[0.9fr_1.1fr] gap-14 items-start">
        <div className="lg:sticky lg:top-28">
          <span className="section-tag mb-5">Why it holds</span>
          <h2 className="h-display text-4xl sm:text-5xl mb-5">Engineering you can audit, not a black box you have to trust.</h2>
          <p className="text-lg text-[var(--ink-2)] leading-relaxed">
            Mission-critical infrastructure can&apos;t run on vibes. Every control decision in the
            ThermalForge stack traces back to first-principles thermo-hydraulics — explainable,
            certifiable, and defensible in front of an auditor.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          {TECH.map((t, i) => (
            <motion.div key={t.title}
              initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ duration: 0.45, delay: i * 0.07 }}
              className="card p-6">
              <div className="data text-[11px] text-[var(--cool-bright)] tracking-widest mb-3">0{i + 1}</div>
              <h3 className="font-display text-lg font-semibold mb-2.5">{t.title}</h3>
              <p className="text-sm text-[var(--ink-2)] leading-relaxed">{t.body}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
