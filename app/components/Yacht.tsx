"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import { useLang } from "../context/LanguageContext";
import { t } from "../translations";
import { yachtSpecs, yachtSpecsDe } from "../../lib/yacht-data";
import YachtGallery from "./YachtGallery";

/* ── Floor Plan ──────────────────────────────────────────────────── */
function FloorPlan({ lang }: { lang: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      className="mb-24"
    >
      <p className="text-[12px] tracking-[0.25em] uppercase font-manrope font-medium mb-8" style={{ color: "var(--text-secondary)" }}>
        {lang === "de" ? "Grundriss" : "Floor Plan"}
      </p>
      <div className="grid grid-cols-2 gap-4">
        {[
          {
            src: "/floorplan-exterior.jpg",
            label: lang === "de" ? "Außen" : "Exterior",
            text: lang === "de"
              ? "3 Doppelkabinen mit privatem Bad für bis zu 6 Gäste. Offener Salon mit WLAN, Entertainment-Elektronik und voll ausgestatteter Küche."
              : "3 double cabins with private bathroom for up to 6 guests. Open saloon with Wi-Fi, entertainment electronics and fully equipped galley.",
          },
          {
            src: "/floorplan_interior.jpg",
            label: lang === "de" ? "Innen" : "Interior",
            text: lang === "de"
              ? "Großzügiges Sonnendeck zum Entspannen. Deckdusche, Luftkompressor für Tauchen und Wassersportausrüstung auf Anfrage."
              : "Spacious sun deck for relaxing. Deck shower, air compressor for scuba diving and full watersports equipment available on request.",
          },
        ].map((plan) => (
          <div key={plan.label} className="group relative overflow-hidden" style={{ border: "1px solid var(--border)", borderRadius: "10px", background: "var(--bg)" }}>
            <div className="relative w-full" style={{ aspectRatio: "16/9" }}>
              <Image src={plan.src} alt={plan.label} fill className="object-contain p-4 transition-opacity duration-300 group-hover:opacity-20" sizes="50vw" style={{ mixBlendMode: "multiply" }} />
            </div>
            {/* Hint */}
            <div className="absolute top-3 right-3 transition-opacity duration-300 group-hover:opacity-0">
              <span style={{ color: "var(--accent)", fontSize: "16px" }}>ⓘ</span>
            </div>
            <p className="text-[11px] tracking-[0.18em] uppercase font-manrope text-center pb-3 transition-opacity duration-300 group-hover:opacity-0" style={{ color: "var(--text-muted)" }}>{plan.label}</p>
            {/* Hover overlay */}
            <div className="absolute inset-0 flex flex-col items-center justify-center px-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <p className="text-[11px] tracking-[0.18em] uppercase font-manrope mb-3" style={{ color: "var(--accent)" }}>{plan.label}</p>
              <p className="text-sm font-light leading-relaxed text-center" style={{ color: "var(--text-secondary)" }}>{plan.text}</p>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

/* ── Matterport ──────────────────────────────────────────────────── */
function MatterportSection({ lang }: { lang: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      className="mb-24"
    >
      <p className="text-[12px] tracking-[0.25em] uppercase font-manrope font-medium mb-8" style={{ color: "var(--text-secondary)" }}>
        {lang === "de" ? "Virtueller Rundgang" : "Virtual Tour"}
      </p>
      <a
        href="https://my.matterport.com/show/?m=peYyiUWJ3NA"
        target="_blank"
        rel="noopener noreferrer"
        className="group relative flex items-center justify-center w-full overflow-hidden transition-all duration-300"
        style={{ aspectRatio: "21/6", borderRadius: "10px", border: "1px solid var(--border)" }}
      >
        {/* Background image */}
        <Image
          src="/Boat/Interior/Interior-Cover.jpg"
          alt="Virtual Tour"
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          sizes="100vw"
        />
        {/* Dark overlay */}
        <div className="absolute inset-0" style={{ background: "rgba(5,15,30,0.55)" }} />
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ background: "rgba(5,15,30,0.15)" }} />

        {/* Content */}
        <div className="relative flex items-center gap-6">
          <div
            className="w-14 h-14 flex items-center justify-center flex-shrink-0 transition-transform duration-300 group-hover:scale-110"
            style={{ borderRadius: "50%", background: "rgba(255,255,255,0.15)", border: "1px solid rgba(255,255,255,0.3)", backdropFilter: "blur(6px)" }}
          >
            <svg className="w-5 h-5 text-white ml-0.5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
          <div>
            <p className="font-manrope font-semibold text-white text-lg mb-0.5">
              {lang === "de" ? "3D Rundgang" : "3D Virtual Tour"}
            </p>
            <p className="text-[12px] tracking-[0.1em] uppercase font-manrope" style={{ color: "rgba(255,255,255,0.55)" }}>
              {lang === "de" ? "In neuem Tab öffnen" : "Open in new tab"}
            </p>
          </div>
        </div>
      </a>
    </motion.div>
  );
}

const ease: [number, number, number, number] = [0.16, 1, 0.3, 1];


export default function Yacht() {
  const { lang } = useLang();
  const tr = t[lang].yacht;
  const specs = lang === "de" ? yachtSpecsDe : yachtSpecs;

  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const specsRef = useRef<HTMLDivElement>(null);
  const specsInView = useInView(specsRef, { once: true, margin: "-60px" });

  return (
    <section id="yacht" className="py-16 md:py-24 lg:py-32 px-6 lg:px-14 overflow-hidden" style={{ background: "var(--surface)" }}>
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 28 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 28 }}
          transition={{ duration: 0.9, ease }}
          className="mb-16"
        >
          <p className="text-[12px] tracking-[0.25em] uppercase mb-4 font-light" style={{ color: "var(--accent-light)" }}>
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
          </div>
        </motion.div>

        {/* Gallery */}
        <YachtGallery />

        {/* ── Floor Plan ─────────────────────────────────────────── */}
        <FloorPlan lang={lang} />

        {/* ── Matterport ─────────────────────────────────────────── */}
        <MatterportSection lang={lang} />

        {/* ── Technical specs ────────────────────────────────────── */}
        <motion.div
          ref={specsRef}
          initial={{ opacity: 0, y: 24 }}
          animate={specsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
          transition={{ duration: 0.9, ease }}
          className="mb-24"
        >
          <p className="text-[12px] tracking-[0.25em] uppercase mb-8 font-manrope font-medium" style={{ color: "var(--text-secondary)" }}>
            {lang === "de" ? "Technische Daten" : "Technical Specifications"}
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {specs.map((spec, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={specsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                transition={{ duration: 0.45, delay: i * 0.05, ease }}
                className="px-5 py-5 transition-colors duration-200"
                style={{ border: "1px solid var(--border)", borderRadius: "10px", background: "var(--bg)" }}
                onMouseEnter={(e) => (e.currentTarget as HTMLElement).style.background = "var(--surface-alt)"}
                onMouseLeave={(e) => (e.currentTarget as HTMLElement).style.background = "var(--bg)"}
              >
                <p className="text-[11px] tracking-[0.15em] uppercase mb-3 font-manrope" style={{ color: "var(--text-muted)" }}>
                  {spec.label}
                </p>
                <p className="font-manrope font-bold" style={{ fontSize: "1.4rem", color: "var(--text)", lineHeight: 1 }}>
                  {spec.value}
                  {spec.unit && <span className="text-xs font-light ml-1.5" style={{ color: "var(--text-muted)" }}>{spec.unit}</span>}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* ── Watersports included ───────────────────────────────── */}
        <WatersportsIncluded lang={lang} specsInView={specsInView} />

      </div>
    </section>
  );
}

const ACTIVITIES = [
  { key: "Wakeboard",   img: "/wakeboard-new.avif",  labelDe: "Wakeboard" },
  { key: "Water Ski",   img: "/water-ski.jpg",       labelDe: "Wasserski" },
  { key: "Shock Wave",  img: "/Shockwave-new.webp",  labelDe: "Shock Wave" },
  { key: "Snorkeling",  img: "/Snorkeling_new.jpg",  labelDe: "Schnorcheln" },
  { key: "Diving",      img: "/diving-new.avif", labelDe: "Tauchen" },
  { key: "Fishing",     img: "/fishing-new.jpg", labelDe: "Angeln" },
];

function WatersportsIncluded({ lang, specsInView }: { lang: string; specsInView: boolean }) {
  const ease: [number, number, number, number] = [0.16, 1, 0.3, 1];
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={specsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
      transition={{ duration: 0.9, delay: 0.2, ease }}
    >
      <p className="text-[12px] tracking-[0.25em] uppercase mb-4 font-manrope font-medium" style={{ color: "var(--text-secondary)" }}>
        {lang === "de" ? "Inkludierter Wassersport" : "Included Watersports"}
      </p>
      <p className="text-base font-light leading-relaxed mb-8 max-w-2xl" style={{ color: "var(--text-secondary)" }}>
        {lang === "de"
          ? "Unser Katamaran ist nicht nur zum Segeln da. Ob Sie Geschwindigkeit suchen oder die Stille unter Wasser genießen möchten — wir haben für jeden etwas."
          : "Our catamaran is not just for sailing. Whether you are looking for speed or want to enjoy the silence underwater, we have something for everyone."}
      </p>
      <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
        {ACTIVITIES.map((a, i) => (
          <motion.div
            key={a.key}
            initial={{ opacity: 0, y: 10 }}
            animate={specsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
            transition={{ duration: 0.4, delay: 0.1 + i * 0.05, ease }}
            className="group relative overflow-hidden"
            style={{ borderRadius: "10px", aspectRatio: "1", border: "1px solid var(--border)" }}
          >
            <Image
              src={a.img}
              alt={a.key}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-110"
              sizes="14vw"
            />
            <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(5,15,30,0.75) 0%, transparent 60%)" }} />
            <p className="absolute bottom-2 left-0 right-0 text-center text-[10px] tracking-[0.08em] uppercase font-manrope font-medium text-white">
              {lang === "de" ? a.labelDe : a.key}
            </p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
