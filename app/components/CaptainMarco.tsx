"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const ease = [0.16, 1, 0.3, 1];

const stats = [
  { value: "25", label: "Years of Experience" },
  { value: "28,000", label: "Nautical Miles Sailed" },
  { value: "1,500", label: "Sailors Trained" },
  { value: "4", label: "Languages" },
];

const qualifications = [
  "Inland License A and D",
  "WWS / WWC Chief Instructor Catamaran",
  "Offshore License B",
  "RYA Yachtmaster",
  "PADI Dive Master",
];

export default function CaptainMarco() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const qualRef = useRef<HTMLDivElement>(null);
  const qualInView = useInView(qualRef, { once: true, margin: "-60px" });

  return (
    <section id="captain-marco" className="py-32 px-6 lg:px-14" style={{ background: "var(--surface-alt)" }}>
      <div className="max-w-7xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 28 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 28 }}
          transition={{ duration: 0.9, ease }}
          className="mb-16"
        >
          <p className="text-[10px] tracking-[0.45em] uppercase mb-4 font-light" style={{ color: "var(--accent-light)" }}>
            Meet the captain
          </p>
          <h2
            className="font-manrope font-bold tracking-tight mb-6"
            style={{ fontSize: "clamp(2rem, 4vw, 3.25rem)", color: "var(--text)" }}
          >
            CAPTAIN MARCO
          </h2>
          <span className="accent-line mb-6" />
          <p className="font-playfair italic text-xl mt-6 max-w-2xl" style={{ color: "var(--text-secondary)" }}>
            From the peaks of the Alps to the vastness of the sea, and finally to perfection in the kitchen.
          </p>
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-20">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
              transition={{ duration: 0.7, delay: 0.35 + i * 0.09, ease }}
              className="p-6 text-center transition-all duration-300"
              style={{ background: "var(--surface)", border: "1px solid var(--border)" }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.boxShadow = "0 6px 24px rgba(0,75,145,0.1)";
                (e.currentTarget as HTMLElement).style.borderColor = "rgba(0,104,198,0.3)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.boxShadow = "none";
                (e.currentTarget as HTMLElement).style.borderColor = "var(--border)";
              }}
            >
              <p className="font-manrope font-bold mb-2" style={{ fontSize: "clamp(1.8rem, 3vw, 2.8rem)", color: "var(--accent)" }}>
                {stat.value}
              </p>
              <p className="text-[10px] tracking-[0.2em] uppercase" style={{ color: "var(--text-muted)" }}>
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-20">
          <motion.div
            initial={{ opacity: 0, x: -28 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -28 }}
            transition={{ duration: 0.9, delay: 0.3, ease }}
            className="space-y-6"
          >
            <p className="leading-relaxed font-light" style={{ color: "var(--text-secondary)" }}>
              My focus is not only to demonstrate technique, but to pass it on with precision and safety.
              As a qualified sailing and ski instructor, I am dedicated to structured and methodical teaching.
              Whether it is precise edge control while carving on skis or tactical maneuvering in every
              wind condition, I help friends, guests, and students better understand the elements.
            </p>
            <p className="leading-relaxed font-light" style={{ color: "var(--text-secondary)" }}>
              I carry this dedication and fascination forward as a passionate sushi master. In a discipline
              where millimeters define flavor, I teach the art of balancing craftsmanship and aesthetics.
              I guide you safely down the mountain, across the world&apos;s oceans, and on a culinary journey to Japan.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 28 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 28 }}
            transition={{ duration: 0.9, delay: 0.4, ease }}
            className="space-y-8"
          >
            <div className="pl-6" style={{ borderLeft: "2px solid var(--accent)" }}>
              <h3 className="font-manrope text-sm tracking-[0.18em] uppercase mb-3 font-semibold" style={{ color: "var(--text)" }}>
                Host by Passion
              </h3>
              <p className="font-light text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                A catamaran is more than a means of transport; it is a place of connection. As your host,
                I create an atmosphere where professionalism and genuine hospitality come together.
              </p>
            </div>
            <div className="pl-6" style={{ borderLeft: "2px solid var(--border)" }}>
              <h3 className="font-manrope text-sm tracking-[0.18em] uppercase mb-3 font-semibold" style={{ color: "var(--text)" }}>
                My Promise
              </h3>
              <p className="font-light text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                Whether you want to learn sailing, continue your training, enjoy a holiday, or experience an
                exclusive dinner at sea — I will guide you with solid expertise toward your goal.
              </p>
            </div>
            <div className="pt-2">
              <p className="font-playfair italic text-sm" style={{ color: "var(--text-muted)" }}>
                Always in motion like the ocean — Marco
              </p>
            </div>
          </motion.div>
        </div>

        {/* Qualifications */}
        <motion.div
          ref={qualRef}
          initial={{ opacity: 0, y: 24 }}
          animate={qualInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
          transition={{ duration: 0.9, ease }}
          className="p-8"
          style={{ border: "1px solid var(--border)", background: "var(--surface)" }}
        >
          <h3 className="text-[10px] tracking-[0.45em] uppercase mb-8 font-manrope font-medium" style={{ color: "var(--accent-light)" }}>
            Qualifications
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {qualifications.map((qual, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -10 }}
                animate={qualInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
                transition={{ duration: 0.5, delay: 0.15 + index * 0.09, ease }}
                className="flex items-center gap-3"
              >
                <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: "var(--accent)" }} />
                <span className="text-sm font-light" style={{ color: "var(--text-secondary)" }}>{qual}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
