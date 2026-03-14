"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const activities = [
  "Wingfoil",
  "Wakeboard",
  "Water Ski",
  "Shock Wave",
  "Snorkeling",
  "Diving",
  "Fishing",
];

export default function Watersports() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="watersports"
      className="py-32 px-6 lg:px-12 relative overflow-hidden"
    >
      {/* Background accent */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-950/10 to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <p className="text-xs tracking-[0.4em] uppercase text-blue-500 mb-4">
            Adventure awaits
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight mb-6">
            WATERSPORTS
          </h2>
          <div className="h-px w-16 bg-blue-500 mb-8" />
          <p className="text-lg text-white/50 max-w-2xl font-light leading-relaxed">
            Our catamaran is not just for sailing. Whether you are looking for
            speed or want to enjoy the silence underwater, we have something for
            everyone.
          </p>
        </motion.div>

        <div className="flex flex-wrap gap-3">
          {activities.map((activity, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={
                isInView
                  ? { opacity: 1, y: 0, scale: 1 }
                  : { opacity: 0, y: 20, scale: 0.95 }
              }
              transition={{
                duration: 0.5,
                delay: 0.3 + index * 0.08,
                ease: "easeOut",
              }}
              className="group px-6 py-3 border border-white/10 text-sm tracking-widest uppercase text-white/50 hover:text-white hover:border-blue-500/50 hover:bg-blue-500/10 transition-all duration-300 cursor-default"
            >
              {activity}
            </motion.div>
          ))}
        </div>

        {/* Decorative separator */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={isInView ? { opacity: 1, scaleX: 1 } : { opacity: 0, scaleX: 0 }}
          transition={{ duration: 1.2, delay: 0.8 }}
          className="mt-20 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent origin-left"
        />
      </div>
    </section>
  );
}
