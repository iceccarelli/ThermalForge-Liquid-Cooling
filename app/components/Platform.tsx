"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Check, Cpu, Gauge, ShieldCheck, Zap, Wrench } from "lucide-react";
import { PRODUCTS } from "../data";
import { useUI } from "../ui-context";

const ICONS = [Cpu, Gauge, ShieldCheck, Zap, Wrench];

export default function Platform() {
  const { openAudit } = useUI();
  const [sel, setSel] = useState(0);
  const p = PRODUCTS[sel];
  const Icon = ICONS[sel];

  return (
    <section id="platform" className="bg-[var(--panel)]/30 border-y border-[var(--hairline)]">
      <div className="max-w-7xl mx-auto px-5 sm:px-6 py-24 sm:py-28">
        <div className="max-w-2xl mb-12">
          <span className="section-tag mb-5">Platform</span>
          <h2 className="h-display text-4xl sm:text-5xl mb-5">One stack, from cold plate to control loop.</h2>
          <p className="text-lg text-[var(--ink-2)] leading-relaxed">
            Five tightly-integrated layers. Every part is engineered against the same physics model,
            so the system behaves as one — not a bag of vendor parts you have to make agree.
          </p>
        </div>

        <div className="grid lg:grid-cols-[320px_1fr] gap-5">
          {/* selector rail */}
          <div className="flex flex-col gap-2">
            {PRODUCTS.map((prod, i) => {
              const RailIcon = ICONS[i];
              const on = i === sel;
              return (
                <button key={prod.id} onClick={() => setSel(i)}
                  className={`text-left rounded-xl border p-4 flex items-center gap-3.5 transition-all ${
                    on ? "border-[var(--cool-bright)]/50 bg-[rgba(54,226,242,.05)]" : "border-[var(--hairline)] bg-[var(--panel)] hover:border-[var(--hairline-2)]"
                  }`}>
                  <span className="data text-[11px] text-[var(--ink-3)] w-5 tabular-nums">0{i + 1}</span>
                  <RailIcon className="w-5 h-5 shrink-0" style={{ color: on ? "var(--cool-bright)" : "var(--ink-3)" }} />
                  <span className={`font-medium text-sm ${on ? "text-[var(--ink)]" : "text-[var(--ink-2)]"}`}>{prod.title}</span>
                </button>
              );
            })}
          </div>

          {/* detail panel */}
          <AnimatePresence mode="wait">
            <motion.div key={p.id}
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.3 }}
              className="panel card-accent p-6 sm:p-8 schematic-fine relative">
              <div className="flex items-start justify-between gap-4 mb-5">
                <div className="flex items-center gap-3.5">
                  <span className="w-12 h-12 rounded-xl flex items-center justify-center"
                    style={{ background: "rgba(54,226,242,.08)", border: "1px solid rgba(54,226,242,.2)" }}>
                    <Icon className="w-6 h-6 text-[var(--cool-bright)]" />
                  </span>
                  <div>
                    <span className="chip mb-1.5">{p.tag}</span>
                    <h3 className="font-display text-2xl font-semibold">{p.title}</h3>
                  </div>
                </div>
              </div>

              <p className="text-[var(--ink-2)] leading-relaxed mb-7 max-w-2xl">{p.blurb}</p>

              <div className="grid sm:grid-cols-2 gap-6 mb-7">
                <div>
                  <div className="data text-[10px] tracking-[0.18em] text-[var(--ink-3)] mb-3">SPECIFICATIONS</div>
                  <div className="space-y-2.5">
                    {p.specs.map((s) => (
                      <div key={s.k} className="flex items-baseline justify-between gap-3 border-b border-[var(--hairline)] pb-2">
                        <span className="text-sm text-[var(--ink-2)]">{s.k}</span>
                        <span className="data text-sm text-[var(--ink)] tabular-nums text-right">{s.v}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <div className="data text-[10px] tracking-[0.18em] text-[var(--ink-3)] mb-3">WHAT YOU GET</div>
                  <div className="space-y-2.5">
                    {p.wins.map((w) => (
                      <div key={w} className="flex items-start gap-2.5">
                        <Check className="w-4 h-4 mt-0.5 shrink-0 text-[var(--good)]" />
                        <span className="text-sm text-[var(--ink)]">{w}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <button onClick={() => openAudit({ notes: `Interested in: ${p.title}` })}
                className="btn btn-secondary text-sm group">
                Spec this for my facility
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </button>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
