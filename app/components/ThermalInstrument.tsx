"use client";

import { useState, useEffect, useRef } from "react";

const NODE_COUNT = 14;

// temperature -> thermal color (cool blue .. cyan .. amber .. red hot)
function tempColor(t: number) {
  // t in [45, 90]
  const c = Math.max(0, Math.min(1, (t - 45) / 45));
  if (c < 0.5) {
    // blue -> cyan
    const k = c / 0.5;
    return `rgb(${Math.round(29 + k * (27 - 29))}, ${Math.round(78 + k * (200 - 78))}, ${Math.round(216 + k * (240 - 216))})`;
  }
  // cyan -> amber -> red
  const k = (c - 0.5) / 0.5;
  const r = Math.round(27 + k * (240 - 27));
  const g = Math.round(200 + k * (68 - 200));
  const b = Math.round(240 + k * (56 - 240));
  return `rgb(${r}, ${g}, ${b})`;
}

const AIR = { label: "AIR-COOLED", temps: [86, 84, 88, 83, 87, 85, 89, 84, 86, 88, 85, 87, 84, 86], pue: 1.48, throttle: 23, color: "var(--hot)" };
const LIQUID = { label: "THERMALFORGE LIQUID", temps: [54, 52, 55, 51, 53, 52, 56, 51, 54, 53, 52, 55, 51, 53], pue: 1.09, throttle: 0, color: "var(--cool-bright)" };

export default function ThermalInstrument() {
  const [mode, setMode] = useState<"air" | "liquid">("air");
  const [display, setDisplay] = useState({ temps: [...AIR.temps], pue: AIR.pue, throttle: AIR.throttle });
  const raf = useRef<number | null>(null);

  // auto-cycle modes
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) { setMode("liquid"); return; }
    const id = setInterval(() => setMode((m) => (m === "air" ? "liquid" : "air")), 4200);
    return () => clearInterval(id);
  }, []);

  // animate toward target
  useEffect(() => {
    const target = mode === "air" ? AIR : LIQUID;
    const start = performance.now();
    const from = { ...display };
    const dur = 1100;
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / dur);
      const e = 1 - Math.pow(1 - p, 3);
      setDisplay({
        temps: target.temps.map((t, i) => from.temps[i] + (t - from.temps[i]) * e),
        pue: from.pue + (target.pue - from.pue) * e,
        throttle: from.throttle + (target.throttle - from.throttle) * e,
      });
      if (p < 1) raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);
    return () => { if (raf.current) cancelAnimationFrame(raf.current); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mode]);

  const active = mode === "air" ? AIR : LIQUID;
  const avg = display.temps.reduce((a, b) => a + b, 0) / display.temps.length;

  return (
    <div className="panel p-4 sm:p-5 schematic-fine relative overflow-hidden" style={{ boxShadow: "0 40px 90px -50px rgba(0,0,0,.9)" }}>
      {/* header row */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full pulse-soft" style={{ background: active.color }} />
          <span className="data text-[11px] tracking-[0.18em]" style={{ color: active.color }}>{active.label}</span>
        </div>
        <span className="data text-[10px] text-[var(--ink-3)] tracking-widest">RACK&nbsp;A-07 · LIVE</span>
      </div>

      {/* node grid (the "rack") */}
      <div className="grid grid-cols-7 gap-1.5 mb-4">
        {Array.from({ length: NODE_COUNT }).map((_, i) => {
          const t = display.temps[i] ?? avg;
          const col = tempColor(t);
          return (
            <div key={i} className="rounded-md border border-[var(--hairline)] px-1 py-2 flex flex-col items-center gap-1"
              style={{ background: "rgba(255,255,255,.015)" }}>
              <span className="w-full h-1.5 rounded-full" style={{ background: col, boxShadow: `0 0 10px ${col}` }} />
              <span className="data text-[9px] text-[var(--ink-2)] tabular-nums">{Math.round(t)}°</span>
            </div>
          );
        })}
      </div>

      {/* coolant loop schematic */}
      <svg viewBox="0 0 320 38" className="w-full h-9 mb-4" aria-hidden="true">
        <path d="M8 19 H312" stroke="var(--hairline-2)" strokeWidth="1" fill="none" />
        <path d="M8 19 H312" stroke={active.color} strokeWidth="2" fill="none"
          className={mode === "liquid" ? "flow-line" : ""} opacity={mode === "liquid" ? 0.9 : 0.25} />
        {[40, 120, 200, 280].map((x) => (
          <circle key={x} cx={x} cy={19} r="3.5" fill="var(--panel)" stroke={active.color} strokeWidth="1.5" />
        ))}
        <text x="8" y="12" className="data" fontSize="7" fill="var(--ink-3)">CDU</text>
        <text x="296" y="12" className="data" fontSize="7" fill="var(--ink-3)">RETURN</text>
      </svg>

      {/* readouts */}
      <div className="grid grid-cols-3 gap-2">
        <Readout label="PUE" value={display.pue.toFixed(2)} color={display.pue > 1.25 ? "var(--hot)" : "var(--cool-bright)"} />
        <Readout label="AVG °C" value={Math.round(avg).toString()} color={tempColor(avg)} />
        <Readout label="THROTTLE %" value={Math.round(display.throttle).toString()} color={display.throttle > 1 ? "var(--warm)" : "var(--good)"} />
      </div>

      {/* mode toggle (manual override) */}
      <div className="flex items-center gap-1.5 mt-4 p-1 rounded-lg bg-[var(--bg)] border border-[var(--hairline)]">
        {(["air", "liquid"] as const).map((m) => (
          <button key={m} onClick={() => setMode(m)}
            className={`flex-1 data text-[10px] tracking-wider py-1.5 rounded-md transition-colors ${
              mode === m ? "text-[#04222a]" : "text-[var(--ink-3)] hover:text-[var(--ink-2)]"
            }`}
            style={mode === m ? { background: m === "air" ? "var(--hot)" : "var(--cool-bright)" } : {}}>
            {m === "air" ? "AIR" : "LIQUID"}
          </button>
        ))}
      </div>
    </div>
  );
}

function Readout({ label, value, color }: { label: string; value: string; color: string }) {
  return (
    <div className="rounded-lg border border-[var(--hairline)] bg-[var(--bg)] px-2.5 py-2">
      <div className="data text-[9px] text-[var(--ink-3)] tracking-widest mb-1">{label}</div>
      <div className="data text-xl font-semibold tabular-nums leading-none" style={{ color }}>{value}</div>
    </div>
  );
}
