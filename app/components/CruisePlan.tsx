"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const ease = [0.16, 1, 0.3, 1];

const stops = [
  { name: "La Ràpita", country: "Spain", month: "May" },
  { name: "Mallorca", country: "Balearic Islands", month: "Jun" },
  { name: "Menorca", country: "Balearic Islands", month: "Jun" },
  { name: "Cabrera", country: "Balearic Islands", month: "Jul" },
  { name: "Ibiza", country: "Balearic Islands", month: "Jul" },
  { name: "Formentera", country: "Balearic Islands", month: "Aug" },
  { name: "Olbia", country: "Sardinia", month: "Sep" },
  { name: "Cagliari", country: "Sardinia", month: "Sep" },
  { name: "Bizerte", country: "Tunisia", month: "Oct" },
];

export default function CruisePlan() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="cruise-plan" className="py-32 px-6 lg:px-14 relative" style={{ background: "var(--bg)" }}>
      <div className="max-w-7xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 28 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 28 }}
          transition={{ duration: 0.9, ease }}
          className="mb-16"
        >
          <p className="text-[10px] tracking-[0.45em] uppercase mb-4 font-light" style={{ color: "var(--accent-light)" }}>
            Mediterranean 2026
          </p>
          <h2
            className="font-manrope font-bold tracking-tight mb-6"
            style={{ fontSize: "clamp(2rem, 4vw, 3.25rem)", color: "var(--text)" }}
          >
            CRUISE PLAN 2026
          </h2>
          <span className="accent-line mb-8" />
          <p className="text-lg font-light leading-relaxed mt-8" style={{ color: "var(--text-secondary)", maxWidth: "760px" }}>
            We start in May in La Ràpita and end our journey in Bizerte. A long
            stopover takes us to the Balearic Islands — Mallorca, Menorca,
            Cabrera, Ibiza, and Formentera, the pearls of the Mediterranean. In
            September we continue to Sardinia, before departing for Tunisia for winter.
          </p>
        </motion.div>

        {/* Desktop timeline */}
        <div className="hidden lg:block relative mb-16">
          <motion.div
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
            transition={{ duration: 1.6, delay: 0.4, ease: "easeInOut" }}
            className="absolute top-[1.75rem] left-0 right-0 h-px origin-left"
            style={{ background: "linear-gradient(90deg, var(--accent), var(--accent-light), var(--accent))" }}
          />
          <div className="grid grid-cols-9 gap-0">
            {stops.map((stop, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 16 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
                transition={{ duration: 0.6, delay: 0.3 + index * 0.1, ease }}
                className="flex flex-col items-center"
              >
                <div
                  className="relative z-10 w-3.5 h-3.5 rounded-full mb-5 flex-shrink-0"
                  style={{
                    background: "var(--accent)",
                    border: "2px solid white",
                    boxShadow: "0 0 0 2px var(--accent), 0 4px 12px rgba(0,75,145,0.3)",
                  }}
                />
                <div className="text-center px-1">
                  <p className="text-[9px] tracking-[0.25em] uppercase mb-1 font-medium" style={{ color: "var(--accent)" }}>
                    {stop.month}
                  </p>
                  <p className="text-sm font-manrope font-semibold leading-tight" style={{ color: "var(--text)" }}>
                    {stop.name}
                  </p>
                  <p className="text-[10px] mt-1 leading-tight" style={{ color: "var(--text-muted)" }}>
                    {stop.country}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Mobile timeline */}
        <div className="lg:hidden relative pl-8 mb-16">
          <div
            className="absolute left-2 top-0 bottom-0 w-px"
            style={{ background: "linear-gradient(to bottom, var(--accent), rgba(0,75,145,0.1))" }}
          />
          {stops.map((stop, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -16 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -16 }}
              transition={{ duration: 0.6, delay: 0.15 + index * 0.08, ease }}
              className="relative flex items-start gap-6 pb-7 last:pb-0"
            >
              <div
                className="absolute left-[-24px] top-1 w-3 h-3 rounded-full flex-shrink-0"
                style={{ background: "var(--accent)", border: "2px solid white", boxShadow: "0 0 0 2px var(--accent)" }}
              />
              <div>
                <span className="text-[10px] tracking-[0.25em] uppercase font-medium" style={{ color: "var(--accent)" }}>
                  {stop.month}
                </span>
                <p className="font-manrope font-semibold" style={{ color: "var(--text)" }}>{stop.name}</p>
                <p className="text-xs" style={{ color: "var(--text-muted)" }}>{stop.country}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Route summary */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
          transition={{ duration: 0.8, delay: 1.4, ease }}
          className="p-8"
          style={{ border: "1px solid var(--border)", background: "var(--surface)" }}
        >
          <div className="flex flex-wrap items-center gap-3">
            {stops.map((stop, index) => (
              <span key={index} className="flex items-center gap-3">
                <span className="text-sm font-light" style={{ color: "var(--text-secondary)" }}>{stop.name}</span>
                {index < stops.length - 1 && (
                  <svg className="w-3 h-3 flex-shrink-0" style={{ color: "var(--accent-light)" }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                )}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
