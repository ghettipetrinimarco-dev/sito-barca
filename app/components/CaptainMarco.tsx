"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import { useLang } from "../context/LanguageContext";
import { t } from "../translations";
import { CountUpStat } from "./CountUpStat";

const ease: [number, number, number, number] = [0.16, 1, 0.3, 1];

export default function CaptainMarco() {
  const { lang } = useLang();
  const tr = t[lang].captainMarco;

  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const qualRef = useRef<HTMLDivElement>(null);
  const qualInView = useInView(qualRef, { once: true, margin: "-60px" });

  return (
    <section id="captain-marco" className="relative overflow-hidden" style={{ background: "var(--surface)" }}>

      {/* ── Hero: full-bleed photo + text overlay ── */}
      <div className="relative min-h-[92vh] flex items-end">
        <Image
          src="/Marco-3.jpg"
          alt="Captain Marco"
          fill
          className="object-cover object-top"
          sizes="100vw"
          priority
        />
        {/* Gradient overlays */}
        <div className="absolute inset-0" style={{ background: "linear-gradient(to right, rgba(5,15,30,0.92) 0%, rgba(5,15,30,0.55) 50%, transparent 100%)" }} />
        <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(5,15,30,0.7) 0%, transparent 50%)" }} />

        {/* Text */}
        <motion.div
          ref={ref}
          className="relative px-8 lg:px-16 xl:px-20 pb-16 lg:pb-24 max-w-2xl"
          initial={{ opacity: 0, y: 32 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 32 }}
          transition={{ duration: 1, ease }}
        >
          <p className="text-[11px] tracking-[0.3em] uppercase mb-4 font-manrope font-light" style={{ color: "rgba(255,255,255,0.45)" }}>
            {tr.label}
          </p>
          <h2
            className="font-manrope font-bold text-white mb-5"
            style={{ fontSize: "clamp(2.2rem, 4vw, 3.5rem)", lineHeight: 1.05 }}
          >
            {tr.title}
          </h2>
          <p className="font-playfair italic text-lg mb-8" style={{ color: "rgba(255,255,255,0.6)" }}>
            {tr.quote}
          </p>

          {/* Stats row */}
          <div className="flex flex-wrap gap-8 mt-2">
            {tr.stats.map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 14 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }}
                transition={{ duration: 0.6, delay: 0.4 + i * 0.1, ease }}
              >
                <p className="font-manrope font-bold text-white" style={{ fontSize: "clamp(1.8rem, 3vw, 2.6rem)", lineHeight: 1 }}>
                  <CountUpStat value={stat.value} inView={isInView} duration={2.4} />
                </p>
                <p className="text-[10px] tracking-[0.18em] uppercase mt-1 font-manrope" style={{ color: "rgba(255,255,255,0.4)" }}>
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* ── Bio + qualifications ── */}
      <div className="px-8 lg:px-16 xl:px-20 py-20 lg:py-28 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-20">

          {/* Bio */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -24 }}
            transition={{ duration: 0.9, delay: 0.2, ease }}
            className="space-y-5"
          >
            <p className="leading-relaxed font-light" style={{ color: "var(--text-secondary)" }}>{tr.p1}</p>
            <p className="leading-relaxed font-light" style={{ color: "var(--text-secondary)" }}>{tr.p2}</p>
            <p className="font-playfair italic text-sm pt-2" style={{ color: "var(--text-muted)" }}>{tr.motto}</p>
          </motion.div>

          {/* Host + Promise */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 24 }}
            transition={{ duration: 0.9, delay: 0.3, ease }}
            className="space-y-8"
          >
            <div className="pl-6" style={{ borderLeft: "2px solid var(--accent)" }}>
              <h3 className="font-manrope text-sm tracking-[0.18em] uppercase mb-3 font-semibold" style={{ color: "var(--text)" }}>
                {tr.host.title}
              </h3>
              <p className="font-light text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>{tr.host.text}</p>
            </div>
            <div className="pl-6" style={{ borderLeft: "2px solid var(--border)" }}>
              <h3 className="font-manrope text-sm tracking-[0.18em] uppercase mb-3 font-semibold" style={{ color: "var(--text)" }}>
                {tr.promise.title}
              </h3>
              <p className="font-light text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>{tr.promise.text}</p>
            </div>
          </motion.div>
        </div>

        {/* Qualifications as tags */}
        <motion.div
          ref={qualRef}
          initial={{ opacity: 0, y: 24 }}
          animate={qualInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
          transition={{ duration: 0.9, ease }}
        >
          <p className="text-[11px] tracking-[0.3em] uppercase mb-6 font-manrope font-medium" style={{ color: "var(--text-secondary)" }}>
            {tr.qualLabel}
          </p>
          <div className="flex flex-wrap gap-2">
            {tr.qualifications.map((qual, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={qualInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4, delay: i * 0.05, ease }}
                className="font-manrope font-light text-[12px] tracking-[0.06em] px-4 py-2"
                style={{
                  border: "1px solid var(--border)",
                  borderRadius: "6px",
                  color: "var(--text-secondary)",
                  background: "var(--bg)",
                }}
              >
                {qual}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
