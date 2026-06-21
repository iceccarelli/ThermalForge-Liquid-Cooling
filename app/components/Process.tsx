"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { PROCESS } from "../data";
import { useUI } from "../ui-context";

export default function Process() {
  const { openAudit } = useUI();
  return (
    <section id="process" className="max-w-7xl mx-auto px-5 sm:px-6 py-24 sm:py-28">
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
        <div className="max-w-2xl">
          <span className="section-tag mb-5">Approach</span>
          <h2 className="h-display text-4xl sm:text-5xl mb-5">Audit to operate. One accountable team.</h2>
          <p className="text-lg text-[var(--ink-2)] leading-relaxed">
            No hand-offs between a consultant, a vendor, and an installer who blame each other when
            it leaks. We own the loop end-to-end — and we start by telling you the truth about your hall.
          </p>
        </div>
        <button onClick={() => openAudit()} className="btn btn-primary shrink-0 group">
          Start with phase 01
          <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
        </button>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {PROCESS.map((ph, i) => (
          <motion.div key={ph.no}
            initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.08 }}
            className="card card-accent p-6 flex flex-col">
            <div className="flex items-center justify-between mb-5">
              <span className="data text-3xl font-bold text-[var(--hairline-2)]">{ph.no}</span>
              <span className="chip chip-muted">{ph.duration}</span>
            </div>
            <h3 className="font-display text-xl font-semibold mb-2.5">{ph.title}</h3>
            <p className="text-sm text-[var(--ink-2)] leading-relaxed mb-5 flex-1">{ph.body}</p>
            <div className="space-y-1.5 pt-4 border-t border-[var(--hairline)]">
              {ph.deliverables.map((d) => (
                <div key={d} className="flex items-center gap-2">
                  <span className="w-1 h-1 rounded-full bg-[var(--cool-bright)]" />
                  <span className="text-[12.5px] text-[var(--ink-2)]">{d}</span>
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
