"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

export default function VentumStory() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="ventum-story"
      className="py-32 px-6 lg:px-12 relative overflow-hidden"
    >
      {/* Background accent */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-950/5 via-transparent to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Left: Text */}
          <motion.div
            ref={ref}
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -40 }}
            transition={{ duration: 0.9, ease: [0.21, 0.47, 0.32, 0.98] }}
          >
            <p className="text-xs tracking-[0.4em] uppercase text-blue-500 mb-4">
              Our journey
            </p>
            <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight mb-6">
              VENTUM STORY
            </h2>
            <div className="h-px w-16 bg-blue-500 mb-8" />
            <p className="text-lg text-white/60 leading-relaxed font-light">
              Since 2018, we have been living our dream on the sea. As brothers,
              we have not only fulfilled a wish with our own yacht, but found a
              calling. For eight years we have been sharing this passion with our
              guests, friends, and families, creating unforgettable experiences
              on the water together.
            </p>
            <p className="text-lg text-white/60 leading-relaxed font-light mt-6">
              Join us, Sandro and Marco, on our journeys and become part of a
              success story told by the wind and freedom.
            </p>

            <motion.a
              href="#captain-marco"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="inline-flex items-center gap-3 mt-10 text-xs tracking-widest uppercase text-white/50 hover:text-white border-b border-white/10 hover:border-white/50 pb-1 transition-all duration-300"
            >
              Meet Captain Marco
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </motion.a>
          </motion.div>

          {/* Right: Visual element */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 40 }}
            transition={{ duration: 0.9, delay: 0.2, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="relative"
          >
            {/* Decorative card */}
            <div className="relative aspect-[4/3] bg-gradient-to-br from-slate-800 via-blue-950/50 to-slate-900 border border-white/10 overflow-hidden">
              {/* Inner gradient decoration */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-transparent to-transparent" />
              <div
                className="absolute inset-0 opacity-10"
                style={{
                  backgroundImage: `radial-gradient(circle at 30% 40%, rgba(37,99,235,0.5) 0%, transparent 50%)`,
                }}
              />

              {/* Year badge */}
              <div className="absolute top-8 left-8">
                <p className="text-xs tracking-[0.3em] uppercase text-white/30">Founded</p>
                <p className="text-5xl font-bold text-white/10 mt-1">2018</p>
              </div>

              {/* Stats */}
              <div className="absolute bottom-8 left-8 right-8 grid grid-cols-2 gap-4">
                {[
                  { value: "8+", label: "Years at sea" },
                  { value: "2", label: "Brothers" },
                ].map((stat, i) => (
                  <div key={i} className="border border-white/10 p-4">
                    <p className="text-2xl font-bold text-blue-400">{stat.value}</p>
                    <p className="text-xs text-white/30 tracking-widest uppercase mt-1">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>

              {/* Decorative compass rose */}
              <div className="absolute top-1/2 right-8 -translate-y-1/2 w-24 h-24 opacity-10">
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

            {/* Decorative border offset */}
            <div className="absolute -bottom-3 -right-3 w-full h-full border border-blue-500/20 -z-10" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
