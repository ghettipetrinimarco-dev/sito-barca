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
    <section id="ventum-story" className="py-16 md:py-24 lg:py-32 relative overflow-hidden" style={{ background: "var(--surface)" }}>
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 px-6 lg:px-14 items-center">
        {/* Text */}
        <motion.div
          ref={ref}
          className="flex flex-col justify-center"
          initial={{ opacity: 0, x: -36 }}
          animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -36 }}
          transition={{ duration: 0.95, ease }}
        >
          <p className="text-[12px] tracking-[0.25em] uppercase mb-4 font-light" style={{ color: "var(--accent-light)" }}>
            {tr.label}
          </p>
          <h2
            className="font-manrope font-bold tracking-tight mb-8"
            style={{ fontSize: "clamp(2rem, 4vw, 3.25rem)", color: "var(--text)" }}
          >
            {tr.title}
          </h2>

          <p className="text-lg font-light leading-relaxed" style={{ color: "var(--text-secondary)" }}>
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
                className="px-5 py-5 transition-colors duration-200"
                style={{ border: "1px solid var(--border)", background: "var(--bg)", borderRadius: "10px" }}
                onMouseEnter={(e) => (e.currentTarget as HTMLElement).style.background = "var(--surface-alt)"}
                onMouseLeave={(e) => (e.currentTarget as HTMLElement).style.background = "var(--bg)"}
              >
                <p className="text-[11px] tracking-[0.15em] uppercase mb-3 font-manrope" style={{ color: "var(--text-muted)" }}>
                  {stat.label}
                </p>
                <p className="font-manrope font-bold text-2xl" style={{ color: "var(--accent)", lineHeight: 1 }}>
                  <CountUpStat value={stat.value} inView={isInView} duration={2.4} />
                </p>
              </motion.div>
            ))}
          </div>

        </motion.div>

        {/* Image */}
        <motion.div
          className="relative overflow-hidden"
          style={{ borderRadius: 12, border: "1px solid var(--border)", aspectRatio: "4/3" }}
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
        </motion.div>
      </div>
    </section>
  );
}
