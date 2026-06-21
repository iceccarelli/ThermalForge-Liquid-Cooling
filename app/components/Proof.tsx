"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Quote, TrendingDown } from "lucide-react";
import { CASES } from "../data";

export default function Proof() {
  const [sel, setSel] = useState(0);
  const c = CASES[sel];
  const drop = (((c.pueBefore - c.pueAfter) / c.pueBefore) * 100).toFixed(0);

  return (
    <section id="proof" className="bg-[var(--panel)]/30 border-y border-[var(--hairline)]">
      <div className="max-w-7xl mx-auto px-5 sm:px-6 py-24 sm:py-28">
        <div className="max-w-2xl mb-12">
          <span className="section-tag mb-5">Proof</span>
          <h2 className="h-display text-4xl sm:text-5xl mb-5">Live halls. Real PUE. No render farms.</h2>
          <p className="text-lg text-[var(--ink-2)] leading-relaxed">
            Every number below is from a production deployment running today. Pick a site to see what changed.
          </p>
        </div>

        <div className="grid lg:grid-cols-[340px_1fr] gap-5">
          {/* case selector */}
          <div className="flex flex-col gap-2.5">
            {CASES.map((cs, i) => (
              <button key={cs.id} onClick={() => setSel(i)}
                className={`text-left rounded-xl border p-4 transition-all ${
                  i === sel ? "border-[var(--cool-bright)]/50 bg-[rgba(54,226,242,.05)]" : "border-[var(--hairline)] bg-[var(--panel)] hover:border-[var(--hairline-2)]"
                }`}>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="font-display font-semibold">{cs.client}</span>
                  <span className="chip chip-muted">{cs.flag}</span>
                </div>
                <div className="flex items-center gap-1.5 text-[var(--ink-3)] text-xs mb-2">
                  <MapPin className="w-3 h-3" /> {cs.location}
                </div>
                <div className="text-sm text-[var(--ink-2)] leading-snug">{cs.headline}</div>
              </button>
            ))}
          </div>

          {/* case detail */}
          <AnimatePresence mode="wait">
            <motion.div key={c.id}
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.3 }} className="panel p-6 sm:p-8 schematic-fine">
              <div className="flex flex-wrap items-center gap-2 mb-6">
                <span className="chip">{c.racks} racks</span>
                <span className="chip chip-muted">{c.density}</span>
                <span className="chip chip-good">{c.deployWeeks} wk deploy</span>
                <span className="chip chip-warm">{c.annualSaving}</span>
              </div>

              {/* before/after PUE bars */}
              <div className="data text-[10px] tracking-[0.18em] text-[var(--ink-3)] mb-4">PUE — BEFORE vs. AFTER</div>
              <div className="space-y-4 mb-7">
                <PueBar label="Before (air)" value={c.pueBefore} max={1.6} color="var(--grad-heat)" />
                <PueBar label="After (ThermalForge)" value={c.pueAfter} max={1.6} color="var(--grad-cool)" />
              </div>
              <div className="inline-flex items-center gap-2 mb-7">
                <TrendingDown className="w-4 h-4 text-[var(--good)]" />
                <span className="data text-sm text-[var(--good)]">−{drop}% cooling overhead</span>
              </div>

              {/* quote */}
              <div className="rounded-xl border border-[var(--hairline)] bg-[var(--bg)] p-5">
                <Quote className="w-5 h-5 text-[var(--cool-bright)] mb-3" />
                <p className="text-[var(--ink)] leading-relaxed mb-4">&ldquo;{c.quote}&rdquo;</p>
                <div className="text-sm">
                  <span className="font-semibold text-[var(--ink)]">{c.author}</span>
                  <span className="text-[var(--ink-3)]"> · {c.role}</span>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

function PueBar({ label, value, max, color }: { label: string; value: number; max: number; color: string }) {
  const pct = ((value - 1.0) / (max - 1.0)) * 100;
  return (
    <div>
      <div className="flex justify-between items-baseline mb-1.5">
        <span className="text-sm text-[var(--ink-2)]">{label}</span>
        <span className="data text-sm font-semibold text-[var(--ink)] tabular-nums">{value.toFixed(2)}</span>
      </div>
      <div className="h-3 rounded-full bg-[var(--bg)] border border-[var(--hairline)] overflow-hidden">
        <motion.div initial={{ width: 0 }} animate={{ width: `${pct}%` }} transition={{ duration: 0.8, ease: [0.2, 0.7, 0.2, 1] }}
          className="h-full rounded-full" style={{ background: color }} />
      </div>
    </div>
  );
}
