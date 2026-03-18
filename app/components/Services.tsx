"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useLang } from "../context/LanguageContext";
import { t } from "../translations";

const ease: [number, number, number, number] = [0.16, 1, 0.3, 1];

const SERVICE_IMAGES = [
  "/formentera day 1 9.JPG",                      // 01 Training
  "/formentera day 1 6.JPG",                      // 02 Leisure
  "/b5670d9e-6f50-48f5-8dab-9d8d89ace86d.JPG",  // 03 Course
  "/Yacht Survey.jpg",                             // 04 Inspection
  "/Wingfoil.webp",                                // 05 Watersports
  "/49a42f90-1c6b-42e2-9196-980fa15f4f7d.JPG",  // 06 Culinary
];

interface ServiceItem {
  number: string;
  title: string;
  description: string;
  tag: string;
  dates?: string;
  footer?: string;
}

/* ── Single service row ─────────────────────────────────────────── */
function ServiceScrollItem({
  service,
  index,
  isActive,
  onActivate,
  onMount,
}: {
  service: ServiceItem;
  index: number;
  isActive: boolean;
  onActivate: (i: number) => void;
  onMount: (el: HTMLDivElement | null, i: number) => void;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    onMount(ref.current, index);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Mobile only: IntersectionObserver
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && window.innerWidth < 1024) onActivate(index);
      },
      { rootMargin: "-38% 0px -38% 0px", threshold: 0 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [index, onActivate]);

  return (
    <div
      ref={ref}
      className="cursor-default"
      style={{ borderBottom: "1px solid rgba(255,255,255,0.09)" }}
      onMouseEnter={() => onActivate(index)}
    >
      <div
        className="py-4 md:py-5 transition-all duration-200"
        style={{ paddingLeft: isActive ? "1rem" : "0" }}
      >
        <div className="flex items-baseline gap-4 lg:gap-7">
          <span
            className="font-manrope text-[11px] tracking-[0.3em] tabular-nums flex-shrink-0 transition-colors duration-200"
            style={{ color: isActive ? "#4a7fb5" : "rgba(255,255,255,0.22)" }}
          >
            {service.number}
          </span>

          <h3
            className="font-manrope font-light flex-1 min-w-0 transition-all duration-200"
            style={{
              fontSize: "clamp(1.1rem, 2.8vw, 2.6rem)",
              lineHeight: 1.06,
              color: isActive ? "#ffffff" : "rgba(255,255,255,0.28)",
            }}
          >
            {service.title}
          </h3>

          <span
            className="hidden lg:block text-[10px] tracking-[0.3em] uppercase flex-shrink-0 self-center transition-colors duration-200"
            style={{ color: isActive ? "#4a7fb5" : "rgba(255,255,255,0.14)" }}
          >
            {service.tag}
          </span>
        </div>

        {/* Description accordion — mobile only (desktop uses left panel) */}
        <div
          className="lg:hidden overflow-hidden transition-all duration-300"
          style={{
            maxHeight: isActive ? "160px" : "0px",
            opacity: isActive ? 1 : 0,
            marginTop: isActive ? "0.9rem" : "0",
          }}
        >
          <div style={{ paddingLeft: "2.25rem" }}>
            <p className="text-sm font-light leading-relaxed" style={{ color: "rgba(255,255,255,0.62)" }}>
              {service.description}
            </p>
            {service.dates && (
              <p className="mt-2 text-[10px] tracking-[0.2em] uppercase font-medium" style={{ color: "#4a7fb5" }}>
                {service.dates}
              </p>
            )}
            {service.footer && (
              <p className="mt-2 font-playfair italic text-sm" style={{ color: "rgba(255,255,255,0.38)" }}>
                {service.footer}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Main component ─────────────────────────────────────────────── */
export default function Services() {
  const { lang } = useLang();
  const tr = t[lang].services;
  const [activeIndex, setActiveIndex] = useState(0);

  const itemEls = useRef<Array<HTMLDivElement | null>>([]);
  const registerEl = useCallback((el: HTMLDivElement | null, i: number) => {
    itemEls.current[i] = el;
  }, []);

  // Desktop: scroll listener — perfectly in sync, finds item closest to viewport center
  useEffect(() => {
    const onScroll = () => {
      if (window.innerWidth < 1024) return;
      const mid = window.innerHeight / 2;
      let bestIdx = 0;
      let bestDist = Infinity;
      itemEls.current.forEach((el, i) => {
        if (!el) return;
        const r = el.getBoundingClientRect();
        const dist = Math.abs((r.top + r.bottom) / 2 - mid);
        if (dist < bestDist) { bestDist = dist; bestIdx = i; }
      });
      setActiveIndex(bestIdx);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    // Fire once so the active item is correct even when arriving mid-page
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleActivate = useCallback((i: number) => setActiveIndex(i), []);
  const activeService = tr.items[activeIndex];

  const leftSubtitle =
    lang === "de"
      ? "Private Katamaran-Erlebnisse,\nprofessioneller Segelunterricht\nund unvergessliche Momente auf See."
      : "Private catamaran experiences,\nprofessional sailing instruction,\nand unforgettable moments at sea.";

  return (
    /*
      Background images are position:absolute so they scroll WITH the section.
      No sticky trick needed — images naturally leave the viewport when the
      section ends, exactly as the user expects.
      Only the left-column TEXT is sticky (top: 148px) within the grid.
    */
    <section id="services" className="relative" style={{ background: "#0d1b2a" }}>

      {/* ── Background images: absolute, fill section, scroll with it ── */}
      <div className="absolute inset-0 overflow-hidden" style={{ zIndex: 0 }}>
        {SERVICE_IMAGES.map((src, i) => (
          <div
            key={i}
            className="absolute inset-0"
            style={{
              opacity: activeIndex === i ? 1 : 0,
              transform: activeIndex === i ? "scale(1)" : "scale(1.04)",
              transition: "opacity 0.45s ease, transform 0.45s ease",
              zIndex: activeIndex === i ? 2 : 1,
            }}
          >
            <Image
              src={src}
              alt={tr.items[i]?.title ?? ""}
              fill
              className="object-cover"
              priority={i === 0}
              sizes="100vw"
            />
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(105deg, rgba(5,15,30,0.85) 0%, rgba(5,15,30,0.52) 52%, rgba(5,15,30,0.22) 100%)",
              }}
            />
          </div>
        ))}
        <div className="absolute inset-0" style={{ background: "rgba(13,27,42,0.25)", zIndex: 3 }} />
      </div>

      {/* ── Content ── */}
      <div className="relative" style={{ zIndex: 10 }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-14">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.65fr] lg:gap-x-20">

            {/* Left: sticky text panel */}
            <div
              className="hidden lg:flex flex-col sticky self-start"
              style={{ top: "100px", paddingTop: "80px", paddingBottom: "2rem" }}
            >
              <p className="text-[10px] tracking-[0.45em] uppercase mb-4 font-light" style={{ color: "rgba(255,255,255,0.5)" }}>
                {tr.label}
              </p>
              <h2
                className="font-manrope font-bold text-white leading-tight mb-5"
                style={{ fontSize: "clamp(2.5rem, 3.2vw, 3.75rem)" }}
              >
                {tr.title}
              </h2>
              <div className="h-px w-10 mb-8" style={{ background: "#4a7fb5" }} />
              <p className="text-sm font-light leading-relaxed mb-12 whitespace-pre-line" style={{ color: "rgba(255,255,255,0.52)" }}>
                {leftSubtitle}
              </p>

              <div style={{ borderTop: "1px solid rgba(255,255,255,0.12)", paddingTop: "1.75rem" }}>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeIndex}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.3, ease }}
                  >
                    <p className="text-[10px] tracking-[0.35em] uppercase mb-3 font-medium" style={{ color: "rgba(255,255,255,0.38)" }}>
                      {activeService?.tag}
                    </p>
                    <p className="text-sm font-light leading-relaxed" style={{ color: "rgba(255,255,255,0.75)" }}>
                      {activeService?.description}
                    </p>
                    {activeService?.dates && (
                      <p className="mt-3 text-[10px] tracking-[0.2em] uppercase font-medium" style={{ color: "#4a7fb5" }}>
                        {activeService.dates}
                      </p>
                    )}
                    {activeService?.footer && (
                      <p className="mt-3 font-playfair italic text-sm" style={{ color: "rgba(255,255,255,0.4)" }}>
                        {activeService.footer}
                      </p>
                    )}
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

            {/* Right: scrollable list */}
            <div className="pt-12 pb-16 lg:pt-[80px] lg:pb-16">

              {/* Mobile header */}
              <div className="lg:hidden mb-10">
                <p className="text-[10px] tracking-[0.45em] uppercase mb-3 font-light" style={{ color: "rgba(255,255,255,0.5)" }}>
                  {tr.label}
                </p>
                <h2 className="font-manrope font-bold text-white leading-tight mb-4" style={{ fontSize: "clamp(2rem, 8vw, 3rem)" }}>
                  {tr.title}
                </h2>
                <div className="h-px w-8" style={{ background: "#4a7fb5" }} />
              </div>

              <div style={{ borderTop: "1px solid rgba(255,255,255,0.09)" }}>
                {tr.items.map((service, i) => (
                  <ServiceScrollItem
                    key={i}
                    service={service}
                    index={i}
                    isActive={activeIndex === i}
                    onActivate={handleActivate}
                    onMount={registerEl}
                  />
                ))}
              </div>

              <div className="mt-8 pt-7" style={{ borderTop: "1px solid rgba(255,255,255,0.09)" }}>
                <a
                  href="#contact"
                  className="inline-flex items-center gap-3 font-manrope font-semibold text-[11px] tracking-[0.22em] uppercase px-8 py-4 transition-all duration-300"
                  style={{ background: "var(--accent)", color: "#fff", boxShadow: "0 4px 24px rgba(0,75,145,0.4)" }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.background = "var(--accent-hover)";
                    (e.currentTarget as HTMLElement).style.boxShadow = "0 6px 36px rgba(0,75,145,0.6)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.background = "var(--accent)";
                    (e.currentTarget as HTMLElement).style.boxShadow = "0 4px 24px rgba(0,75,145,0.4)";
                  }}
                >
                  {lang === "de" ? "Kontakt aufnehmen" : "Get in touch"}
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </a>
              </div>
            </div>

          </div>
        </div>
      </div>

    </section>
  );
}
