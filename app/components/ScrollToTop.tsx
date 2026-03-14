"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 500);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 12 }}
          transition={{ duration: 0.35 }}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-8 right-8 z-40 w-10 h-10 flex items-center justify-center transition-all duration-300"
          style={{
            background: "rgba(255,255,255,0.7)",
            backdropFilter: "blur(10px)",
            border: "1px solid rgba(0,75,145,0.18)",
            boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
            color: "var(--accent)",
          }}
          onMouseEnter={(e) => {
            const el = e.currentTarget as HTMLElement;
            el.style.background = "var(--accent)";
            el.style.borderColor = "var(--accent)";
            el.style.boxShadow = "0 6px 24px rgba(0,75,145,0.3)";
            el.style.color = "#fff";
          }}
          onMouseLeave={(e) => {
            const el = e.currentTarget as HTMLElement;
            el.style.background = "rgba(255,255,255,0.7)";
            el.style.borderColor = "rgba(0,75,145,0.18)";
            el.style.boxShadow = "0 4px 20px rgba(0,0,0,0.08)";
            el.style.color = "var(--accent)";
          }}
          aria-label="Scroll to top"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M5 15l7-7 7 7" />
          </svg>
        </motion.button>
      )}
    </AnimatePresence>
  );
}
