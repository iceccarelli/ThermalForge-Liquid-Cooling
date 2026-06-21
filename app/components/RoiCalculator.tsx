"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles, Info } from "lucide-react";
import { useUI } from "../ui-context";

const HOURS = 8760;
const CO2_PER_KWH = 0.37; // kg CO2e per kWh (illustrative grid average)
const RETROFIT_PER_RACK = 22000; // $ illustrative DTC retrofit cost per rack
const LIQUID_PUE = 1.09;

function fmtMoney(n: number) {
  if (n >= 1_000_000) return `$${(n / 1_000_000).toFixed(2)}M`;
  if (n >= 1_000) return `$${(n / 1_000).toFixed(0)}K`;
  return `$${Math.round(n)}`;
}
function fmtNum(n: number) {
  return n.toLocaleString("en-US", { maximumFractionDigits: 0 });
}

export default function RoiCalculator() {
  const { openAudit } = useUI();
  const [racks, setRacks] = useState(120);
  const [kw, setKw] = useState(80);
  const [price, setPrice] = useState(0.12);
  const [pue, setPue] = useState(1.5);

  const r = useMemo(() => {
    const itKw = racks * kw;
    const energySavedKwh = itKw * (pue - LIQUID_PUE) * HOURS;
    const dollarsYr = energySavedKwh * price;
    const co2Tonnes = (energySavedKwh * CO2_PER_KWH) / 1000;
    const retrofit = racks * RETROFIT_PER_RACK;
    const paybackMonths = dollarsYr > 0 ? (retrofit / dollarsYr) * 12 : 0;
    const fiveYr = dollarsYr * 5 - retrofit;
    const pueDropPct = ((pue - LIQUID_PUE) / pue) * 100;
    return { itKw, energySavedKwh, dollarsYr, co2Tonnes, paybackMonths, fiveYr, pueDropPct, retrofit };
  }, [racks, kw, price, pue]);

  // gauge geometry: PUE from 1.0 .. 1.7 mapped on an arc
  const gaugePct = (val: number) => Math.max(0, Math.min(1, (val - 1.0) / 0.7));

  return (
    <section id="calculator" className="max-w-7xl mx-auto px-5 sm:px-6 py-24 sm:py-28">
      <div className="max-w-2xl mb-12">
        <span className="section-tag mb-5">Savings model</span>
        <h2 className="h-display text-4xl sm:text-5xl mb-5">
          Put your numbers in. Watch the <span className="text-cool-grad">dollars fall out</span>.
        </h2>
        <p className="text-lg text-[var(--ink-2)] leading-relaxed">
          Dial in your hall. This instrument estimates the energy, cost, and carbon you reclaim by
          moving from air to ThermalForge direct-to-chip liquid at a 1.09 target PUE.
        </p>
      </div>

      <div className="panel schematic-fine overflow-hidden">
        <div className="grid lg:grid-cols-[1fr_1.05fr]">
          {/* INPUTS */}
          <div className="p-6 sm:p-9 border-b lg:border-b-0 lg:border-r border-[var(--hairline)]">
            <div className="data text-[10px] tracking-[0.2em] text-[var(--ink-3)] mb-6">FACILITY INPUTS</div>
            <div className="space-y-7">
              <Slider label="Racks to convert" value={racks} min={4} max={1000} step={4}
                display={fmtNum(racks)} onChange={setRacks} />
              <Slider label="IT load per rack" value={kw} min={20} max={130} step={2}
                display={`${kw} kW`} onChange={setKw} note={kw > 40 ? "above air ceiling" : "within air range"} noteHot={kw > 40} />
              <Slider label="Energy price" value={price} min={0.05} max={0.4} step={0.005}
                display={`$${price.toFixed(3)}/kWh`} onChange={setPrice} />
              <Slider label="Current PUE (air)" value={pue} min={1.2} max={1.7} step={0.01}
                display={pue.toFixed(2)} onChange={setPue} />
            </div>

            <div className="mt-7 pt-5 border-t border-[var(--hairline)] flex items-start gap-2 text-[var(--ink-3)]">
              <Info className="w-3.5 h-3.5 mt-0.5 shrink-0" />
              <p className="text-[11px] leading-relaxed">
                Illustrative: 8,760 h/yr, {CO2_PER_KWH} kg CO₂e/kWh, ~${(RETROFIT_PER_RACK / 1000)}K/rack retrofit,
                1.09 target PUE. Your audit produces facility-exact figures.
              </p>
            </div>
          </div>

          {/* OUTPUTS */}
          <div className="p-6 sm:p-9 relative">
            <div className="data text-[10px] tracking-[0.2em] text-[var(--ink-3)] mb-6">PROJECTED OUTCOME · PER YEAR</div>

            {/* PUE gauge */}
            <div className="flex items-center gap-6 mb-7">
              <svg viewBox="0 0 120 70" className="w-32 shrink-0" aria-hidden>
                <path d="M10 62 A50 50 0 0 1 110 62" fill="none" stroke="var(--hairline-2)" strokeWidth="7" strokeLinecap="round" />
                <path d="M10 62 A50 50 0 0 1 110 62" fill="none" stroke="url(#tg)" strokeWidth="7" strokeLinecap="round"
                  strokeDasharray="157" strokeDashoffset={157 - 157 * gaugePct(pue)} opacity="0.35" />
                <path d="M10 62 A50 50 0 0 1 110 62" fill="none" stroke="url(#tg)" strokeWidth="7" strokeLinecap="round"
                  strokeDasharray="157" strokeDashoffset={157 - 157 * gaugePct(LIQUID_PUE)} />
                <defs>
                  <linearGradient id="tg" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#1d4ed8" /><stop offset="55%" stopColor="#36e2f2" />
                    <stop offset="80%" stopColor="#f5a524" /><stop offset="100%" stopColor="#f04438" />
                  </linearGradient>
                </defs>
              </svg>
              <div>
                <div className="data text-[10px] text-[var(--ink-3)] tracking-widest mb-1">NEW PUE</div>
                <div className="flex items-baseline gap-2">
                  <span className="data text-4xl font-semibold text-[var(--cool-bright)] tabular-nums">{LIQUID_PUE}</span>
                  <span className="data text-sm text-[var(--ink-3)] line-through">{pue.toFixed(2)}</span>
                </div>
                <span className="chip chip-good mt-1.5">−{r.pueDropPct.toFixed(0)}% overhead</span>
              </div>
            </div>

            {/* headline saving */}
            <div className="rounded-xl border border-[var(--cool-bright)]/30 bg-[rgba(54,226,242,.05)] p-5 mb-4">
              <div className="data text-[10px] text-[var(--ink-3)] tracking-widest mb-1.5">ANNUAL ENERGY SAVINGS</div>
              <motion.div key={Math.round(r.dollarsYr)} initial={{ opacity: 0.5 }} animate={{ opacity: 1 }}
                className="data text-5xl font-bold text-cool-grad tabular-nums leading-none">
                {fmtMoney(r.dollarsYr)}
              </motion.div>
            </div>

            {/* secondary readouts */}
            <div className="grid grid-cols-3 gap-3 mb-6">
              <Out label="ENERGY SAVED" value={`${fmtNum(r.energySavedKwh / 1000)}`} unit="MWh/yr" />
              <Out label="CO₂ AVOIDED" value={`${fmtNum(r.co2Tonnes)}`} unit="t/yr" />
              <Out label="PAYBACK" value={r.paybackMonths > 0 ? r.paybackMonths.toFixed(0) : "—"} unit="months" />
            </div>

            <div className="flex items-center justify-between rounded-xl border border-[var(--hairline)] bg-[var(--bg)] px-4 py-3 mb-6">
              <span className="text-sm text-[var(--ink-2)]">5-year net (after retrofit)</span>
              <span className="data text-lg font-semibold text-[var(--good)] tabular-nums">{fmtMoney(r.fiveYr)}</span>
            </div>

            <button
              onClick={() =>
                openAudit({
                  racks: String(racks),
                  density: `${kw} kW/rack`,
                  currentCooling: "Air only",
                  notes: `From savings model — ${racks} racks @ ${kw} kW, current PUE ${pue.toFixed(2)}, est. ${fmtMoney(r.dollarsYr)}/yr savings.`,
                })
              }
              className="btn btn-primary w-full py-3.5 group">
              <Sparkles className="w-4 h-4" />
              Validate these numbers with an audit
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

function Slider({ label, value, min, max, step, display, onChange, note, noteHot }: {
  label: string; value: number; min: number; max: number; step: number;
  display: string; onChange: (n: number) => void; note?: string; noteHot?: boolean;
}) {
  return (
    <div>
      <div className="flex items-baseline justify-between mb-2.5">
        <label className="text-sm font-medium text-[var(--ink-2)]">{label}</label>
        <div className="flex items-center gap-2">
          {note && <span className={`data text-[10px] ${noteHot ? "text-[var(--hot)]" : "text-[var(--good)]"}`}>{note}</span>}
          <span className="data text-base font-semibold text-[var(--ink)] tabular-nums">{display}</span>
        </div>
      </div>
      <input type="range" className="thermal" min={min} max={max} step={step} value={value}
        onChange={(e) => onChange(Number(e.target.value))} aria-label={label} />
    </div>
  );
}

function Out({ label, value, unit }: { label: string; value: string; unit: string }) {
  return (
    <div className="rounded-xl border border-[var(--hairline)] bg-[var(--bg)] px-3 py-3">
      <div className="data text-[9px] text-[var(--ink-3)] tracking-widest mb-1.5">{label}</div>
      <div className="data text-xl font-semibold text-[var(--ink)] tabular-nums leading-none">{value}</div>
      <div className="data text-[10px] text-[var(--ink-3)] mt-1">{unit}</div>
    </div>
  );
}
