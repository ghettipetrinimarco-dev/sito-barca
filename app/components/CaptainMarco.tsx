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
    <section id="captain-marco" className="py-16 md:py-24 lg:py-32 px-6 lg:px-14 overflow-hidden" style={{ background: "var(--surface)" }}>
      <div className="max-w-7xl mx-auto">

        {/* ── Header ── */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 28 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 28 }}
          transition={{ duration: 0.9, ease }}
          className="mb-16"
        >
          <p className="text-[12px] tracking-[0.25em] uppercase mb-4 font-light" style={{ color: "var(--accent-light)" }}>
            {tr.label}
          </p>
          <h2 className="font-manrope font-bold tracking-tight" style={{ fontSize: "clamp(2rem, 4vw, 3.25rem)", color: "var(--text)" }}>
            {tr.title}
          </h2>
        </motion.div>

        {/* ── Photo + Bio ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 mb-24 items-start">

          {/* Photo */}
          <motion.div
            initial={{ opacity: 0, x: -28 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -28 }}
            transition={{ duration: 0.95, ease }}
            className="relative overflow-hidden"
            style={{ borderRadius: 12, border: "1px solid var(--border)" }}
          >
            <Image
              src="/Marco-3.jpg"
              alt="Captain Marco"
              width={800}
              height={1100}
              className="w-full h-auto"
              style={{ display: "block" }}
              sizes="50vw"
              priority
            />
          </motion.div>

          {/* Text */}
          <motion.div
            initial={{ opacity: 0, x: 28 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 28 }}
            transition={{ duration: 0.95, delay: 0.15, ease }}
            className="flex flex-col justify-start pt-2"
          >
            <p className="text-xl mb-8 font-light" style={{ color: "var(--text-secondary)" }}>
              {tr.quote}
            </p>

            <div className="space-y-5 mb-10">
              <p className="leading-relaxed font-light" style={{ color: "var(--text-secondary)" }}>{tr.p1}</p>
              <p className="leading-relaxed font-light" style={{ color: "var(--text-secondary)" }}>{tr.p2}</p>
              <p className="font-playfair italic text-sm pt-2" style={{ color: "var(--accent)" }}>{tr.motto}</p>
            </div>

            <div className="space-y-8 mb-12">
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
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-3">
              {tr.stats.map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 14 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }}
                  transition={{ duration: 0.6, delay: 0.4 + i * 0.08, ease }}
                  className="px-5 py-5"
                  style={{ border: "1px solid var(--border)", borderRadius: 10, background: "var(--bg)" }}
                >
                  <p className="font-manrope font-bold text-2xl" style={{ color: "var(--accent)" }}>
                    <CountUpStat value={stat.value} inView={isInView} duration={2.4} />
                  </p>
                  <p className="text-[11px] tracking-[0.12em] uppercase mt-1 font-manrope" style={{ color: "var(--text-muted)" }}>
                    {stat.label}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* ── Qualifications ── */}
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
                style={{ border: "1px solid var(--border)", borderRadius: 6, color: "var(--text-secondary)", background: "var(--bg)" }}
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
