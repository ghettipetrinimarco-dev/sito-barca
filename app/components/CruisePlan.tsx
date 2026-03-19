"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useLang } from "../context/LanguageContext";

const ease: [number, number, number, number] = [0.16, 1, 0.3, 1];

// ViewBox: 0 0 1200 680
// Scale: x=(lon+1)*100, y=(43.5-lat)*90.7
const STOPS = [
  {
    id: "rapita",
    city: "San Carles de la Ràpita",
    region: "Costa Daurada · Spain",
    month: "May",
    dates: "10 May 2026",
    route: 1,
    x: 160, y: 263,
    image: "/images/cruise/la-rapita.jpg",
    labelPos: "top" as const,
    en: "Our journey begins in the sheltered bay of La Ràpita — a quiet fishing village on the Costa Daurada, the perfect departure point before the open Mediterranean.",
    de: "Unsere Reise beginnt in der geschützten Bucht von La Ràpita — ein ruhiges Fischerdorf an der Costa Daurada, der perfekte Ausgangspunkt für das offene Mittelmeer.",
  },
  {
    id: "mallorca",
    city: "Mallorca",
    region: "Balearic Islands · Spain",
    month: "May",
    dates: "May – Jun 2026",
    route: 1,
    x: 395, y: 345,
    image: "/images/cruise/mallorca.jpg",
    labelPos: "bottom" as const,
    en: "The crown jewel of the Balearics. Dramatic cliffs, hidden coves and crystal waters make Mallorca an unmissable first stop of the island arc.",
    de: "Das Juwel der Balearen. Dramatische Klippen, versteckte Buchten und kristallklares Wasser.",
  },
  {
    id: "menorca",
    city: "Menorca",
    region: "Balearic Islands · Spain",
    month: "Jun",
    dates: "May – Jun 2026",
    route: 1,
    x: 505, y: 322,
    image: "/images/cruise/menorca.jpg",
    labelPos: "top" as const,
    en: "Wilder and quieter than her sisters. Menorca's turquoise lagoons and UNESCO Biosphere Reserve offer raw Mediterranean nature at its finest.",
    de: "Wilder und ruhiger als ihre Schwestern. Menorcas türkisfarbene Lagunen und das UNESCO-Biosphärenreservat.",
  },
  {
    id: "ibiza",
    city: "Ibiza",
    region: "Balearic Islands · Spain",
    month: "Jun",
    dates: "Jun 2026",
    route: 1,
    x: 245, y: 417,
    image: "/images/cruise/ibiza.jpg",
    labelPos: "left" as const,
    en: "Beyond the nightlife lies a magical island of ancient villages, pine forests and secret beaches bathed in golden Mediterranean light.",
    de: "Jenseits des Nachtlebens: eine magische Insel mit alten Dörfern, Pinienwäldern und geheimen Stränden.",
  },
  {
    id: "formentera",
    city: "Formentera",
    region: "Balearic Islands · Spain",
    month: "Jun/Sep",
    dates: "Jun – Sep 2026",
    route: 1,
    x: 250, y: 440,
    image: "/images/cruise/formentera.jpg",
    labelPos: "left" as const,
    en: "The Caribbean of Europe. Formentera's shallow turquoise waters and white sand beaches are the crowning glory of the Balearic arc.",
    de: "Die Karibik Europas. Flache türkisfarbene Gewässer und weisse Sandstrände am Ende des Balearen-Bogens.",
  },
  {
    id: "cagliari",
    city: "Cagliari",
    region: "Sardinia · Italy",
    month: "Sep",
    dates: "Sep 2026",
    route: 2,
    x: 1010, y: 390,
    image: "/images/cruise/cagliari.jpg",
    labelPos: "right" as const,
    en: "Sardinia's ancient capital rises from a lagoon. Roman ruins, rooftop views and warm Sardinian hospitality before the crossing south.",
    de: "Sardiniens alte Hauptstadt über der Lagune. Römische Ruinen, Dachterrassen und sardische Gastfreundschaft.",
  },
  {
    id: "olbia",
    city: "Olbia",
    region: "Sardinia · Italy",
    month: "Sep",
    dates: "Sep 2026",
    route: 2,
    x: 1050, y: 236,
    image: "/images/cruise/olbia.jpg",
    labelPos: "right" as const,
    en: "Gateway to the Costa Smeralda. Where granite rocks tumble into emerald sea and the pace of life slows beautifully.",
    de: "Tor zur Costa Smeralda. Wo Granitfelsen ins smaragdgrüne Meer stürzen und das Leben verlangsamt.",
  },
  {
    id: "bizerte",
    city: "Bizerte",
    region: "Northern Tunisia",
    month: "Oct",
    dates: "4 Oct 2026",
    route: 2,
    x: 1090, y: 558,
    image: "/images/cruise/bizerte.jpg",
    labelPos: "right" as const,
    en: "Our final destination. Tunisia's northernmost city blends French colonial charm with Medina colour — the perfect winter harbour for Ventum.",
    de: "Unser letztes Ziel. Tunesiens nördlichste Stadt verbindet Kolonialcharm mit Medina-Farben — der perfekte Winterhafen.",
  },
];

const ROUTE_1 =
  "M 160,263 C 255,296 325,325 395,345 C 445,330 476,323 505,322 C 476,328 445,335 395,345 C 348,382 293,408 245,417 L 250,440";

const ROUTE_2 =
  "M 250,440 L 245,417 C 305,392 352,368 395,345 C 592,380 798,400 1010,390 C 1028,318 1040,276 1050,236 C 1040,280 1028,326 1010,390 Q 1050,474 1090,558";

export default function CruisePlan() {
  const { lang } = useLang();
  const [activeId, setActiveId] = useState("rapita");
  const route1Ref = useRef<SVGPathElement>(null);
  const route2Ref = useRef<SVGPathElement>(null);

  const active = STOPS.find((s) => s.id === activeId) ?? STOPS[0];

  // Animate routes drawing in on mount
  useEffect(() => {
    const r1 = route1Ref.current;
    const r2 = route2Ref.current;
    if (!r1 || !r2) return;

    const len1 = r1.getTotalLength();
    const len2 = r2.getTotalLength();

    r1.style.strokeDasharray = String(len1);
    r1.style.strokeDashoffset = String(len1);
    r2.style.strokeDasharray = String(len2);
    r2.style.strokeDashoffset = String(len2);

    const t1 = setTimeout(() => {
      r1.style.transition = "stroke-dashoffset 2.8s cubic-bezier(0.4,0,0.2,1)";
      r1.style.strokeDashoffset = "0";
      const t2 = setTimeout(() => {
        r2.style.transition = "stroke-dashoffset 2.2s cubic-bezier(0.4,0,0.2,1)";
        r2.style.strokeDashoffset = "0";
      }, 3000);
      return () => clearTimeout(t2);
    }, 500);

    return () => clearTimeout(t1);
  }, []);

  const labelOffset = (pos: "top" | "bottom" | "left" | "right") => {
    if (pos === "top") return { dx: 0, dy: -16, anchor: "middle" as const };
    if (pos === "bottom") return { dx: 0, dy: 22, anchor: "middle" as const };
    if (pos === "left") return { dx: -14, dy: 4, anchor: "end" as const };
    return { dx: 14, dy: 4, anchor: "start" as const };
  };

  return (
    <section
      id="cruise-plan"
      className="relative overflow-hidden"
      style={{ height: "100dvh", background: "#0a1628" }}
    >
      {/* ── SVG Map ──────────────────────────────────────────────── */}
      <div className="absolute inset-0" style={{ zIndex: 1 }}>
        <svg
          viewBox="0 0 1200 680"
          preserveAspectRatio="xMidYMid slice"
          className="w-full h-full"
        >
          <defs>
            <radialGradient id="cpGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#4a9fd5" stopOpacity="0.35" />
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

          {/* ── Land masses ──────────────────────────────────────── */}

          {/* Spain / Catalonia east coast — more coastal detail */}
          <path
            d="M 0,0 L 420,0 L 375,40 L 345,82 L 316,138 L 298,165 L 268,190 L 225,218 L 200,237 L 160,263 L 120,296 L 88,330 L 65,358 L 50,400 L 42,454 L 0,510 Z"
            fill="rgba(255,255,255,0.048)"
            stroke="rgba(255,255,255,0.1)"
            strokeWidth="0.7"
          />

          {/*
            MALLORCA — 20 points
            Key features: Cap de Formentor finger (NE), Badia de Palma (SW bay),
            Cap de ses Salines (S tip), Cap de Ferrutx (NE coast)
            Scale: x=(lon+1)*100  y=(43.5-lat)*90.7
          */}
          <path
            d="M 330,330
               L 352,320 L 368,317 L 382,318
               L 397,323 L 422,318
               L 422,330 L 408,332 L 420,330
               L 448,342
               L 447,356 L 438,368
               L 425,380 L 405,387
               L 387,383 L 370,376
               L 354,368 L 362,358 L 349,367
               L 338,360 L 330,344
               Z"
            fill="rgba(255,255,255,0.072)"
            stroke="rgba(255,255,255,0.2)"
            strokeWidth="0.85"
            strokeLinejoin="round"
          />

          {/*
            MENORCA — elongated E-W, slight N-coast bumps
            W tip 39.82N 3.83E, NE tip 40.06N 4.34E
          */}
          <path
            d="M 478,338
               L 487,320 L 507,311 L 522,308 L 534,308
               L 538,316 L 530,330 L 514,336 L 493,336
               L 476,330
               Z"
            fill="rgba(255,255,255,0.072)"
            stroke="rgba(255,255,255,0.2)"
            strokeWidth="0.8"
            strokeLinejoin="round"
          />

          {/*
            IBIZA — triangular, wider center
            N tip 39.08N 1.53E, S tip 38.67N 1.40E
            W coast (Sant Antoni bay) 38.98N 1.30E
          */}
          <path
            d="M 252,401
               L 265,408 L 264,420 L 256,430
               L 240,438
               L 225,428 L 222,414
               L 230,406
               Z"
            fill="rgba(255,255,255,0.072)"
            stroke="rgba(255,255,255,0.18)"
            strokeWidth="0.8"
            strokeLinejoin="round"
          />

          {/*
            FORMENTERA — elongated E-W, La Mola peninsula
            La Savina N: 38.74N 1.41E, La Mola E tip: 38.67N 1.59E
          */}
          <path
            d="M 233,435
               L 241,430 L 252,430
               L 262,436 L 257,442
               L 244,442 L 238,438
               Z"
            fill="rgba(255,255,255,0.072)"
            stroke="rgba(255,255,255,0.18)"
            strokeWidth="0.7"
            strokeLinejoin="round"
          />

          {/*
            SARDINIA — 22 points
            Key features: Golfo dell'Asinara (NW bay), Capo Testa (N tip),
            La Maddalena (NE), Capo Carbonara (SE), Golfo di Cagliari (S),
            Capo Teulada (SW), Penisola del Sinis (W), Capo Caccia (W)
          */}
          <path
            d="M 921,226
               L 938,234 L 940,238
               L 970,234 L 978,243
               L 1014,202
               L 1048,217
               L 1073,267 L 1083,308
               L 1073,340 L 1063,367
               L 1052,399
               L 1025,404 L 1005,399 L 988,404
               L 964,421
               L 944,400 L 927,368
               L 919,314
               L 920,282 L 916,264
               L 919,252
               Z"
            fill="rgba(255,255,255,0.048)"
            stroke="rgba(255,255,255,0.12)"
            strokeWidth="0.8"
            strokeLinejoin="round"
          />

          {/* Tunisia north cape */}
          <path
            d="M 1000,680 L 1000,636 L 1058,608 L 1090,558 L 1150,572 L 1200,566 L 1200,680 Z"
            fill="rgba(255,255,255,0.048)"
            stroke="rgba(255,255,255,0.1)"
            strokeWidth="0.7"
          />

          {/* ── Routes ───────────────────────────────────────────── */}

          {/* Route 1 — Spring: white */}
          <path
            ref={route1Ref}
            d={ROUTE_1}
            fill="none"
            stroke="rgba(255,255,255,0.7)"
            strokeWidth="1.4"
            strokeLinecap="round"
          />

          {/* Route 2 — Autumn: blue */}
          <path
            ref={route2Ref}
            d={ROUTE_2}
            fill="none"
            stroke="rgba(100,185,255,0.65)"
            strokeWidth="1.4"
            strokeLinecap="round"
          />

          {/* ── Stop markers ─────────────────────────────────────── */}
          {STOPS.map((stop) => {
            const isActive = stop.id === activeId;
            const { dx, dy, anchor } = labelOffset(stop.labelPos);
            return (
              <g
                key={stop.id}
                onClick={() => setActiveId(stop.id)}
                onMouseEnter={() => setActiveId(stop.id)}
                style={{ cursor: "pointer" }}
              >
                {/* Glow halo */}
                {isActive && (
                  <circle cx={stop.x} cy={stop.y} r="24" fill="url(#cpGlow)" />
                )}
                {/* Outer ring */}
                <circle
                  cx={stop.x}
                  cy={stop.y}
                  r={isActive ? 9 : 5.5}
                  fill="none"
                  stroke={isActive ? "#4a9fd5" : "rgba(255,255,255,0.3)"}
                  strokeWidth={isActive ? 1.5 : 1}
                  style={{ transition: "all 0.45s ease" }}
                />
                {/* Inner dot */}
                <circle
                  cx={stop.x}
                  cy={stop.y}
                  r={isActive ? 3.5 : 2}
                  fill={isActive ? "#7ac8f5" : "rgba(255,255,255,0.65)"}
                  filter={isActive ? "url(#cpBlur)" : undefined}
                  style={{ transition: "all 0.45s ease" }}
                />
                {/* Label */}
                <text
                  x={stop.x + dx}
                  y={stop.y + dy}
                  textAnchor={anchor}
                  fontSize="10"
                  fontFamily="var(--font-manrope, sans-serif)"
                  letterSpacing="0.06em"
                  fill={isActive ? "#ffffff" : "rgba(255,255,255,0.42)"}
                  style={{ transition: "fill 0.45s ease", userSelect: "none" }}
                >
                  {stop.city === "San Carles de la Ràpita" ? "La Ràpita" : stop.city}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      {/* ── Gradient overlays ────────────────────────────────────── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(to right, rgba(10,22,40,0.96) 0%, rgba(10,22,40,0.72) 32%, rgba(10,22,40,0.15) 65%, transparent 100%)",
          zIndex: 2,
        }}
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(to bottom, rgba(10,22,40,0.55) 0%, transparent 22%, transparent 68%, rgba(10,22,40,0.9) 100%)",
          zIndex: 2,
        }}
      />

      {/* ── Header ───────────────────────────────────────────────── */}
      <div className="absolute top-0 left-0 right-0 px-6 lg:px-14 pt-24" style={{ zIndex: 10 }}>
        <div className="max-w-7xl mx-auto flex items-start justify-between">
          <div>
            <p
              className="text-[11px] tracking-[0.28em] uppercase mb-3 font-light"
              style={{ color: "rgba(255,255,255,0.38)" }}
            >
              {lang === "de" ? "Törn 2026" : "Cruise Plan 2026"}
            </p>
            <h2
              className="font-manrope font-bold text-white"
              style={{ fontSize: "clamp(1.8rem, 2.8vw, 3rem)", lineHeight: 1.1 }}
            >
              Mediterranean Route
            </h2>
          </div>

          {/* Route legend */}
          <div className="hidden lg:flex flex-col gap-2.5 pt-1">
            {[
              { label: "10 May – 07 Jun", color: "rgba(255,255,255,0.7)" },
              { label: "06 Sep – 04 Oct", color: "rgba(100,185,255,0.65)" },
            ].map((r) => (
              <div key={r.label} className="flex items-center gap-2.5 justify-end">
                <span
                  className="text-[11px] tracking-[0.14em] uppercase font-light"
                  style={{ color: "rgba(255,255,255,0.45)" }}
                >
                  {r.label}
                </span>
                <div
                  style={{
                    width: 28,
                    height: 1.5,
                    background: r.color,
                    borderRadius: 1,
                    flexShrink: 0,
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Active stop info (bottom-left) ───────────────────────── */}
      <div
        className="absolute px-6 lg:px-14"
        style={{ bottom: "88px", left: 0, zIndex: 10, maxWidth: "520px" }}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={activeId}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.32, ease }}
            className="flex items-end gap-5"
          >
            {/* Thumbnail */}
            <div
              className="hidden lg:block relative flex-shrink-0 overflow-hidden"
              style={{ width: 112, height: 76, borderRadius: 8, border: "1px solid rgba(255,255,255,0.12)" }}
            >
              <Image
                src={active.image}
                alt={active.city}
                fill
                className="object-cover"
                sizes="112px"
              />
            </div>

            {/* Text */}
            <div>
              <p
                className="font-manrope text-[10px] tracking-[0.38em] uppercase mb-1.5"
                style={{ color: "#4a9fd5" }}
              >
                {active.month} · {active.region}
              </p>
              <h3
                className="font-manrope font-bold text-white mb-2"
                style={{ fontSize: "clamp(1.6rem, 3vw, 2.8rem)", lineHeight: 1 }}
              >
                {active.city}
              </h3>
              <p
                className="font-manrope font-light text-sm leading-relaxed"
                style={{ color: "rgba(255,255,255,0.6)", maxWidth: "22rem" }}
              >
                {lang === "de" ? active.de : active.en}
              </p>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* ── Bottom strip ─────────────────────────────────────────── */}
      <div
        className="absolute bottom-0 left-0 right-0 overflow-x-auto"
        style={{
          zIndex: 10,
          background: "rgba(5,15,30,0.82)",
          backdropFilter: "blur(14px)",
          borderTop: "1px solid rgba(255,255,255,0.07)",
        }}
      >
        <div className="flex items-stretch px-6 lg:px-14 justify-between min-w-max lg:min-w-0 w-full">
          <div className="flex items-stretch">
            {STOPS.map((stop) => {
              const isActive = stop.id === activeId;
              return (
                <button
                  key={stop.id}
                  onClick={() => setActiveId(stop.id)}
                  onMouseEnter={() => setActiveId(stop.id)}
                  className="relative flex flex-col items-center px-4 lg:px-5 py-4 transition-colors duration-200"
                  style={{ minWidth: 76 }}
                >
                  <div
                    className="rounded-full mb-2 transition-all duration-350"
                    style={{
                      width: isActive ? 9 : 5,
                      height: isActive ? 9 : 5,
                      background: isActive ? "#4a9fd5" : "rgba(255,255,255,0.2)",
                      boxShadow: isActive ? "0 0 0 3px rgba(74,159,213,0.22)" : "none",
                    }}
                  />
                  <p
                    className="font-manrope text-[9px] tracking-[0.2em] uppercase mb-0.5"
                    style={{
                      color: isActive ? "#4a9fd5" : "rgba(255,255,255,0.22)",
                      transition: "color 0.3s ease",
                    }}
                  >
                    {stop.month}
                  </p>
                  <p
                    className="font-manrope text-[11.5px] whitespace-nowrap"
                    style={{
                      color: isActive ? "#ffffff" : "rgba(255,255,255,0.35)",
                      fontWeight: isActive ? 600 : 300,
                      transition: "color 0.3s ease",
                    }}
                  >
                    {stop.city === "San Carles de la Ràpita" ? "La Ràpita" : stop.city}
                  </p>
                  <div
                    className="absolute bottom-0 left-0 right-0 transition-all duration-300"
                    style={{
                      height: 2,
                      background: isActive ? "#4a9fd5" : "transparent",
                    }}
                  />
                </button>
              );
            })}
          </div>

          {/* CTA */}
          <div
            className="flex items-center pl-5 ml-3 flex-shrink-0"
            style={{ borderLeft: "1px solid rgba(255,255,255,0.08)" }}
          >
            <a
              href="#contact"
              className="inline-flex items-center gap-2 font-manrope font-semibold text-[12px] tracking-[0.1em] uppercase px-5 py-2.5 whitespace-nowrap transition-all duration-300"
              style={{
                background: "var(--accent)",
                color: "#fff",
                borderRadius: 8,
                boxShadow: "0 4px 20px rgba(0,75,145,0.4)",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.background = "var(--accent-hover)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.background = "var(--accent)";
              }}
            >
              {lang === "de" ? "Reise buchen" : "Book your cruise"}
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
