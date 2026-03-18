"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import Image from "next/image";
import {
  BedDouble, Users, ShowerHead, Wifi, Wind, Sun,
  Music, Tv, ChefHat, Droplets, Anchor, Waves,
  type LucideIcon,
} from "lucide-react";
import { useLang } from "../context/LanguageContext";
import { t } from "../translations";
import { yachtSpecs, yachtSpecsDe, yachtFeatures, yachtGallery } from "../../lib/yacht-data";

const ease: [number, number, number, number] = [0.16, 1, 0.3, 1];

const iconMap: Record<string, LucideIcon> = {
  BedDouble, Users, ShowerHead, Wifi, Wind, Sun,
  Music, Tv, ChefHat, Droplets, Anchor, Waves,
};

export default function Yacht() {
  const { lang } = useLang();
  const tr = t[lang].yacht;
  const specs = lang === "de" ? yachtSpecsDe : yachtSpecs;

  const [activeImg, setActiveImg] = useState(0);
  const [autoPaused, setAutoPaused] = useState(false);
  const [progress, setProgress] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const progressRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const touchStartX = useRef(0);
  const AUTO_DELAY = 4000;

  const clearTimers = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    if (progressRef.current) clearInterval(progressRef.current);
  };

  const startAuto = useCallback(() => {
    clearTimers();
    setProgress(0);
    const tick = 50;
    progressRef.current = setInterval(() => {
      setProgress((p) => Math.min(p + (tick / AUTO_DELAY) * 100, 100));
    }, tick);
    intervalRef.current = setInterval(() => {
      setActiveImg((i) => (i + 1) % yachtGallery.length);
      setProgress(0);
    }, AUTO_DELAY);
  }, []);

  useEffect(() => {
    if (!autoPaused) startAuto();
    return clearTimers;
  }, [autoPaused, startAuto]);

  const goTo = (index: number) => {
    setActiveImg(index);
    setAutoPaused(true);
    clearTimers();
  };

  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    const delta = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(delta) > 45) {
      goTo(delta < 0
        ? (activeImg + 1) % yachtGallery.length
        : (activeImg - 1 + yachtGallery.length) % yachtGallery.length
      );
    }
  };

  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const specsRef = useRef<HTMLDivElement>(null);
  const specsInView = useInView(specsRef, { once: true, margin: "-60px" });
  const galleryRef = useRef<HTMLDivElement>(null);
  const galleryInView = useInView(galleryRef, { once: true, margin: "-60px" });

  return (
    <section id="yacht" className="py-16 md:py-24 lg:py-32 px-6 lg:px-14 overflow-hidden" style={{ background: "var(--surface)" }}>
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 28 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 28 }}
          transition={{ duration: 0.9, ease }}
          className="mb-20"
        >
          <p className="text-[10px] tracking-[0.45em] uppercase mb-4 font-light" style={{ color: "var(--accent-light)" }}>
            {tr.label}
          </p>
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            <div>
              <h2
                className="font-manrope font-bold tracking-tight mb-6"
                style={{ fontSize: "clamp(2rem, 4vw, 3.25rem)", color: "var(--text)" }}
              >
                {tr.title}
              </h2>
              <span className="accent-line" />
              <p className="font-playfair italic text-xl mt-8 max-w-xl" style={{ color: "var(--text-secondary)" }}>
                {tr.subtitle}
              </p>
            </div>
            <a
              href="#contact"
              className="self-start lg:self-end inline-flex items-center gap-3 text-[10px] tracking-[0.22em] uppercase font-manrope font-semibold px-8 py-3.5 transition-all duration-300 flex-shrink-0"
              style={{ background: "var(--accent)", color: "#fff", boxShadow: "0 4px 20px rgba(0,75,145,0.25)" }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.background = "var(--accent-hover)";
                (e.currentTarget as HTMLElement).style.boxShadow = "0 6px 28px rgba(0,75,145,0.4)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.background = "var(--accent)";
                (e.currentTarget as HTMLElement).style.boxShadow = "0 4px 20px rgba(0,75,145,0.25)";
              }}
            >
              {tr.contact}
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </div>
        </motion.div>

        {/* Gallery */}
        <motion.div
          ref={galleryRef}
          initial={{ opacity: 0, y: 24 }}
          animate={galleryInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
          transition={{ duration: 0.9, ease }}
          className="mb-24"
        >
          {/* Main image */}
          <div
            className="relative overflow-hidden mb-3 select-none"
            style={{ height: "clamp(240px, 55vw, 520px)", border: "1px solid var(--border)" }}
            onTouchStart={onTouchStart}
            onTouchEnd={onTouchEnd}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={activeImg}
                initial={{ opacity: 0, scale: 1.03 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.45, ease }}
                className="absolute inset-0"
              >
                <Image
                  src={yachtGallery[activeImg].src}
                  alt={yachtGallery[activeImg].alt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1280px) 100vw, 1280px"
                  priority={activeImg === 0}
                />
              </motion.div>
            </AnimatePresence>

            {/* Auto-progress bar */}
            {!autoPaused && (
              <div className="absolute bottom-0 left-0 right-0 h-[2px]" style={{ background: "rgba(255,255,255,0.15)" }}>
                <motion.div
                  className="h-full"
                  style={{ width: `${progress}%`, background: "rgba(255,255,255,0.7)" }}
                />
              </div>
            )}

            {/* Label + auto/paused badge */}
            <div className="absolute bottom-5 left-5 flex items-end gap-3 pointer-events-none">
              <div
                className="px-4 py-2"
                style={{ background: "rgba(5,15,30,0.65)", backdropFilter: "blur(8px)" }}
              >
                <p className="text-[9px] tracking-[0.3em] uppercase" style={{ color: "rgba(255,255,255,0.55)" }}>
                  {yachtGallery[activeImg].label}
                </p>
                <p className="font-manrope font-semibold text-white text-sm tracking-wider">X5000 — 50ft</p>
              </div>
              {autoPaused && (
                <button
                  className="pointer-events-auto px-3 py-1.5 text-[9px] tracking-[0.2em] uppercase transition-all duration-200"
                  style={{ background: "rgba(5,15,30,0.55)", backdropFilter: "blur(8px)", color: "rgba(255,255,255,0.6)", border: "1px solid rgba(255,255,255,0.15)" }}
                  onClick={() => setAutoPaused(false)}
                  onMouseEnter={(e) => (e.currentTarget as HTMLElement).style.color = "#fff"}
                  onMouseLeave={(e) => (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.6)"}
                >
                  ▶ auto
                </button>
              )}
            </div>

            {/* Dot indicators */}
            <div className="absolute top-5 left-1/2 -translate-x-1/2 flex gap-1.5 pointer-events-none">
              {yachtGallery.map((_, i) => (
                <div
                  key={i}
                  className="rounded-full transition-all duration-300"
                  style={{
                    width: activeImg === i ? "20px" : "6px",
                    height: "6px",
                    background: activeImg === i ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.35)",
                  }}
                />
              ))}
            </div>

            {/* Nav arrows */}
            <button
              aria-label="Previous image"
              onClick={() => goTo((activeImg - 1 + yachtGallery.length) % yachtGallery.length)}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center transition-all duration-200"
              style={{ background: "rgba(5,15,30,0.5)", backdropFilter: "blur(6px)", border: "1px solid rgba(255,255,255,0.15)" }}
              onMouseEnter={(e) => (e.currentTarget as HTMLElement).style.background = "rgba(0,75,145,0.7)"}
              onMouseLeave={(e) => (e.currentTarget as HTMLElement).style.background = "rgba(5,15,30,0.5)"}
            >
              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              aria-label="Next image"
              onClick={() => goTo((activeImg + 1) % yachtGallery.length)}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center transition-all duration-200"
              style={{ background: "rgba(5,15,30,0.5)", backdropFilter: "blur(6px)", border: "1px solid rgba(255,255,255,0.15)" }}
              onMouseEnter={(e) => (e.currentTarget as HTMLElement).style.background = "rgba(0,75,145,0.7)"}
              onMouseLeave={(e) => (e.currentTarget as HTMLElement).style.background = "rgba(5,15,30,0.5)"}
            >
              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          {/* Thumbnails */}
          <div className="grid grid-cols-6 gap-2">
            {yachtGallery.map((img, i) => (
              <button
                key={i}
                aria-label={`View image ${i + 1}: ${img.alt}`}
                onClick={() => goTo(i)}
                className="relative overflow-hidden transition-all duration-200"
                style={{
                  height: "72px",
                  border: activeImg === i ? "2px solid var(--accent)" : "1px solid var(--border)",
                  opacity: activeImg === i ? 1 : 0.6,
                }}
                onMouseEnter={(e) => { if (activeImg !== i) (e.currentTarget as HTMLElement).style.opacity = "0.9"; }}
                onMouseLeave={(e) => { if (activeImg !== i) (e.currentTarget as HTMLElement).style.opacity = "0.6"; }}
              >
                <Image src={img.src} alt={img.alt} fill className="object-cover" sizes="200px" />
              </button>
            ))}
          </div>
        </motion.div>

        {/* Description + quick specs */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-24 items-start">
          <motion.div
            initial={{ opacity: 0, x: -28 }}
            animate={galleryInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -28 }}
            transition={{ duration: 0.9, delay: 0.1, ease }}
          >
            <p className="text-lg font-light leading-relaxed" style={{ color: "var(--text-secondary)" }}>
              {tr.description}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 28 }}
            animate={galleryInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 28 }}
            transition={{ duration: 0.9, delay: 0.2, ease }}
          >
            <div
              className="grid grid-cols-2 gap-0"
              style={{ borderTop: "1px solid var(--border)", borderLeft: "1px solid var(--border)" }}
            >
              {tr.specs.map((spec, i) => (
                <div
                  key={i}
                  className="px-5 py-4"
                  style={{ borderRight: "1px solid var(--border)", borderBottom: "1px solid var(--border)" }}
                >
                  <p className="text-[9px] tracking-[0.25em] uppercase mb-1" style={{ color: "var(--text-muted)" }}>
                    {spec.label}
                  </p>
                  <p className="font-manrope font-semibold text-sm" style={{ color: "var(--accent)" }}>
                    {spec.value}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Technical specs table */}
        <motion.div
          ref={specsRef}
          initial={{ opacity: 0, y: 24 }}
          animate={specsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
          transition={{ duration: 0.9, ease }}
          className="mb-24"
        >
          <p className="text-[10px] tracking-[0.45em] uppercase mb-8 font-manrope font-medium" style={{ color: "var(--text-secondary)" }}>
            {lang === "de" ? "Technische Daten" : "Technical Specifications"}
          </p>
          <div
            className="grid grid-cols-2 lg:grid-cols-5"
            style={{ border: "1px solid var(--border)" }}
          >
            {specs.map((spec, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={specsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                transition={{ duration: 0.45, delay: i * 0.05, ease }}
                className="px-6 py-6 transition-colors duration-200"
                style={{
                  borderRight: "1px solid var(--border)",
                  borderBottom: "1px solid var(--border)",
                  background: "var(--bg)",
                }}
                onMouseEnter={(e) => (e.currentTarget as HTMLElement).style.background = "var(--surface-alt)"}
                onMouseLeave={(e) => (e.currentTarget as HTMLElement).style.background = "var(--bg)"}
              >
                <p className="text-[9px] tracking-[0.22em] uppercase mb-2 font-light" style={{ color: "var(--text-muted)" }}>
                  {spec.label}
                </p>
                <p className="font-manrope font-bold" style={{ fontSize: "1.1rem", color: "var(--accent)" }}>
                  {spec.value}
                  {spec.unit && (
                    <span className="text-xs font-light ml-1" style={{ color: "var(--text-muted)" }}>
                      {spec.unit}
                    </span>
                  )}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Amenities grid */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={specsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
          transition={{ duration: 0.9, delay: 0.2, ease }}
        >
          <p className="text-[10px] tracking-[0.45em] uppercase mb-8 font-manrope font-medium" style={{ color: "var(--text-secondary)" }}>
            {lang === "de" ? "Ausstattung & Komfort" : "Amenities & Comfort"}
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
            {yachtFeatures.map((feature, i) => {
              const Icon = iconMap[feature.icon];
              const label = lang === "de" ? feature.labelDe : feature.labelEn;
              return (
                <motion.div
                  key={feature.key}
                  initial={{ opacity: 0, y: 14, scale: 0.97 }}
                  animate={specsInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 14, scale: 0.97 }}
                  transition={{ duration: 0.45, delay: 0.1 + i * 0.05, ease }}
                  className="flex items-center gap-3.5 px-5 py-4 transition-all duration-200 cursor-default"
                  style={{ border: "1px solid var(--border)", background: "var(--bg)", borderRadius: "2px" }}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.borderColor = "var(--accent-light)";
                    el.style.background = "#eef4fb";
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.borderColor = "var(--border)";
                    el.style.background = "var(--bg)";
                  }}
                >
                  {Icon && <Icon size={16} strokeWidth={1.5} style={{ color: "var(--accent)", flexShrink: 0 }} />}
                  <span
                    className="text-[11px] tracking-[0.1em] font-manrope font-medium leading-tight"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    {label}
                  </span>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

      </div>
    </section>
  );
}
