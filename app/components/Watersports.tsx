"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useLang } from "../context/LanguageContext";
import { t } from "../translations";

const ease: [number, number, number, number] = [0.16, 1, 0.3, 1];

const activities = [
  "Wingfoil",
  "Wakeboard",
  "Water Ski",
  "Shock Wave",
  "Snorkeling",
  "Diving",
  "Fishing",
];

const ACTIVITY_IMAGES: Record<string, string> = {
  Wingfoil:    "/wingfoil.jpg",
  Wakeboard:   "/wakeboard.jpeg",
  "Water Ski": "/water-ski.jpg",
  "Shock Wave":"/shockwave.jpg",
  Snorkeling:  "/snorkeling.jpg",
  Diving:      "/diving.jpeg",
  Fishing:     "/fishing.jpeg",
};

export default function Watersports() {
  const { lang } = useLang();
  const tr = t[lang].watersports;

  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  const [activeActivity, setActiveActivity] = useState<string | null>(null);

  return (
    <section id="watersports" className="py-0 relative overflow-x-hidden" style={{ background: "var(--surface-alt)" }}>
      <div className="grid grid-cols-1 lg:grid-cols-2">

        {/* Image panel */}
        <motion.div
          className="relative overflow-hidden"
          style={{ minHeight: "520px" }}
          initial={{ opacity: 0, x: -40 }}
          animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -40 }}
          transition={{ duration: 1.0, ease }}
        >
          <Image
            src="/Watersports.jpg"
            alt="Snorkeling in the Mediterranean"
            fill
            className="object-cover"
          />
          <div
            className="absolute inset-0"
            style={{ background: "linear-gradient(to right, transparent 60%, var(--surface-alt) 100%)" }}
          />
        </motion.div>

        {/* Text panel */}
        <motion.div
          ref={ref}
          className="flex flex-col justify-center px-12 lg:px-16 py-24"
          initial={{ opacity: 0, x: 40 }}
          animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 40 }}
          transition={{ duration: 1.0, delay: 0.15, ease }}
        >
          <p className="text-[12px] tracking-[0.25em] uppercase mb-4 font-light" style={{ color: "var(--accent-light)" }}>
            {tr.label}
          </p>
          <h2
            className="font-manrope font-bold tracking-tight mb-6"
            style={{ fontSize: "clamp(2rem, 3.5vw, 3rem)", color: "var(--text)" }}
          >
            {tr.title}
          </h2>
          <span className="accent-line mb-8" />
          <p className="text-lg font-light leading-relaxed mb-12" style={{ color: "var(--text-secondary)" }}>
            {tr.description}
          </p>

          <div className="flex flex-wrap gap-3">
            {activities.map((activity, index) => (
              <motion.div
                key={index}
                className="relative"
                initial={{ opacity: 0, y: 14, scale: 0.96 }}
                animate={isInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 14, scale: 0.96 }}
                transition={{ duration: 0.5, delay: 0.3 + index * 0.06, ease }}
              >
                {/* Speech bubble */}
                <AnimatePresence>
                  {activeActivity === activity && (
                    <motion.div
                      className="absolute z-50 pointer-events-none"
                      style={{
                        bottom: "calc(100% + 14px)",
                        left: "50%",
                        x: "-50%",
                        transformOrigin: "bottom center",
                      }}
                      initial={{ opacity: 0, scale: 0.68, y: 8 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.68, y: 8 }}
                      transition={{ duration: 0.22, ease }}
                    >
                      <div
                        className="relative overflow-hidden shadow-2xl"
                        style={{
                          width: "clamp(200px, 16vw, 260px)",
                          aspectRatio: "3 / 2",
                          borderRadius: "10px",
                          border: "2px solid rgba(255,255,255,0.88)",
                        }}
                      >
                        <Image
                          src={ACTIVITY_IMAGES[activity]}
                          alt={activity}
                          fill
                          className="object-cover"
                          sizes="260px"
                        />
                      </div>
                      {/* Tail */}
                      <div
                        className="absolute left-1/2 -translate-x-1/2"
                        style={{
                          top: "100%",
                          width: 0,
                          height: 0,
                          borderLeft: "8px solid transparent",
                          borderRight: "8px solid transparent",
                          borderTop: "9px solid rgba(255,255,255,0.88)",
                        }}
                      />
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Tag */}
                <div
                  className="px-5 py-2.5 text-[13px] tracking-[0.08em] uppercase font-manrope font-medium cursor-default transition-all duration-300 select-none"
                  style={{
                    border: "1px solid var(--border)",
                    color: activeActivity === activity ? "var(--accent)" : "var(--text-secondary)",
                    background: activeActivity === activity ? "#eef4fb" : "var(--surface)",
                    borderColor: activeActivity === activity ? "var(--accent-light)" : "var(--border)",
                    borderRadius: "20px",
                  }}
                  onMouseEnter={() => setActiveActivity(activity)}
                  onMouseLeave={() => setActiveActivity(null)}
                  onClick={() => setActiveActivity(activeActivity === activity ? null : activity)}
                >
                  {activity}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  );
}
