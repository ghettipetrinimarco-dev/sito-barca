"use client";

import { motion, useScroll, useTransform } from "framer-motion";
// useScroll/useTransform kept for contentOpacity/contentY parallax on text
import { useRef, useState, useEffect } from "react";
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

  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 768);
    check();
    window.addEventListener("resize", check, { passive: true });
    return () => window.removeEventListener("resize", check);
  }, []);

  // Desktop: boat is ~60% from left — keep it right-of-center
  // Mobile portrait: boat hull+mast sit around 45% from left, lower half
  const imgPosition = isMobile ? "45% 62%" : "62% 55%";
  const imgScale    = isMobile ? 1.08 : 1.25;

  const contentOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const contentY = useTransform(scrollYProgress, [0, 0.5], ["0%", "8%"]);

  return (
    <section id="hero" ref={ref} className="relative min-h-screen flex items-center overflow-hidden">

      {/* Video background */}
      <div className="absolute inset-0 overflow-hidden">
        <video
          autoPlay
          loop
          muted
          playsInline
          poster="/Copertina.jpg"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: imgPosition,
            zIndex: 0,
          }}
        >
          <source src="/hero-barca.mp4" type="video/mp4" />
        </video>
      </div>

      {/* Gradient overlays */}
      <div className="absolute inset-0 hero-gradient-main" />
      <div
        className="absolute inset-0"
        style={{ background: "linear-gradient(to top, rgba(5,15,30,0.5) 0%, transparent 45%)" }}
      />

      {/* Content */}
      <motion.div
        className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-14 pt-20 pb-24 md:pt-24 md:pb-36"
        style={{ opacity: contentOpacity, y: contentY }}
      >
        {/* max-w-2xl keeps text left-anchored and never too wide */}
        <div className="max-w-2xl">

          <motion.p
            className="text-[10px] tracking-[0.55em] uppercase font-light mb-3 md:mb-6"
            style={{ color: "rgba(255,255,255,0.55)" }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.2, ease }}
          >
            {tr.label}
          </motion.p>

          {/*
            Font scales fluidly from mobile (1.75rem) to large desktop (3.5rem).
            "and unforgettable" stays on one line because max-w-2xl (42rem)
            is wide enough for ~3.5rem bold text.
          */}
          <motion.h1
            className="font-manrope font-bold text-white leading-[1.06] tracking-[-0.025em] mb-4 md:mb-7"
            style={{ fontSize: "clamp(1.6rem, 4.2vw, 3.5rem)" }}
            initial={{ opacity: 0, y: 36 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.0, delay: 0.32, ease }}
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
            className="font-playfair italic text-base md:text-xl font-light mb-2 md:mb-3"
            style={{ color: "rgba(255,255,255,0.5)" }}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.55, ease }}
          >
            {tr.subtitle}
          </motion.p>

          <motion.p
            className="text-xs md:text-sm font-light leading-relaxed mb-6 md:mb-10"
            style={{ color: "rgba(255,255,255,0.35)" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.9, delay: 0.68, ease }}
          >
            {tr.sub2}
          </motion.p>

          <motion.div
            className="flex flex-row flex-wrap gap-3 md:gap-4"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.82, ease }}
          >
            <a
              href="#cruise-plan"
              className="group inline-flex items-center gap-2 md:gap-3 text-white font-manrope font-semibold text-[10px] md:text-[11px] tracking-[0.2em] uppercase px-5 py-2.5 md:px-9 md:py-4 transition-all duration-300"
              style={{ background: "var(--accent)", boxShadow: "0 4px 24px rgba(0,75,145,0.45)" }}
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
              <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
            <a
              href="#services"
              className="inline-flex items-center font-manrope font-light text-[10px] md:text-[11px] tracking-[0.2em] uppercase px-5 py-2.5 md:px-9 md:py-4 border transition-all duration-300"
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
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10"
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
        style={{ background: "linear-gradient(to top, rgba(5,15,30,0.85), transparent)" }}
      />
    </section>
  );
}
