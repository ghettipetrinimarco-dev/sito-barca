"use client";

import { motion } from "framer-motion";

const easeOut = [0.16, 1, 0.3, 1];

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Deep navy layered background */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(160deg, #060c18 0%, #0b1628 35%, #0d1e3a 65%, #060e1c 100%)",
        }}
      />

      {/* Radial accent glows */}
      <div
        className="absolute inset-0 animate-pulse-glow"
        style={{
          background:
            "radial-gradient(ellipse 70% 55% at 20% 60%, rgba(0,104,198,0.18) 0%, transparent 70%)",
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 50% 40% at 80% 25%, rgba(44,141,226,0.1) 0%, transparent 60%)",
          animation: "pulseGlow 10s ease-in-out infinite reverse",
        }}
      />

      {/* Fine grid texture */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.8) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(255,255,255,0.8) 1px, transparent 1px)`,
          backgroundSize: "72px 72px",
        }}
      />

      {/* Floating orbs */}
      <div
        className="absolute top-[22%] left-[15%] w-72 h-72 rounded-full pointer-events-none animate-float"
        style={{ background: "radial-gradient(circle, rgba(0,104,198,0.12), transparent 70%)" }}
      />
      <div
        className="absolute bottom-[20%] right-[12%] w-96 h-96 rounded-full pointer-events-none animate-float-slow"
        style={{ background: "radial-gradient(circle, rgba(44,141,226,0.08), transparent 70%)" }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 lg:px-14 text-center">
        {/* Label */}
        <motion.p
          className="text-[10px] tracking-[0.55em] uppercase mb-7 font-light"
          style={{ color: "var(--accent-light)" }}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.2, ease: easeOut }}
        >
          Premium Sailing Catamaran · Mediterranean
        </motion.p>

        {/* Main heading with Manrope */}
        <motion.h1
          className="font-manrope font-bold leading-[1.08] tracking-[-0.03em] mb-8"
          style={{ fontSize: "clamp(3rem, 8vw, 7.5rem)" }}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.0, delay: 0.38, ease: easeOut }}
        >
          <span className="text-white">Sailing, training</span>
          <br />
          <span className="text-white">and </span>
          <span className="text-gradient">unforgettable</span>
          <br />
          <span className="text-white">experience at sea</span>
        </motion.h1>

        {/* Playfair serif subtitle */}
        <motion.p
          className="font-playfair italic text-xl md:text-2xl max-w-xl mx-auto mb-3 font-light"
          style={{ color: "rgba(255,255,255,0.35)" }}
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.58, ease: easeOut }}
        >
          Private catamaran cruises &amp; professional sailing instruction
        </motion.p>

        <motion.p
          className="text-sm text-white/40 max-w-lg mx-auto mb-14 font-light leading-relaxed"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.9, delay: 0.72, ease: easeOut }}
        >
          Adventure on the Mediterranean with Captain Marco
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.88, ease: easeOut }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <a
            href="#cruise-plan"
            className="group inline-flex items-center gap-3 text-white px-9 py-4 text-[11px] tracking-[0.2em] uppercase font-semibold font-manrope transition-all duration-350"
            style={{
              background: "linear-gradient(120deg, var(--accent) 0%, var(--accent-light) 100%)",
              boxShadow: "0 4px 32px rgba(0,104,198,0.35)",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.boxShadow = "0 6px 48px rgba(0,104,198,0.55)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.boxShadow = "0 4px 32px rgba(0,104,198,0.35)";
            }}
          >
            Cruise Plan 2026
            <svg
              className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1.5"
              fill="none" stroke="currentColor" viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
          <a
            href="#services"
            className="inline-flex items-center gap-3 border text-white/65 hover:text-white px-9 py-4 text-[11px] tracking-[0.2em] uppercase font-light font-manrope transition-all duration-350"
            style={{ borderColor: "rgba(255,255,255,0.15)" }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.4)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.15)";
            }}
          >
            Our Services
          </a>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        style={{ color: "rgba(255,255,255,0.25)" }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 0.9 }}
      >
        <span className="text-[9px] tracking-[0.45em] uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 7, 0] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 9l-7 7-7-7" />
          </svg>
        </motion.div>
      </motion.div>

      {/* Bottom fade */}
      <div
        className="absolute bottom-0 left-0 right-0 h-40"
        style={{ background: "linear-gradient(to top, #0b0e14, transparent)" }}
      />
    </section>
  );
}
