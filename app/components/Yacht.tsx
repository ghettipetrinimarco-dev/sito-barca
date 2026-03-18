"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import {
  BedDouble, Users, ShowerHead, Wifi, Wind, Sun,
  Music, Tv, ChefHat, Droplets, Anchor, Waves,
  type LucideIcon,
} from "lucide-react";
import { useLang } from "../context/LanguageContext";
import { t } from "../translations";
import { yachtSpecs, yachtSpecsDe, yachtFeatures } from "../../lib/yacht-data";
import YachtGallery from "./YachtGallery";

const ease: [number, number, number, number] = [0.16, 1, 0.3, 1];

const iconMap: Record<string, LucideIcon> = {
  BedDouble, Users, ShowerHead, Wifi, Wind, Sun,
  Music, Tv, ChefHat, Droplets, Anchor, Waves,
};

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
          <p className="text-[10px] tracking-[0.45em] uppercase mb-4 font-light" style={{ color: "var(--accent-light)" }}>
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

        {/* Description + quick specs */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-24 items-start">
          <motion.div
            initial={{ opacity: 0, x: -28 }}
            animate={specsInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -28 }}
            transition={{ duration: 0.9, delay: 0.1, ease }}
          >
            <p className="text-lg font-light leading-relaxed" style={{ color: "var(--text-secondary)" }}>
              {tr.description}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 28 }}
            animate={specsInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 28 }}
            transition={{ duration: 0.9, delay: 0.2, ease }}
          >
            <div
              className="grid grid-cols-2 gap-0"
              style={{ borderTop: "1px solid var(--border)", borderLeft: "1px solid var(--border)" }}
            >
              {tr.specs.map((spec, i) => (
                <div
                  key={i}
                  className="px-5 py-4"
                  style={{ borderRight: "1px solid var(--border)", borderBottom: "1px solid var(--border)" }}
                >
                  <p className="text-[9px] tracking-[0.25em] uppercase mb-1" style={{ color: "var(--text-muted)" }}>
                    {spec.label}
                  </p>
                  <p className="font-manrope font-semibold text-sm" style={{ color: "var(--accent)" }}>
                    {spec.value}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Technical specs table */}
        <motion.div
          ref={specsRef}
          initial={{ opacity: 0, y: 24 }}
          animate={specsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
          transition={{ duration: 0.9, ease }}
          className="mb-24"
        >
          <p className="text-[10px] tracking-[0.45em] uppercase mb-8 font-manrope font-medium" style={{ color: "var(--text-secondary)" }}>
            {lang === "de" ? "Technische Daten" : "Technical Specifications"}
          </p>
          <div
            className="grid grid-cols-2 lg:grid-cols-5"
            style={{ border: "1px solid var(--border)" }}
          >
            {specs.map((spec, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={specsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                transition={{ duration: 0.45, delay: i * 0.05, ease }}
                className="px-6 py-6 transition-colors duration-200"
                style={{
                  borderRight: "1px solid var(--border)",
                  borderBottom: "1px solid var(--border)",
                  background: "var(--bg)",
                }}
                onMouseEnter={(e) => (e.currentTarget as HTMLElement).style.background = "var(--surface-alt)"}
                onMouseLeave={(e) => (e.currentTarget as HTMLElement).style.background = "var(--bg)"}
              >
                <p className="text-[9px] tracking-[0.22em] uppercase mb-2 font-light" style={{ color: "var(--text-muted)" }}>
                  {spec.label}
                </p>
                <p className="font-manrope font-bold" style={{ fontSize: "1.1rem", color: "var(--accent)" }}>
                  {spec.value}
                  {spec.unit && (
                    <span className="text-xs font-light ml-1" style={{ color: "var(--text-muted)" }}>
                      {spec.unit}
                    </span>
                  )}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Amenities grid */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={specsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
          transition={{ duration: 0.9, delay: 0.2, ease }}
        >
          <p className="text-[10px] tracking-[0.45em] uppercase mb-8 font-manrope font-medium" style={{ color: "var(--text-secondary)" }}>
            {lang === "de" ? "Ausstattung & Komfort" : "Amenities & Comfort"}
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
            {yachtFeatures.map((feature, i) => {
              const Icon = iconMap[feature.icon];
              const label = lang === "de" ? feature.labelDe : feature.labelEn;
              return (
                <motion.div
                  key={feature.key}
                  initial={{ opacity: 0, y: 14, scale: 0.97 }}
                  animate={specsInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 14, scale: 0.97 }}
                  transition={{ duration: 0.45, delay: 0.1 + i * 0.05, ease }}
                  className="flex items-center gap-3.5 px-5 py-4 transition-all duration-200 cursor-default"
                  style={{ border: "1px solid var(--border)", background: "var(--bg)", borderRadius: "2px" }}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.borderColor = "var(--accent-light)";
                    el.style.background = "#eef4fb";
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.borderColor = "var(--border)";
                    el.style.background = "var(--bg)";
                  }}
                >
                  {Icon && <Icon size={16} strokeWidth={1.5} style={{ color: "var(--accent)", flexShrink: 0 }} />}
                  <span
                    className="text-[11px] tracking-[0.1em] font-manrope font-medium leading-tight"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    {label}
                  </span>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

      </div>
    </section>
  );
}
