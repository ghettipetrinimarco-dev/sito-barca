"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLang } from "../context/LanguageContext";
import { t } from "../translations";

const ease: [number, number, number, number] = [0.16, 1, 0.3, 1];

const PLAN_KEYS = ["holiday", "mileage", "harbor"];

const HOLIDAY_DATES = [
  { period: "31.05 – 07.06", code: "26-46173" },
  { period: "07.06 – 14.06", code: "26-46180" },
  { period: "14.06 – 21.06", code: "26-46187" },
  { period: "21.06 – 28.06", code: "26-46194" },
  { period: "28.06 – 05.07", code: "26-46201" },
  { period: "05.07 – 12.07", code: "26-46208" },
  { period: "12.07 – 19.07", code: "26-46215" },
  { period: "19.07 – 26.07", code: "26-46222" },
  { period: "26.07 – 02.08", code: "26-46229" },
  { period: "02.08 – 09.08", code: "26-46236" },
  { period: "09.08 – 16.08", code: "26-46243" },
  { period: "16.08 – 23.08", code: "26-46250" },
  { period: "23.08 – 30.08", code: "26-46257" },
  { period: "30.08 – 06.09", code: "26-46264" },
];

const HARBOR_DATES = [
  { period: "04.10 – 11.10", code: "" },
  { period: "11.10 – 18.10", code: "" },
];

const MILEAGE_DATES = [
  { period: "10.05 – 17.05", route: "San Carles → Mallorca", code: "26-46152" },
  { period: "17.05 – 24.05", route: "Mallorca → Menorca", code: "26-46159" },
  { period: "24.05 – 31.05", route: "Menorca → Ibiza", code: "26-46166" },
  { period: "06.09 – 13.09", route: "Ibiza → Cagliari", code: "26-46271" },
  { period: "13.09 – 20.09", route: "Cagliari → Olbia", code: "26-46278" },
  { period: "20.09 – 27.09", route: "Olbia → Cagliari", code: "26-46285" },
  { period: "27.09 – 04.10", route: "Cagliari → Bizerte", code: "26-46292" },
];

export default function CruisePlans() {
  const { lang } = useLang();
  const tr = t[lang].cruisePlansSection;
  const [active, setActive] = useState(0);
  const plan = tr.plans[active];

  const pdfUrl = (lang === "fr" || lang === "it")
    ? "/tornplan-2026-fren.pdf"
    : "/tornplan-2026-deen.pdf";

  // Deep-link: #cruise-plans-holiday / -mileage / -harbor
  useEffect(() => {
    const onHash = () => {
      const hash = window.location.hash;
      const idx = PLAN_KEYS.findIndex((key) => hash === `#cruise-plans-${key}`);
      if (idx !== -1) setActive(idx);
    };
    onHash();
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  return (
    <section id="cruise-plans" className="relative py-20 lg:py-28 px-6 lg:px-14" style={{ background: "var(--bg)" }}>
      {/* Anchor targets for each plan */}
      {PLAN_KEYS.map((key) => (
        <span key={key} id={`cruise-plans-${key}`} className="absolute" style={{ top: "-80px" }} />
      ))}
      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <div className="mb-12">
          <p className="text-[12px] tracking-[0.25em] uppercase mb-4 font-manrope font-medium" style={{ color: "var(--accent-light)" }}>
            {tr.header}
          </p>
          <h2 className="font-manrope font-bold leading-tight" style={{ fontSize: "clamp(2.5rem, 3.2vw, 3.75rem)", color: "var(--text)" }}>
            CRUISE PLAN
          </h2>
        </div>

        {/* Tabs */}
        <div className="flex gap-0 mb-12 overflow-x-auto scrollbar-none" style={{ borderBottom: "1px solid var(--border)" }}>
          {PLAN_KEYS.map((key, i) => (
            <button
              key={key}
              onClick={() => setActive(i)}
              className="relative pb-4 mr-6 lg:mr-8 text-left flex-shrink-0 transition-colors duration-200"
            >
              <span
                className="font-manrope text-[11px] lg:text-[12px] tracking-[0.15em] lg:tracking-[0.2em] uppercase font-medium transition-colors duration-200 whitespace-nowrap"
                style={{ color: active === i ? "var(--text)" : "var(--text-muted)" }}
              >
                <span className="lg:hidden">{tr.plans[i].short}</span>
                <span className="hidden lg:inline">{tr.plans[i].label}</span>
              </span>
              {active === i && (
                <motion.div
                  layoutId="cruise-plans-line"
                  className="absolute bottom-0 left-0 right-0 h-[2px]"
                  style={{ background: "var(--accent)" }}
                  transition={{ duration: 0.25, ease }}
                />
              )}
            </button>
          ))}
        </div>

        {/* Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.25, ease }}
            className="flex flex-col lg:flex-row lg:items-start gap-10 lg:gap-20"
          >
            <div className="flex-1">
              <span
                className="inline-block text-[11px] tracking-[0.2em] uppercase font-manrope font-medium px-3 py-1 mb-6"
                style={{ background: "var(--surface)", color: "var(--accent-light)", borderRadius: "4px" }}
              >
                {plan.tag}
              </span>

              <h3 className="font-manrope font-bold mb-4" style={{ fontSize: "1.6rem", color: "var(--text)" }}>
                {plan.label}
              </h3>

              <p className="font-manrope font-light text-base leading-relaxed mb-8" style={{ color: "var(--text-secondary)" }}>
                {plan.description}
              </p>

              <a
                href="#contact"
                className="inline-flex items-center gap-2.5 font-manrope font-semibold text-[13px] tracking-[0.08em] uppercase px-7 py-3.5 transition-all duration-300"
                style={{ background: "var(--accent)", color: "#fff", boxShadow: "0 4px 20px rgba(0,75,145,0.35)", borderRadius: "8px" }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "var(--accent-hover)"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "var(--accent)"; }}
              >
                {tr.cta}
              </a>
            </div>

            {/* Dates panel */}
            <div className="lg:w-72 flex-shrink-0">
              {active === 0 && (
                <DatesPanel
                  area="Ibiza – Formentera"
                  dates={HOLIDAY_DATES}
                  resLabel={tr.reservationCode}
                  pdfUrl={pdfUrl}
                  pdfLabel={tr.pdfLabel}
                />
              )}
              {active === 1 && (
                <DatesPanel
                  area="Mediterranean"
                  dates={MILEAGE_DATES}
                  resLabel={tr.reservationCode}
                  pdfUrl={pdfUrl}
                  pdfLabel={tr.pdfLabel}
                  showRoute
                />
              )}
              {active === 2 && (
                <DatesPanel
                  area="Bizerte – Tunisia"
                  dates={HARBOR_DATES}
                  resLabel={tr.reservationCode}
                  pdfUrl={pdfUrl}
                  pdfLabel={tr.pdfLabel}
                />
              )}
            </div>
          </motion.div>
        </AnimatePresence>

      </div>
    </section>
  );
}

function DatesPanel({
  area,
  dates,
  resLabel,
  pdfUrl,
  pdfLabel,
  showRoute = false,
}: {
  area: string;
  dates: { period: string; route?: string; code: string }[];
  resLabel: string;
  pdfUrl: string;
  pdfLabel: string;
  showRoute?: boolean;
}) {
  return (
    <div className="flex flex-col gap-3">
      <p className="font-manrope text-[10px] tracking-[0.2em] uppercase font-medium" style={{ color: "var(--accent-light)" }}>
        {area}
      </p>

      <div
        className="rounded-xl overflow-y-auto"
        style={{ background: "var(--surface)", border: "1px solid var(--border)", maxHeight: "320px" }}
      >
        {dates.map((d, i) => (
          <div
            key={i}
            className="flex items-center justify-between px-4 py-2.5"
            style={{ borderBottom: i < dates.length - 1 ? "1px solid var(--border)" : "none" }}
          >
            <div>
              <p className="font-manrope font-medium text-[12px]" style={{ color: "var(--text)" }}>
                {d.period}
              </p>
              {showRoute && d.route && (
                <p className="font-manrope text-[10px] mt-0.5" style={{ color: "var(--text-muted)" }}>
                  {d.route}
                </p>
              )}
            </div>
            <p className="font-manrope text-[10px] tabular-nums" style={{ color: "var(--text-muted)" }}>
              {d.code}
            </p>
          </div>
        ))}
      </div>

      <a
        href={pdfUrl}
        download
        className="flex items-center justify-center gap-2 font-manrope font-medium text-[12px] tracking-[0.1em] uppercase px-5 py-3 transition-all duration-200"
        style={{ background: "var(--surface)", color: "var(--accent-light)", border: "1px solid var(--border)", borderRadius: "8px" }}
        onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "var(--accent-light)"; }}
        onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "var(--border)"; }}
      >
        <DownloadIcon />
        {pdfLabel}
      </a>
    </div>
  );
}

function DownloadIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="7 10 12 15 17 10" />
      <line x1="12" y1="15" x2="12" y2="3" />
    </svg>
  );
}
