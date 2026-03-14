"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";

const ease = [0.16, 1, 0.3, 1];

export default function VentumStory() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="ventum-story" className="py-0 relative overflow-hidden" style={{ background: "var(--surface)" }}>
      <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[600px]">
        {/* Text */}
        <motion.div
          ref={ref}
          className="flex flex-col justify-center px-12 lg:px-16 xl:px-20 py-24"
          initial={{ opacity: 0, x: -36 }}
          animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -36 }}
          transition={{ duration: 0.95, ease }}
        >
          <p className="text-[10px] tracking-[0.45em] uppercase mb-4 font-light" style={{ color: "var(--accent-light)" }}>
            Our journey
          </p>
          <h2
            className="font-manrope font-bold tracking-tight mb-6"
            style={{ fontSize: "clamp(2rem, 3.5vw, 3rem)", color: "var(--text)" }}
          >
            VENTUM STORY
          </h2>
          <span className="accent-line mb-8" />

          <p className="text-lg font-light leading-relaxed mt-2" style={{ color: "var(--text-secondary)" }}>
            Since 2018, we have been living our dream on the sea. As brothers,
            we have not only fulfilled a wish with our own yacht, but found a
            calling. For eight years we have been sharing this passion with our
            guests, friends, and families, creating unforgettable experiences
            on the water together.
          </p>
          <p className="text-lg font-light leading-relaxed mt-6" style={{ color: "var(--text-secondary)" }}>
            Join us, Sandro and Marco, on our journeys and become part of a
            success story told by the wind and freedom.
          </p>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-4 mt-12">
            {[
              { value: "8+", label: "Years at sea" },
              { value: "2", label: "Brothers" },
              { value: "2018", label: "Founded" },
              { value: "Med", label: "Our home" },
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 14 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }}
                transition={{ duration: 0.6, delay: 0.4 + i * 0.08, ease }}
                className="p-4"
                style={{ border: "1px solid var(--border)", background: "var(--bg)" }}
              >
                <p className="font-manrope font-bold text-2xl" style={{ color: "var(--accent)" }}>{stat.value}</p>
                <p className="text-[10px] tracking-[0.2em] uppercase mt-1" style={{ color: "var(--text-muted)" }}>{stat.label}</p>
              </motion.div>
            ))}
          </div>

          <motion.a
            href="#captain-marco"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="inline-flex items-center gap-3 mt-10 text-[10px] tracking-[0.22em] uppercase font-manrope pb-1 transition-all duration-300 self-start"
            style={{ color: "var(--accent)", borderBottom: "1px solid rgba(0,75,145,0.3)" }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.borderBottomColor = "var(--accent)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.borderBottomColor = "rgba(0,75,145,0.3)";
            }}
          >
            Meet Captain Marco
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </motion.a>
        </motion.div>

        {/* Image */}
        <motion.div
          className="relative overflow-hidden"
          style={{ minHeight: "500px" }}
          initial={{ opacity: 0, x: 36 }}
          animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 36 }}
          transition={{ duration: 0.95, delay: 0.2, ease }}
        >
          <Image
            src="/Yacht.jpg"
            alt="Ventum catamaran at sunset"
            fill
            className="object-cover"
          />
          <div
            className="absolute inset-0"
            style={{ background: "linear-gradient(to left, transparent 60%, var(--surface) 100%)" }}
          />
        </motion.div>
      </div>
    </section>
  );
}
