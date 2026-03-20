"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useLang } from "../context/LanguageContext";

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

/* ── Shared SVG overlay (route + dots) ─────────────────────────── */
function MapOverlay({ activeId, stopIndex }: { activeId: string; stopIndex: number }) {
  const activeStop = STOPS.find((s) => s.id === activeId) ?? STOPS[0];

  return (
    <svg
      viewBox="0 0 2048 1143"
      preserveAspectRatio="none"
      style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" }}
    >
      {/* Route lines */}
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
            transition={{ duration: 2.4, ease: "linear" }}
          />
        );
      })}

      {/* Static dots for all stops */}
      {STOPS.map((stop) => (
        <circle
          key={stop.id}
          cx={stop.px}
          cy={stop.py}
          r="4"
          fill="rgba(255,255,255,0.35)"
          vectorEffect="non-scaling-stroke"
        />
      ))}

      {/* Sailboat icon — animates smoothly between positions */}
      <motion.g
        initial={{ x: STOPS[0].px, y: STOPS[0].py }}
        animate={{ x: activeStop.px, y: activeStop.py }}
        transition={{ duration: 2.4, ease: "linear" }}
      >
        <image
          href="/boat-shiloutte.png"
          x="-28"
          y="-40"
          width="56"
          height="56"
          opacity="0.9"
        />
      </motion.g>
    </svg>
  );
}

/* ── Mobile layout ──────────────────────────────────────────────── */
function MobileLayout({ lang, activeId, setActiveId, stopIndex }: {
  lang: string;
  activeId: string;
  setActiveId: (id: string) => void;
  stopIndex: number;
}) {
  return (
    <div style={{ minHeight: "100vh", background: "#07101e", color: "#fff" }}>
      {/* Header + Map — single sticky block, no gap */}
      <div style={{ position: "sticky", top: 0, zIndex: 20, background: "#07101e" }}>
        {/* Header */}
        <div style={{
          display: "flex", alignItems: "center", justifyContent: "space-between",
          padding: "0.9rem 1.25rem",
          borderBottom: "1px solid rgba(255,255,255,0.06)",
        }}>
          <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.6rem", letterSpacing: "0.3em", textTransform: "uppercase", fontFamily: "var(--font-manrope)" }}>
            {lang === "de" ? "Törn 2026" : "Cruise 2026"}
          </p>
          <button
            onClick={() => window.close()}
            style={{
              color: "rgba(255,255,255,0.75)", fontSize: "0.6rem", letterSpacing: "0.15em",
              textTransform: "uppercase", display: "flex", alignItems: "center", gap: "6px",
              background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: "6px", padding: "6px 12px", cursor: "pointer",
              fontFamily: "var(--font-manrope)",
            }}
          >
            {lang === "de" ? "Schliessen" : "Close map"}
            <svg width="10" height="10" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
              <path d="M2 2l10 10M12 2L2 12" />
            </svg>
          </button>
        </div>

        {/* Map — 16:9 box */}
        <div style={{ position: "relative", width: "100%", paddingTop: "56.25%" }}>
          <div style={{ position: "absolute", inset: 0 }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/mediterranean-map.jpg"
              alt=""
              style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "fill", filter: "saturate(0.2) brightness(0.82)" }}
            />
            <MapOverlay activeId={activeId} stopIndex={stopIndex} />
          </div>
        </div>
      </div>

      {/* Stop list */}
      <div style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
        {STOPS.map((stop, i) => {
          const isActive = activeId === stop.id;
          const label = stop.city === "San Carles de la Ràpita" ? "La Ràpita" : stop.city;
          return (
            <div
              key={stop.id}
              onClick={() => setActiveId(stop.id)}
              style={{
                display: "flex", gap: "1rem", padding: "0.9rem 1.25rem",
                borderBottom: "1px solid rgba(255,255,255,0.05)",
                background: isActive ? "rgba(255,255,255,0.05)" : "transparent",
                cursor: "pointer", transition: "background 0.2s", alignItems: "center",
              }}
            >
              {/* Thumbnail */}
              <div style={{ position: "relative", width: 64, height: 44, borderRadius: 8, overflow: "hidden", flexShrink: 0 }}>
                <Image src={stop.image} alt={label} fill className="object-cover" sizes="64px" />
              </div>
              {/* Info */}
              <div style={{ flex: 1, minWidth: 0 }}>
                <p style={{ color: "rgba(255,255,255,0.35)", fontSize: "0.58rem", letterSpacing: "0.25em", textTransform: "uppercase", marginBottom: 3, fontFamily: "var(--font-manrope)" }}>
                  {stop.month} · {stop.region}
                </p>
                <p style={{
                  color: isActive ? "#fff" : "rgba(255,255,255,0.65)",
                  fontWeight: isActive ? 600 : 400,
                  fontSize: "0.88rem",
                  fontFamily: "var(--font-manrope)",
                  whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis",
                }}>
                  {label}
                </p>
                {isActive && (
                  <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.72rem", fontFamily: "var(--font-manrope)", fontWeight: 300, lineHeight: 1.4, marginTop: 4 }}>
                    {lang === "de" ? stop.de : stop.en}
                  </p>
                )}
              </div>
              {/* Active dot */}
              <div style={{
                width: 6, height: 6, borderRadius: "50%",
                background: isActive ? "var(--accent)" : "rgba(255,255,255,0.12)",
                flexShrink: 0, transition: "background 0.3s",
              }} />
            </div>
          );
        })}
      </div>

      {/* Book CTA */}
      <div style={{ padding: "1.5rem 1.25rem 2rem" }}>
        <a
          href="/#contact"
          style={{
            display: "block", textAlign: "center",
            background: "var(--accent)", color: "#fff", borderRadius: 8,
            padding: "14px", fontFamily: "var(--font-manrope)",
            fontWeight: 600, fontSize: "0.72rem", letterSpacing: "0.1em",
            textTransform: "uppercase",
          }}
        >
          {lang === "de" ? "Reise buchen" : "Book your cruise"}
        </a>
      </div>
    </div>
  );
}

/* ── Main page ──────────────────────────────────────────────────── */
export default function CruiseMapPage() {
  const { lang } = useLang();
  const [activeId, setActiveId] = useState("rapita");
  const [isMobile, setIsMobile] = useState<boolean | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const activeIdxRef = useRef(0);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 1024);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const active = STOPS.find((s) => s.id === activeId) ?? STOPS[0];
  const stopIndex = STOPS.findIndex((s) => s.id === activeId);

  const fx = active.px / 2048;
  const fy = active.py / 1143;
  const z = active.zoom;
  const rawTx = (0.5 - fx * z) * 100;
  const rawTy = (0.5 - fy * z) * 100;
  const tx = Math.min(0, Math.max(-(z - 1) * 100, rawTx));
  const ty = Math.min(0, Math.max(-(z - 1) * 100, rawTy));
  const mapTransform = `translate(${tx}%, ${ty}%) scale(${z})`;

  // Scroll-driven stop selection (desktop only)
  useEffect(() => {
    if (isMobile) return;
    const container = containerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const scrollTop = container.scrollTop;
      const totalScrollable = container.scrollHeight - container.clientHeight;
      const progress = Math.max(0, Math.min(1, scrollTop / totalScrollable));

      const zoneSize = 1 / STOPS.length;
      const buf = zoneSize * 0.12;
      const rawIdx = Math.min(Math.floor(progress * STOPS.length), STOPS.length - 1);
      const cur = activeIdxRef.current;
      let next = cur;
      if (rawIdx > cur && progress >= rawIdx * zoneSize + buf) next = rawIdx;
      else if (rawIdx < cur && progress <= (rawIdx + 1) * zoneSize - buf) next = rawIdx;
      if (next !== cur) {
        activeIdxRef.current = next;
        setActiveId(STOPS[next].id);
      }
    };

    container.addEventListener("scroll", handleScroll, { passive: true });
    return () => container.removeEventListener("scroll", handleScroll);
  }, [isMobile]);

  const scrollToStop = (i: number) => {
    const container = containerRef.current;
    if (!container) return;
    const totalScrollable = container.scrollHeight - container.clientHeight;
    const zoneSize = 1 / STOPS.length;
    container.scrollTo({ top: (i * zoneSize + zoneSize * 0.5) * totalScrollable, behavior: "smooth" });
  };

  // Avoid hydration mismatch — render nothing until client knows screen size
  if (isMobile === null) return <div style={{ position: "fixed", inset: 0, background: "#07101e" }} />;

  // ── Mobile ──
  if (isMobile) {
    return <MobileLayout lang={lang} activeId={activeId} setActiveId={setActiveId} stopIndex={stopIndex} />;
  }

  // ── Desktop ──
  return (
    <div style={{ position: "fixed", inset: 0, background: "#07101e", overflow: "hidden", zIndex: 9999 }}>
      {/* Scrollable driver */}
      <div
        ref={containerRef}
        style={{ position: "absolute", inset: 0, overflowY: "scroll", zIndex: 50, color: "transparent" }}
      >
        <div style={{ height: `${STOPS.length * 80}vh` }} />
      </div>

      {/* Map + SVG */}
      <div
        style={{
          position: "absolute", inset: 0,
          transformOrigin: "0 0",
          transform: mapTransform,
          transition: "transform 4s cubic-bezier(0.25,1,0.5,1)",
          zIndex: 1,
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/mediterranean-map.jpg"
          alt=""
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "fill", filter: "saturate(0.2) brightness(0.82)" }}
        />
        <MapOverlay activeId={activeId} stopIndex={stopIndex} />
      </div>

      {/* Gradients */}
      <div className="absolute inset-0 pointer-events-none" style={{
        background: "linear-gradient(to bottom, transparent 0%, transparent 50%, rgba(7,16,30,0.85) 75%, rgba(7,16,30,0.98) 100%)",
        zIndex: 2,
      }} />
      <div className="absolute inset-0 pointer-events-none" style={{
        background: "linear-gradient(to right, rgba(7,16,30,0.7) 0%, transparent 40%)",
        zIndex: 2,
      }} />

      {/* Close button */}
      <button
        onClick={() => window.close()}
        className="absolute top-8 right-14 font-manrope text-[11px] tracking-[0.15em] uppercase flex items-center gap-2 transition-all duration-300"
        style={{
          zIndex: 60, cursor: "pointer",
          color: "rgba(255,255,255,0.85)",
          background: "rgba(7,16,30,0.55)",
          backdropFilter: "blur(10px)",
          WebkitBackdropFilter: "blur(10px)",
          border: "1px solid rgba(255,255,255,0.12)",
          borderRadius: 8,
          padding: "8px 14px",
        }}
        onMouseEnter={(e) => {
          const el = e.currentTarget as HTMLElement;
          el.style.background = "rgba(255,255,255,0.12)";
          el.style.borderColor = "rgba(255,255,255,0.3)";
          el.style.color = "#fff";
        }}
        onMouseLeave={(e) => {
          const el = e.currentTarget as HTMLElement;
          el.style.background = "rgba(7,16,30,0.55)";
          el.style.borderColor = "rgba(255,255,255,0.12)";
          el.style.color = "rgba(255,255,255,0.85)";
        }}
      >
        {lang === "de" ? "Schliessen" : "Close map"}
        <svg width="13" height="13" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
          <path d="M2 2l10 10M12 2L2 12" />
        </svg>
      </button>

      {/* Stop info card — bottom left */}
      <div className="absolute left-0 right-auto px-14" style={{ zIndex: 10, bottom: "clamp(2rem, 4vh, 3.5rem)" }}>
        <AnimatePresence mode="wait">
          <motion.div key={activeId}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1] }}
            style={{
              width: 300,
              background: "rgba(7,16,30,0.45)",
              backdropFilter: "blur(12px)",
              WebkitBackdropFilter: "blur(12px)",
              borderRadius: 14,
              border: "1px solid rgba(255,255,255,0.08)",
              overflow: "hidden",
              pointerEvents: "none",
            }}
          >
            <div className="relative w-full overflow-hidden" style={{ aspectRatio: "3/2" }}>
              <Image src={active.image} alt={active.city} fill className="object-cover" sizes="300px" />
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, transparent 60%, rgba(7,16,30,0.4) 100%)" }} />
            </div>
            <div style={{ padding: "1rem 1.1rem 1.2rem" }}>
              <p className="font-manrope text-[10px] tracking-[0.36em] uppercase mb-1.5" style={{ color: "rgba(255,255,255,0.6)" }}>
                {active.month} · {active.region}
              </p>
              <h3 className="font-manrope font-bold text-white mb-2" style={{ fontSize: "clamp(1.4rem, 2.4vw, 2.2rem)", lineHeight: 1 }}>
                {active.city === "San Carles de la Ràpita" ? "La Ràpita" : active.city}
              </h3>
              <p className="font-manrope font-light leading-relaxed" style={{ color: "rgba(255,255,255,0.65)", fontSize: "clamp(0.75rem, 0.9vw, 0.85rem)" }}>
                {lang === "de" ? active.de : active.en}
              </p>
              {activeId === "bizerte" && (
                <a href="/#contact"
                  className="inline-flex items-center gap-2.5 font-manrope font-semibold text-[12px] tracking-[0.1em] uppercase px-6 py-3 mt-4 transition-all duration-300"
                  style={{ background: "var(--accent)", color: "#fff", borderRadius: 8, pointerEvents: "auto" }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "var(--accent-hover)"; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "var(--accent)"; }}
                >
                  {lang === "de" ? "Reise buchen" : "Book your cruise"}
                </a>
              )}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* City list — right */}
      <div className="absolute right-14 flex flex-col items-end gap-3" style={{ zIndex: 60, bottom: "clamp(2rem, 4vh, 3.5rem)" }}>
        {STOPS.map((stop, i) => {
          const isActive = activeId === stop.id;
          const label = stop.city === "San Carles de la Ràpita" ? "La Ràpita" : stop.city;
          return (
            <button
              key={stop.id}
              onClick={() => scrollToStop(i)}
              className="font-manrope transition-all duration-500 cursor-pointer text-right"
              style={{
                background: "none", border: "none", outline: "none", padding: 0,
                fontSize: isActive ? "0.72rem" : "0.65rem",
                fontWeight: isActive ? 600 : 300,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: isActive ? "rgba(255,255,255,0.95)" : "rgba(255,255,255,0.22)",
              }}
            >
              {label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
