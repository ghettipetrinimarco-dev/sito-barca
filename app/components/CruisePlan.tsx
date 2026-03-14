"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

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
    <section id="cruise-plan" className="py-32 px-6 lg:px-12 relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <p className="text-xs tracking-[0.4em] uppercase text-blue-500 mb-4">
            Mediterranean 2026
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight mb-6">
            CRUISE PLAN 2026
          </h2>
          <div className="h-px w-16 bg-blue-500 mb-8" />
          <p className="text-lg text-white/50 max-w-3xl font-light leading-relaxed">
            We start in May in La Ràpita and end our journey in Bizerte. A long
            stopover takes us to the Balearic Islands — Mallorca, Menorca,
            Cabrera, Ibiza, and Formentera, the pearls of the Mediterranean. In
            September we continue to Olbia and Cagliari in Sardinia, before
            departing for Tunisia at the end of September for winter.
          </p>
        </motion.div>

        {/* Route Timeline */}
        <div className="relative">
          {/* Desktop: horizontal timeline */}
          <div className="hidden lg:block">
            {/* Line */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
              transition={{ duration: 1.5, delay: 0.4, ease: "easeInOut" }}
              className="absolute top-8 left-0 right-0 h-px bg-gradient-to-r from-blue-600 via-blue-400 to-blue-600 origin-left"
            />

            <div className="grid grid-cols-9 gap-0">
              {stops.map((stop, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{
                    duration: 0.6,
                    delay: 0.3 + index * 0.12,
                  }}
                  className="flex flex-col items-center"
                >
                  {/* Dot */}
                  <div className="relative z-10 w-4 h-4 rounded-full bg-blue-500 border-2 border-blue-300 shadow-[0_0_12px_rgba(37,99,235,0.8)] mb-4 flex-shrink-0" />

                  {/* Stop info */}
                  <div className="text-center px-1">
                    <p className="text-xs tracking-widest uppercase text-blue-400 mb-1">
                      {stop.month}
                    </p>
                    <p className="text-sm font-semibold text-white leading-tight">
                      {stop.name}
                    </p>
                    <p className="text-xs text-white/30 mt-1 leading-tight">
                      {stop.country}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Mobile: vertical timeline */}
          <div className="lg:hidden relative pl-8">
            <div className="absolute left-2 top-0 bottom-0 w-px bg-gradient-to-b from-blue-600 to-blue-600/10" />

            {stops.map((stop, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                transition={{
                  duration: 0.6,
                  delay: 0.2 + index * 0.1,
                }}
                className="relative flex items-start gap-6 pb-8 last:pb-0"
              >
                {/* Dot */}
                <div className="absolute left-[-24px] top-1 w-3 h-3 rounded-full bg-blue-500 border border-blue-300 shadow-[0_0_8px_rgba(37,99,235,0.8)] flex-shrink-0" />

                <div>
                  <span className="text-xs tracking-widest uppercase text-blue-400">
                    {stop.month}
                  </span>
                  <p className="text-base font-semibold text-white">{stop.name}</p>
                  <p className="text-xs text-white/30">{stop.country}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Route summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8, delay: 1.4 }}
          className="mt-16 p-8 border border-white/5 bg-white/[0.02]"
        >
          <div className="flex flex-wrap items-center gap-3 text-sm">
            {stops.map((stop, index) => (
              <span key={index} className="flex items-center gap-3">
                <span className="text-white/70 font-light">{stop.name}</span>
                {index < stops.length - 1 && (
                  <svg className="w-4 h-4 text-blue-500/50 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
