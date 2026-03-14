"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

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
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.7, delay: 0.4 + index * 0.1 }}
      className="text-center p-6 border border-white/10 bg-white/[0.02] hover:bg-white/[0.05] hover:border-blue-500/30 transition-all duration-300"
    >
      <p className="text-4xl lg:text-5xl font-bold text-blue-400 mb-2">{stat.value}</p>
      <p className="text-xs tracking-widest uppercase text-white/40">{stat.label}</p>
    </motion.div>
  );
}

export default function CaptainMarco() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  const qualRef = useRef<HTMLDivElement>(null);
  const qualInView = useInView(qualRef, { once: true, margin: "-60px" });

  return (
    <section id="captain-marco" className="py-32 px-6 lg:px-12 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-950/5 via-transparent to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <p className="text-xs tracking-[0.4em] uppercase text-blue-500 mb-4">
            Meet the captain
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight mb-4">
            CAPTAIN MARCO
          </h2>
          <div className="h-px w-16 bg-blue-500 mb-6" />
          <p className="text-lg text-white/40 font-light italic max-w-2xl">
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

        {/* Main content grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-20">
          {/* Left column */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="space-y-6"
          >
            <p className="text-white/60 leading-relaxed font-light">
              My focus is not only to demonstrate technique, but to pass it on
              with precision and safety. As a qualified sailing and ski
              instructor, I am dedicated to structured and methodical teaching.
              Whether it is precise edge control while carving on skis or
              tactical maneuvering in every wind condition, I help friends,
              guests, and students better understand the elements and continue
              developing their abilities with enthusiasm.
            </p>
            <p className="text-white/60 leading-relaxed font-light">
              I carry this dedication and fascination forward as a passionate
              sushi master. In a discipline where millimeters define flavor, I
              teach the art of balancing craftsmanship and aesthetics. No matter
              the element: I guide you safely down the mountain, across the
              world&apos;s oceans, and on a culinary journey directly to Japan.
            </p>
          </motion.div>

          {/* Right column */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="space-y-8"
          >
            <div className="border-l-2 border-blue-500 pl-6">
              <h3 className="text-sm tracking-widest uppercase text-white mb-3 font-semibold">
                Host by Passion
              </h3>
              <p className="text-white/50 leading-relaxed font-light text-sm">
                A catamaran is more than a means of transport; it is a place of
                connection. As your host, I create an atmosphere where
                professionalism and genuine hospitality come together.
              </p>
            </div>

            <div className="border-l-2 border-blue-500/50 pl-6">
              <h3 className="text-sm tracking-widest uppercase text-white mb-3 font-semibold">
                My Promise
              </h3>
              <p className="text-white/50 leading-relaxed font-light text-sm">
                Whether you want to learn the craft of sailing, continue your
                training, enjoy a holiday, or experience an exclusive dinner at
                sea — I will guide you with solid expertise and pedagogical
                sensitivity toward your goal and a perfect vacation. Cast off
                for an experience that lasts.
              </p>
            </div>

            <div className="pt-4">
              <p className="text-sm italic text-white/30 font-light">
                Always in motion like the ocean — Marco
              </p>
            </div>
          </motion.div>
        </div>

        {/* Qualifications */}
        <motion.div
          ref={qualRef}
          initial={{ opacity: 0, y: 30 }}
          animate={qualInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          className="border border-white/10 bg-white/[0.02] p-8"
        >
          <h3 className="text-xs tracking-[0.4em] uppercase text-blue-500 mb-8">
            Qualifications
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {qualifications.map((qual, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -10 }}
                animate={qualInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
                transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                className="flex items-center gap-3"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-blue-500 flex-shrink-0" />
                <span className="text-sm text-white/60 font-light">{qual}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
