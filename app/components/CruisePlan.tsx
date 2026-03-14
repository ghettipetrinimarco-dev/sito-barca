"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const easeOut = [0.16, 1, 0.3, 1];

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
    <section id="cruise-plan" className="py-32 px-6 lg:px-14 relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 28 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 28 }}
          transition={{ duration: 0.9, ease: easeOut }}
          className="mb-16"
        >
          <p
            className="text-[10px] tracking-[0.45em] uppercase mb-4 font-light"
            style={{ color: "var(--accent-light)" }}
          >
            Mediterranean 2026
          </p>
          <h2
            className="font-manrope font-bold text-white tracking-tight mb-6"
            style={{ fontSize: "clamp(2rem, 4vw, 3.25rem)" }}
          >
            CRUISE PLAN 2026
          </h2>
          <span className="accent-line mb-8" />
          <p
            className="text-lg font-light leading-relaxed mt-8"
            style={{ color: "rgba(255,255,255,0.45)", maxWidth: "760px" }}
          >
            We start in May in La Ràpita and end our journey in Bizerte. A long
            stopover takes us to the Balearic Islands — Mallorca, Menorca,
            Cabrera, Ibiza, and Formentera, the pearls of the Mediterranean. In
            September we continue to Olbia and Cagliari in Sardinia, before
            departing for Tunisia at the end of September for winter.
          </p>
        </motion.div>

        {/* Route Timeline */}
        <div className="relative">
          {/* Desktop */}
          <div className="hidden lg:block">
            <motion.div
              initial={{ scaleX: 0 }}
              animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
              transition={{ duration: 1.6, delay: 0.4, ease: "easeInOut" }}
              className="absolute top-[1.85rem] left-0 right-0 h-px origin-left"
              style={{ background: "linear-gradient(90deg, var(--accent), var(--accent-light), var(--accent))" }}
            />
            <div className="grid grid-cols-9 gap-0">
              {stops.map((stop, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 18 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
                  transition={{ duration: 0.65, delay: 0.3 + index * 0.11, ease: easeOut }}
                  className="flex flex-col items-center"
                >
                  <div
                    className="relative z-10 w-4 h-4 rounded-full mb-5 flex-shrink-0"
                    style={{
                      background: "var(--accent-light)",
                      border: "2px solid rgba(255,255,255,0.5)",
                      boxShadow: "0 0 14px rgba(0,104,198,0.7)",
                    }}
                  />
                  <div className="text-center px-1">
                    <p className="text-[9px] tracking-[0.25em] uppercase mb-1" style={{ color: "var(--accent-light)" }}>
                      {stop.month}
                    </p>
                    <p className="text-sm font-manrope font-semibold text-white leading-tight">
                      {stop.name}
                    </p>
                    <p className="text-[10px] mt-1 leading-tight" style={{ color: "rgba(255,255,255,0.3)" }}>
                      {stop.country}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Mobile */}
          <div className="lg:hidden relative pl-8">
            <div
              className="absolute left-2 top-0 bottom-0 w-px"
              style={{ background: "linear-gradient(to bottom, var(--accent), rgba(0,104,198,0.1))" }}
            />
            {stops.map((stop, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -18 }}
                animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -18 }}
                transition={{ duration: 0.6, delay: 0.2 + index * 0.09, ease: easeOut }}
                className="relative flex items-start gap-6 pb-8 last:pb-0"
              >
                <div
                  className="absolute left-[-24px] top-1 w-3 h-3 rounded-full flex-shrink-0"
                  style={{
                    background: "var(--accent-light)",
                    border: "1px solid rgba(255,255,255,0.4)",
                    boxShadow: "0 0 8px rgba(0,104,198,0.7)",
                  }}
                />
                <div>
                  <span className="text-[10px] tracking-[0.25em] uppercase" style={{ color: "var(--accent-light)" }}>
                    {stop.month}
                  </span>
                  <p className="text-base font-manrope font-semibold text-white">{stop.name}</p>
                  <p className="text-xs" style={{ color: "rgba(255,255,255,0.3)" }}>{stop.country}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Route summary */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
          transition={{ duration: 0.8, delay: 1.4, ease: easeOut }}
          className="mt-16 p-8"
          style={{
            border: "1px solid rgba(255,255,255,0.06)",
            background: "rgba(255,255,255,0.02)",
          }}
        >
          <div className="flex flex-wrap items-center gap-3">
            {stops.map((stop, index) => (
              <span key={index} className="flex items-center gap-3">
                <span className="text-sm font-light" style={{ color: "rgba(255,255,255,0.65)" }}>
                  {stop.name}
                </span>
                {index < stops.length - 1 && (
                  <svg className="w-3.5 h-3.5 flex-shrink-0" style={{ color: "rgba(0,104,198,0.5)" }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M17 8l4 4m0 0l-4 4m4-4H3" />
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
