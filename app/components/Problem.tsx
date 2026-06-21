"use client";

import { motion } from "framer-motion";
import { TrendingUp, ThermometerSun, Banknote } from "lucide-react";

const BARS = [
  { gen: "Ampere", kw: 30, ok: true },
  { gen: "Hopper", kw: 40, ok: true },
  { gen: "H200", kw: 55, ok: false },
  { gen: "Blackwell", kw: 94, ok: false },
  { gen: "GB200 NVL", kw: 130, ok: false },
];
const AIR_CEIL = 40;
const MAX = 130;

const PAINS = [
  { icon: ThermometerSun, color: "var(--hot)", title: "Silicon throttles", body: "Above ~40 kW per rack, air can't pull the heat fast enough. Your accelerators clock down and you pay for compute you never get." },
  { icon: TrendingUp, color: "var(--warm)", title: "Capacity strands", body: "Halls hit a thermal ceiling long before the power or floor runs out. Megawatts of capacity sit unsellable behind a cooling wall." },
  { icon: Banknote, color: "var(--cool-bright)", title: "PUE bleeds margin", body: "Air-cooled PUE of 1.4–1.6 means 40–60% of every energy dollar is spent moving heat — not running revenue workloads." },
];

export default function Problem() {
  return (
    <section id="problem" className="max-w-7xl mx-auto px-5 sm:px-6 py-24 sm:py-28">
      <div className="grid lg:grid-cols-2 gap-14 items-start">
        <div>
          <span className="section-tag mb-5">The wall</span>
          <h2 className="h-display text-4xl sm:text-5xl mb-5">
            The density curve already broke<br /> air cooling.
          </h2>
          <p className="text-lg text-[var(--ink-2)] leading-relaxed mb-8 max-w-lg">
            Each accelerator generation lands hotter than the last. Air cooling flatlines around
            40&nbsp;kW per rack — but a single GB200 NVL rack now draws past 130. The gap is where
            stranded capacity and wasted power live.
          </p>

          <div className="space-y-3">
            {PAINS.map((p, i) => (
              <motion.div key={p.title}
                initial={{ opacity: 0, x: -12 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
                transition={{ duration: 0.45, delay: i * 0.08 }}
                className="flex gap-3.5 p-4 rounded-xl border border-[var(--hairline)] bg-[var(--panel)]">
                <span className="shrink-0 w-9 h-9 rounded-lg flex items-center justify-center"
                  style={{ background: "rgba(255,255,255,.03)", border: `1px solid ${p.color}33` }}>
                  <p.icon className="w-4.5 h-4.5" style={{ color: p.color }} />
                </span>
                <div>
                  <div className="font-semibold text-[var(--ink)] mb-0.5">{p.title}</div>
                  <div className="text-sm text-[var(--ink-2)] leading-relaxed">{p.body}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* density wall chart */}
        <div className="panel p-6 sm:p-8 schematic-fine">
          <div className="flex items-baseline justify-between mb-7">
            <div className="data text-[11px] tracking-[0.18em] text-[var(--ink-3)]">RACK&nbsp;POWER&nbsp;BY&nbsp;GPU&nbsp;GENERATION</div>
            <div className="data text-[11px] text-[var(--ink-3)]">kW / rack</div>
          </div>

          <div className="space-y-5 relative">
            {/* air ceiling line */}
            <div className="absolute left-0 right-0 z-10 pointer-events-none" style={{ top: -8, bottom: 30 }}>
              <div className="absolute right-0 flex items-center gap-2"
                style={{ left: `${(AIR_CEIL / MAX) * 100}%` }}>
                <div className="h-full w-px border-l border-dashed border-[var(--hot)]/60" style={{ position: "absolute", top: 0, bottom: 0 }} />
              </div>
            </div>

            {BARS.map((b, i) => (
              <div key={b.gen}>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-sm font-medium text-[var(--ink-2)]">{b.gen}</span>
                  <span className="data text-sm tabular-nums" style={{ color: b.kw > AIR_CEIL ? "var(--hot)" : "var(--good)" }}>
                    {b.kw}
                  </span>
                </div>
                <div className="h-2.5 rounded-full bg-[var(--bg)] overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }} whileInView={{ width: `${(b.kw / MAX) * 100}%` }} viewport={{ once: true }}
                    transition={{ duration: 0.9, delay: i * 0.1, ease: [0.2, 0.7, 0.2, 1] }}
                    className="h-full rounded-full"
                    style={{ background: b.kw > AIR_CEIL ? "var(--grad-heat)" : "var(--good)" }} />
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 pt-5 border-t border-[var(--hairline)] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-6 border-t border-dashed border-[var(--hot)]" />
              <span className="data text-[11px] text-[var(--ink-2)]">AIR CEILING ≈ 40 kW</span>
            </div>
            <span className="chip chip-hot">3.2× over the line</span>
          </div>
        </div>
      </div>
    </section>
  );
}
