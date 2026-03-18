"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useLang } from "../context/LanguageContext";
import { t } from "../translations";

const ease: [number, number, number, number] = [0.16, 1, 0.3, 1];

// Gradient fallbacks (hue-rotated blues) shown if an image is missing/tiny
const FALLBACK_GRADIENTS = [
  "linear-gradient(135deg, #0d2137 0%, #0a3d5c 100%)",
  "linear-gradient(135deg, #0d2640 0%, #0c4a72 100%)",
  "linear-gradient(135deg, #0a2e4a 0%, #0e5585 100%)",
  "linear-gradient(135deg, #072038 0%, #0a3a60 100%)",
  "linear-gradient(135deg, #0d1f3c 0%, #123060 100%)",
  "linear-gradient(135deg, #081c36 0%, #0d4060 100%)",
  "linear-gradient(135deg, #0b2540 0%, #0c4870 100%)",
  "linear-gradient(135deg, #0a2238 0%, #0b3e62 100%)",
  "linear-gradient(135deg, #0f2a48 0%, #124070 100%)",
];

interface Stop {
  month: string;
  city: string;
  region: string;
  description: string;
  image: string;
}

const STOPS: Stop[] = [
  {
    month: "May", city: "La Ràpita", region: "Spain",
    description: "Our journey begins in the sheltered bay of La Ràpita — a quiet fishing village on the Costa Daurada, the perfect departure point before the open Mediterranean.",
    image: "/la-rapita.avif",
  },
  {
    month: "Jun", city: "Mallorca", region: "Balearic Islands",
    description: "The crown jewel of the Balearics. Dramatic cliffs, hidden coves and crystal waters make Mallorca an unmissable first stop of the island arc.",
    image: "/images/cruise/mallorca.jpg",
  },
  {
    month: "Jun", city: "Menorca", region: "Balearic Islands",
    description: "Wilder and quieter than her sisters. Menorca's turquoise lagoons and UNESCO Biosphere Reserve offer raw Mediterranean nature at its finest.",
    image: "/images/cruise/menorca.jpg",
  },
  {
    month: "Jul", city: "Cabrera", region: "Balearic Islands",
    description: "A protected national park accessible only by sea. Cabrera is pure wilderness — no cars, no tourists, just cliffs, falcons and impossibly clear water.",
    image: "/images/cruise/cabrera.jpg",
  },
  {
    month: "Jul", city: "Ibiza", region: "Balearic Islands",
    description: "Beyond the nightlife lies a magical island of ancient villages, pine forests and secret beaches bathed in golden Mediterranean light.",
    image: "/ibiza.jpeg",
  },
  {
    month: "Aug", city: "Formentera", region: "Balearic Islands",
    description: "The Caribbean of Europe. Formentera's shallow turquoise waters and white sand beaches are the crowning glory of the Balearic arc.",
    image: "/images/cruise/formentera.jpg",
  },
  {
    month: "Sep", city: "Olbia", region: "Sardinia",
    description: "Gateway to the Costa Smeralda. Olbia marks our arrival in Sardinia — where granite rocks tumble into emerald sea and the pace of life slows beautifully.",
    image: "/images/cruise/olbia.jpg",
  },
  {
    month: "Sep", city: "Cagliari", region: "Sardinia",
    description: "Sardinia's ancient capital rises from a lagoon. Cagliari offers Roman ruins, rooftop views and warm Sardinian hospitality before the crossing south.",
    image: "/images/cruise/cagliari.jpg",
  },
  {
    month: "Oct", city: "Bizerte", region: "Tunisia",
    description: "Our final destination. Tunisia's northernmost city blends French colonial charm with Medina colour — the perfect winter harbour for Ventum.",
    image: "/images/cruise/bizerte.jpg",
  },
];

/* ── Single stop row ──────────────────────────────────────────────── */
function StopItem({
  stop,
  index,
  isActive,
  onActivate,
  onMount,
}: {
  stop: Stop;
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

  // Mobile: IntersectionObserver
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && window.innerWidth < 1024) onActivate(index);
      },
      { rootMargin: "-35% 0px -35% 0px", threshold: 0 }
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
        className="py-5 lg:py-6 transition-all duration-200"
        style={{ paddingLeft: isActive ? "0.875rem" : "0" }}
      >
        <div className="flex items-center gap-3 lg:gap-5">
          {/* Index */}
          <span
            className="font-manrope text-[10px] tracking-[0.3em] tabular-nums flex-shrink-0 transition-colors duration-200"
            style={{ color: isActive ? "#4a9fd5" : "rgba(255,255,255,0.22)" }}
          >
            {String(index + 1).padStart(2, "0")}
          </span>

          {/* Month — desktop only */}
          <span
            className="hidden lg:block font-manrope text-[10px] tracking-[0.4em] uppercase flex-shrink-0 transition-colors duration-200 w-8"
            style={{ color: isActive ? "#4a9fd5" : "rgba(255,255,255,0.2)" }}
          >
            {stop.month}
          </span>

          {/* City name */}
          <h3
            className="font-manrope font-light flex-1 min-w-0 transition-all duration-200 leading-none"
            style={{
              fontSize: "clamp(1.1rem, 2.8vw, 2.6rem)",
              color: isActive ? "#ffffff" : "rgba(255,255,255,0.28)",
            }}
          >
            {stop.city}
          </h3>

          {/* Region — desktop */}
          <span
            className="hidden lg:block font-manrope text-[10px] tracking-[0.35em] uppercase flex-shrink-0 transition-colors duration-200"
            style={{ color: isActive ? "rgba(255,255,255,0.45)" : "rgba(255,255,255,0.14)" }}
          >
            {stop.region}
          </span>

          {/* Arrow — desktop */}
          <span
            className="hidden lg:block flex-shrink-0 transition-all duration-200 text-sm"
            style={{
              color: "#4a9fd5",
              opacity: isActive ? 1 : 0,
              transform: isActive ? "translateX(0)" : "translateX(-6px)",
            }}
          >
            →
          </span>
        </div>

        {/* Mobile accordion: month + description */}
        <div
          className="lg:hidden overflow-hidden transition-all duration-400"
          style={{
            maxHeight: isActive ? "180px" : "0px",
            opacity: isActive ? 1 : 0,
            marginTop: isActive ? "0.75rem" : "0",
          }}
        >
          <p
            className="text-[10px] tracking-[0.4em] uppercase mb-1.5 font-manrope"
            style={{ color: "#4a9fd5", paddingLeft: "2rem" }}
          >
            {stop.month} · {stop.region}
          </p>
          <p
            className="text-sm font-light leading-relaxed"
            style={{ color: "rgba(255,255,255,0.65)", paddingLeft: "2rem" }}
          >
            {stop.description}
          </p>
        </div>
      </div>
    </div>
  );
}

/* ── Main component ───────────────────────────────────────────────── */
export default function CruisePlan() {
  const { lang } = useLang();
  const tr = t[lang].cruisePlan;
  const [activeIndex, setActiveIndex] = useState(0);

  const itemEls = useRef<Array<HTMLDivElement | null>>([]);
  const registerEl = useCallback((el: HTMLDivElement | null, i: number) => {
    itemEls.current[i] = el;
  }, []);

  // Desktop: scroll listener — finds stop closest to viewport center
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
  const active = STOPS[activeIndex];

  return (
    /*
      Background images: position:absolute — scroll WITH the section.
      Left text column: position:sticky — stays while right column scrolls.
      No overflow:clip on section — would break sticky.
    */
    <section id="cruise-plan" className="relative" style={{ background: "#0d1b2a" }}>

      {/* ── Background images — absolute, scroll with section ── */}
      <div className="absolute inset-0 overflow-hidden" style={{ zIndex: 0 }}>
        {STOPS.map((stop, i) => (
          <div
            key={i}
            className="absolute inset-0 transition-opacity duration-500"
            style={{
              opacity: activeIndex === i ? 1 : 0,
              zIndex: activeIndex === i ? 2 : 1,
            }}
          >
            {stop.image ? (
              <>
                <Image
                  src={stop.image}
                  alt={`${stop.city}, ${stop.region}`}
                  fill
                  className="object-cover"
                  style={{
                    transform: activeIndex === i ? "scale(1)" : "scale(1.05)",
                    transition: "transform 0.7s ease",
                  }}
                  priority={i === 0}
                  sizes="100vw"
                />
              </>
            ) : (
              <div className="absolute inset-0" style={{ background: FALLBACK_GRADIENTS[i] }} />
            )}
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(to right, rgba(5,15,30,0.88) 0%, rgba(5,15,30,0.55) 50%, rgba(5,15,30,0.22) 100%)",
              }}
            />
            <div
              className="absolute inset-0"
              style={{ background: "linear-gradient(to top, rgba(5,15,30,0.5) 0%, transparent 50%)" }}
            />
          </div>
        ))}
        <div className="absolute inset-0" style={{ background: "rgba(13,27,42,0.2)", zIndex: 3 }} />
      </div>

      {/* ── Content ── */}
      <div className="relative" style={{ zIndex: 10 }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-14">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.65fr] lg:gap-x-20">

            {/* ── Left: sticky panel — full-height on desktop ── */}
            <div
              className="hidden lg:flex flex-col sticky self-start"
              style={{ top: 0, height: "100vh", paddingTop: "148px", paddingBottom: "2rem" }}
            >
              {/* Header */}
              <div>
                <p
                  className="text-[10px] tracking-[0.45em] uppercase mb-4 font-light"
                  style={{ color: "rgba(255,255,255,0.48)" }}
                >
                  {tr.label}
                </p>
                <h2
                  className="font-manrope font-bold text-white leading-tight mb-4"
                  style={{ fontSize: "clamp(2.5rem, 3.2vw, 3.75rem)" }}
                >
                  {tr.title}
                </h2>
                <div className="h-px w-10" style={{ background: "#004b91" }} />
              </div>

              {/* Active stop detail — crossfades */}
              <div className="flex-1 flex flex-col justify-center">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeIndex}
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.38, ease }}
                  >
                    <p
                      className="text-[10px] tracking-[0.5em] uppercase mb-3 font-manrope"
                      style={{ color: "#4a9fd5" }}
                    >
                      {active.month}
                    </p>
                    <h3
                      className="font-manrope font-light text-white leading-none mb-2"
                      style={{ fontSize: "clamp(2.2rem, 3.8vw, 3.8rem)" }}
                    >
                      {active.city}
                    </h3>
                    <p
                      className="text-sm tracking-[0.2em] uppercase mb-8 font-manrope"
                      style={{ color: "rgba(255,255,255,0.4)" }}
                    >
                      {active.region}
                    </p>
                    <p
                      className="text-sm font-light leading-relaxed"
                      style={{ color: "rgba(255,255,255,0.72)", maxWidth: "22rem" }}
                    >
                      {active.description}
                    </p>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Counter */}
              <p
                className="font-manrope text-xs tracking-[0.25em]"
                style={{ color: "rgba(255,255,255,0.28)" }}
              >
                {String(activeIndex + 1).padStart(2, "0")} / {String(STOPS.length).padStart(2, "0")}
              </p>
            </div>

            {/* ── Right: scrollable stops list ── */}
            <div className="pt-16 pb-24 lg:pt-[12vh] lg:pb-[20vh]">

              {/* Mobile header */}
              <div className="lg:hidden mb-10">
                <p
                  className="text-[10px] tracking-[0.45em] uppercase mb-3 font-light"
                  style={{ color: "rgba(255,255,255,0.48)" }}
                >
                  {tr.label}
                </p>
                <h2
                  className="font-manrope font-bold text-white leading-tight mb-4"
                  style={{ fontSize: "clamp(2rem, 8vw, 3rem)" }}
                >
                  {tr.title}
                </h2>
                <div className="h-px w-8 mb-6" style={{ background: "#004b91" }} />
                <p
                  className="text-sm font-light leading-relaxed"
                  style={{ color: "rgba(255,255,255,0.58)" }}
                >
                  {tr.description}
                </p>
              </div>

              {/* Stop rows */}
              <div style={{ borderTop: "1px solid rgba(255,255,255,0.09)" }}>
                {STOPS.map((stop, i) => (
                  <StopItem
                    key={i}
                    stop={stop}
                    index={i}
                    isActive={activeIndex === i}
                    onActivate={handleActivate}
                    onMount={registerEl}
                  />
                ))}
              </div>

              {/* CTA */}
              <div
                className="mt-14 pt-10"
                style={{ borderTop: "1px solid rgba(255,255,255,0.09)" }}
              >
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
                  {lang === "de" ? "Reise buchen" : "Book your cruise"}
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
