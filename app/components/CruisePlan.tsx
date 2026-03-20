"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useLang } from "../context/LanguageContext";

const ease: [number, number, number, number] = [0.16, 1, 0.3, 1];

const STOPS = [
  {
    id: "rapita",
    city: "San Carles de la Ràpita",
    region: "Costa Daurada · Spain",
    month: "May",
    dates: "10 May 2026",
    x: 137, y: 178,
    image: "/images/cruise/la-rapita.jpg",
    en: "Our journey begins in the sheltered bay of La Ràpita — a quiet fishing village on the Costa Daurada, the perfect departure point before the open Mediterranean.",
    de: "Unsere Reise beginnt in der geschützten Bucht von La Ràpita — ein ruhiges Fischerdorf an der Costa Daurada.",
  },
  {
    id: "mallorca",
    city: "Mallorca",
    region: "Balearic Islands · Spain",
    month: "May",
    dates: "May – Jun 2026",
    x: 305, y: 249,
    image: "/images/cruise/mallorca.jpg",
    en: "The crown jewel of the Balearics. Dramatic cliffs, hidden coves and crystal waters make Mallorca an unmissable first stop of the island arc.",
    de: "Das Juwel der Balearen. Dramatische Klippen, versteckte Buchten und kristallklares Wasser.",
  },
  {
    id: "menorca",
    city: "Menorca",
    region: "Balearic Islands · Spain",
    month: "Jun",
    dates: "May – Jun 2026",
    x: 370, y: 210,
    image: "/images/cruise/menorca.jpg",
    en: "Wilder and quieter than her sisters. Menorca's turquoise lagoons and UNESCO Biosphere Reserve offer raw Mediterranean nature at its finest.",
    de: "Wilder und ruhiger als ihre Schwestern. Menorcas türkisfarbene Lagunen und das UNESCO-Biosphärenreservat.",
  },
  {
    id: "ibiza",
    city: "Ibiza",
    region: "Balearic Islands · Spain",
    month: "Jun",
    dates: "Jun 2026",
    x: 199, y: 317,
    image: "/images/cruise/ibiza.jpg",
    en: "Beyond the nightlife lies a magical island of ancient villages, pine forests and secret beaches bathed in golden Mediterranean light.",
    de: "Jenseits des Nachtlebens: eine magische Insel mit alten Dörfern, Pinienwäldern und geheimen Stränden.",
  },
  {
    id: "formentera",
    city: "Formentera",
    region: "Balearic Islands · Spain",
    month: "Jun/Sep",
    dates: "Jun – Sep 2026",
    x: 204, y: 340,
    image: "/images/cruise/formentera.jpg",
    en: "The Caribbean of Europe. Formentera's shallow turquoise waters and white sand beaches are the crowning glory of the Balearic arc.",
    de: "Die Karibik Europas. Flache türkisfarbene Gewässer und weisse Sandstrände am Ende des Balearen-Bogens.",
  },
  {
    id: "cagliari",
    city: "Cagliari",
    region: "Sardinia · Italy",
    month: "Sep",
    dates: "Sep 2026",
    x: 700, y: 227,
    image: "/images/cruise/cagliari.jpg",
    en: "Sardinia's ancient capital rises from a lagoon. Roman ruins, rooftop views and warm Sardinian hospitality before the crossing south.",
    de: "Sardiniens alte Hauptstadt über der Lagune. Römische Ruinen, Dachterrassen und sardische Gastfreundschaft.",
  },
  {
    id: "olbia",
    city: "Olbia",
    region: "Sardinia · Italy",
    month: "Sep",
    dates: "Sep 2026",
    x: 711, y: 74,
    image: "/images/cruise/olbia.jpg",
    en: "Gateway to the Costa Smeralda. Where granite rocks tumble into emerald sea and the pace of life slows beautifully.",
    de: "Tor zur Costa Smeralda. Wo Granitfelsen ins smaragdgrüne Meer stürzen.",
  },
  {
    id: "bizerte",
    city: "Bizerte",
    region: "Northern Tunisia",
    month: "Oct",
    dates: "4 Oct 2026",
    x: 783, y: 388,
    image: "/images/cruise/bizerte.jpg",
    en: "Our final destination. Tunisia's northernmost city blends French colonial charm with Medina colour — the perfect winter harbour for Ventum.",
    de: "Unser letztes Ziel. Tunesiens nördlichste Stadt — der perfekte Winterhafen für Ventum.",
  },
];

// Camera viewBox [x, y, w, h] — centered on each stop, zoom ~1.7x
const CAMERAS: Record<string, [number, number, number, number]> = {
  rapita:     [ -50,  10, 720, 408],
  mallorca:   [ -30,  70, 660, 374],
  menorca:    [  40,  60, 640, 362],
  ibiza:      [ -80, 130, 600, 340],
  formentera: [ -70, 150, 580, 329],
  cagliari:   [ 350,  50, 680, 385],
  olbia:      [ 370, -30, 660, 374],
  bizerte:    [ 430, 200, 660, 374],
};

const ROUTE =
  "M 137,178 C 200,206 255,228 305,249 L 370,210 L 305,249 C 268,276 232,298 199,317 L 204,340 L 199,317 C 255,294 280,271 305,249 C 460,242 582,237 700,227 L 711,74 L 700,227 Q 742,308 783,388";

export default function CruisePlan() {
  const { lang } = useLang();
  const [activeId, setActiveId] = useState("rapita");
  const [phase, setPhase] = useState<"before" | "active" | "after">("before");
  const sectionRef = useRef<HTMLElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const currentVB = useRef<[number, number, number, number]>(CAMERAS.rapita);
  const targetVB = useRef<[number, number, number, number]>(CAMERAS.rapita);
  const rafRef = useRef<number | null>(null);

  const active = STOPS.find((s) => s.id === activeId) ?? STOPS[0];

  // rAF-based lerp animation for viewBox
  const startAnim = useCallback(() => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    const step = () => {
      const c = currentVB.current;
      const t = targetVB.current;
      const sp = 0.072;
      const next: [number, number, number, number] = [
        c[0] + (t[0] - c[0]) * sp,
        c[1] + (t[1] - c[1]) * sp,
        c[2] + (t[2] - c[2]) * sp,
        c[3] + (t[3] - c[3]) * sp,
      ];
      currentVB.current = next;
      if (svgRef.current) svgRef.current.setAttribute("viewBox", next.join(" "));
      if (next.some((v, i) => Math.abs(v - t[i]) > 0.08)) {
        rafRef.current = requestAnimationFrame(step);
      }
    };
    rafRef.current = requestAnimationFrame(step);
  }, []);

  // Update camera target when active stop changes
  useEffect(() => {
    targetVB.current = CAMERAS[activeId];
    startAnim();
  }, [activeId, startAnim]);

  // Scroll → phase + active stop
  useEffect(() => {
    const handleScroll = () => {
      const section = sectionRef.current;
      if (!section) return;
      const { top, height } = section.getBoundingClientRect();
      const vh = window.innerHeight;
      const scrollable = height - vh;

      if (top > 0) {
        setPhase("before");
      } else if (top <= 0 && top > -scrollable) {
        setPhase("active");
        const progress = Math.max(0, Math.min(1, -top / scrollable));
        const idx = Math.min(Math.floor(progress * STOPS.length), STOPS.length - 1);
        setActiveId(STOPS[idx].id);
      } else {
        setPhase("after");
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  const stopIndex = STOPS.findIndex((s) => s.id === activeId);

  return (
    <section
      ref={sectionRef}
      id="cruise-plan"
      className="relative"
      style={{ height: `${STOPS.length * 90}vh` }}
    >
      {/* ── Map container — fixed while active, absolute before/after ── */}
      <div
        className="overflow-hidden"
        style={{
          position: phase === "active" ? "fixed" : "absolute",
          top: phase === "after" ? "auto" : 0,
          bottom: phase === "after" ? 0 : "auto",
          left: 0,
          right: 0,
          height: "100vh",
          background: "#07101e",
        }}
      >
        {/* ── SVG Map ────────────────────────────────────────────── */}
        <svg
          ref={svgRef}
          viewBox="-20 55 680 385"
          preserveAspectRatio="xMidYMid slice"
          className="absolute inset-0 w-full h-full"
        >
          <defs>
            <filter id="mapTint" colorInterpolationFilters="sRGB">
              <feColorMatrix type="saturate" values="0.22" />
              <feComponentTransfer>
                <feFuncR type="linear" slope="0.86" />
                <feFuncG type="linear" slope="0.86" />
                <feFuncB type="linear" slope="0.86" />
              </feComponentTransfer>
            </filter>
            <radialGradient id="cpGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#4a9fd5" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#4a9fd5" stopOpacity="0" />
            </radialGradient>
            <filter id="cpBlur">
              <feGaussianBlur stdDeviation="1.5" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Satellite map background */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <image
            href="/mediterranean-map-new.jpg"
            x="0" y="0"
            width="1200" height="680"
            preserveAspectRatio="none"
            filter="url(#mapTint)"
          />

          {/* ── Route ──────────────────────────────────────────── */}
          <path d={ROUTE} fill="none" stroke="rgba(255,255,255,0.6)" strokeWidth="0.9" strokeLinecap="round" strokeLinejoin="round" vectorEffect="non-scaling-stroke" />

          {/* ── Markers ────────────────────────────────────────── */}
          {STOPS.map((stop) => {
            const isActive = stop.id === activeId;
            return (
              <g key={stop.id}>
                {isActive ? (
                  <>
                    <circle cx={stop.x} cy={stop.y} r="7" fill="none"
                      stroke="rgba(255,255,255,0.9)" strokeWidth="1" vectorEffect="non-scaling-stroke" />
                    <circle cx={stop.x} cy={stop.y} r="2.5" fill="white" />
                  </>
                ) : (
                  <circle cx={stop.x} cy={stop.y} r="2.5"
                    fill="rgba(255,255,255,0.45)" vectorEffect="non-scaling-stroke" />
                )}
              </g>
            );
          })}
        </svg>

        {/* ── Gradient overlays ──────────────────────────────────── */}
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: "linear-gradient(to right, rgba(8,15,28,0.92) 0%, rgba(8,15,28,0.6) 30%, rgba(8,15,28,0.1) 65%, transparent 100%)", zIndex: 2 }} />
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: "linear-gradient(to bottom, rgba(8,15,28,0.5) 0%, transparent 20%, transparent 72%, rgba(8,15,28,0.85) 100%)", zIndex: 2 }} />

        {/* ── Header ─────────────────────────────────────────────── */}
        <div className="absolute top-0 left-0 right-0 px-6 lg:px-14 pt-24" style={{ zIndex: 10 }}>
          <div className="max-w-7xl mx-auto">
            <p className="text-[11px] tracking-[0.28em] uppercase mb-2 font-light"
              style={{ color: "rgba(255,255,255,0.38)" }}>
              {lang === "de" ? "Törn 2026" : "Cruise Plan 2026"}
            </p>
            <h2 className="font-manrope font-bold text-white"
              style={{ fontSize: "clamp(1.6rem, 2.4vw, 2.8rem)", lineHeight: 1.1 }}>
              Mediterranean Route
            </h2>
          </div>
        </div>

        {/* ── Stop info (bottom-left) ─────────────────────────────── */}
        <div className="absolute px-6 lg:px-14" style={{ bottom: "10%", left: 0, zIndex: 10, maxWidth: "500px" }}>
          <AnimatePresence mode="wait">
            <motion.div key={activeId}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.35, ease }}
              className="flex items-end gap-5"
            >
              <div className="hidden lg:block relative flex-shrink-0 overflow-hidden"
                style={{ width: 108, height: 72, borderRadius: 8, border: "1px solid rgba(255,255,255,0.1)" }}>
                <Image src={active.image} alt={active.city} fill className="object-cover" sizes="108px" />
              </div>
              <div>
                <p className="font-manrope text-[10px] tracking-[0.36em] uppercase mb-1.5" style={{ color: "rgba(255,255,255,0.45)" }}>
                  {active.month} · {active.region}
                </p>
                <h3 className="font-manrope font-bold text-white mb-2"
                  style={{ fontSize: "clamp(1.5rem, 2.8vw, 2.6rem)", lineHeight: 1 }}>
                  {active.city}
                </h3>
                <p className="font-manrope font-light text-sm leading-relaxed"
                  style={{ color: "rgba(255,255,255,0.58)", maxWidth: "21rem" }}>
                  {lang === "de" ? active.de : active.en}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* ── Progress dots (right side) ──────────────────────────── */}
        <div className="absolute right-6 lg:right-10 top-1/2 -translate-y-1/2 flex flex-col gap-2.5" style={{ zIndex: 10 }}>
          {STOPS.map((stop, i) => (
            <div key={stop.id} className="rounded-full transition-all duration-400"
              style={{
                width:  activeId === stop.id ? 8 : 5,
                height: activeId === stop.id ? 8 : 5,
                background: activeId === stop.id ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.2)",
                boxShadow: "none",
                alignSelf: "center",
              }}
            />
          ))}
        </div>

        {/* ── Scroll hint (first stop only) ──────────────────────── */}
        <AnimatePresence>
          {activeId === "rapita" && (
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
              style={{ zIndex: 10 }}
            >
              <p className="font-manrope text-[10px] tracking-[0.25em] uppercase" style={{ color: "rgba(255,255,255,0.3)" }}>
                {lang === "de" ? "Scrollen" : "Scroll"}
              </p>
              <div className="w-px h-8" style={{ background: "linear-gradient(to bottom, rgba(255,255,255,0.3), transparent)" }} />
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── Book CTA (last stop) ───────────────────────────────── */}
        <AnimatePresence>
          {activeId === "bizerte" && (
            <motion.div
              initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
              className="absolute bottom-8 left-1/2 -translate-x-1/2"
              style={{ zIndex: 10 }}
            >
              <a href="#contact"
                className="inline-flex items-center gap-2.5 font-manrope font-semibold text-[12px] tracking-[0.1em] uppercase px-7 py-3.5 transition-all duration-300"
                style={{ background: "var(--accent)", color: "#fff", borderRadius: 8, boxShadow: "0 4px 24px rgba(0,75,145,0.45)" }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "var(--accent-hover)"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "var(--accent)"; }}
              >
                {lang === "de" ? "Reise buchen" : "Book your cruise"}
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
