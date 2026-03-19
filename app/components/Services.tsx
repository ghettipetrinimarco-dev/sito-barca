"use client";

import { useRef, useState, useEffect, useCallback, } from "react";
import Image from "next/image";
import { useLang } from "../context/LanguageContext";
import { t } from "../translations";

const SERVICE_IMAGES = [
  "/Mileage-Cruise-New.jpg",
  "/Holiday-cruise-new.jpeg",
  "/harbor maneuver course.jpg",
  "/Yacht Survey.jpg",
  "/Wingfoil-course-new-1y.jpg",
  "/Sushi-sailor-new.jpg",
];

interface ServiceItem {
  number: string;
  title: string;
  description: string;
  tag: string;
  dates?: string;
  footer?: string;
}

/* ── Single service row ─────────────────────────────────────────── */
function ServiceRow({
  service,
  index,
  isActive,
  onMount,
}: {
  service: ServiceItem;
  index: number;
  isActive: boolean;
  onMount: (el: HTMLDivElement | null, i: number) => void;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    onMount(ref.current, index);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      ref={ref}
      className="relative"
      style={{
        borderBottom: "1px solid rgba(255,255,255,0.08)",
        padding: "2.5rem 0",
        transition: "opacity 0.6s ease",
        opacity: isActive ? 1 : 0.28,
      }}
    >
      <div className="text-center">

        {/* Number */}
        <p
          className="font-manrope text-[11px] tracking-[0.2em] tabular-nums mb-3"
          style={{
            color: isActive ? "#4a7fb5" : "rgba(255,255,255,0.4)",
            transition: "color 0.6s ease",
          }}
        >
          {service.number}
        </p>

        {/* Title */}
        <h3
          className="font-manrope text-center"
          style={{
            fontSize: "clamp(1.3rem, 2.2vw, 2rem)",
            lineHeight: 1.2,
            fontWeight: isActive ? 600 : 300,
            color: isActive ? "#ffffff" : "rgba(255,255,255,0.9)",
            letterSpacing: isActive ? "-0.02em" : "0",
            transform: isActive ? "scale(1.05)" : "scale(1)",
            transformOrigin: "center",
            display: "block",
            transition: "transform 0.6s ease, color 0.6s ease",
            willChange: "transform",
          }}
        >
          {service.title.includes(" / ") ? (
            <span className="flex flex-col items-center gap-0.5">
              <span>{service.title.split(" / ")[0]}</span>
              <span style={{ fontSize: "0.75em", fontWeight: 300, color: isActive ? "rgba(255,255,255,0.6)" : "rgba(255,255,255,0.4)", transition: "color 0.6s ease" }}>
                {service.title.split(" / ")[1]}
              </span>
            </span>
          ) : service.title}
        </h3>

        {/* Description — always visible */}
        <p
          className="font-manrope leading-relaxed text-center max-w-lg mx-auto mt-4"
          style={{
            fontSize: "0.95rem",
            fontWeight: 400,
            color: isActive ? "rgba(255,255,255,0.82)" : "rgba(255,255,255,0.5)",
            transform: isActive ? "scale(1.04)" : "scale(1)",
            transformOrigin: "center",
            transition: "color 0.6s ease, transform 0.6s ease",
            willChange: "transform",
          }}
        >
          {service.description}
        </p>

        {service.dates && (
          <p className="mt-3 text-[11px] tracking-[0.12em] uppercase font-medium text-center" style={{ color: "#4a7fb5" }}>
            {service.dates}
          </p>
        )}
        {service.footer && (
          <p className="mt-2 font-playfair italic text-sm text-center" style={{ color: "rgba(255,255,255,0.35)" }}>
            {service.footer}
          </p>
        )}

      </div>
    </div>
  );
}

/* ── Main component ─────────────────────────────────────────────── */
export default function Services() {
  const { lang } = useLang();
  const tr = t[lang].services;
  const [activeIndex, setActiveIndex] = useState(0);

  const itemEls = useRef<Array<HTMLDivElement | null>>([]);
  const registerEl = useCallback((el: HTMLDivElement | null, i: number) => {
    itemEls.current[i] = el;
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const viewportCenter = window.scrollY + window.innerHeight * 0.5;
      let closest = 0;
      let minDist = Infinity;
      itemEls.current.forEach((el, i) => {
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const itemCenter = window.scrollY + rect.top + rect.height / 2;
        const dist = Math.abs(viewportCenter - itemCenter);
        if (dist < minDist) { minDist = dist; closest = i; }
      });
      setActiveIndex(closest);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [tr.items.length]);

  return (
    <section id="services" className="relative" style={{ background: "#0d1b2a" }}>

      {/* Background images */}
      <div className="absolute inset-0 overflow-hidden" style={{ zIndex: 0 }}>
        {SERVICE_IMAGES.map((src, i) => (
          <div
            key={i}
            className="absolute inset-0"
            style={{
              opacity: activeIndex === i ? 1 : 0,
              transform: activeIndex === i ? "scale(1)" : "scale(1.04)",
              transition: "opacity 0.8s ease, transform 0.8s ease",
              willChange: "opacity, transform",
              zIndex: activeIndex === i ? 2 : 1,
            }}
          >
            <Image src={src} alt={tr.items[i]?.title ?? ""} fill className="object-cover" priority={i === 0} sizes="100vw" />
            <div className="absolute inset-0" style={{ background: "linear-gradient(to right, rgba(5,15,30,0.88) 0%, rgba(5,15,30,0.62) 50%, rgba(5,15,30,0.32) 100%)" }} />
          </div>
        ))}
        <div className="absolute inset-0" style={{ background: "rgba(13,27,42,0.18)", zIndex: 3 }} />
      </div>

      {/* Content */}
      <div className="relative" style={{ zIndex: 10 }}>
        <div className="max-w-4xl mx-auto px-6 lg:px-8" style={{ paddingTop: "80px", paddingBottom: "80px" }}>

          {/* Header */}
          <div className="mb-14 text-center">
            <p className="text-[12px] tracking-[0.25em] uppercase mb-4 font-light" style={{ color: "rgba(255,255,255,0.5)" }}>
              {tr.label}
            </p>
            <h2 className="font-manrope font-bold text-white leading-tight" style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)" }}>
              {tr.title}
            </h2>
            <div className="h-px w-10 mt-5 mx-auto" style={{ background: "#4a7fb5" }} />
          </div>

          {/* List */}
          <div style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}>
            {tr.items.map((service, i) => (
              <ServiceRow
                key={i}
                service={service}
                index={i}
                isActive={activeIndex === i}
                onMount={registerEl}
              />
            ))}
          </div>

          {/* CTA */}
          <div className="mt-12 flex justify-center">
            <a
              href="#contact"
              className="font-manrope font-semibold text-[13px] tracking-[0.1em] uppercase px-8 py-4"
              style={{ background: "var(--accent)", color: "#fff", boxShadow: "0 4px 24px rgba(0,75,145,0.4)", borderRadius: "8px", transition: "background 0.3s ease, box-shadow 0.3s ease" }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "var(--accent-hover)"; (e.currentTarget as HTMLElement).style.boxShadow = "0 6px 36px rgba(0,75,145,0.6)"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "var(--accent)"; (e.currentTarget as HTMLElement).style.boxShadow = "0 4px 24px rgba(0,75,145,0.4)"; }}
            >
              {lang === "de" ? "Kontakt aufnehmen" : "Get in touch"}
            </a>
          </div>

        </div>
      </div>

    </section>
  );
}
