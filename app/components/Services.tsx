"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";

const ease = [0.16, 1, 0.3, 1];

const services = [
  {
    number: "01",
    title: "Mileage Cruise / Heavy Weather Training",
    description: "If the wind really picks up during this week, we stay outside and experience the sea in its untamed form. Every maneuver must be faster and completely precise. This is how you develop the mental strength and confidence that define a true skipper.",
    tag: "Training",
    image: "/Mileage Cruise.jpg",
  },
  {
    number: "02",
    title: "Holiday Cruise",
    description: "Sail the seas on your own yacht, far away from crowded tourist routes, and discover hidden beaches. Experience the night sky over the water and decide for yourself whether you prefer to cook or be cooked for.",
    tag: "Leisure",
  },
  {
    number: "03",
    title: "Harbor Maneuver Course",
    description: "Master docking with complete confidence. Learn how to safely maneuver your catamaran into the harbor even with wind and limited space. We train calmness and precision so that stress in the harbor becomes a thing of the past.",
    tag: "Course",
    dates: "04–11 Oct · 11–18 Oct",
  },
  {
    number: "04",
    title: "Survey / Yacht Inspection",
    description: "A shiny hull can often hide technical defects that later become expensive. We inspect the real condition of your vessel and determine the exact market value for insurance or purchase agreements.",
    tag: "Inspection",
    image: "/Yacht Survey.jpg",
  },
  {
    number: "05",
    title: "Wingfoil Courses",
    description: "Combine sailing and wingfoiling exclusively from our yacht. We start directly where the wind is perfect, always accompanied by a support dinghy for your safety. High-end equipment from our sponsor Duotone.",
    tag: "Watersports",
    image: "/Wingfoil.webp",
  },
  {
    number: "06",
    title: "Sushi Sailor",
    description: "I select only the best seasonal ingredients and the freshest fish to create a multi-course menu directly in front of you. No loud restaurants, no time pressure. Only you, your guests, and the art of sushi.",
    tag: "Culinary",
    footer: "Arigato — Marco",
  },
];

function ServiceRow({
  service,
  index,
  isHovered,
  onEnter,
  onLeave,
}: {
  service: typeof services[0];
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
            {/* Description — slides in on hover */}
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
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const titleInView = useInView(titleRef, { once: true, margin: "-80px" });

  const hoveredService = hoveredIndex !== null ? services[hoveredIndex] : null;

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
            What we offer
          </p>
          <h2 className="font-manrope font-bold tracking-tight mb-6" style={{ fontSize: "clamp(2rem, 4vw, 3.25rem)", color: "var(--text)" }}>
            SERVICES
          </h2>
          <span className="accent-line" />
        </motion.div>

        {/* Two-column layout: list left, image right */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-0 lg:gap-16 items-start">
          {/* Service list */}
          <div
            className="lg:col-span-3"
            style={{ borderTop: "1px solid var(--border)" }}
          >
            {services.map((service, index) => (
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
                {hoveredService?.image ? (
                  <motion.div
                    key={hoveredService.number}
                    initial={{ opacity: 0, scale: 1.04 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.04 }}
                    transition={{ duration: 0.45, ease }}
                    className="absolute inset-0 overflow-hidden"
                    style={{ border: "1px solid var(--border)" }}
                  >
                    <img
                      src={hoveredService.image}
                      alt={hoveredService.title}
                      className="w-full h-full object-cover"
                    />
                    {/* Caption */}
                    <div
                      className="absolute bottom-0 left-0 right-0 p-5"
                      style={{ background: "linear-gradient(to top, rgba(5,15,30,0.7), transparent)" }}
                    >
                      <p className="text-white font-manrope font-semibold text-sm">{hoveredService.title}</p>
                      <p className="text-[10px] tracking-[0.2em] uppercase mt-1" style={{ color: "rgba(255,255,255,0.55)" }}>
                        {hoveredService.tag}
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
                          Hover a service
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
