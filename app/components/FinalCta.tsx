"use client";

import { motion } from "framer-motion";
import { ArrowRight, Phone } from "lucide-react";
import { useUI } from "../ui-context";

export default function FinalCta() {
  const { openAudit } = useUI();
  return (
    <section className="max-w-7xl mx-auto px-5 sm:px-6 pb-24">
      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="relative panel overflow-hidden p-10 sm:p-16 text-center">
        <div className="absolute inset-0 hero-glow opacity-80" />
        <div className="absolute inset-0 schematic opacity-50" />
        <div className="relative">
          <span className="chip mb-6">Free · no obligation</span>
          <h2 className="h-display text-4xl sm:text-6xl mb-5 max-w-3xl mx-auto">
            Find out what your hall is leaving on the table.
          </h2>
          <p className="text-lg text-[var(--ink-2)] max-w-xl mx-auto mb-9 leading-relaxed">
            A ThermalForge audit gives you a CFD-validated baseline and a costed retrofit roadmap in
            2–4 weeks. You decide what happens next.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <button onClick={() => openAudit()} className="btn btn-primary text-base px-8 py-4 group">
              Request a cooling audit
              <ArrowRight className="w-4.5 h-4.5 group-hover:translate-x-0.5 transition-transform" />
            </button>
            <a href="tel:+18005550199" className="btn btn-secondary text-base px-7 py-4">
              <Phone className="w-4 h-4" /> Talk to a thermal architect
            </a>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
