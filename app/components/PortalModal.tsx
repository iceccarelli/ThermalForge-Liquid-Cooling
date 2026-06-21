"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X, LogIn, LogOut, Loader2, LayoutGrid, LineChart, Wrench,
  Download, Droplet, Activity, ArrowRight, Server,
} from "lucide-react";
import { toast } from "sonner";
import { useUI } from "../ui-context";
import { PORTAL_PROJECTS, PORTAL_PUE, PORTAL_RETROFIT } from "../data";

type Tab = "overview" | "pue" | "retrofit";

export default function PortalModal() {
  const { portalOpen, closePortal, openAudit } = useUI();
  const [authed, setAuthed] = useState(false);
  const [tab, setTab] = useState<Tab>("overview");
  const [email, setEmail] = useState("alex.rivera@hyperscalex.ai");
  const [pwd, setPwd] = useState("demo1234");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape" && !authed) closePortal(); };
    if (portalOpen) { document.addEventListener("keydown", onKey); document.body.style.overflow = "hidden"; }
    return () => { document.removeEventListener("keydown", onKey); document.body.style.overflow = ""; };
  }, [portalOpen, authed, closePortal]);

  const login = async () => {
    if (!email || pwd.length < 4) { toast.error("Enter the demo credentials to continue"); return; }
    setBusy(true);
    await new Promise((r) => setTimeout(r, 800));
    setBusy(false);
    setAuthed(true);
    setTab("overview");
    toast.success("Welcome back, Alex", { description: "Viewing the ThermalForge portal in demo mode." });
  };

  const logout = () => { setAuthed(false); closePortal(); toast.info("Signed out of demo portal"); };

  const download = () =>
    toast.success("Report exported", { description: "PUE_Performance_Q2-2026.pdf saved to your device." });

  const requestAudit = () => { closePortal(); setTimeout(() => openAudit({ name: "Alex Rivera", company: "HyperscaleX", email: "alex.rivera@hyperscalex.ai" }), 250); };

  return (
    <AnimatePresence>
      {portalOpen && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          className="fixed inset-0 z-[80] flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-sm"
          onClick={() => !authed && closePortal()}>
          <motion.div initial={{ opacity: 0, y: 24, scale: 0.98 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.25, ease: [0.32, 0.72, 0, 1] }} onClick={(e) => e.stopPropagation()}
            className={`relative panel overflow-hidden w-full ${authed ? "max-w-5xl h-[88vh]" : "max-w-md"}`}>

            {!authed ? (
              <div className="p-8 sm:p-10">
                <div className="flex items-center gap-2.5 mb-7">
                  <span className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ background: "var(--grad-cool)" }}>
                    <Droplet className="w-4.5 h-4.5 text-[#04222a]" />
                  </span>
                  <span className="font-display text-lg font-semibold">ThermalForge Portal</span>
                </div>
                <h3 className="font-display text-2xl font-semibold mb-1.5">Sign in</h3>
                <p className="text-sm text-[var(--ink-2)] mb-6">Live monitoring for your deployed halls. <span className="chip chip-muted ml-1">Demo</span></p>
                <div className="space-y-4">
                  <div>
                    <label className="label">Work email</label>
                    <input className="field" value={email} onChange={(e) => setEmail(e.target.value)} />
                  </div>
                  <div>
                    <label className="label">Password</label>
                    <input className="field" type="password" value={pwd} onChange={(e) => setPwd(e.target.value)} />
                  </div>
                  <button onClick={login} disabled={busy} className="btn btn-primary w-full py-3 disabled:opacity-70">
                    {busy ? <><Loader2 className="w-4 h-4 animate-spin" /> Signing in…</> : <><LogIn className="w-4 h-4" /> Enter portal</>}
                  </button>
                  <p className="data text-[11px] text-[var(--ink-3)] text-center">Prefilled demo credentials — just click Enter portal</p>
                </div>
                <button onClick={closePortal} className="mt-6 text-sm text-[var(--ink-3)] hover:text-[var(--ink)] w-full">← Back to site</button>
              </div>
            ) : (
              <div className="flex flex-col h-full">
                {/* top bar */}
                <div className="flex items-center justify-between px-5 sm:px-7 h-16 border-b border-[var(--hairline)] shrink-0">
                  <div className="flex items-center gap-2.5">
                    <span className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: "var(--grad-cool)" }}>
                      <Droplet className="w-4 h-4 text-[#04222a]" />
                    </span>
                    <div className="leading-tight">
                      <div className="font-display font-semibold text-sm">HyperscaleX</div>
                      <div className="data text-[10px] text-[var(--ink-3)]">3 sites · 224 racks</div>
                    </div>
                  </div>
                  <button onClick={logout} className="btn btn-ghost flex items-center gap-1.5 text-sm"><LogOut className="w-4 h-4" /> Sign out</button>
                </div>

                {/* tabs */}
                <div className="flex items-center gap-1 px-5 sm:px-7 pt-4 border-b border-[var(--hairline)] shrink-0 overflow-x-auto">
                  {([["overview", "Overview", LayoutGrid], ["pue", "PUE trends", LineChart], ["retrofit", "Retrofit status", Wrench]] as const).map(([k, lbl, Icon]) => (
                    <button key={k} onClick={() => setTab(k)}
                      className={`flex items-center gap-2 px-3.5 py-2.5 text-sm font-medium border-b-2 -mb-px transition-colors whitespace-nowrap ${
                        tab === k ? "border-[var(--cool-bright)] text-[var(--cool-bright)]" : "border-transparent text-[var(--ink-3)] hover:text-[var(--ink-2)]"
                      }`}>
                      <Icon className="w-4 h-4" /> {lbl}
                    </button>
                  ))}
                </div>

                {/* body */}
                <div className="flex-1 overflow-y-auto p-5 sm:p-7">
                  {tab === "overview" && <Overview onRequest={requestAudit} />}
                  {tab === "pue" && <Pue onDownload={download} />}
                  {tab === "retrofit" && <Retrofit onRequest={requestAudit} />}
                </div>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function KPI({ icon: Icon, label, value, tone }: { icon: React.ComponentType<{ className?: string }>; label: string; value: string; tone: string }) {
  return (
    <div className="panel-flat p-4">
      <div className="flex items-center justify-between mb-3">
        <span className="data text-[10px] tracking-widest text-[var(--ink-3)]">{label}</span>
        <Icon className="w-4 h-4" />
      </div>
      <div className="data text-2xl font-semibold tabular-nums" style={{ color: tone }}>{value}</div>
    </div>
  );
}

function Overview({ onRequest }: { onRequest: () => void }) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <KPI icon={Activity} label="FLEET PUE" value="1.10" tone="var(--cool-bright)" />
        <KPI icon={Server} label="RACKS LIVE" value="224" tone="var(--ink)" />
        <KPI icon={Droplet} label="FLOW" value="1.56k" tone="var(--ink)" />
        <KPI icon={Activity} label="UPTIME" value="99.98%" tone="var(--good)" />
      </div>

      <div className="panel-flat overflow-hidden">
        <div className="px-5 py-4 border-b border-[var(--hairline)] flex items-center justify-between">
          <span className="font-display font-semibold">Sites</span>
          <button onClick={onRequest} className="btn btn-primary text-xs px-4 py-2">Request new audit</button>
        </div>
        <div className="divide-y divide-[var(--hairline)]">
          {PORTAL_PROJECTS.map((p) => (
            <div key={p.id} className="px-5 py-3.5 grid grid-cols-2 sm:grid-cols-6 gap-2 items-center text-sm">
              <div className="font-medium text-[var(--ink)] col-span-2 sm:col-span-1">{p.name}</div>
              <div className="text-[var(--ink-3)] text-xs">{p.location}</div>
              <div className="data text-[var(--ink-2)]">{p.racks} · {p.density}</div>
              <div className="data text-[var(--ink-2)]">{p.flow}</div>
              <div className="data" style={{ color: p.status === "LIVE" ? "var(--good)" : "var(--warm)" }}>{p.pue}</div>
              <div>
                <span className={`chip ${p.status === "LIVE" ? "chip-good" : "chip-warm"}`}>{p.status}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function Pue({ onDownload }: { onDownload: () => void }) {
  const W = 640, H = 240, pad = 34;
  const all = PORTAL_PUE.flatMap((d) => [d.before, d.after]);
  const min = Math.min(...all) - 0.04, max = Math.max(...all) + 0.04;
  const x = (i: number) => pad + (i * (W - pad * 2)) / (PORTAL_PUE.length - 1);
  const y = (v: number) => H - pad - ((v - min) / (max - min)) * (H - pad * 2);
  const line = (key: "before" | "after") => PORTAL_PUE.map((d, i) => `${i === 0 ? "M" : "L"}${x(i)},${y(d[key])}`).join(" ");

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-display text-lg font-semibold">PUE — last 6 months</h3>
          <p className="text-sm text-[var(--ink-3)]">Baseline vs. ThermalForge-managed</p>
        </div>
        <button onClick={onDownload} className="btn btn-secondary text-sm"><Download className="w-4 h-4" /> Export PDF</button>
      </div>

      <div className="panel-flat p-4">
        <svg viewBox={`0 0 ${W} ${H}`} className="w-full" preserveAspectRatio="xMidYMid meet">
          {[0, 0.25, 0.5, 0.75, 1].map((g) => (
            <line key={g} x1={pad} x2={W - pad} y1={pad + g * (H - pad * 2)} y2={pad + g * (H - pad * 2)} stroke="var(--hairline)" strokeWidth="1" />
          ))}
          <path d={line("before")} fill="none" stroke="url(#heat)" strokeWidth="2.5" strokeLinecap="round" opacity="0.85" />
          <path d={line("after")} fill="none" stroke="url(#cool)" strokeWidth="2.5" strokeLinecap="round" />
          {PORTAL_PUE.map((d, i) => (
            <g key={i}>
              <circle cx={x(i)} cy={y(d.after)} r="3.5" fill="var(--cool-bright)" />
              <text x={x(i)} y={H - 12} fontSize="10" fill="var(--ink-3)" textAnchor="middle" className="data">{d.month}</text>
            </g>
          ))}
          <defs>
            <linearGradient id="heat" x1="0" x2="1"><stop offset="0%" stopColor="#f5a524" /><stop offset="100%" stopColor="#f04438" /></linearGradient>
            <linearGradient id="cool" x1="0" x2="1"><stop offset="0%" stopColor="#1d4ed8" /><stop offset="100%" stopColor="#36e2f2" /></linearGradient>
          </defs>
        </svg>
        <div className="flex items-center gap-5 mt-2 px-2">
          <span className="flex items-center gap-2 text-xs text-[var(--ink-2)]"><span className="w-4 h-0.5 rounded" style={{ background: "var(--grad-heat)" }} /> Baseline</span>
          <span className="flex items-center gap-2 text-xs text-[var(--ink-2)]"><span className="w-4 h-0.5 rounded" style={{ background: "var(--grad-cool)" }} /> ThermalForge</span>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3">
        <KPI icon={Activity} label="CURRENT" value="1.10" tone="var(--cool-bright)" />
        <KPI icon={Activity} label="BASELINE" value="1.44" tone="var(--hot)" />
        <KPI icon={Activity} label="REDUCTION" value="−24%" tone="var(--good)" />
      </div>
    </div>
  );
}

function Retrofit({ onRequest }: { onRequest: () => void }) {
  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-display text-lg font-semibold">Retrofit program</h3>
          <p className="text-sm text-[var(--ink-3)]">Colo Expansion Phase 2 · Singapore</p>
        </div>
        <span className="chip chip-warm">In progress</span>
      </div>

      <div className="panel-flat divide-y divide-[var(--hairline)]">
        {PORTAL_RETROFIT.map((r) => (
          <div key={r.phase} className="px-5 py-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-[var(--ink)]">{r.phase}</span>
              <span className="data text-xs text-[var(--ink-2)] tabular-nums">{r.pct}%</span>
            </div>
            <div className="h-2 rounded-full bg-[var(--bg)] overflow-hidden mb-1.5">
              <motion.div initial={{ width: 0 }} animate={{ width: `${r.pct}%` }} transition={{ duration: 0.8 }}
                className="h-full rounded-full" style={{ background: r.pct === 100 ? "var(--good)" : "var(--grad-cool)" }} />
            </div>
            <span className="data text-[11px]" style={{ color: r.pct === 100 ? "var(--good)" : "var(--ink-3)" }}>{r.status}</span>
          </div>
        ))}
      </div>

      <button onClick={onRequest} className="btn btn-secondary text-sm w-full sm:w-auto group">
        Plan the next phase <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
      </button>
    </div>
  );
}
