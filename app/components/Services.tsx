"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { useLang } from "../context/LanguageContext";
import { t } from "../translations";

const SERVICE_IMAGES = [
  "/Mileage-Cruise-New.jpg",                       // 01 Mileage Cruise / Heavy Weather
  "/Holiday-cruise-new.jpeg",                      // 02 Holiday Cruise
  "/harbor maneuver course.jpg",                   // 03 Harbor Maneuver Course
  "/Yacht Survey.jpg",                             // 04 Survey / Yacht Inspection
  "/Wingfoil-course-new-1y.jpg",                   // 05 Wingfoil Courses
  "/Sushi-sailor-new.jpg",                         // 06 Sushi Sailor
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
  onActivate,
  onMount,
}: {
  service: ServiceItem;
  index: number;
  isActive: boolean;
  onActivate: (i: number) => void;
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
      className="relative cursor-default"
      style={{ borderBottom: "1px solid rgba(255,255,255,0.09)" }}

    >
      <div className="py-12 md:py-16">
        {/* Number row */}
        <div className="flex items-center justify-center mb-2">
          <span
            className="font-manrope text-[12px] tracking-[0.15em] tabular-nums"
          style={{ transition: "color 0.7s ease" }}
            style={{ color: isActive ? "#4a7fb5" : "rgba(255,255,255,0.2)" }}
          >
            {service.number}
          </span>
        </div>

        {/* Title — centered */}
        <h3
          className="font-manrope text-center"
          style={{
            fontSize: "clamp(1.3rem, 2.2vw, 2rem)",
            lineHeight: 1.15,
            fontWeight: isActive ? 600 : 300,
            color: isActive ? "#ffffff" : "rgba(255,255,255,0.25)",
            letterSpacing: isActive ? "-0.02em" : "0",
            transform: isActive ? "scale(1.18)" : "scale(0.9)",
            transformOrigin: "center",
            display: "block",
            transition: "transform 0.7s cubic-bezier(0.16,1,0.3,1), color 0.7s ease, opacity 0.7s ease",
            willChange: "transform, color",
          }}
        >
          {service.title.includes(" / ") ? (
            <span className="flex flex-col items-center">
              <span>
                {service.title.split(" / ")[0]}{" "}
                <span style={{ color: "rgba(255,255,255,0.2)", fontWeight: 200 }}>/</span>
              </span>
              <span
                style={{
                  fontSize: "0.75em",
                  fontWeight: isActive ? 400 : 200,
                  color: isActive ? "rgba(255,255,255,0.7)" : "rgba(255,255,255,0.18)",
                }}
              >
                {service.title.split(" / ")[1]}
              </span>
            </span>
          ) : (
            service.title
          )}
        </h3>

        {/* Description — expands below title when active */}
        <div
          className="overflow-hidden"
          style={{
            maxHeight: isActive ? "220px" : "0px",
            opacity: isActive ? 1 : 0,
            marginTop: isActive ? "1rem" : "0",
            transition: "max-height 0.7s cubic-bezier(0.16,1,0.3,1), opacity 0.5s ease, margin-top 0.7s ease",
          }}
        >
          <div className="max-w-lg mx-auto">
            <p
              className="font-manrope leading-relaxed text-center"
              style={{ fontSize: "1.05rem", fontWeight: 400, color: "rgba(255,255,255,0.9)" }}
            >
              {service.description}
            </p>
            {service.dates && (
              <p
                className="mt-3 text-[12px] tracking-[0.1em] uppercase font-medium text-center"
                style={{ color: "#4a7fb5" }}
              >
                {service.dates}
              </p>
            )}
            {service.footer && (
              <p className="mt-2 font-playfair italic text-sm text-center" style={{ color: "rgba(255,255,255,0.38)" }}>
                {service.footer}
              </p>
            )}
          </div>
        </div>
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

  // Single IntersectionObserver for all items
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const i = itemEls.current.indexOf(entry.target as HTMLDivElement);
          if (i !== -1) setActiveIndex(i);
        });
      },
      { rootMargin: "-44% 0px -44% 0px", threshold: 0 }
    );
    itemEls.current.forEach((el) => el && obs.observe(el));
    return () => obs.disconnect();
  }, [tr.items.length]);

  const handleActivate = useCallback((i: number) => setActiveIndex(i), []);

  return (
    <section id="services" className="relative" style={{ background: "#0d1b2a" }}>

      {/* Background images — crossfade on active */}
      <div className="absolute inset-0 overflow-hidden" style={{ zIndex: 0 }}>
        {SERVICE_IMAGES.map((src, i) => (
          <div
            key={i}
            className="absolute inset-0"
            style={{
              opacity: activeIndex === i ? 1 : 0,
              transform: activeIndex === i ? "scale(1)" : "scale(1.04)",
              transition: "opacity 0.7s cubic-bezier(0.4,0,0.2,1), transform 0.7s cubic-bezier(0.4,0,0.2,1)",
              willChange: "opacity, transform",
              zIndex: activeIndex === i ? 2 : 1,
            }}
          >
            <Image
              src={src}
              alt={tr.items[i]?.title ?? ""}
              fill
              className="object-cover"
              priority={i === 0}
              sizes="100vw"
            />
            <div
              className="absolute inset-0"
              style={{
                background: "linear-gradient(to right, rgba(5,15,30,0.88) 0%, rgba(5,15,30,0.60) 50%, rgba(5,15,30,0.30) 100%)",
              }}
            />
          </div>
        ))}
        <div className="absolute inset-0" style={{ background: "rgba(13,27,42,0.2)", zIndex: 3 }} />
      </div>

      {/* Content — single centered column */}
      <div className="relative" style={{ zIndex: 10 }}>
        <div className="max-w-4xl mx-auto px-6 lg:px-8" style={{ paddingTop: "80px", paddingBottom: "80px" }}>

          {/* Section header — centered */}
          <div className="mb-14 text-center">
            <p
              className="text-[12px] tracking-[0.25em] uppercase mb-4 font-light"
              style={{ color: "rgba(255,255,255,0.5)" }}
            >
              {tr.label}
            </p>
            <h2
              className="font-manrope font-bold text-white leading-tight"
              style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)" }}
            >
              {tr.title}
            </h2>
            <div className="h-px w-10 mt-5 mx-auto" style={{ background: "#4a7fb5" }} />
          </div>

          {/* Service list */}
          <div style={{ borderTop: "1px solid rgba(255,255,255,0.09)" }}>
            {tr.items.map((service, i) => (
              <ServiceRow
                key={i}
                service={service}
                index={i}
                isActive={activeIndex === i}
                onActivate={handleActivate}
                onMount={registerEl}
              />
            ))}
          </div>

          {/* CTA */}
          <div className="mt-10 pt-8 flex justify-center">
            <a
              href="#contact"
              className="font-manrope font-semibold text-[13px] tracking-[0.1em] uppercase px-8 py-4 transition-all duration-700"
              style={{
                background: "var(--accent)",
                color: "#fff",
                boxShadow: "0 4px 24px rgba(0,75,145,0.4)",
                borderRadius: "8px",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.background = "var(--accent-hover)";
                (e.currentTarget as HTMLElement).style.boxShadow = "0 6px 36px rgba(0,75,145,0.6)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.background = "var(--accent)";
                (e.currentTarget as HTMLElement).style.boxShadow = "0 4px 24px rgba(0,75,145,0.4)";
              }}
            >
              {lang === "de" ? "Kontakt aufnehmen" : "Get in touch"}
            </a>
          </div>

        </div>
      </div>

    </section>
  );
}
