"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowRight, CheckCircle2, Loader2, ShieldCheck } from "lucide-react";
import { toast } from "sonner";
import { useUI } from "../ui-context";

const COOLING = ["Air only", "Mixed air + liquid", "Liquid (other vendor)", "Greenfield / planning"];
const TIMELINE = ["Within 90 days", "3–6 months", "6–12 months", "Exploring options"];

export default function AuditModal() {
  const { auditOpen, closeAudit, auditPrefill } = useUI();
  const [form, setForm] = useState({
    name: "", email: "", company: "", racks: "", density: "",
    currentCooling: "Air only", timeline: "Within 90 days", notes: "",
  });
  const [errors, setErrors] = useState<Record<string, boolean>>({});
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState<string | null>(null);

  useEffect(() => {
    if (auditOpen) {
      setForm((f) => ({ ...f, ...auditPrefill }));
      setDone(null);
      setErrors({});
    }
  }, [auditOpen, auditPrefill]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") closeAudit(); };
    if (auditOpen) {
      document.addEventListener("keydown", onKey);
      document.body.style.overflow = "hidden";
    }
    return () => { document.removeEventListener("keydown", onKey); document.body.style.overflow = ""; };
  }, [auditOpen, closeAudit]);

  const set = (k: keyof typeof form, v: string) => {
    setForm((f) => ({ ...f, [k]: v }));
    if (errors[k]) setErrors((e) => ({ ...e, [k]: false }));
  };

  const submit = async () => {
    const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email);
    const errs: Record<string, boolean> = {
      name: !form.name.trim(),
      email: !emailOk,
      company: !form.company.trim(),
    };
    setErrors(errs);
    if (Object.values(errs).some(Boolean)) {
      toast.error("A few fields need attention", { description: "Name, work email, and company are required." });
      return;
    }
    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 900));
    const ref = `TF-${Math.floor(10000 + Math.random() * 90000)}`;
    setSubmitting(false);
    setDone(ref);
    toast.success("Audit request received", {
      description: `Reference ${ref}. A senior thermal architect will reach out within one business day.`,
      duration: 6000,
    });
  };

  const reset = () => {
    setForm({ name: "", email: "", company: "", racks: "", density: "", currentCooling: "Air only", timeline: "Within 90 days", notes: "" });
    closeAudit();
  };

  return (
    <AnimatePresence>
      {auditOpen && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          className="fixed inset-0 z-[70] flex items-start sm:items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-sm overflow-y-auto"
          onClick={closeAudit}>
          <motion.div initial={{ opacity: 0, y: 24, scale: 0.98 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 16, scale: 0.98 }}
            transition={{ duration: 0.25, ease: [0.32, 0.72, 0, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-xl my-auto panel schematic-fine overflow-hidden">
            {done ? (
              <div className="p-8 sm:p-10 text-center">
                <div className="w-16 h-16 rounded-2xl mx-auto mb-5 flex items-center justify-center"
                  style={{ background: "rgba(47,217,138,.1)", border: "1px solid rgba(47,217,138,.3)" }}>
                  <CheckCircle2 className="w-8 h-8 text-[var(--good)]" />
                </div>
                <h3 className="font-display text-2xl font-semibold mb-2">Request received.</h3>
                <p className="text-[var(--ink-2)] leading-relaxed mb-1">
                  Thanks, {form.name.split(" ")[0]}. A senior thermal architect will reach out within one business day.
                </p>
                <p className="data text-sm text-[var(--cool-bright)] mb-7">Reference {done}</p>
                <button onClick={reset} className="btn btn-primary w-full py-3">Back to site</button>
              </div>
            ) : (
              <>
                <div className="flex items-start justify-between gap-4 p-6 sm:p-7 border-b border-[var(--hairline)]">
                  <div>
                    <span className="chip mb-2">Free assessment</span>
                    <h3 className="font-display text-2xl font-semibold">Request a cooling audit</h3>
                    <p className="text-sm text-[var(--ink-2)] mt-1">CFD-validated baseline + costed roadmap in 2–4 weeks.</p>
                  </div>
                  <button onClick={closeAudit} className="text-[var(--ink-3)] hover:text-[var(--ink)] p-1.5 -mr-1 -mt-1" aria-label="Close">
                    <X size={20} />
                  </button>
                </div>

                <div className="p-6 sm:p-7 space-y-4 max-h-[60vh] overflow-y-auto">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <Field label="Full name" req error={errors.name}>
                      <input className="field" value={form.name} onChange={(e) => set("name", e.target.value)} placeholder="Jordan Reyes" />
                    </Field>
                    <Field label="Work email" req error={errors.email}>
                      <input className="field" type="email" value={form.email} onChange={(e) => set("email", e.target.value)} placeholder="jordan@operator.com" />
                    </Field>
                  </div>
                  <Field label="Company" req error={errors.company}>
                    <input className="field" value={form.company} onChange={(e) => set("company", e.target.value)} placeholder="Operator, colo, or hyperscaler" />
                  </Field>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <Field label="Racks in scope">
                      <input className="field" value={form.racks} onChange={(e) => set("racks", e.target.value)} placeholder="e.g. 120" />
                    </Field>
                    <Field label="Target density">
                      <input className="field" value={form.density} onChange={(e) => set("density", e.target.value)} placeholder="e.g. 80 kW/rack" />
                    </Field>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <Field label="Current cooling">
                      <select className="field" value={form.currentCooling} onChange={(e) => set("currentCooling", e.target.value)}>
                        {COOLING.map((o) => <option key={o}>{o}</option>)}
                      </select>
                    </Field>
                    <Field label="Timeline">
                      <select className="field" value={form.timeline} onChange={(e) => set("timeline", e.target.value)}>
                        {TIMELINE.map((o) => <option key={o}>{o}</option>)}
                      </select>
                    </Field>
                  </div>
                  <Field label="Anything we should know?">
                    <textarea className="field resize-none" rows={3} value={form.notes} onChange={(e) => set("notes", e.target.value)}
                      placeholder="Facility constraints, current pain, what you're trying to hit..." />
                  </Field>
                </div>

                <div className="p-6 sm:p-7 border-t border-[var(--hairline)] flex flex-col sm:flex-row items-center gap-3">
                  <div className="flex items-center gap-1.5 text-[11px] text-[var(--ink-3)] order-2 sm:order-1">
                    <ShieldCheck className="w-3.5 h-3.5" /> No spam. Used only to scope your audit.
                  </div>
                  <button onClick={submit} disabled={submitting} className="btn btn-primary w-full sm:w-auto sm:ml-auto px-7 py-3 order-1 sm:order-2 group disabled:opacity-70">
                    {submitting ? <><Loader2 className="w-4 h-4 animate-spin" /> Sending…</> : <>Request audit <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" /></>}
                  </button>
                </div>
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function Field({ label, req, error, children }: { label: string; req?: boolean; error?: boolean; children: React.ReactNode }) {
  return (
    <div>
      <label className="label">{label} {req && <span className="req">*</span>}</label>
      <div className={error ? "[&_.field]:border-[var(--hot)] [&_.field]:shadow-[0_0_0_3px_rgba(240,68,56,.12)]" : ""}>{children}</div>
    </div>
  );
}
