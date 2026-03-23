"use client";

import { useRef, useState, useEffect, useCallback, useTransition, memo } from "react";
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

// Maps service index → cruise-plans anchor (null = no link)
const PLAN_LINKS: (string | null)[] = [
  "#cruise-plans-mileage",  // 01 Mileage
  "#cruise-plans-holiday",  // 02 Holiday
  "#cruise-plans-harbor",   // 03 Harbor
  null,                      // 04 Survey
  "#cruise-plans-holiday",  // 05 Wingfoil (runs during holiday weeks)
  null,                      // 06 Sushi Sailor
];

/* ── Single service row ─────────────────────────────────────────── */
const ServiceRow = memo(function ServiceRow({
  service,
  index,
  isActive,
  onMount,
  viewDatesLabel,
  duringHolidayLabel,
}: {
  service: ServiceItem;
  index: number;
  isActive: boolean;
  onMount: (el: HTMLDivElement | null, i: number) => void;
  viewDatesLabel: string;
  duringHolidayLabel: string;
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
          className="font-manrope font-semibold text-center"
          style={{
            fontSize: "clamp(1.3rem, 2.2vw, 2rem)",
            lineHeight: 1.2,
            color: isActive ? "#ffffff" : "rgba(255,255,255,0.5)",
            transform: isActive ? "scale(1.05)" : "scale(1)",
            transformOrigin: "center",
            transition: "color 0.5s ease, transform 0.5s ease",
            willChange: "transform",
          }}
        >
          {service.title.includes(" / ") ? (
            <span className="flex flex-col items-center gap-0.5">
              <span>{service.title.split(" / ")[0]}</span>
              <span style={{ fontSize: "0.75em", fontWeight: 300, color: isActive ? "rgba(255,255,255,0.6)" : "rgba(255,255,255,0.25)", transition: "color 0.5s ease" }}>
                {service.title.split(" / ")[1]}
              </span>
            </span>
          ) : service.title}
        </h3>

        {/* Description — always visible */}
        <p
          className="font-manrope leading-relaxed text-center max-w-xl mx-auto mt-4"
          style={{
            fontSize: "1.05rem",
            fontWeight: 300,
            color: isActive ? "rgba(255,255,255,0.82)" : "rgba(255,255,255,0.3)",
            transform: isActive ? "scale(1.04)" : "scale(1)",
            transformOrigin: "center",
            transition: "color 0.5s ease, transform 0.5s ease",
            willChange: "transform",
          }}
        >
          {service.description}
        </p>

        {service.footer && (
          <p className="mt-2 font-playfair italic text-sm text-center" style={{ color: "rgba(255,255,255,0.35)" }}>
            {service.footer}
          </p>
        )}
        {PLAN_LINKS[index] && (
          <div className="mt-4 flex flex-col items-center gap-1" style={{ opacity: isActive ? 1 : 0, transition: "opacity 0.5s ease", pointerEvents: isActive ? "auto" : "none" }}>
            {index === 4 && (
              <p className="font-manrope text-[10px] tracking-[0.12em] uppercase text-center" style={{ color: "rgba(255,255,255,0.4)" }}>
                {duringHolidayLabel}
              </p>
            )}
            <a
              href={PLAN_LINKS[index]!}
              className="font-manrope font-medium text-[11px] tracking-[0.12em] uppercase transition-colors duration-200"
              style={{ color: "#7ab8f5" }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "#c8e4ff"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "#7ab8f5"; }}
            >
              {viewDatesLabel}
            </a>
          </div>
        )}

      </div>
    </div>
  );
});

/* ── Main component ─────────────────────────────────────────────── */
export default function Services() {
  const { lang } = useLang();
  const tr = t[lang].services;
  const [activeIndex, setActiveIndex] = useState(0);

  const [, startTransition] = useTransition();
  const itemEls = useRef<Array<HTMLDivElement | null>>([]);
  const registerEl = useCallback((el: HTMLDivElement | null, i: number) => {
    itemEls.current[i] = el;
  }, []);

  useEffect(() => {
    const ratios = new Array(tr.items.length).fill(0);
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const i = itemEls.current.indexOf(entry.target as HTMLDivElement);
          if (i !== -1) ratios[i] = entry.intersectionRatio;
        });
        const best = ratios.indexOf(Math.max(...ratios));
        startTransition(() => setActiveIndex(best));
      },
      { threshold: [0, 0.25, 0.5, 0.75, 1], rootMargin: "-20% 0px -20% 0px" }
    );
    itemEls.current.forEach((el) => { if (el) observer.observe(el); });
    return () => observer.disconnect();
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
              transition: "opacity 0.8s ease",
              willChange: "opacity",
              zIndex: activeIndex === i ? 2 : 1,
            }}
          >
            <Image src={src} alt={tr.items[i]?.title ?? ""} fill className="object-cover" priority={i === 0} sizes="100vw" />
            <div className="absolute inset-0" style={{ background: "linear-gradient(to right, rgba(5,15,30,0.92) 0%, rgba(5,15,30,0.78) 50%, rgba(5,15,30,0.50) 100%)" }} />
          </div>
        ))}
        <div className="absolute inset-0" style={{ background: "rgba(13,27,42,0.35)", zIndex: 3 }} />
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
                viewDatesLabel={tr.viewDates}
                duringHolidayLabel={tr.duringHoliday}
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
              {tr.cta}
            </a>
          </div>

        </div>
      </div>

    </section>
  );
}
