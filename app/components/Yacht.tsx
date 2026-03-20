"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import { useLang } from "../context/LanguageContext";
import { t } from "../translations";
import { yachtSpecs, yachtSpecsDe } from "../../lib/yacht-data";
import YachtGallery from "./YachtGallery";

/* ── Count-up animation ──────────────────────────────────────────── */
function CountUp({ value, inView, delay = 0 }: { value: string; inView: boolean; delay?: number }) {
  const target = parseFloat(value.replace(",", "."));
  const decimals = (value.includes(".") || value.includes(","))
    ? (value.split(/[.,]/)[1]?.length ?? 0)
    : 0;
  const separator = value.includes(",") ? "," : ".";

  const [display, setDisplay] = useState("0");
  const started = useRef(false);

  useEffect(() => {
    if (!inView || started.current) return;
    started.current = true;

    const duration = 1600; // ms
    const fps = 60;
    const steps = Math.round((duration / 1000) * fps);
    let step = 0;

    const timer = setTimeout(() => {
      const interval = setInterval(() => {
        step++;
        const progress = step / steps;
        // ease out cubic
        const eased = 1 - Math.pow(1 - progress, 3);
        const current = eased * target;
        setDisplay(
          decimals > 0
            ? current.toFixed(decimals).replace(".", separator)
            : Math.round(current).toString()
        );
        if (step >= steps) {
          clearInterval(interval);
          setDisplay(value);
        }
      }, 1000 / fps);
    }, delay);

    return () => clearTimeout(timer);
  }, [inView]);

  return <span>{display}</span>;
}

/* ── Floor Plan ──────────────────────────────────────────────────── */
function FloorPlan({ tr }: { tr: Record<string, string> }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [activeLabel, setActiveLabel] = useState<string | null>(null);

  const plans = [
    { src: "/floorplan-exterior.jpg", label: tr.exterior, text: tr.exteriorText },
    { src: "/floorplan_interior.jpg", label: tr.interior, text: tr.interiorText },
  ];

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      className="mb-24"
    >
      <p className="text-[12px] tracking-[0.25em] uppercase font-manrope font-medium mb-8" style={{ color: "var(--text-secondary)" }}>
        {tr.floorPlanLabel}
      </p>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {plans.map((plan) => {
          const isActive = activeLabel === plan.label;
          return (
            <div
              key={plan.label}
              className="relative overflow-hidden cursor-pointer transition-all duration-300"
              style={{
                border: isActive ? "1px solid var(--accent)" : "1px solid var(--border)",
                borderRadius: "10px",
                background: "var(--bg)",
              }}
              onClick={() => setActiveLabel(isActive ? null : plan.label)}
              onPointerEnter={(e) => { if (e.pointerType === "mouse") setActiveLabel(plan.label); }}
              onPointerLeave={(e) => { if (e.pointerType === "mouse") setActiveLabel(null); }}
            >
              <div className="relative w-full" style={{ aspectRatio: "16/9" }}>
                <Image
                  src={plan.src}
                  alt={plan.label}
                  fill
                  className="object-contain p-4 transition-opacity duration-300"
                  style={{ mixBlendMode: "multiply", opacity: isActive ? 0.15 : 1 }}
                  sizes="100vw"
                />
              </div>

              <p
                className="text-[11px] tracking-[0.18em] uppercase font-manrope text-center pb-3 transition-opacity duration-300"
                style={{ color: "var(--text-muted)", opacity: isActive ? 0 : 1 }}
              >
                {plan.label}
              </p>
              {/* Overlay */}
              <div
                className="absolute inset-0 flex flex-col items-center justify-center px-6 transition-opacity duration-300"
                style={{ opacity: isActive ? 1 : 0 }}
              >
                <p className="text-[11px] tracking-[0.18em] uppercase font-manrope mb-3" style={{ color: "var(--accent)" }}>{plan.label}</p>
                <p className="text-sm font-light leading-relaxed text-center" style={{ color: "var(--text-secondary)" }}>{plan.text}</p>
              </div>
            </div>
          );
        })}
      </div>
    </motion.div>
  );
}

/* ── Matterport ──────────────────────────────────────────────────── */
function MatterportSection({ tr }: { tr: Record<string, string> }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [modalOpen, setModalOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 1024);
    check();
    window.addEventListener("resize", check, { passive: true });
    return () => window.removeEventListener("resize", check);
  }, []);

  useEffect(() => {
    document.body.style.overflow = modalOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [modalOpen]);

  const handleClick = () => {
    if (isMobile) setModalOpen(true);
    else window.open("https://my.matterport.com/show/?m=peYyiUWJ3NA", "_blank");
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      className="mb-24"
    >
      <p className="text-[12px] tracking-[0.25em] uppercase font-manrope font-medium mb-8" style={{ color: "var(--text-secondary)" }}>
        {tr.virtualTourLabel}
      </p>
      <button
        onClick={handleClick}
        className="group relative flex items-center justify-center w-full overflow-hidden transition-all duration-300 cursor-pointer"
        style={{ aspectRatio: "16/9", borderRadius: "10px", border: "1px solid var(--border)" }}
      >
        <Image
          src="/Boat/Interior/Interior-Cover.jpg"
          alt="Virtual Tour"
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          sizes="100vw"
        />
        <div className="absolute inset-0" style={{ background: "rgba(5,15,30,0.55)" }} />
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ background: "rgba(5,15,30,0.15)" }} />
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
            <p className="font-manrope font-semibold text-white text-lg mb-0.5">{tr.tour3D}</p>
            <p className="text-[12px] tracking-[0.1em] uppercase font-manrope" style={{ color: "rgba(255,255,255,0.55)" }}>{tr.tourOpen}</p>
          </div>
        </div>
      </button>

      {/* Mobile modal with iframe */}
      {modalOpen && (
        <div className="fixed inset-0 z-[9999]" style={{ background: "#000" }}>
          {/* Floating close button — always on top */}
          <button
            onClick={() => setModalOpen(false)}
            className="fixed top-4 right-4 z-[10000] flex items-center justify-center font-manrope text-[11px] tracking-[0.15em] uppercase gap-2"
            style={{
              background: "rgba(5,15,30,0.75)",
              backdropFilter: "blur(8px)",
              border: "1px solid rgba(255,255,255,0.2)",
              borderRadius: 8,
              color: "#fff",
              padding: "8px 14px",
            }}
          >
            {tr.closeGallery} ✕
          </button>
          <iframe
            src="https://my.matterport.com/show/?m=peYyiUWJ3NA"
            style={{ width: "100%", height: "100%", border: "none" }}
            allow="xr-spatial-tracking"
            allowFullScreen
          />
        </div>
      )}
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
          <h2
            className="font-manrope font-bold leading-tight"
            style={{ fontSize: "clamp(2.5rem, 3.2vw, 3.75rem)", color: "var(--text)" }}
          >
            {tr.title}
          </h2>
        </motion.div>

        {/* Gallery */}
        <div id="yacht-gallery"><YachtGallery /></div>

        {/* ── Floor Plan ─────────────────────────────────────────── */}
        <FloorPlan tr={tr as unknown as Record<string, string>} />

        {/* ── Matterport ─────────────────────────────────────────── */}
        <div id="yacht-tour"><MatterportSection tr={tr as unknown as Record<string, string>} /></div>

        {/* ── Technical specs ────────────────────────────────────── */}
        <motion.div
          id="yacht-specs"
          ref={specsRef}
          initial={{ opacity: 0, y: 24 }}
          animate={specsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
          transition={{ duration: 0.9, ease }}
          className="mb-24"
        >
          <p className="text-[12px] tracking-[0.25em] uppercase mb-8 font-manrope font-medium" style={{ color: "var(--text-secondary)" }}>
            {tr.specsLabel}
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
                <p
                  className="font-manrope font-bold"
                  style={{ fontSize: "1.4rem", color: "var(--accent)", lineHeight: 1 }}
                >
                  <CountUp value={spec.value} inView={specsInView} delay={200} />
                  {spec.unit && <span className="text-xs font-light ml-1.5" style={{ color: "var(--text-muted)" }}>{spec.unit}</span>}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* ── Watersports included ───────────────────────────────── */}
        <div id="yacht-watersports"><WatersportsIncluded tr={tr as unknown as Record<string, string>} specsInView={specsInView} lang={lang} /></div>

      </div>
    </section>
  );
}

const ACTIVITIES = [
  { key: "Wakeboard",   img: "/wakeboard-new.avif",  labelDe: "Wakeboard",   labelIt: "Wakeboard",   labelFr: "Wakeboard" },
  { key: "Water Ski",   img: "/water-ski.jpg",       labelDe: "Wasserski",   labelIt: "Sci d'acqua", labelFr: "Ski nautique" },
  { key: "Shock Wave",  img: "/Shockwave-new.webp",  labelDe: "Shock Wave",  labelIt: "Shock Wave",  labelFr: "Shock Wave" },
  { key: "Snorkeling",  img: "/Snorkeling_new.jpg",  labelDe: "Schnorcheln", labelIt: "Snorkeling",  labelFr: "Snorkeling" },
  { key: "Diving",      img: "/diving-new.avif",     labelDe: "Tauchen",     labelIt: "Immersione",  labelFr: "Plongée" },
  { key: "Fishing",     img: "/fishing-new.jpg",     labelDe: "Angeln",      labelIt: "Pesca",       labelFr: "Pêche" },
];

function WatersportsIncluded({ tr, specsInView, lang }: { tr: Record<string, string>; specsInView: boolean; lang: string }) {
  const ease: [number, number, number, number] = [0.16, 1, 0.3, 1];
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={specsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
      transition={{ duration: 0.9, delay: 0.2, ease }}
    >
      <p className="text-[12px] tracking-[0.25em] uppercase mb-4 font-manrope font-medium" style={{ color: "var(--text-secondary)" }}>
        {tr.watersportsLabel}
      </p>
      <p className="text-base font-light leading-relaxed mb-8 max-w-2xl" style={{ color: "var(--text-secondary)" }}>
        {tr.watersportsDesc}
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
              {lang === "de" ? a.labelDe : lang === "it" ? a.labelIt : lang === "fr" ? a.labelFr : a.key}
            </p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
