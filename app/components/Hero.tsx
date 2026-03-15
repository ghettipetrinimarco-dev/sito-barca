"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { useLang } from "../context/LanguageContext";
import { t } from "../translations";

const ease: [number, number, number, number] = [0.16, 1, 0.3, 1];

export default function Hero() {
  const { lang } = useLang();
  const tr = t[lang].hero;

  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const contentY = useTransform(scrollYProgress, [0, 0.5], ["0%", "8%"]);

  return (
    <section id="hero" ref={ref} className="relative min-h-screen flex items-center overflow-hidden">
      {/* Parallax background */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.img
          src="/Copertina.jpg"
          alt="Ventum catamaran sailing the Mediterranean"
          style={{
            y: imageY,
            scale: 1.25,
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "72% 55%",
          }}
        />
      </div>

      {/* Gradient overlays */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(105deg, rgba(5,15,30,0.65) 0%, rgba(5,15,30,0.35) 55%, rgba(5,15,30,0.08) 100%)",
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(to top, rgba(5,15,30,0.45) 0%, transparent 45%)",
        }}
      />

      {/* Content */}
      <motion.div
        className="relative z-10 max-w-7xl mx-auto px-6 lg:px-14 w-full pt-20 pb-36"
        style={{ opacity: contentOpacity, y: contentY }}
      >
        <div className="max-w-3xl">
          <motion.p
            className="text-[10px] tracking-[0.55em] uppercase font-light mb-7"
            style={{ color: "rgba(255,255,255,0.6)" }}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.2, ease }}
          >
            {tr.label}
          </motion.p>

          <motion.h1
            className="font-manrope font-bold text-white leading-[1.07] tracking-[-0.03em] mb-8"
            style={{ fontSize: "clamp(2.8rem, 7vw, 6.5rem)" }}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.0, delay: 0.35, ease }}
          >
            {tr.title1}
            <br />
            {tr.title2}{" "}
            <span
              style={{
                background: "linear-gradient(120deg, #7ab8f5 0%, #c8e4ff 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              {tr.titleAccent}
            </span>
            <br />
            {tr.title3}
          </motion.h1>

          <motion.p
            className="font-playfair italic text-xl md:text-2xl font-light mb-3"
            style={{ color: "rgba(255,255,255,0.5)" }}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.55, ease }}
          >
            {tr.subtitle}
          </motion.p>

          <motion.p
            className="text-sm font-light leading-relaxed mb-10"
            style={{ color: "rgba(255,255,255,0.38)" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.9, delay: 0.7, ease }}
          >
            {tr.sub2}
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-4"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.85, ease }}
          >
            <a
              href="#cruise-plan"
              className="group inline-flex items-center gap-3 text-white font-manrope font-semibold text-[11px] tracking-[0.2em] uppercase px-9 py-4 transition-all duration-300"
              style={{
                background: "var(--accent)",
                boxShadow: "0 4px 24px rgba(0,75,145,0.45)",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.background = "var(--accent-hover)";
                (e.currentTarget as HTMLElement).style.boxShadow = "0 6px 36px rgba(0,75,145,0.6)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.background = "var(--accent)";
                (e.currentTarget as HTMLElement).style.boxShadow = "0 4px 24px rgba(0,75,145,0.45)";
              }}
            >
              {tr.cta1}
              <svg
                className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1.5"
                fill="none" stroke="currentColor" viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
            <a
              href="#services"
              className="inline-flex items-center font-manrope font-light text-[11px] tracking-[0.2em] uppercase px-9 py-4 border transition-all duration-300"
              style={{ color: "rgba(255,255,255,0.8)", borderColor: "rgba(255,255,255,0.3)" }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.7)";
                (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.08)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.3)";
                (e.currentTarget as HTMLElement).style.background = "transparent";
              }}
            >
              {tr.cta2}
            </a>
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        style={{ color: "rgba(255,255,255,0.3)" }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 0.9 }}
      >
        <span className="text-[9px] tracking-[0.45em] uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 7, 0] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 9l-7 7-7-7" />
          </svg>
        </motion.div>
      </motion.div>

      {/* Bottom fade */}
      <div
        className="absolute bottom-0 left-0 right-0 h-36 pointer-events-none"
        style={{ background: "linear-gradient(to top, var(--bg), transparent)" }}
      />
    </section>
  );
}
