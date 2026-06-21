"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { COMPARISON } from "../data";

const ROWS: { key: keyof typeof COMPARISON[number]; label: string }[] = [
  { key: "ceiling", label: "Density ceiling" },
  { key: "pue", label: "Typical PUE" },
  { key: "retrofit", label: "Retrofit path" },
  { key: "maintenance", label: "Maintenance" },
  { key: "capex", label: "CapEx" },
  { key: "best", label: "Best fit" },
];

export default function Comparison() {
  return (
    <section className="bg-[var(--panel)]/30 border-y border-[var(--hairline)]">
      <div className="max-w-7xl mx-auto px-5 sm:px-6 py-24 sm:py-28">
        <div className="max-w-2xl mb-12">
          <span className="section-tag mb-5">Honest comparison</span>
          <h2 className="h-display text-4xl sm:text-5xl mb-5">Liquid isn&apos;t one thing. Here&apos;s the real trade-off.</h2>
          <p className="text-lg text-[var(--ink-2)] leading-relaxed">
            We&apos;ll tell you when you don&apos;t need us. For most AI training and inference at scale,
            direct-to-chip is the pragmatic answer — serviceable hot, retrofit-friendly, and built for the density curve ahead.
          </p>
        </div>

        {/* desktop table */}
        <div className="hidden md:block panel overflow-hidden">
          <div className="grid grid-cols-4">
            <div className="p-5 border-b border-[var(--hairline)]" />
            {COMPARISON.map((c) => (
              <div key={c.name} className={`p-5 border-b border-l border-[var(--hairline)] ${c.recommended ? "bg-[rgba(54,226,242,.05)]" : ""}`}>
                <div className="flex items-center gap-2">
                  <span className="font-display text-lg font-semibold">{c.name}</span>
                  {c.recommended && <span className="chip">Recommended</span>}
                </div>
              </div>
            ))}
            {ROWS.map((row) => (
              <div key={row.key} className="contents">
                <div className="p-5 border-b border-[var(--hairline)] data text-[11px] tracking-wider text-[var(--ink-3)] flex items-center">
                  {row.label.toUpperCase()}
                </div>
                {COMPARISON.map((c) => (
                  <div key={c.name + row.key}
                    className={`p-5 border-b border-l border-[var(--hairline)] text-sm ${c.recommended ? "bg-[rgba(54,226,242,.04)] text-[var(--ink)]" : "text-[var(--ink-2)]"}`}>
                    {String(c[row.key])}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* mobile cards */}
        <div className="md:hidden space-y-4">
          {COMPARISON.map((c) => (
            <motion.div key={c.name} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              className={`panel p-5 ${c.recommended ? "border-[var(--cool-bright)]/40" : ""}`}>
              <div className="flex items-center gap-2 mb-4">
                <span className="font-display text-lg font-semibold">{c.name}</span>
                {c.recommended && <span className="chip">Recommended</span>}
              </div>
              <div className="space-y-2.5">
                {ROWS.map((row) => (
                  <div key={row.key} className="flex justify-between gap-4 text-sm">
                    <span className="text-[var(--ink-3)]">{row.label}</span>
                    <span className="text-[var(--ink)] text-right">{String(c[row.key])}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
