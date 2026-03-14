"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const easeOut = [0.16, 1, 0.3, 1];

export default function VentumStory() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="ventum-story" className="py-32 px-6 lg:px-14 relative overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse 60% 50% at 80% 50%, rgba(0,104,198,0.05) 0%, transparent 70%)",
        }}
      />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Left: Text */}
          <motion.div
            ref={ref}
            initial={{ opacity: 0, x: -36 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -36 }}
            transition={{ duration: 0.95, ease: easeOut }}
          >
            <p className="text-[10px] tracking-[0.45em] uppercase mb-4 font-light" style={{ color: "var(--accent-light)" }}>
              Our journey
            </p>
            <h2
              className="font-manrope font-bold text-white tracking-tight mb-6"
              style={{ fontSize: "clamp(2rem, 4vw, 3.25rem)" }}
            >
              VENTUM STORY
            </h2>
            <span className="accent-line mb-8" />

            <p className="text-lg font-light leading-relaxed mt-8" style={{ color: "rgba(255,255,255,0.5)" }}>
              Since 2018, we have been living our dream on the sea. As brothers,
              we have not only fulfilled a wish with our own yacht, but found a
              calling. For eight years we have been sharing this passion with our
              guests, friends, and families, creating unforgettable experiences
              on the water together.
            </p>
            <p className="text-lg font-light leading-relaxed mt-6" style={{ color: "rgba(255,255,255,0.5)" }}>
              Join us, Sandro and Marco, on our journeys and become part of a
              success story told by the wind and freedom.
            </p>

            <motion.a
              href="#captain-marco"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="inline-flex items-center gap-3 mt-10 text-[10px] tracking-[0.22em] uppercase font-manrope pb-1 transition-all duration-300"
              style={{ color: "rgba(255,255,255,0.45)", borderBottom: "1px solid rgba(255,255,255,0.1)" }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.color = "#fff";
                el.style.borderBottomColor = "rgba(255,255,255,0.45)";
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.color = "rgba(255,255,255,0.45)";
                el.style.borderBottomColor = "rgba(255,255,255,0.1)";
              }}
            >
              Meet Captain Marco
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </motion.a>
          </motion.div>

          {/* Right: Visual card */}
          <motion.div
            initial={{ opacity: 0, x: 36 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 36 }}
            transition={{ duration: 0.95, delay: 0.2, ease: easeOut }}
            className="relative"
          >
            <div
              className="relative aspect-[4/3] overflow-hidden"
              style={{
                background: "linear-gradient(135deg, #0d1a2e 0%, #0a1628 50%, #0c1e38 100%)",
                border: "1px solid rgba(255,255,255,0.07)",
              }}
            >
              <div
                className="absolute inset-0"
                style={{
                  background: "radial-gradient(ellipse 60% 50% at 30% 40%, rgba(0,104,198,0.18) 0%, transparent 60%)",
                }}
              />

              {/* Year badge */}
              <div className="absolute top-8 left-8">
                <p className="text-[10px] tracking-[0.3em] uppercase" style={{ color: "rgba(255,255,255,0.25)" }}>
                  Founded
                </p>
                <p className="font-manrope font-bold mt-1" style={{ fontSize: "3.5rem", color: "rgba(255,255,255,0.07)" }}>
                  2018
                </p>
              </div>

              {/* Stats */}
              <div className="absolute bottom-8 left-8 right-8 grid grid-cols-2 gap-4">
                {[
                  { value: "8+", label: "Years at sea" },
                  { value: "2", label: "Brothers" },
                ].map((stat, i) => (
                  <div
                    key={i}
                    className="p-4"
                    style={{ border: "1px solid rgba(255,255,255,0.08)" }}
                  >
                    <p className="font-manrope font-bold text-2xl" style={{ color: "var(--accent-light)" }}>
                      {stat.value}
                    </p>
                    <p className="text-[10px] tracking-[0.22em] uppercase mt-1" style={{ color: "rgba(255,255,255,0.28)" }}>
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>

              {/* Compass rose */}
              <div className="absolute top-1/2 right-8 -translate-y-1/2 w-24 h-24 opacity-[0.07]">
                <svg viewBox="0 0 100 100" fill="none" stroke="white" strokeWidth="0.5">
                  <circle cx="50" cy="50" r="48" />
                  <circle cx="50" cy="50" r="36" />
                  <line x1="50" y1="2" x2="50" y2="98" />
                  <line x1="2" y1="50" x2="98" y2="50" />
                  <polygon points="50,5 54,40 50,35 46,40" fill="white" />
                  <text x="50" y="16" textAnchor="middle" fontSize="8" fill="white">N</text>
                </svg>
              </div>
            </div>

            {/* Offset border */}
            <div
              className="absolute -bottom-3 -right-3 w-full h-full -z-10"
              style={{ border: "1px solid rgba(0,104,198,0.18)" }}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
