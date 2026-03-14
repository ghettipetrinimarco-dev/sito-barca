"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const easeOut = [0.16, 1, 0.3, 1];

const services = [
  {
    number: "01",
    title: "Mileage Cruise / Heavy Weather Training",
    description:
      "If the wind really picks up during this week, we stay outside and experience the sea in its untamed form. In such conditions, every maneuver must be faster and completely precise. This is how you develop the mental strength and confidence that define a true skipper.",
    tag: "Training",
  },
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
      "Master docking with complete confidence. In this course you will learn in a practical way how to safely maneuver your catamaran into the harbor even with wind and limited space. We train calmness and precision so that stress in the harbor becomes a thing of the past.",
    tag: "Course",
    dates: "04–11 Oct and 11–18 Oct",
  },
  {
    number: "04",
    title: "Survey / Yacht Inspection",
    description:
      "A shiny hull can often hide technical defects that later become expensive and quickly turn the joy of watersports into a costly setback. We inspect the real condition of your vessel and determine the exact market value for insurance or purchase agreements.",
    tag: "Inspection",
  },
  {
    number: "05",
    title: "Wingfoil Courses",
    description:
      "Combine sailing and wingfoiling exclusively from our yacht. We start directly where the wind is perfect, always accompanied by a support dinghy for your safety. We guide you in both disciplines using the latest high-end equipment from our sponsor Duotone.",
    tag: "Watersports",
  },
  {
    number: "06",
    title: "Sushi Sailor",
    description:
      "Fixed menus have no place in my concept as the Sushi Sailor. I select only the best seasonal ingredients and the freshest fish to create a multi-course menu directly in front of you. Every movement is precision, every piece of sushi is unique. No loud restaurants, no time pressure. Only you, your guests, and the art of sushi.",
    tag: "Culinary",
    footer: "Arigato — Marco",
  },
];

function ServiceCard({ service, index }: { service: (typeof services)[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 36 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 36 }}
      transition={{ duration: 0.75, delay: (index % 3) * 0.12, ease: easeOut }}
      className="group relative p-8 cursor-default overflow-hidden"
      style={{
        background: "rgba(255,255,255,0.022)",
        border: "1px solid rgba(255,255,255,0.065)",
        transition: "all 0.4s ease",
      }}
      onMouseEnter={(e) => {
        const el = e.currentTarget as HTMLElement;
        el.style.background = "rgba(255,255,255,0.048)";
        el.style.borderColor = "rgba(0,104,198,0.3)";
        el.style.transform = "translateY(-4px)";
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget as HTMLElement;
        el.style.background = "rgba(255,255,255,0.022)";
        el.style.borderColor = "rgba(255,255,255,0.065)";
        el.style.transform = "translateY(0)";
      }}
    >
      {/* Number + Tag */}
      <div className="flex items-start justify-between mb-7">
        <span
          className="text-xs font-mono tracking-widest"
          style={{ color: "rgba(0,104,198,0.5)" }}
        >
          {service.number}
        </span>
        <span
          className="text-[9px] tracking-[0.22em] uppercase px-2.5 py-1 border transition-all duration-300"
          style={{
            color: "rgba(255,255,255,0.3)",
            borderColor: "rgba(255,255,255,0.1)",
          }}
        >
          {service.tag}
        </span>
      </div>

      <h3 className="font-manrope font-semibold text-white mb-4 leading-snug" style={{ fontSize: "1.05rem" }}>
        {service.title}
      </h3>

      <p className="text-sm leading-relaxed font-light" style={{ color: "rgba(255,255,255,0.45)" }}>
        {service.description}
      </p>

      {service.dates && (
        <div className="mt-5 pt-5" style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}>
          <p className="text-[10px] tracking-[0.25em] uppercase" style={{ color: "var(--accent-light)" }}>
            Dates: {service.dates}
          </p>
        </div>
      )}

      {service.footer && (
        <div className="mt-5 pt-5" style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}>
          <p className="text-xs italic font-playfair" style={{ color: "rgba(255,255,255,0.25)" }}>
            {service.footer}
          </p>
        </div>
      )}

      {/* Bottom accent line on hover */}
      <div
        className="absolute bottom-0 left-0 h-[2px] w-0 group-hover:w-full transition-all duration-500"
        style={{ background: "linear-gradient(90deg, var(--accent), var(--accent-light))" }}
      />
    </motion.div>
  );
}

export default function Services() {
  const titleRef = useRef<HTMLDivElement>(null);
  const titleInView = useInView(titleRef, { once: true, margin: "-80px" });

  return (
    <section id="services" className="py-32 px-6 lg:px-14 max-w-7xl mx-auto">
      <motion.div
        ref={titleRef}
        initial={{ opacity: 0, y: 28 }}
        animate={titleInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 28 }}
        transition={{ duration: 0.9, ease: easeOut }}
        className="mb-20"
      >
        <p
          className="text-[10px] tracking-[0.45em] uppercase mb-4 font-light"
          style={{ color: "var(--accent-light)" }}
        >
          What we offer
        </p>
        <h2 className="font-manrope font-bold text-white tracking-tight mb-6" style={{ fontSize: "clamp(2rem, 4vw, 3.25rem)" }}>
          SERVICES
        </h2>
        <span className="accent-line" />
      </motion.div>

      <div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px"
        style={{ background: "rgba(255,255,255,0.04)" }}
      >
        {services.map((service, index) => (
          <div key={index} style={{ background: "#0b0e14" }}>
            <ServiceCard service={service} index={index} />
          </div>
        ))}
      </div>
    </section>
  );
}
