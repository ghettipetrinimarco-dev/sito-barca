"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

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
      "Master docking with complete confidence. In this course you will learn in a practical way how to safely maneuver your catamaran into the harbor even with wind and limited space. We train calmness and precision so that stress in the harbor becomes a thing of the past and you learn to use the wind as a valuable ally instead of an opponent.",
    tag: "Course",
    dates: "04–11 Oct and 11–18 Oct",
  },
  {
    number: "04",
    title: "Survey / Yacht Inspection",
    description:
      "A shiny hull can often hide technical defects that later become expensive and quickly turn the joy of watersports into a costly setback. We inspect the real condition of your vessel and determine the exact market value for insurance or purchase agreements. Simply contact us for a professional assessment so you can always sail with confidence.",
    tag: "Inspection",
  },
  {
    number: "05",
    title: "Wingfoil Courses",
    description:
      "Combine sailing and wingfoiling exclusively from our yacht. We start directly where the wind is perfect, always accompanied by a support dinghy for your safety. We guide you in both disciplines using the latest high-end equipment from our sponsor Duotone. Enjoy professional training with maximum comfort directly on the open sea.",
    tag: "Watersports",
  },
  {
    number: "06",
    title: "Sushi Sailor",
    description:
      "Fixed menus have no place in my concept as the Sushi Sailor. I select only the best seasonal ingredients and the freshest fish to create a multi-course menu directly in front of you. Every movement is precision, every piece of sushi is unique, served in the relaxed atmosphere of your home. The experience combines exclusivity, craftsmanship, and complete comfort. No loud restaurants, no time pressure. Only you, your guests, and the art of sushi. I bring everything with me, from hand-sharpened knives to the appropriate tableware. You simply relax and enjoy the journey.",
    tag: "Culinary",
    footer: "Arigato — Marco",
  },
];

function ServiceCard({
  service,
  index,
}: {
  service: (typeof services)[0];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{
        duration: 0.7,
        delay: (index % 3) * 0.15,
        ease: [0.21, 0.47, 0.32, 0.98],
      }}
      className="group relative bg-white/[0.03] border border-white/10 p-8 hover:-translate-y-1 hover:border-blue-500/30 hover:bg-white/[0.06] transition-all duration-400"
    >
      <div className="flex items-start justify-between mb-6">
        <span className="text-blue-500/50 text-xs font-mono tracking-widest">
          {service.number}
        </span>
        <span className="text-xs tracking-widest uppercase text-white/30 border border-white/10 px-2 py-1 group-hover:border-blue-500/30 group-hover:text-blue-400/60 transition-all duration-300">
          {service.tag}
        </span>
      </div>

      <h3 className="text-lg font-semibold text-white mb-4 leading-snug group-hover:text-blue-100 transition-colors duration-300">
        {service.title}
      </h3>

      <p className="text-sm text-white/50 leading-relaxed font-light">
        {service.description}
      </p>

      {service.dates && (
        <div className="mt-4 pt-4 border-t border-white/5">
          <p className="text-xs tracking-widest uppercase text-blue-400/70">
            Dates: {service.dates}
          </p>
        </div>
      )}

      {service.footer && (
        <div className="mt-4 pt-4 border-t border-white/5">
          <p className="text-xs italic text-white/30">{service.footer}</p>
        </div>
      )}

      {/* Hover accent line */}
      <div className="absolute bottom-0 left-0 h-px w-0 bg-gradient-to-r from-blue-500 to-blue-300 group-hover:w-full transition-all duration-500" />
    </motion.div>
  );
}

export default function Services() {
  const titleRef = useRef<HTMLDivElement>(null);
  const titleInView = useInView(titleRef, { once: true, margin: "-80px" });

  return (
    <section id="services" className="py-32 px-6 lg:px-12 max-w-7xl mx-auto">
      <motion.div
        ref={titleRef}
        initial={{ opacity: 0, y: 30 }}
        animate={titleInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
        transition={{ duration: 0.8 }}
        className="mb-20"
      >
        <p className="text-xs tracking-[0.4em] uppercase text-blue-500 mb-4">
          What we offer
        </p>
        <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight">
          SERVICES
        </h2>
        <div className="mt-6 h-px w-16 bg-blue-500" />
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-white/5">
        {services.map((service, index) => (
          <div key={index} className="bg-[#0a0a0a]">
            <ServiceCard service={service} index={index} />
          </div>
        ))}
      </div>
    </section>
  );
}
