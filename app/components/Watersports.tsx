"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import { useLang } from "../context/LanguageContext";
import { t } from "../translations";

const ease: [number, number, number, number] = [0.16, 1, 0.3, 1];

const activities = ["Wingfoil", "Wakeboard", "Water Ski", "Shock Wave", "Snorkeling", "Diving", "Fishing"];

export default function Watersports() {
  const { lang } = useLang();
  const tr = t[lang].watersports;

  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="watersports" className="py-0 relative overflow-hidden" style={{ background: "var(--surface-alt)" }}>
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
          <p className="text-[10px] tracking-[0.45em] uppercase mb-4 font-light" style={{ color: "var(--accent-light)" }}>
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
                initial={{ opacity: 0, y: 14, scale: 0.96 }}
                animate={isInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 14, scale: 0.96 }}
                transition={{ duration: 0.5, delay: 0.3 + index * 0.06, ease }}
                className="px-5 py-2.5 text-[11px] tracking-[0.2em] uppercase font-manrope font-medium cursor-default transition-all duration-300"
                style={{
                  border: "1px solid var(--border)",
                  color: "var(--text-secondary)",
                  background: "var(--surface)",
                  borderRadius: "1px",
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.color = "var(--accent)";
                  el.style.borderColor = "var(--accent-light)";
                  el.style.background = "#eef4fb";
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.color = "var(--text-secondary)";
                  el.style.borderColor = "var(--border)";
                  el.style.background = "var(--surface)";
                }}
              >
                {activity}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
