"use client";

import { LOGOS } from "../data";

export default function LogoStrip() {
  const items = [...LOGOS, ...LOGOS];
  return (
    <section aria-label="Trusted by" className="border-y border-[var(--hairline)] bg-[var(--panel)]/40 py-7">
      <div className="max-w-7xl mx-auto px-6">
        <p className="data text-[10px] tracking-[0.22em] text-[var(--ink-3)] text-center mb-5">
          OPERATING LIQUID INFRASTRUCTURE FOR
        </p>
        <div className="marquee-mask overflow-hidden">
          <div className="marquee-track flex items-center gap-12 w-max">
            {items.map((l, i) => (
              <span key={i} className="font-display text-lg sm:text-xl font-medium text-[var(--ink-3)] whitespace-nowrap select-none">
                {l}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
