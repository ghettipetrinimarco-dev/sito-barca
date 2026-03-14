"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";

const ease = [0.16, 1, 0.3, 1];

const featured = {
  number: "01",
  title: "Mileage Cruise / Heavy Weather Training",
  description:
    "If the wind really picks up during this week, we stay outside and experience the sea in its untamed form. In such conditions, every maneuver must be faster and completely precise. This is how you develop the mental strength and confidence that define a true skipper.",
  tag: "Training",
  image: "/Mileage Cruise.jpg",
};

const services = [
  {
    number: "02",
    title: "Holiday Cruise",
    description:
      "Sail the seas on your own yacht, far away from crowded tourist routes, and discover hidden beaches. Experience the night sky over the water and decide for yourself whether you prefer to cook or be cooked for.",
    tag: "Leisure",
  },
  {
    number: "03",
    title: "Harbor Maneuver Course",
    description:
      "Master docking with complete confidence. Learn how to safely maneuver your catamaran into the harbor even with wind and limited space. We train calmness and precision so stress in the harbor becomes a thing of the past.",
    tag: "Course",
    dates: "04–11 Oct and 11–18 Oct",
  },
  {
    number: "04",
    title: "Survey / Yacht Inspection",
    description:
      "A shiny hull can often hide technical defects that later become expensive. We inspect the real condition of your vessel and determine the exact market value for insurance or purchase agreements.",
    tag: "Inspection",
    image: "/Yacht Survey.jpg",
  },
  {
    number: "05",
    title: "Wingfoil Courses",
    description:
      "Combine sailing and wingfoiling exclusively from our yacht. We start directly where the wind is perfect, always accompanied by a support dinghy. We guide you using high-end equipment from our sponsor Duotone.",
    tag: "Watersports",
    image: "/Wingfoil.webp",
  },
  {
    number: "06",
    title: "Sushi Sailor",
    description:
      "I select only the best seasonal ingredients and the freshest fish to create a multi-course menu directly in front of you. No loud restaurants, no time pressure. Only you, your guests, and the art of sushi.",
    tag: "Culinary",
    footer: "Arigato — Marco",
  },
];

function ServiceCard({ service, index }: { service: typeof services[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 28 }}
      transition={{ duration: 0.7, delay: (index % 3) * 0.1, ease }}
      className="group flex flex-col overflow-hidden transition-all duration-350"
      style={{
        background: "var(--surface)",
        border: "1px solid var(--border)",
        boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
      }}
      onMouseEnter={(e) => {
        const el = e.currentTarget as HTMLElement;
        el.style.boxShadow = "0 8px 32px rgba(0,75,145,0.1)";
        el.style.borderColor = "rgba(0,104,198,0.3)";
        el.style.transform = "translateY(-4px)";
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget as HTMLElement;
        el.style.boxShadow = "0 1px 4px rgba(0,0,0,0.04)";
        el.style.borderColor = "var(--border)";
        el.style.transform = "translateY(0)";
      }}
    >
      {service.image && (
        <div className="relative w-full overflow-hidden" style={{ height: "180px" }}>
          <Image
            src={service.image}
            alt={service.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, transparent 50%, rgba(0,0,0,0.12) 100%)" }} />
        </div>
      )}

      <div className="flex flex-col flex-1 p-8">
        <div className="flex items-start justify-between mb-6">
          <span className="text-xs font-mono tracking-widest" style={{ color: "var(--accent-light)" }}>{service.number}</span>
          <span className="text-[9px] tracking-[0.22em] uppercase px-2.5 py-1" style={{ color: "var(--text-muted)", border: "1px solid var(--border)" }}>
            {service.tag}
          </span>
        </div>
        <h3 className="font-manrope font-semibold mb-4 leading-snug" style={{ fontSize: "1.02rem", color: "var(--text)" }}>
          {service.title}
        </h3>
        <p className="text-sm font-light leading-relaxed flex-1" style={{ color: "var(--text-secondary)" }}>
          {service.description}
        </p>
        {service.dates && (
          <div className="mt-5 pt-5" style={{ borderTop: "1px solid var(--border-light)" }}>
            <p className="text-[10px] tracking-[0.25em] uppercase font-medium" style={{ color: "var(--accent)" }}>
              Dates: {service.dates}
            </p>
          </div>
        )}
        {service.footer && (
          <div className="mt-5 pt-5" style={{ borderTop: "1px solid var(--border-light)" }}>
            <p className="font-playfair italic text-sm" style={{ color: "var(--text-muted)" }}>{service.footer}</p>
          </div>
        )}
      </div>
      <div className="h-[2px] w-0 group-hover:w-full transition-all duration-500" style={{ background: "linear-gradient(90deg, var(--accent), var(--accent-light))" }} />
    </motion.div>
  );
}

export default function Services() {
  const titleRef = useRef<HTMLDivElement>(null);
  const titleInView = useInView(titleRef, { once: true, margin: "-80px" });
  const featuredRef = useRef<HTMLDivElement>(null);
  const featuredInView = useInView(featuredRef, { once: true, margin: "-60px" });

  return (
    <section id="services" className="py-32 px-6 lg:px-14 max-w-7xl mx-auto">
      {/* Section header */}
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

      {/* Featured: Mileage Cruise — full width */}
      <motion.div
        ref={featuredRef}
        initial={{ opacity: 0, y: 32 }}
        animate={featuredInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 32 }}
        transition={{ duration: 0.9, ease }}
        className="group relative overflow-hidden mb-6"
        style={{
          height: "420px",
          border: "1px solid var(--border)",
          boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
        }}
      >
        {/* Image */}
        <Image
          src={featured.image}
          alt={featured.title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
          priority
        />

        {/* Gradient overlay */}
        <div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(to right, rgba(5,15,30,0.82) 0%, rgba(5,15,30,0.5) 50%, rgba(5,15,30,0.15) 100%)",
          }}
        />

        {/* Content */}
        <div className="absolute inset-0 flex flex-col justify-end p-10 lg:p-14">
          <div className="max-w-xl">
            <div className="flex items-center gap-4 mb-4">
              <span className="text-xs font-mono tracking-widest" style={{ color: "rgba(120,180,255,0.7)" }}>
                {featured.number}
              </span>
              <span
                className="text-[9px] tracking-[0.22em] uppercase px-2.5 py-1"
                style={{ color: "rgba(255,255,255,0.5)", border: "1px solid rgba(255,255,255,0.2)" }}
              >
                {featured.tag}
              </span>
            </div>
            <h3
              className="font-manrope font-bold text-white mb-4 leading-tight"
              style={{ fontSize: "clamp(1.4rem, 2.5vw, 2rem)" }}
            >
              {featured.title}
            </h3>
            <p className="text-sm font-light leading-relaxed" style={{ color: "rgba(255,255,255,0.6)", maxWidth: "520px" }}>
              {featured.description}
            </p>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 mt-8 text-[10px] tracking-[0.22em] uppercase font-manrope font-medium transition-all duration-300"
              style={{ color: "rgba(255,255,255,0.7)", borderBottom: "1px solid rgba(255,255,255,0.2)" }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.color = "#fff";
                (e.currentTarget as HTMLElement).style.borderBottomColor = "#fff";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.7)";
                (e.currentTarget as HTMLElement).style.borderBottomColor = "rgba(255,255,255,0.2)";
              }}
            >
              Book this experience
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </div>
        </div>
      </motion.div>

      {/* Grid: remaining services */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {services.map((service, index) => (
          <ServiceCard key={index} service={service} index={index} />
        ))}
      </div>
    </section>
  );
}
