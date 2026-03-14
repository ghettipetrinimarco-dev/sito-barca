"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const easeOut = [0.16, 1, 0.3, 1];

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

function StatCard({ stat, index, isInView }: { stat: typeof stats[0]; index: number; isInView: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 28 }}
      transition={{ duration: 0.75, delay: 0.4 + index * 0.1, ease: easeOut }}
      className="text-center p-6 transition-all duration-350"
      style={{
        border: "1px solid rgba(255,255,255,0.07)",
        background: "rgba(255,255,255,0.02)",
      }}
      onMouseEnter={(e) => {
        const el = e.currentTarget as HTMLElement;
        el.style.background = "rgba(255,255,255,0.05)";
        el.style.borderColor = "rgba(0,104,198,0.3)";
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget as HTMLElement;
        el.style.background = "rgba(255,255,255,0.02)";
        el.style.borderColor = "rgba(255,255,255,0.07)";
      }}
    >
      <p className="font-manrope font-bold mb-2" style={{ fontSize: "clamp(2rem, 3.5vw, 3rem)", color: "var(--accent-light)" }}>
        {stat.value}
      </p>
      <p className="text-[10px] tracking-[0.22em] uppercase" style={{ color: "rgba(255,255,255,0.38)" }}>
        {stat.label}
      </p>
    </motion.div>
  );
}

export default function CaptainMarco() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  const qualRef = useRef<HTMLDivElement>(null);
  const qualInView = useInView(qualRef, { once: true, margin: "-60px" });

  return (
    <section id="captain-marco" className="py-32 px-6 lg:px-14 relative overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse 70% 40% at 50% 0%, rgba(0,104,198,0.06) 0%, transparent 70%)",
        }}
      />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 28 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 28 }}
          transition={{ duration: 0.9, ease: easeOut }}
          className="mb-16"
        >
          <p className="text-[10px] tracking-[0.45em] uppercase mb-4 font-light" style={{ color: "var(--accent-light)" }}>
            Meet the captain
          </p>
          <h2
            className="font-manrope font-bold text-white tracking-tight mb-6"
            style={{ fontSize: "clamp(2rem, 4vw, 3.25rem)" }}
          >
            CAPTAIN MARCO
          </h2>
          <span className="accent-line mb-6" />
          <p className="font-playfair italic text-lg mt-6 max-w-2xl" style={{ color: "rgba(255,255,255,0.35)" }}>
            From the peaks of the Alps to the vastness of the sea, and finally
            to perfection in the kitchen.
          </p>
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-20">
          {stats.map((stat, i) => (
            <StatCard key={i} stat={stat} index={i} isInView={isInView} />
          ))}
        </div>

        {/* Main content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-20">
          <motion.div
            initial={{ opacity: 0, x: -28 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -28 }}
            transition={{ duration: 0.9, delay: 0.3, ease: easeOut }}
            className="space-y-6"
          >
            <p className="leading-relaxed font-light" style={{ color: "rgba(255,255,255,0.5)" }}>
              My focus is not only to demonstrate technique, but to pass it on
              with precision and safety. As a qualified sailing and ski
              instructor, I am dedicated to structured and methodical teaching.
              Whether it is precise edge control while carving on skis or
              tactical maneuvering in every wind condition, I help friends,
              guests, and students better understand the elements and continue
              developing their abilities with enthusiasm.
            </p>
            <p className="leading-relaxed font-light" style={{ color: "rgba(255,255,255,0.5)" }}>
              I carry this dedication and fascination forward as a passionate
              sushi master. In a discipline where millimeters define flavor, I
              teach the art of balancing craftsmanship and aesthetics. No matter
              the element: I guide you safely down the mountain, across the
              world&apos;s oceans, and on a culinary journey directly to Japan.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 28 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 28 }}
            transition={{ duration: 0.9, delay: 0.4, ease: easeOut }}
            className="space-y-8"
          >
            <div className="pl-6" style={{ borderLeft: "2px solid var(--accent)" }}>
              <h3 className="font-manrope text-sm tracking-[0.18em] uppercase text-white mb-3 font-semibold">
                Host by Passion
              </h3>
              <p className="font-light text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.45)" }}>
                A catamaran is more than a means of transport; it is a place of
                connection. As your host, I create an atmosphere where
                professionalism and genuine hospitality come together.
              </p>
            </div>

            <div className="pl-6" style={{ borderLeft: "2px solid rgba(0,104,198,0.4)" }}>
              <h3 className="font-manrope text-sm tracking-[0.18em] uppercase text-white mb-3 font-semibold">
                My Promise
              </h3>
              <p className="font-light text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.45)" }}>
                Whether you want to learn the craft of sailing, continue your
                training, enjoy a holiday, or experience an exclusive dinner at
                sea — I will guide you with solid expertise and pedagogical
                sensitivity toward your goal and a perfect vacation.
              </p>
            </div>

            <div className="pt-4">
              <p className="font-playfair italic text-sm" style={{ color: "rgba(255,255,255,0.28)" }}>
                Always in motion like the ocean — Marco
              </p>
            </div>
          </motion.div>
        </div>

        {/* Qualifications */}
        <motion.div
          ref={qualRef}
          initial={{ opacity: 0, y: 28 }}
          animate={qualInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 28 }}
          transition={{ duration: 0.9, ease: easeOut }}
          className="p-8"
          style={{
            border: "1px solid rgba(255,255,255,0.07)",
            background: "rgba(255,255,255,0.02)",
          }}
        >
          <h3 className="text-[10px] tracking-[0.45em] uppercase mb-8 font-manrope" style={{ color: "var(--accent-light)" }}>
            Qualifications
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {qualifications.map((qual, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -10 }}
                animate={qualInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
                transition={{ duration: 0.5, delay: 0.2 + index * 0.1, ease: easeOut }}
                className="flex items-center gap-3"
              >
                <span
                  className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                  style={{ background: "var(--accent)" }}
                />
                <span className="text-sm font-light" style={{ color: "rgba(255,255,255,0.55)" }}>
                  {qual}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
