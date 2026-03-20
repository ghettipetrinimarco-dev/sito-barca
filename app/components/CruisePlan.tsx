"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useLang } from "../context/LanguageContext";

const ease: [number, number, number, number] = [0.16, 1, 0.3, 1];

// px/py = pixel coords in 2048×1143 image space · zoom = CSS scale factor
const STOPS = [
  {
    id: "rapita",
    city: "San Carles de la Ràpita",
    region: "Costa Daurada · Spain",
    month: "May",
    dates: "10 May 2026",
    px: 312, py: 407, zoom: 1.15,
    image: "/LaRapita-new.jpg",
    en: "Our journey begins in the sheltered bay of La Ràpita — a quiet fishing village on the Costa Daurada, the perfect departure point before the open Mediterranean.",
    de: "Unsere Reise beginnt in der geschützten Bucht von La Ràpita — ein ruhiges Fischerdorf an der Costa Daurada.",
  },
  {
    id: "mallorca",
    city: "Mallorca",
    region: "Balearic Islands · Spain",
    month: "May",
    dates: "May – Jun 2026",
    px: 696, py: 641, zoom: 1.45,
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
    px: 829, py: 493, zoom: 1.5,
    image: "/Menorca-new.webp",
    en: "Wilder and quieter than her sisters. Menorca's turquoise lagoons and UNESCO Biosphere Reserve offer raw Mediterranean nature at its finest.",
    de: "Wilder und ruhiger als ihre Schwestern. Menorcas türkisfarbene Lagunen und das UNESCO-Biosphärenreservat.",
  },
  {
    id: "ibiza",
    city: "Ibiza",
    region: "Balearic Islands · Spain",
    month: "Jun",
    dates: "Jun 2026",
    px: 476, py: 731, zoom: 1.5,
    image: "/ibiza-new.jpg",
    en: "Beyond the nightlife lies a magical island of ancient villages, pine forests and secret beaches bathed in golden Mediterranean light.",
    de: "Jenseits des Nachtlebens: eine magische Insel mit alten Dörfern, Pinienwäldern und geheimen Stränden.",
  },
  {
    id: "formentera",
    city: "Formentera",
    region: "Balearic Islands · Spain",
    month: "Jun/Sep",
    dates: "Jun – Sep 2026",
    px: 472, py: 784, zoom: 1.5,
    image: "/formentera-new.jpg",
    en: "The Caribbean of Europe. Formentera's shallow turquoise waters and white sand beaches are the crowning glory of the Balearic arc.",
    de: "Die Karibik Europas. Flache türkisfarbene Gewässer und weisse Sandstrände am Ende des Balearen-Bogens.",
  },
  {
    id: "olbia",
    city: "Olbia",
    region: "Sardinia · Italy",
    month: "Sep",
    dates: "Sep 2026",
    px: 1655, py: 151, zoom: 1.5,
    image: "/olbia-new.jpg",
    en: "Gateway to the Costa Smeralda. Where granite rocks tumble into emerald sea and the pace of life slows beautifully.",
    de: "Tor zur Costa Smeralda. Wo Granitfelsen ins smaragdgrüne Meer stürzen.",
  },
  {
    id: "cagliari",
    city: "Cagliari",
    region: "Sardinia · Italy",
    month: "Sep",
    dates: "Sep 2026",
    px: 1653, py: 522, zoom: 1.45,
    image: "/cagliari-new.jpg",
    en: "Sardinia's ancient capital rises from a lagoon. Roman ruins, rooftop views and warm Sardinian hospitality before the crossing south.",
    de: "Sardiniens alte Hauptstadt über der Lagune. Römische Ruinen, Dachterrassen und sardische Gastfreundschaft.",
  },
  {
    id: "bizerte",
    city: "Bizerte",
    region: "Northern Tunisia",
    month: "Oct",
    dates: "4 Oct 2026",
    px: 1837, py: 880, zoom: 1.4,
    image: "/Bizerte-new.jpg",
    en: "Our final destination. Tunisia's northernmost city blends French colonial charm with Medina colour — the perfect winter harbour for Ventum.",
    de: "Unser letztes Ziel. Tunesiens nördlichste Stadt — der perfekte Winterhafen für Ventum.",
  },
];


export default function CruisePlan() {
  const { lang } = useLang();
  const [activeId, setActiveId] = useState("rapita");
  const [phase, setPhase] = useState<"before" | "active" | "after">("before");
  const sectionRef = useRef<HTMLElement>(null);
  const activeIdxRef = useRef(0);

  const active = STOPS.find((s) => s.id === activeId) ?? STOPS[0];

  // Pan+zoom: translate to center the stop, clamped so image always fills viewport
  const stopIndex = STOPS.findIndex((s) => s.id === activeId);

  const fx = active.px / 2048;
  const fy = active.py / 1143;
  const z = active.zoom;
  const rawTx = (0.5 - fx * z) * 100;
  const rawTy = (0.5 - fy * z) * 100;
  const tx = Math.min(0, Math.max(-(z - 1) * 100, rawTx));
  const ty = Math.min(0, Math.max(-(z - 1) * 100, rawTy));
  const mapTransform = `translate(${tx}%, ${ty}%) scale(${z})`;

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
        const zoneSize = 1 / STOPS.length;
        const buf = zoneSize * 0.12; // 12% buffer — avoids jitter at zone boundaries
        const rawIdx = Math.min(Math.floor(progress * STOPS.length), STOPS.length - 1);
        const cur = activeIdxRef.current;
        let next = cur;
        if (rawIdx > cur && progress >= rawIdx * zoneSize + buf) next = rawIdx;
        else if (rawIdx < cur && progress <= (rawIdx + 1) * zoneSize - buf) next = rawIdx;
        if (next !== cur) { activeIdxRef.current = next; setActiveId(STOPS[next].id); }
      } else {
        setPhase("after");
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section
      ref={sectionRef}
      id="cruise-plan"
      className="relative"
      style={{ height: `${STOPS.length * 130}vh` }}
    >
      <div
        className="overflow-hidden"
        style={{
          position: phase === "active" ? "fixed" : "absolute",
          top: phase === "after" ? "auto" : 0,
          bottom: phase === "after" ? 0 : "auto",
          left: 0, right: 0, height: "100vh",
          background: "#07101e",
        }}
      >
        {/* ── Map + SVG in zoomable wrapper ───────────────────────── */}
        <div
          style={{
            position: "absolute", inset: 0,
            transformOrigin: "0 0",
            transform: mapTransform,
            transition: "transform 2s cubic-bezier(0.25,1,0.5,1)",
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/mediterranean-map.jpg"
            alt=""
            style={{
              position: "absolute", inset: 0,
              width: "100%", height: "100%",
              objectFit: "fill",
              filter: "saturate(0.2) brightness(0.82)",
            }}
          />
          <svg
            viewBox="0 0 2048 1143"
            preserveAspectRatio="none"
            className="absolute inset-0 w-full h-full"
            style={{ pointerEvents: "none" }}
          >
            {STOPS.slice(0, -1).map((stop, i) => {
              const next = STOPS[i + 1];
              const drawn = stopIndex > i;
              return (
                <motion.path
                  key={`seg-${i}`}
                  d={`M ${stop.px},${stop.py} L ${next.px},${next.py}`}
                  fill="none"
                  stroke="rgba(255,255,255,0.45)"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  vectorEffect="non-scaling-stroke"
                  initial={false}
                  animate={{ pathLength: drawn ? 1 : 0 }}
                  transition={{ duration: 1.8, ease: [0.25, 1, 0.5, 1] }}
                />
              );
            })}
            {STOPS.map((stop) => {
              const isActive = stop.id === activeId;
              return (
                <g key={stop.id}>
                  {isActive ? (
                    <>
                      <circle cx={stop.px} cy={stop.py} r="14" fill="none"
                        stroke="rgba(255,255,255,0.8)" strokeWidth="1"
                        vectorEffect="non-scaling-stroke" />
                      <circle cx={stop.px} cy={stop.py} r="4" fill="white" />
                    </>
                  ) : (
                    <circle cx={stop.px} cy={stop.py} r="4"
                      fill="rgba(255,255,255,0.35)"
                      vectorEffect="non-scaling-stroke" />
                  )}
                </g>
              );
            })}
          </svg>
        </div>

        {/* ── Gradients ──────────────────────────────────────────── */}
        <div className="absolute inset-0 pointer-events-none" style={{
          background: "linear-gradient(to bottom, transparent 0%, transparent 50%, rgba(7,16,30,0.85) 75%, rgba(7,16,30,0.98) 100%)",
          zIndex: 2,
        }} />
        <div className="absolute inset-0 pointer-events-none" style={{
          background: "linear-gradient(to right, rgba(7,16,30,0.7) 0%, transparent 40%)",
          zIndex: 2,
        }} />

        {/* ── Stop info — bottom left ──────────────────────────────── */}
        <div className="absolute bottom-0 left-0 px-6 lg:px-12"
          style={{ zIndex: 10, paddingBottom: "clamp(2rem, 5vh, 4rem)" }}>
          <AnimatePresence mode="wait">
            <motion.div key={activeId}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.4, ease }}
              className="flex flex-col"
              style={{ width: "clamp(260px, 28vw, 380px)" }}
            >
              {/* Photo */}
              <div className="relative w-full overflow-hidden"
                style={{ aspectRatio: "3/2", borderRadius: 10, border: "1px solid rgba(255,255,255,0.15)", marginBottom: "1rem" }}>
                <Image src={active.image} alt={active.city} fill className="object-cover" sizes="380px" />
              </div>

              {/* Text */}
              <div>
                <p className="font-manrope text-[10px] tracking-[0.36em] uppercase mb-1.5"
                  style={{ color: "rgba(255,255,255,0.6)" }}>
                  {active.month} · {active.region}
                </p>
                <h3 className="font-manrope font-bold text-white mb-2"
                  style={{ fontSize: "clamp(1.4rem, 2.4vw, 2.2rem)", lineHeight: 1 }}>
                  {active.city === "San Carles de la Ràpita" ? "La Ràpita" : active.city}
                </h3>
                <p className="font-manrope font-light leading-relaxed line-clamp-2"
                  style={{ color: "rgba(255,255,255,0.65)", fontSize: "clamp(0.75rem, 0.9vw, 0.85rem)" }}>
                  {lang === "de" ? active.de : active.en}
                </p>
                {activeId === "bizerte" && (
                  <a href="#contact"
                    className="inline-flex items-center gap-2.5 font-manrope font-semibold text-[12px] tracking-[0.1em] uppercase px-6 py-3 mt-4 transition-all duration-300"
                    style={{ background: "var(--accent)", color: "#fff", borderRadius: 8 }}
                    onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "var(--accent-hover)"; }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "var(--accent)"; }}
                  >
                    {lang === "de" ? "Reise buchen" : "Book your cruise"}
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </a>
                )}
              </div>
            </motion.div>
          </AnimatePresence>

        </div>

        {/* ── Progress dots right ──────────────────────────────────── */}
        <div className="absolute right-4 lg:right-8 top-1/2 -translate-y-1/2 flex flex-col" style={{ zIndex: 10 }}>
          {STOPS.map((stop, i) => (
            <button
              key={stop.id}
              aria-label={stop.city}
              onClick={() => {
                const section = sectionRef.current;
                if (!section) return;
                const sectionTop = section.getBoundingClientRect().top + window.scrollY;
                const scrollable = section.offsetHeight - window.innerHeight;
                const zoneSize = 1 / STOPS.length;
                window.scrollTo({ top: sectionTop + (i * zoneSize + zoneSize * 0.5) * scrollable, behavior: "smooth" });
              }}
              style={{
                display: "flex", alignItems: "center", justifyContent: "center",
                width: 32, height: 32,
                background: "none", border: "none", cursor: "pointer", outline: "none", padding: 0,
              }}
            >
              <span className="rounded-full transition-all duration-300" style={{
                display: "block",
                width:  activeId === stop.id ? 8 : 5,
                height: activeId === stop.id ? 8 : 5,
                background: activeId === stop.id ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.3)",
              }} />
              {activeId === stop.id && (
                <span className="font-manrope text-[10px] tracking-[0.12em] uppercase absolute right-10"
                  style={{ color: "rgba(255,255,255,0.7)", whiteSpace: "nowrap" }}>
                  {stop.city === "San Carles de la Ràpita" ? "La Ràpita" : stop.city}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
