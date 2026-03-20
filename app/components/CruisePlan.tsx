"use client";

import { useLang } from "../context/LanguageContext";
import { t } from "../translations";

export default function CruisePlan() {
  const { lang } = useLang();
  const tr = t[lang].cruisePlan;

  return (
    <section
      id="cruise-plan"
      className="relative"
      style={{ height: "80vh" }}
    >
      {/* Background map */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/mediterranean-map.jpg"
        alt=""
        style={{
          position: "absolute", inset: 0,
          width: "100%", height: "100%",
          objectFit: "cover",
          filter: "saturate(0.15) brightness(0.5)",
        }}
      />
      <div style={{ position: "absolute", inset: 0, background: "rgba(7,16,30,0.55)" }} />

      <div className="absolute inset-0 flex flex-col items-center justify-center gap-6">
        <p className="font-manrope text-[11px] tracking-[0.3em] uppercase font-light" style={{ color: "rgba(255,255,255,0.4)" }}>
          {tr.headerLabel}
        </p>
        <h2 className="font-manrope font-bold text-white text-center" style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)", lineHeight: 1.1 }}>
          Mediterranean Route
        </h2>
        <style>{`
          @keyframes shimmer {
            0% { transform: translateX(-100%); }
            100% { transform: translateX(100%); }
          }
        `}</style>
        <button
          onClick={() => window.open("/cruise-map", "_blank")}
          className="relative font-manrope font-semibold text-[12px] tracking-[0.15em] uppercase px-8 py-4 mt-2 overflow-hidden transition-all duration-500"
          style={{
            background: "transparent",
            color: "#fff",
            borderRadius: 8,
            border: "1px solid rgba(255,255,255,0.4)",
            backdropFilter: "blur(6px)",
          }}
          onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.85)"; }}
          onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.4)"; }}
        >
          {/* Continuous shimmer */}
          <span
            className="absolute inset-0"
            style={{
              background: "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.18) 50%, transparent 100%)",
              animation: "shimmer 2.2s ease-in-out infinite",
            }}
          />
          <span className="relative">{tr.cta}</span>
        </button>
      </div>
    </section>
  );
}
