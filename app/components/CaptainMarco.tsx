"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const ease = [0.16, 1, 0.3, 1];

const stats = [
  { value: "25", label: "Years of Experience" },
  { value: "28,000", label: "Nautical Miles Sailed" },
  { value: "1500", label: "Sailors Trained" },
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
    <section id="captain-marco" className="py-32 px-6 lg:px-14" style={{ background: "#fff" }}>
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
            Meet the captain
          </p>
          <h2
            className="font-manrope font-bold tracking-tight mb-6"
            style={{ fontSize: "clamp(2rem, 4vw, 3.25rem)", color: "var(--text)" }}
          >
            CAPTAIN MARCO
          </h2>
          <span className="accent-line mb-8" />
          <p className="font-playfair italic text-xl mt-8 max-w-2xl" style={{ color: "var(--text-secondary)" }}>
            From the peaks of the Alps to the vastness of the sea, and finally to perfection in the kitchen.
          </p>
        </motion.div>

        {/* Bio text */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-24">
          <motion.div
            initial={{ opacity: 0, x: -28 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -28 }}
            transition={{ duration: 0.9, delay: 0.2, ease }}
            className="space-y-5"
          >
            <p className="leading-relaxed font-light" style={{ color: "var(--text-secondary)" }}>
              My focus is not only to demonstrate technique, but to pass it on with precision and safety.
              As a qualified sailing and ski instructor, I am dedicated to structured and methodical teaching.
              Whether it is precise edge control while carving on skis or tactical maneuvering in every
              wind condition, I help guests and students better understand the elements.
            </p>
            <p className="leading-relaxed font-light" style={{ color: "var(--text-secondary)" }}>
              I carry this dedication forward as a passionate sushi master. I guide you safely down the
              mountain, across the world&apos;s oceans, and on a culinary journey directly to Japan.
            </p>
            <p className="font-playfair italic text-sm pt-2" style={{ color: "var(--text-muted)" }}>
              Always in motion like the ocean — Marco
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 28 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 28 }}
            transition={{ duration: 0.9, delay: 0.3, ease }}
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
                Whether you want to learn sailing, continue training, enjoy a holiday, or experience an
                exclusive dinner at sea — I will guide you with solid expertise toward your goal.
              </p>
            </div>
          </motion.div>
        </div>

        {/* Stats — large numbers, no card borders (Yachtera style) */}
        <div
          className="grid grid-cols-2 lg:grid-cols-4 mb-24"
          style={{ borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)" }}
        >
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
              transition={{ duration: 0.7, delay: 0.1 + i * 0.1, ease }}
              className="py-12 px-6 text-center"
              style={{
                borderRight: i < stats.length - 1 ? "1px solid var(--border)" : "none",
              }}
            >
              <p
                className="font-manrope font-bold mb-2"
                style={{ fontSize: "clamp(2.2rem, 4vw, 3.5rem)", color: "var(--accent)" }}
              >
                {stat.value}
              </p>
              <p
                className="text-[11px] tracking-[0.15em] uppercase font-light"
                style={{ color: "var(--text-secondary)" }}
              >
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Qualifications — simple list with dividers (Yachtera style) */}
        <motion.div
          ref={qualRef}
          initial={{ opacity: 0, y: 24 }}
          animate={qualInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
          transition={{ duration: 0.9, ease }}
        >
          <p
            className="text-[10px] tracking-[0.45em] uppercase mb-8 text-center font-manrope font-medium"
            style={{ color: "var(--text-secondary)" }}
          >
            Qualifications
          </p>

          <div className="max-w-2xl mx-auto">
            {qualifications.map((qual, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 12 }}
                animate={qualInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
                transition={{ duration: 0.5, delay: 0.1 + index * 0.08, ease }}
              >
                <div
                  className="py-4 text-sm font-light"
                  style={{ color: "var(--text-secondary)", borderBottom: "1px solid var(--border-light)" }}
                >
                  {qual}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  );
}
