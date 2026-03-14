"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { useLang } from "../context/LanguageContext";
import { t } from "../translations";

const ease: [number, number, number, number] = [0.16, 1, 0.3, 1];

// images keyed by service number (static, not translated)
const serviceImages: Record<string, string> = {
  "01": "/Mileage Cruise.jpg",
  "04": "/Yacht Survey.jpg",
  "05": "/Wingfoil.webp",
};

function ServiceRow({
  service,
  index,
  isHovered,
  onEnter,
  onLeave,
}: {
  service: { number: string; title: string; description: string; tag: string; dates?: string; footer?: string };
  index: number;
  isHovered: boolean;
  onEnter: () => void;
  onLeave: () => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.6, delay: index * 0.08, ease }}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      className="group cursor-default"
      style={{ borderBottom: "1px solid var(--border)" }}
    >
      <div
        className="flex items-center justify-between py-7 px-2 transition-all duration-300"
        style={{
          background: isHovered ? "var(--surface-alt)" : "transparent",
          paddingLeft: isHovered ? "1.5rem" : "0.5rem",
        }}
      >
        {/* Left: number + title */}
        <div className="flex items-center gap-6 min-w-0 flex-1 mr-8">
          <span
            className="text-xs font-mono tracking-widest flex-shrink-0 transition-colors duration-300"
            style={{ color: isHovered ? "var(--accent)" : "var(--text-muted)" }}
          >
            {service.number}
          </span>
          <div className="min-w-0">
            <h3
              className="font-manrope font-semibold leading-tight transition-all duration-300 truncate"
              style={{
                fontSize: "clamp(1rem, 1.8vw, 1.3rem)",
                color: isHovered ? "var(--accent)" : "var(--text)",
              }}
            >
              {service.title}
            </h3>
            <AnimatePresence>
              {isHovered && (
                <motion.p
                  initial={{ opacity: 0, height: 0, marginTop: 0 }}
                  animate={{ opacity: 1, height: "auto", marginTop: "0.5rem" }}
                  exit={{ opacity: 0, height: 0, marginTop: 0 }}
                  transition={{ duration: 0.35, ease }}
                  className="text-sm font-light leading-relaxed overflow-hidden"
                  style={{ color: "var(--text-secondary)" }}
                >
                  {service.description}
                  {service.dates && (
                    <span className="block mt-2 text-[10px] tracking-[0.2em] uppercase font-medium" style={{ color: "var(--accent)" }}>
                      {service.dates}
                    </span>
                  )}
                  {service.footer && (
                    <span className="block mt-2 font-playfair italic text-xs" style={{ color: "var(--text-muted)" }}>
                      {service.footer}
                    </span>
                  )}
                </motion.p>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Right: tag + arrow */}
        <div className="flex items-center gap-4 flex-shrink-0">
          <span
            className="text-[9px] tracking-[0.22em] uppercase hidden sm:block transition-colors duration-300"
            style={{ color: isHovered ? "var(--accent)" : "var(--text-muted)" }}
          >
            {service.tag}
          </span>
          <motion.div
            animate={{ x: isHovered ? 4 : 0, opacity: isHovered ? 1 : 0.3 }}
            transition={{ duration: 0.25 }}
          >
            <svg className="w-4 h-4" style={{ color: "var(--accent)" }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}

export default function Services() {
  const { lang } = useLang();
  const tr = t[lang].services;

  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const titleInView = useInView(titleRef, { once: true, margin: "-80px" });

  const hoveredService = hoveredIndex !== null ? tr.items[hoveredIndex] : null;
  const hoveredImage = hoveredService ? serviceImages[hoveredService.number] : undefined;

  return (
    <section id="services" className="py-32 px-6 lg:px-14" style={{ background: "var(--bg)" }}>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          ref={titleRef}
          initial={{ opacity: 0, y: 28 }}
          animate={titleInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 28 }}
          transition={{ duration: 0.9, ease }}
          className="mb-16"
        >
          <p className="text-[10px] tracking-[0.45em] uppercase mb-4 font-light" style={{ color: "var(--accent-light)" }}>
            {tr.label}
          </p>
          <h2 className="font-manrope font-bold tracking-tight mb-6" style={{ fontSize: "clamp(2rem, 4vw, 3.25rem)", color: "var(--text)" }}>
            {tr.title}
          </h2>
          <span className="accent-line" />
        </motion.div>

        {/* Two-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-0 lg:gap-16 items-start">
          {/* Service list */}
          <div
            className="lg:col-span-3"
            style={{ borderTop: "1px solid var(--border)" }}
          >
            {tr.items.map((service, index) => (
              <ServiceRow
                key={index}
                service={service}
                index={index}
                isHovered={hoveredIndex === index}
                onEnter={() => setHoveredIndex(index)}
                onLeave={() => setHoveredIndex(null)}
              />
            ))}
          </div>

          {/* Image panel — sticky */}
          <div className="hidden lg:block lg:col-span-2">
            <div className="sticky top-28" style={{ height: "420px" }}>
              <AnimatePresence mode="wait">
                {hoveredImage ? (
                  <motion.div
                    key={hoveredService!.number}
                    initial={{ opacity: 0, scale: 1.04 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.04 }}
                    transition={{ duration: 0.45, ease }}
                    className="absolute inset-0 overflow-hidden"
                    style={{ border: "1px solid var(--border)" }}
                  >
                    <img
                      src={hoveredImage}
                      alt={hoveredService!.title}
                      className="w-full h-full object-cover"
                    />
                    <div
                      className="absolute bottom-0 left-0 right-0 p-5"
                      style={{ background: "linear-gradient(to top, rgba(5,15,30,0.7), transparent)" }}
                    >
                      <p className="text-white font-manrope font-semibold text-sm">{hoveredService!.title}</p>
                      <p className="text-[10px] tracking-[0.2em] uppercase mt-1" style={{ color: "rgba(255,255,255,0.55)" }}>
                        {hoveredService!.tag}
                      </p>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="placeholder"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="absolute inset-0 flex items-center justify-center"
                    style={{
                      border: "1px solid var(--border-light)",
                      background: "var(--surface-alt)",
                    }}
                  >
                    {hoveredService ? (
                      <div className="p-10 text-center">
                        <p className="text-[10px] tracking-[0.3em] uppercase mb-4" style={{ color: "var(--accent-light)" }}>
                          {hoveredService.tag}
                        </p>
                        <p className="font-manrope font-semibold mb-4" style={{ color: "var(--text)", fontSize: "1.1rem" }}>
                          {hoveredService.title}
                        </p>
                        <p className="text-sm font-light leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                          {hoveredService.description}
                        </p>
                        {hoveredService.footer && (
                          <p className="font-playfair italic text-sm mt-6" style={{ color: "var(--text-muted)" }}>
                            {hoveredService.footer}
                          </p>
                        )}
                      </div>
                    ) : (
                      <div className="text-center">
                        <p className="text-[10px] tracking-[0.35em] uppercase" style={{ color: "var(--text-muted)" }}>
                          {tr.placeholder}
                        </p>
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
