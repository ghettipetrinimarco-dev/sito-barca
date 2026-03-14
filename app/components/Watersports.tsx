"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const easeOut = [0.16, 1, 0.3, 1];

const activities = [
  "Wingfoil",
  "Wakeboard",
  "Water Ski",
  "Shock Wave",
  "Snorkeling",
  "Diving",
  "Fishing",
];

export default function Watersports() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="watersports" className="py-32 px-6 lg:px-14 relative overflow-hidden">
      {/* Background accent */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse 80% 40% at 50% 50%, rgba(0,104,198,0.06) 0%, transparent 70%)",
        }}
      />

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 28 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 28 }}
          transition={{ duration: 0.9, ease: easeOut }}
          className="mb-16"
        >
          <p className="text-[10px] tracking-[0.45em] uppercase mb-4 font-light" style={{ color: "var(--accent-light)" }}>
            Adventure awaits
          </p>
          <h2
            className="font-manrope font-bold text-white tracking-tight mb-6"
            style={{ fontSize: "clamp(2rem, 4vw, 3.25rem)" }}
          >
            WATERSPORTS
          </h2>
          <span className="accent-line mb-8" />
          <p className="text-lg font-light leading-relaxed mt-8" style={{ color: "rgba(255,255,255,0.45)", maxWidth: "640px" }}>
            Our catamaran is not just for sailing. Whether you are looking for
            speed or want to enjoy the silence underwater, we have something for everyone.
          </p>
        </motion.div>

        <div className="flex flex-wrap gap-3 mt-10">
          {activities.map((activity, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 16, scale: 0.96 }}
              animate={isInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 16, scale: 0.96 }}
              transition={{ duration: 0.55, delay: 0.25 + index * 0.07, ease: easeOut }}
              className="px-6 py-3 text-[11px] tracking-[0.22em] uppercase font-manrope font-medium cursor-default transition-all duration-300"
              style={{
                border: "1px solid rgba(255,255,255,0.1)",
                color: "rgba(255,255,255,0.5)",
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.color = "#fff";
                el.style.borderColor = "rgba(0,104,198,0.5)";
                el.style.background = "rgba(0,104,198,0.1)";
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.color = "rgba(255,255,255,0.5)";
                el.style.borderColor = "rgba(255,255,255,0.1)";
                el.style.background = "transparent";
              }}
            >
              {activity}
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={isInView ? { opacity: 1, scaleX: 1 } : { opacity: 0, scaleX: 0 }}
          transition={{ duration: 1.4, delay: 0.9 }}
          className="mt-20 h-px origin-left"
          style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.08), transparent)" }}
        />
      </div>
    </section>
  );
}
