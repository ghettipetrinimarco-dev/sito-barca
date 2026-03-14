"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useLang } from "../context/LanguageContext";
import { t } from "../translations";

const ease: [number, number, number, number] = [0.16, 1, 0.3, 1];

export default function CaptainMarco() {
  const { lang } = useLang();
  const tr = t[lang].captainMarco;

  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const qualRef = useRef<HTMLDivElement>(null);
  const qualInView = useInView(qualRef, { once: true, margin: "-60px" });

  return (
    <section id="captain-marco" className="py-32 px-6 lg:px-14" style={{ background: "#fff" }}>
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 28 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 28 }}
          transition={{ duration: 0.9, ease }}
          className="mb-16"
        >
          <p className="text-[10px] tracking-[0.45em] uppercase mb-4 font-light" style={{ color: "var(--accent-light)" }}>
            {tr.label}
          </p>
          <h2
            className="font-manrope font-bold tracking-tight mb-6"
            style={{ fontSize: "clamp(2rem, 4vw, 3.25rem)", color: "var(--text)" }}
          >
            {tr.title}
          </h2>
          <span className="accent-line mb-8" />
          <p className="font-playfair italic text-xl mt-8 max-w-2xl" style={{ color: "var(--text-secondary)" }}>
            {tr.quote}
          </p>
        </motion.div>

        {/* Bio text */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-24">
          <motion.div
            initial={{ opacity: 0, x: -28 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -28 }}
            transition={{ duration: 0.9, delay: 0.2, ease }}
            className="space-y-5"
          >
            <p className="leading-relaxed font-light" style={{ color: "var(--text-secondary)" }}>
              {tr.p1}
            </p>
            <p className="leading-relaxed font-light" style={{ color: "var(--text-secondary)" }}>
              {tr.p2}
            </p>
            <p className="font-playfair italic text-sm pt-2" style={{ color: "var(--text-muted)" }}>
              {tr.motto}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 28 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 28 }}
            transition={{ duration: 0.9, delay: 0.3, ease }}
            className="space-y-8"
          >
            <div className="pl-6" style={{ borderLeft: "2px solid var(--accent)" }}>
              <h3 className="font-manrope text-sm tracking-[0.18em] uppercase mb-3 font-semibold" style={{ color: "var(--text)" }}>
                {tr.host.title}
              </h3>
              <p className="font-light text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                {tr.host.text}
              </p>
            </div>
            <div className="pl-6" style={{ borderLeft: "2px solid var(--border)" }}>
              <h3 className="font-manrope text-sm tracking-[0.18em] uppercase mb-3 font-semibold" style={{ color: "var(--text)" }}>
                {tr.promise.title}
              </h3>
              <p className="font-light text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                {tr.promise.text}
              </p>
            </div>
          </motion.div>
        </div>

        {/* Stats */}
        <div
          className="grid grid-cols-2 lg:grid-cols-4 mb-24"
          style={{ borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)" }}
        >
          {tr.stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
              transition={{ duration: 0.7, delay: 0.1 + i * 0.1, ease }}
              className="py-12 px-6 text-center"
              style={{
                borderRight: i < tr.stats.length - 1 ? "1px solid var(--border)" : "none",
              }}
            >
              <p
                className="font-manrope font-bold mb-2"
                style={{ fontSize: "clamp(2.2rem, 4vw, 3.5rem)", color: "var(--accent)" }}
              >
                {stat.value}
              </p>
              <p
                className="text-[11px] tracking-[0.15em] uppercase font-light"
                style={{ color: "var(--text-secondary)" }}
              >
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Qualifications */}
        <motion.div
          ref={qualRef}
          initial={{ opacity: 0, y: 24 }}
          animate={qualInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
          transition={{ duration: 0.9, ease }}
        >
          <p
            className="text-[10px] tracking-[0.45em] uppercase mb-8 text-center font-manrope font-medium"
            style={{ color: "var(--text-secondary)" }}
          >
            {tr.qualLabel}
          </p>

          <div className="max-w-2xl mx-auto">
            {tr.qualifications.map((qual, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 12 }}
                animate={qualInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
                transition={{ duration: 0.5, delay: 0.1 + index * 0.08, ease }}
              >
                <div
                  className="py-4 text-sm font-light"
                  style={{ color: "var(--text-secondary)", borderBottom: "1px solid var(--border-light)" }}
                >
                  {qual}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  );
}
