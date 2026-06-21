"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Download, FileText, Plus, Minus } from "lucide-react";
import { toast } from "sonner";
import { RESOURCES, FAQS } from "../data";
import { useUI } from "../ui-context";

export default function Resources() {
  const { openAudit } = useUI();
  const [open, setOpen] = useState<number | null>(0);

  const grab = (title: string) => {
    toast.success("Sending it over", {
      description: `“${title}” is on its way. Check your inbox in a moment.`,
    });
    setTimeout(() => openAudit({ notes: `Requested resource: ${title}` }), 600);
  };

  return (
    <section id="resources" className="max-w-7xl mx-auto px-5 sm:px-6 py-24 sm:py-28">
      <div className="grid lg:grid-cols-2 gap-14">
        {/* resources */}
        <div>
          <span className="section-tag mb-5">Resources</span>
          <h2 className="h-display text-3xl sm:text-4xl mb-7">Take the engineering with you.</h2>
          <div className="space-y-3">
            {RESOURCES.map((r, i) => (
              <motion.button key={r.title} onClick={() => grab(r.title)}
                initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.06 }}
                className="card w-full text-left p-4 flex items-center gap-4 group">
                <span className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0"
                  style={{ background: "rgba(54,226,242,.08)", border: "1px solid rgba(54,226,242,.18)" }}>
                  <FileText className="w-5 h-5 text-[var(--cool-bright)]" />
                </span>
                <div className="flex-1 min-w-0">
                  <div className="data text-[10px] tracking-widest text-[var(--ink-3)] mb-0.5">{r.type.toUpperCase()}</div>
                  <div className="font-medium text-[var(--ink)] truncate">{r.title}</div>
                  <div className="text-xs text-[var(--ink-3)]">{r.meta}</div>
                </div>
                <Download className="w-4.5 h-4.5 text-[var(--ink-3)] group-hover:text-[var(--cool-bright)] transition-colors shrink-0" />
              </motion.button>
            ))}
          </div>
        </div>

        {/* FAQ */}
        <div>
          <span className="section-tag mb-5">Questions</span>
          <h2 className="h-display text-3xl sm:text-4xl mb-7">The things operators actually ask.</h2>
          <div className="divide-y divide-[var(--hairline)] border-y border-[var(--hairline)]">
            {FAQS.map((f, i) => {
              const on = open === i;
              return (
                <div key={i}>
                  <button onClick={() => setOpen(on ? null : i)}
                    className="w-full flex items-center justify-between gap-4 py-4 text-left">
                    <span className={`font-medium transition-colors ${on ? "text-[var(--cool-bright)]" : "text-[var(--ink)]"}`}>{f.q}</span>
                    {on ? <Minus className="w-4 h-4 shrink-0 text-[var(--cool-bright)]" /> : <Plus className="w-4 h-4 shrink-0 text-[var(--ink-3)]" />}
                  </button>
                  <AnimatePresence>
                    {on && (
                      <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25 }} className="overflow-hidden">
                        <p className="text-sm text-[var(--ink-2)] leading-relaxed pb-4 pr-8">{f.a}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
