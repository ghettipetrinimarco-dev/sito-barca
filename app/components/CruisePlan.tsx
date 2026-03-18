"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useLang } from "../context/LanguageContext";
import { t } from "../translations";

const ease: [number, number, number, number] = [0.16, 1, 0.3, 1];

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
  { month: "May", city: "La Ràpita", region: "Spain", description: "Our journey begins in the sheltered bay of La Ràpita — a quiet fishing village on the Costa Daurada, the perfect departure point before the open Mediterranean.", image: "/la-rapita.avif" },
  { month: "Jun", city: "Mallorca", region: "Balearic Islands", description: "The crown jewel of the Balearics. Dramatic cliffs, hidden coves and crystal waters make Mallorca an unmissable first stop of the island arc.", image: "/images/cruise/mallorca.jpg" },
  { month: "Jun", city: "Menorca", region: "Balearic Islands", description: "Wilder and quieter than her sisters. Menorca's turquoise lagoons and UNESCO Biosphere Reserve offer raw Mediterranean nature at its finest.", image: "/images/cruise/menorca.jpg" },
  { month: "Jul", city: "Cabrera", region: "Balearic Islands", description: "A protected national park accessible only by sea. Cabrera is pure wilderness — no cars, no tourists, just cliffs, falcons and impossibly clear water.", image: "/images/cruise/cabrera.jpg" },
  { month: "Jul", city: "Ibiza", region: "Balearic Islands", description: "Beyond the nightlife lies a magical island of ancient villages, pine forests and secret beaches bathed in golden Mediterranean light.", image: "/ibiza.jpeg" },
  { month: "Aug", city: "Formentera", region: "Balearic Islands", description: "The Caribbean of Europe. Formentera's shallow turquoise waters and white sand beaches are the crowning glory of the Balearic arc.", image: "/images/cruise/formentera.jpg" },
  { month: "Sep", city: "Olbia", region: "Sardinia", description: "Gateway to the Costa Smeralda. Olbia marks our arrival in Sardinia — where granite rocks tumble into emerald sea and the pace of life slows beautifully.", image: "/images/cruise/olbia.jpg" },
  { month: "Sep", city: "Cagliari", region: "Sardinia", description: "Sardinia's ancient capital rises from a lagoon. Cagliari offers Roman ruins, rooftop views and warm Sardinian hospitality before the crossing south.", image: "/images/cruise/cagliari.jpg" },
  { month: "Oct", city: "Bizerte", region: "Tunisia", description: "Our final destination. Tunisia's northernmost city blends French colonial charm with Medina colour — the perfect winter harbour for Ventum.", image: "/images/cruise/bizerte.jpg" },
];

export default function CruisePlan() {
  const { lang } = useLang();
  const tr = t[lang].cruisePlan;
  const [activeIndex, setActiveIndex] = useState(0);
  const routeRef = useRef<HTMLDivElement>(null);
  const active = STOPS[activeIndex];

  return (
    <section id="cruise-plan" className="relative flex flex-col" style={{ background: "#0a1628", height: "100dvh", overflow: "hidden" }}>

      {/* Background images */}
      <div className="absolute inset-0 overflow-hidden" style={{ zIndex: 0 }}>
        {STOPS.map((stop, i) => (
          <div key={i} className="absolute inset-0" style={{ opacity: activeIndex === i ? 1 : 0, transition: "opacity 0.7s ease", zIndex: activeIndex === i ? 2 : 1 }}>
            {stop.image ? (
              <Image src={stop.image} alt={`${stop.city}, ${stop.region}`} fill className="object-cover" style={{ transform: activeIndex === i ? "scale(1)" : "scale(1.04)", transition: "transform 0.8s ease" }} priority={i === 0} sizes="100vw" />
            ) : (
              <div className="absolute inset-0" style={{ background: FALLBACK_GRADIENTS[i] }} />
            )}
          </div>
        ))}
        <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, rgba(5,15,30,0.45) 0%, rgba(5,15,30,0.1) 40%, rgba(5,15,30,0.6) 75%, rgba(5,15,30,0.95) 100%)", zIndex: 3 }} />
        <div className="absolute inset-0" style={{ background: "linear-gradient(to right, rgba(5,15,30,0.55) 0%, transparent 50%)", zIndex: 3 }} />
      </div>

      {/* Header */}
      <div className="relative px-6 lg:px-14 pt-24 pb-0 flex-shrink-0" style={{ zIndex: 10 }}>
        <div className="max-w-7xl mx-auto">
          <p className="text-[12px] tracking-[0.25em] uppercase mb-3 font-light" style={{ color: "rgba(255,255,255,0.45)" }}>{tr.label}</p>
          <h2 className="font-manrope font-bold text-white leading-tight" style={{ fontSize: "clamp(2.5rem, 3.2vw, 3.75rem)" }}>{tr.title}</h2>
        </div>
      </div>

      {/* Active stop info */}
      <div className="relative flex-1 flex items-end px-6 lg:px-14 pb-8 min-h-0" style={{ zIndex: 10 }}>
        <div className="max-w-7xl mx-auto w-full">
          <AnimatePresence mode="wait">
            <motion.div key={activeIndex} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.4, ease }} className="max-w-lg">
              <p className="font-manrope text-[12px] tracking-[0.45em] uppercase mb-3" style={{ color: "#4a9fd5" }}>{active.month} · {active.region}</p>
              <h3 className="font-manrope font-bold text-white leading-none mb-4" style={{ fontSize: "clamp(2.8rem, 5vw, 5rem)" }}>{active.city}</h3>
              <p className="text-sm font-light leading-relaxed" style={{ color: "rgba(255,255,255,0.72)", maxWidth: "26rem" }}>{active.description}</p>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Route strip */}
      <div className="relative w-full overflow-x-auto flex-shrink-0" style={{ zIndex: 10, background: "rgba(5,15,30,0.75)", backdropFilter: "blur(12px)", borderTop: "1px solid rgba(255,255,255,0.08)" }}>
        <div ref={routeRef} className="flex items-stretch px-8 lg:px-16 w-full justify-between">
          <div className="flex items-stretch">
            {STOPS.map((stop, i) => {
              const isActive = activeIndex === i;
              return (
                <button key={i} onClick={() => setActiveIndex(i)} onMouseEnter={() => setActiveIndex(i)} className="relative flex flex-col items-center px-5 lg:px-7 py-5 transition-colors duration-200" style={{ minWidth: "100px" }}>
                  <div className="relative mb-3" style={{ zIndex: 1 }}>
                    <div className="rounded-full transition-all duration-300" style={{ width: isActive ? "12px" : "7px", height: isActive ? "12px" : "7px", background: isActive ? "#4a9fd5" : "rgba(255,255,255,0.25)", boxShadow: isActive ? "0 0 0 4px rgba(74,159,213,0.2)" : "none" }} />
                  </div>
                  <p className="font-manrope text-[10px] tracking-[0.25em] uppercase mb-1 transition-colors duration-200" style={{ color: isActive ? "#4a9fd5" : "rgba(255,255,255,0.28)" }}>{stop.month}</p>
                  <p className="font-manrope text-[13px] transition-all duration-200 whitespace-nowrap" style={{ color: isActive ? "#ffffff" : "rgba(255,255,255,0.38)", fontWeight: isActive ? 600 : 300 }}>{stop.city}</p>
                  <div className="absolute bottom-0 left-0 right-0 h-[2px] transition-all duration-300" style={{ background: isActive ? "#4a9fd5" : "transparent" }} />
                </button>
              );
            })}
          </div>

          {/* Book button */}
          <div className="flex items-center pl-8 ml-4 flex-shrink-0" style={{ borderLeft: "1px solid rgba(255,255,255,0.1)" }}>
            <a
              href="#contact"
              className="inline-flex items-center gap-2.5 font-manrope font-semibold text-[12px] tracking-[0.1em] uppercase px-6 py-3 transition-all duration-300 whitespace-nowrap"
              style={{ background: "var(--accent)", color: "#fff", boxShadow: "0 4px 20px rgba(0,75,145,0.4)", borderRadius: "8px" }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "var(--accent-hover)"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "var(--accent)"; }}
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
