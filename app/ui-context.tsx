"use client";

import React, { createContext, useContext, useState, useCallback } from "react";

export interface AuditPrefill {
  name?: string;
  email?: string;
  company?: string;
  racks?: string;
  density?: string;
  currentCooling?: string;
  timeline?: string;
  notes?: string;
}

interface UIContextValue {
  openAudit: (prefill?: AuditPrefill) => void;
  closeAudit: () => void;
  openPortal: () => void;
  closePortal: () => void;
  auditOpen: boolean;
  portalOpen: boolean;
  auditPrefill: AuditPrefill;
}

const UIContext = createContext<UIContextValue | null>(null);

export function UIProvider({ children }: { children: React.ReactNode }) {
  const [auditOpen, setAuditOpen] = useState(false);
  const [portalOpen, setPortalOpen] = useState(false);
  const [auditPrefill, setAuditPrefill] = useState<AuditPrefill>({});

  const openAudit = useCallback((prefill?: AuditPrefill) => {
    if (prefill) setAuditPrefill(prefill);
    else setAuditPrefill({});
    setAuditOpen(true);
  }, []);
  const closeAudit = useCallback(() => setAuditOpen(false), []);
  const openPortal = useCallback(() => setPortalOpen(true), []);
  const closePortal = useCallback(() => setPortalOpen(false), []);

  return (
    <UIContext.Provider
      value={{ openAudit, closeAudit, openPortal, closePortal, auditOpen, portalOpen, auditPrefill }}
    >
      {children}
    </UIContext.Provider>
  );
}

export function useUI() {
  const ctx = useContext(UIContext);
  if (!ctx) throw new Error("useUI must be used within UIProvider");
  return ctx;
}
