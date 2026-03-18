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
    <section id="hero" ref={ref} className="relative min-h-screen flex items-end overflow-hidden">

      {/* Video background */}
      <div className="absolute inset-0 overflow-hidden">
        <video
          autoPlay
          loop
          muted
          playsInline
          poster="/hero-barca-1-cover.jpg"
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
          <source src="/hero-barca-1.mp4" type="video/mp4" />
        </video>
      </div>

      {/* Gradient overlays */}
      <div className="absolute inset-0 hero-gradient-main" />
      <div
        className="absolute inset-0"
        style={{ background: "linear-gradient(to top, rgba(5,15,30,0.5) 0%, transparent 45%)" }}
      />

      {/* Unified bottom block */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 z-10 px-6 lg:px-14 pb-6 md:pb-8"
        style={{ opacity: contentOpacity, y: contentY }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.0, delay: 0.3, ease }}
      >
        <div className="max-w-7xl mx-auto">

          {/* Subtitle, centered — above H1 */}
          <p
            className="font-manrope font-light text-[11px] md:text-[12px] tracking-[0.18em] uppercase mb-3 text-center"
            style={{ color: "rgba(255,255,255,0.35)" }}
          >
            {tr.subtitle}
          </p>

          {/* H1 — one line, centered */}
          <h1
            className="font-manrope font-bold text-white leading-none tracking-[-0.02em] mb-2 whitespace-nowrap text-center"
            style={{ fontSize: "clamp(1.4rem, 2.8vw, 2.6rem)" }}
          >
            {tr.title1} {tr.title2}{" "}
            <span style={{
              background: "linear-gradient(120deg, #7ab8f5 0%, #c8e4ff 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}>
              {tr.titleAccent}
            </span>{" "}
            {tr.title3}
          </h1>

          {/* Divider */}
          <div style={{ height: "1px", background: "rgba(255,255,255,0.15)", marginBottom: "20px" }} />

          {/* CTA row */}
          <div className="flex items-center justify-center gap-4">
            <a
              href="#cruise-plan"
              className="group inline-flex items-center gap-2 text-white font-manrope font-semibold text-[12px] md:text-[13px] tracking-[0.08em] uppercase px-6 py-3 md:px-8 md:py-3.5 transition-all duration-300"
              style={{ background: "var(--accent)", boxShadow: "0 4px 24px rgba(0,75,145,0.45)", borderRadius: "8px" }}
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
            </a>

            <a
              href="#services"
              className="inline-flex items-center font-manrope font-light text-[12px] md:text-[13px] tracking-[0.08em] uppercase px-6 py-3 md:px-8 md:py-3.5 border transition-all duration-300"
              style={{ color: "rgba(255,255,255,0.8)", borderColor: "rgba(255,255,255,0.3)", borderRadius: "8px" }}
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
          </div>

        </div>
      </motion.div>

      {/* Bottom fade */}
      <div
        className="absolute bottom-0 left-0 right-0 h-36 pointer-events-none"
        style={{ background: "linear-gradient(to top, rgba(5,15,30,0.92) 0%, rgba(5,15,30,0.4) 60%, transparent 100%)" }}
      />
    </section>
  );
}
