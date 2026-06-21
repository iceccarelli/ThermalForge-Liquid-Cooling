"use client";

import { Snowflake, Mail, MapPin, Linkedin, Github, Twitter } from "lucide-react";
import { useUI } from "../ui-context";
import { NAV } from "../data";

export default function Footer() {
  const { openAudit, openPortal } = useUI();
  const go = (id: string) => {
    const el = document.getElementById(id);
    if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 72, behavior: "smooth" });
  };

  return (
    <footer className="border-t border-[var(--hairline)] bg-[var(--panel)]/40">
      <div className="max-w-7xl mx-auto px-5 sm:px-6 py-16">
        <div className="grid sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr] gap-10">
          <div>
            <div className="flex items-center gap-2.5 mb-4">
              <span className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: "var(--grad-cool)" }}>
                <Snowflake className="w-4.5 h-4.5 text-[#04222a]" strokeWidth={2.4} />
              </span>
              <span className="font-display text-lg font-semibold">ThermalForge</span>
            </div>
            <p className="text-sm text-[var(--ink-2)] leading-relaxed max-w-xs mb-5">
              Direct-to-chip liquid cooling for the AI density era. Designed, retrofitted, and operated by one accountable team.
            </p>
            <div className="flex items-center gap-2">
              {[Linkedin, Twitter, Github].map((I, i) => (
                <a key={i} href="#" aria-label="social"
                  className="w-9 h-9 rounded-lg border border-[var(--hairline)] flex items-center justify-center text-[var(--ink-3)] hover:text-[var(--cool-bright)] hover:border-[var(--cool-bright)]/40 transition-colors">
                  <I className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <div className="data text-[10px] tracking-widest text-[var(--ink-3)] mb-4">EXPLORE</div>
            <div className="flex flex-col gap-2.5">
              {NAV.map((n) => (
                <button key={n.id} onClick={() => go(n.id)} className="text-sm text-[var(--ink-2)] hover:text-[var(--ink)] transition-colors text-left">
                  {n.label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <div className="data text-[10px] tracking-widest text-[var(--ink-3)] mb-4">ENGAGE</div>
            <div className="flex flex-col gap-2.5">
              <button onClick={() => openAudit()} className="text-sm text-[var(--ink-2)] hover:text-[var(--ink)] transition-colors text-left">Request audit</button>
              <button onClick={() => openPortal()} className="text-sm text-[var(--ink-2)] hover:text-[var(--ink)] transition-colors text-left">Client portal</button>
              <a href="tel:+18005550199" className="text-sm text-[var(--ink-2)] hover:text-[var(--ink)] transition-colors">Talk to an architect</a>
            </div>
          </div>

          <div>
            <div className="data text-[10px] tracking-widest text-[var(--ink-3)] mb-4">CONTACT</div>
            <div className="flex flex-col gap-3 text-sm text-[var(--ink-2)]">
              <a href="mailto:engineering@thermalforge.io" className="flex items-center gap-2 hover:text-[var(--ink)] transition-colors">
                <Mail className="w-4 h-4 text-[var(--ink-3)]" /> engineering@thermalforge.io
              </a>
              <span className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[var(--ink-3)] mt-0.5" /> Frankfurt · Ashburn · Singapore
              </span>
            </div>
          </div>
        </div>

        <div className="divider my-10" />

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[var(--ink-3)]">
          <span>© {new Date().getFullYear()} ThermalForge. All rights reserved.</span>
          <div className="flex items-center gap-5">
            <a href="#" className="hover:text-[var(--ink-2)] transition-colors">Privacy</a>
            <a href="#" className="hover:text-[var(--ink-2)] transition-colors">Terms</a>
            <span className="data">Built for the density era</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
