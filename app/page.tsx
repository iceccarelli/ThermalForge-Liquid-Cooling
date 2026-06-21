"use client";

import { UIProvider } from "./ui-context";
import Header from "./components/Header";
import Hero from "./components/Hero";
import LogoStrip from "./components/LogoStrip";
import Problem from "./components/Problem";
import Platform from "./components/Platform";
import RoiCalculator from "./components/RoiCalculator";
import Comparison from "./components/Comparison";
import Process from "./components/Process";
import Proof from "./components/Proof";
import Technology from "./components/Technology";
import Resources from "./components/Resources";
import FinalCta from "./components/FinalCta";
import Footer from "./components/Footer";
import AuditModal from "./components/AuditModal";
import PortalModal from "./components/PortalModal";

export default function Page() {
  return (
    <UIProvider>
      <Header />
      <main>
        <Hero />
        <LogoStrip />
        <Problem />
        <Platform />
        <RoiCalculator />
        <Comparison />
        <Process />
        <Proof />
        <Technology />
        <Resources />
        <FinalCta />
      </main>
      <Footer />
      <AuditModal />
      <PortalModal />
    </UIProvider>
  );
}
