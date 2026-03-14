"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import { useLang } from "../context/LanguageContext";
import { t } from "../translations";
import { CountUpStat } from "./CountUpStat";

const ease: [number, number, number, number] = [0.16, 1, 0.3, 1];

export default function VentumStory() {
  const { lang } = useLang();
  const tr = t[lang].ventumStory;

  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="ventum-story" className="py-0 relative overflow-hidden" style={{ background: "var(--surface)" }}>
      <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[600px]">
        {/* Text */}
        <motion.div
          ref={ref}
          className="flex flex-col justify-center px-12 lg:px-16 xl:px-20 py-24"
          initial={{ opacity: 0, x: -36 }}
          animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -36 }}
          transition={{ duration: 0.95, ease }}
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

          <p className="text-lg font-light leading-relaxed mt-2" style={{ color: "var(--text-secondary)" }}>
            {tr.p1}
          </p>
          <p className="text-lg font-light leading-relaxed mt-6" style={{ color: "var(--text-secondary)" }}>
            {tr.p2}
          </p>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-4 mt-12">
            {tr.stats.map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 14 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }}
                transition={{ duration: 0.6, delay: 0.4 + i * 0.08, ease }}
                className="p-4"
                style={{ border: "1px solid var(--border)", background: "var(--bg)" }}
              >
                <p className="font-manrope font-bold text-2xl" style={{ color: "var(--accent)" }}>
                  <CountUpStat value={stat.value} inView={isInView} duration={2.4} />
                </p>
                <p className="text-[10px] tracking-[0.2em] uppercase mt-1" style={{ color: "var(--text-muted)" }}>{stat.label}</p>
              </motion.div>
            ))}
          </div>

          <motion.a
            href="#captain-marco"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="inline-flex items-center gap-3 mt-10 text-[10px] tracking-[0.22em] uppercase font-manrope pb-1 transition-all duration-300 self-start"
            style={{ color: "var(--accent)", borderBottom: "1px solid rgba(0,75,145,0.3)" }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.borderBottomColor = "var(--accent)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.borderBottomColor = "rgba(0,75,145,0.3)";
            }}
          >
            {tr.cta}
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </motion.a>
        </motion.div>

        {/* Image */}
        <motion.div
          className="relative overflow-hidden"
          style={{ minHeight: "500px" }}
          initial={{ opacity: 0, x: 36 }}
          animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 36 }}
          transition={{ duration: 0.95, delay: 0.2, ease }}
        >
          <Image
            src="/Yacht.jpg"
            alt="Ventum catamaran at sunset"
            fill
            className="object-cover"
          />
          <div
            className="absolute inset-0"
            style={{ background: "linear-gradient(to left, transparent 60%, var(--surface) 100%)" }}
          />
        </motion.div>
      </div>
    </section>
  );
}
