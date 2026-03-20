"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { yachtExteriorImages, yachtInteriorImages } from "../../lib/yacht-data";
import { useLang } from "../context/LanguageContext";
import { t } from "../translations";

/* Ken Burns animations alternate per slide */
const kenBurns = [
  { from: "scale(1.08) translate(-2%, 1%)",   to: "scale(1) translate(0%, 0%)" },
  { from: "scale(1) translate(0%, 0%)",        to: "scale(1.08) translate(2%, -1%)" },
  { from: "scale(1.06) translate(1%, -2%)",    to: "scale(1) translate(-1%, 1%)" },
  { from: "scale(1) translate(-1%, 1%)",       to: "scale(1.07) translate(1%, -1%)" },
];

const SLIDE_DURATION = 3500; // ms per slide

/* ── Auto-carousel panel ─────────────────────────────────────────── */
function GalleryPanel({
  label,
  images,
  onClick,
  delay = 0,
  viewAllPhotos,
  photos,
}: {
  label: string;
  images: string[];
  onClick: () => void;
  delay?: number;
  viewAllPhotos: string;
  photos: string;
}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const timers = useRef<{ prog?: ReturnType<typeof setInterval>; slide?: ReturnType<typeof setInterval> }>({});

  const stopTimers = () => {
    clearInterval(timers.current.prog);
    clearInterval(timers.current.slide);
    setProgress(0);
  };

  useEffect(() => {
    if (!isHovered) return;
    setProgress(0);
    const tick = 50;
    const start = setTimeout(() => {
      timers.current.prog = setInterval(() => setProgress((p) => Math.min(p + (tick / SLIDE_DURATION) * 100, 100)), tick);
      timers.current.slide = setInterval(() => {
        setCurrentIndex((i) => (i + 1) % images.length);
        setProgress(0);
      }, SLIDE_DURATION);
    }, delay);
    return () => { clearTimeout(start); stopTimers(); };
  }, [currentIndex, images.length, isHovered]);

  const kb = kenBurns[currentIndex % kenBurns.length];

  return (
    <div
      className="relative overflow-hidden cursor-pointer group"
      style={{ height: "70vh" }}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
    >
      {/* Images with crossfade */}
      <AnimatePresence>
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
          className="absolute inset-0"
        >
          {/* Ken Burns via CSS animation */}
          <div
            className="absolute inset-0"
            style={{
              animation: `kenBurns_${currentIndex % kenBurns.length} ${SLIDE_DURATION}ms ease-in-out forwards`,
            }}
          >
            <style>{`
              @keyframes kenBurns_${currentIndex % kenBurns.length} {
                from { transform: ${kb.from}; }
                to   { transform: ${kb.to}; }
              }
            `}</style>
            <Image
              src={images[currentIndex]}
              alt={`${label} ${currentIndex + 1}`}
              fill
              className="object-cover"
              sizes="50vw"
              priority={currentIndex === 0}
            />
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Gradient overlay */}
      <div
        className="absolute inset-0"
        style={{ background: "linear-gradient(to top, rgba(5,15,30,0.72) 0%, rgba(5,15,30,0.1) 55%, transparent 100%)" }}
      />

      {/* Hover overlay CTA */}
      <div
        className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-400"
        style={{ background: "rgba(5,15,30,0.18)" }}
      >
        <span
          className="text-[12px] tracking-[0.15em] uppercase px-5 py-2.5 font-manrope font-semibold"
          style={{ background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.3)", color: "#fff", backdropFilter: "blur(6px)" }}
        >
          {viewAllPhotos}
        </span>
      </div>

      {/* Label */}
      <div className="absolute bottom-6 left-6">
        <p className="text-[13px] tracking-[0.18em] uppercase mb-1.5" style={{ color: "rgba(255,255,255,0.45)" }}>
          {images.length} {photos}
        </p>
        <p className="font-manrope font-bold text-white text-2xl tracking-wider">{label}</p>
      </div>

      {/* Progress bar */}
      <div className="absolute bottom-0 left-0 right-0 h-[2px]" style={{ background: "rgba(255,255,255,0.1)" }}>
        <div
          className="h-full transition-none"
          style={{ width: `${progress}%`, background: "rgba(255,255,255,0.5)" }}
        />
      </div>

      {/* Dot indicators */}
      <div className="absolute top-4 left-1/2 -translate-x-1/2 flex gap-1.5">
        {images.map((_, i) => (
          <div
            key={i}
            className="rounded-full transition-all duration-500"
            style={{
              width: currentIndex === i ? "16px" : "4px",
              height: "4px",
              background: currentIndex === i ? "rgba(255,255,255,0.85)" : "rgba(255,255,255,0.3)",
            }}
          />
        ))}
      </div>
    </div>
  );
}

/* ── Lightbox ────────────────────────────────────────────────────── */
function Lightbox({
  open,
  onClose,
  initialSection,
  exteriorLabel,
  interiorLabel,
  closeLabel,
  backToGridLabel,
}: {
  open: boolean;
  onClose: () => void;
  initialSection: "exterior" | "interior";
  exteriorLabel: string;
  interiorLabel: string;
  closeLabel: string;
  backToGridLabel: string;
}) {
  const [activeSection, setActiveSection] = useState<"exterior" | "interior">(initialSection);
  const [selectedImg, setSelectedImg] = useState<number | null>(null);

  const images = activeSection === "exterior" ? yachtExteriorImages : yachtInteriorImages;

  // Sync section when lightbox opens
  useEffect(() => {
    if (open) {
      setActiveSection(initialSection);
      setSelectedImg(null);
    }
  }, [open, initialSection]);

  // Keyboard navigation
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (selectedImg !== null) setSelectedImg(null);
        else onClose();
      }
      if (selectedImg !== null) {
        if (e.key === "ArrowRight") setSelectedImg((i) => ((i ?? 0) + 1) % images.length);
        if (e.key === "ArrowLeft") setSelectedImg((i) => ((i ?? 0) - 1 + images.length) % images.length);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, selectedImg, images.length, onClose]);

  // Lock scroll
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-[9999] flex flex-col"
          style={{ background: "rgba(5,15,30,0.97)", backdropFilter: "blur(10px)" }}
        >
          {/* Header */}
          <div
            className="flex items-center justify-between px-8 py-5 flex-shrink-0"
            style={{ borderBottom: "1px solid rgba(255,255,255,0.08)" }}
          >
            <div className="flex items-center gap-8">
              {(["exterior", "interior"] as const).map((section) => {
                const count = (section === "exterior" ? yachtExteriorImages : yachtInteriorImages).length;
                const sectionLabel = section === "exterior" ? exteriorLabel : interiorLabel;
                return (
                  <button
                    key={section}
                    className="text-[12px] tracking-[0.15em] uppercase font-manrope font-medium pb-1 transition-colors duration-200"
                    style={{
                      color: activeSection === section ? "#fff" : "rgba(255,255,255,0.3)",
                      borderBottom: activeSection === section ? "1px solid rgba(255,255,255,0.5)" : "1px solid transparent",
                    }}
                    onClick={() => { setActiveSection(section); setSelectedImg(null); }}
                  >
                    {sectionLabel}{" "}
                    <span style={{ color: "rgba(255,255,255,0.25)" }}>({count})</span>
                  </button>
                );
              })}
            </div>

            {selectedImg !== null && (
              <span className="text-[12px] tracking-[0.08em] uppercase" style={{ color: "rgba(255,255,255,0.3)" }}>
                {selectedImg + 1} / {images.length}
              </span>
            )}

            <button
              className="text-[12px] tracking-[0.25em] uppercase transition-colors duration-200"
              style={{ color: "rgba(255,255,255,0.4)" }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "#fff")}
              onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.4)")}
              onClick={onClose}
            >
              {closeLabel} ✕
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-hidden relative">
            <AnimatePresence mode="wait">
              {selectedImg !== null ? (
                /* Fullscreen single image */
                <motion.div
                  key="fullscreen"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="absolute inset-0 flex items-center justify-center p-10"
                >
                  <div className="relative w-full h-full">
                    <Image
                      src={images[selectedImg]}
                      alt={`${activeSection} ${selectedImg + 1}`}
                      fill
                      className="object-contain"
                      sizes="90vw"
                    />
                  </div>

                  {/* Prev */}
                  <button
                    className="absolute left-6 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center transition-all duration-200"
                    style={{ background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.12)" }}
                    onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.14)")}
                    onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.07)")}
                    onClick={() => setSelectedImg((i) => ((i ?? 0) - 1 + images.length) % images.length)}
                  >
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>

                  {/* Next */}
                  <button
                    className="absolute right-6 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center transition-all duration-200"
                    style={{ background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.12)" }}
                    onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.14)")}
                    onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.07)")}
                    onClick={() => setSelectedImg((i) => ((i ?? 0) + 1) % images.length)}
                  >
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>

                  {/* Back to grid */}
                  <button
                    className="absolute bottom-5 left-1/2 -translate-x-1/2 text-[12px] tracking-[0.25em] uppercase transition-colors duration-200"
                    style={{ color: "rgba(255,255,255,0.35)" }}
                    onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "#fff")}
                    onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.35)")}
                    onClick={() => setSelectedImg(null)}
                  >
                    {backToGridLabel}
                  </button>
                </motion.div>
              ) : (
                /* Grid view — viewport-constrained, no scroll */
                <motion.div
                  key={`grid-${activeSection}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="absolute inset-0 p-6"
                >
                  <div
                    className="h-full grid gap-2"
                    style={{
                      gridTemplateColumns: "repeat(3, 1fr)",
                      gridAutoRows: "1fr",
                    }}
                  >
                    {images.map((src, i) => (
                      <button
                        key={i}
                        className="relative overflow-hidden transition-opacity duration-200 hover:opacity-80 min-h-0"
                        onClick={() => setSelectedImg(i)}
                      >
                        <Image src={src} alt={`${activeSection} ${i + 1}`} fill className="object-cover" sizes="33vw" />
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ── Main export ─────────────────────────────────────────────────── */
export default function YachtGallery() {
  const { lang } = useLang();
  const tr = t[lang].yacht as unknown as Record<string, string>;

  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxSection, setLightboxSection] = useState<"exterior" | "interior">("exterior");

  const open = (section: "exterior" | "interior") => {
    setLightboxSection(section);
    setLightboxOpen(true);
  };

  return (
    <>
      <div id="yacht-gallery" className="mb-20">
        <div className="flex flex-col gap-3 mb-5">
          <GalleryPanel label={tr.exterior} images={yachtExteriorImages} onClick={() => open("exterior")} delay={0} viewAllPhotos={tr.viewAllPhotos} photos={tr.photos} />
          <GalleryPanel label={tr.interior} images={yachtInteriorImages} onClick={() => open("interior")} delay={0} viewAllPhotos={tr.viewAllPhotos} photos={tr.photos} />
        </div>
      </div>

      <Lightbox
        open={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        initialSection={lightboxSection}
        exteriorLabel={tr.exterior}
        interiorLabel={tr.interior}
        closeLabel={tr.closeGallery}
        backToGridLabel={tr.backToGrid}
      />
    </>
  );
}
