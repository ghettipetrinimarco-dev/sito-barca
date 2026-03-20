"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLang } from "../context/LanguageContext";

const ease: [number, number, number, number] = [0.16, 1, 0.3, 1];

const PLANS = [
  {
    key: "holiday",
    labelEn: "Holiday Cruise",
    labelDe: "Urlaubskreuzfahrt",
    tagEn: "Leisure",
    tagDe: "Freizeit",
    descriptionEn: "Dates and details coming soon. Contact us to be notified when bookings open.",
    descriptionDe: "Termine und Details folgen in Kürze. Kontaktieren Sie uns, um benachrichtigt zu werden.",
  },
  {
    key: "mileage",
    labelEn: "Mileage Cruise",
    labelDe: "Meilentörn",
    tagEn: "Training",
    tagDe: "Training",
    descriptionEn: "Dates and details coming soon. Contact us to be notified when bookings open.",
    descriptionDe: "Termine und Details folgen in Kürze. Kontaktieren Sie uns, um benachrichtigt zu werden.",
  },
  {
    key: "harbor",
    labelEn: "Harbor Maneuver Course",
    labelDe: "Hafenmanöverkurs",
    tagEn: "Course",
    tagDe: "Kurs",
    descriptionEn: "Dates and details coming soon. Contact us to be notified when bookings open.",
    descriptionDe: "Termine und Details folgen in Kürze. Kontaktieren Sie uns, um benachrichtigt zu werden.",
  },
];

export default function CruisePlans() {
  const { lang } = useLang();
  const [active, setActive] = useState(0);
  const plan = PLANS[active];

  // Deep-link: #cruise-plans-holiday / -mileage / -harbor
  useEffect(() => {
    const onHash = () => {
      const hash = window.location.hash;
      const idx = PLANS.findIndex((p) => hash === `#cruise-plans-${p.key}`);
      if (idx !== -1) setActive(idx);
    };
    onHash();
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  return (
    <section id="cruise-plans" className="relative py-20 lg:py-28 px-6 lg:px-14" style={{ background: "var(--bg)" }}>
      {/* Anchor targets for each plan */}
      {PLANS.map((p) => (
        <span key={p.key} id={`cruise-plans-${p.key}`} className="absolute" style={{ top: "-80px" }} />
      ))}
      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <div className="mb-12">
          <p className="text-[12px] tracking-[0.25em] uppercase mb-4 font-manrope font-medium" style={{ color: "var(--accent-light)" }}>
            {lang === "de" ? "Angebote 2026" : "Plans 2026"}
          </p>
          <h2 className="font-manrope font-bold leading-tight" style={{ fontSize: "clamp(2.5rem, 3.2vw, 3.75rem)", color: "var(--text)" }}>
            CRUISE PLAN
          </h2>
        </div>

        {/* Tabs */}
        <div className="flex gap-0 mb-12" style={{ borderBottom: "1px solid var(--border)" }}>
          {PLANS.map((p, i) => (
            <button
              key={p.key}
              onClick={() => setActive(i)}
              className="relative pb-4 mr-8 text-left transition-colors duration-200"
            >
              <span
                className="font-manrope text-[12px] tracking-[0.2em] uppercase font-medium transition-colors duration-200 whitespace-nowrap"
                style={{ color: active === i ? "var(--text)" : "var(--text-muted)" }}
              >
                {lang === "de" ? p.labelDe : p.labelEn}
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
                {lang === "de" ? plan.tagDe : plan.tagEn}
              </span>

              <h3 className="font-manrope font-bold mb-4" style={{ fontSize: "1.6rem", color: "var(--text)" }}>
                {lang === "de" ? plan.labelDe : plan.labelEn}
              </h3>

              <p className="font-manrope font-light text-base leading-relaxed mb-8" style={{ color: "var(--text-secondary)" }}>
                {lang === "de" ? plan.descriptionDe : plan.descriptionEn}
              </p>

              <a
                href="#contact"
                className="inline-flex items-center gap-2.5 font-manrope font-semibold text-[13px] tracking-[0.08em] uppercase px-7 py-3.5 transition-all duration-300"
                style={{ background: "var(--accent)", color: "#fff", boxShadow: "0 4px 20px rgba(0,75,145,0.35)", borderRadius: "8px" }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "var(--accent-hover)"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "var(--accent)"; }}
              >
                {lang === "de" ? "Anfragen" : "Get in touch"}
              </a>
            </div>

            {/* Placeholder for PDF / dates */}
            <div
              className="lg:w-72 flex items-center justify-center rounded-xl"
              style={{ minHeight: "200px", background: "var(--surface)", border: "1px dashed var(--border)" }}
            >
              <p className="font-manrope text-[12px] tracking-[0.15em] uppercase text-center" style={{ color: "var(--text-muted)" }}>
                {lang === "de" ? "Termine / PDF\nfolgt in Kürze" : "Dates / PDF\ncoming soon"}
              </p>
            </div>
          </motion.div>
        </AnimatePresence>

      </div>
    </section>
  );
}
