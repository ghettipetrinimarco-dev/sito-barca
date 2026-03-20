"use client";

import { useLang } from "../context/LanguageContext";

export default function CruisePlan() {
  const { lang } = useLang();

  return (
    <section
      id="cruise-plan"
      className="relative"
      style={{ height: "100vh" }}
    >
      {/* Background map */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/mediterranean-map.jpg"
        alt=""
        style={{
          position: "absolute", inset: 0,
          width: "100%", height: "100%",
          objectFit: "fill",
          filter: "saturate(0.15) brightness(0.5)",
        }}
      />
      <div style={{ position: "absolute", inset: 0, background: "rgba(7,16,30,0.55)" }} />

      <div className="absolute inset-0 flex flex-col items-center justify-center gap-6">
        <p className="font-manrope text-[11px] tracking-[0.3em] uppercase font-light" style={{ color: "rgba(255,255,255,0.4)" }}>
          {lang === "de" ? "Törn 2026" : "Cruise Plan 2026"}
        </p>
        <h2 className="font-manrope font-bold text-white text-center" style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)", lineHeight: 1.1 }}>
          Mediterranean Route
        </h2>
        <button
          onClick={() => window.open("/cruise-map", "_blank")}
          className="font-manrope font-semibold text-[12px] tracking-[0.12em] uppercase px-8 py-3.5 mt-2 transition-all duration-300"
          style={{ background: "var(--accent)", color: "#fff", borderRadius: 8 }}
          onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "var(--accent-hover)"; }}
          onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "var(--accent)"; }}
        >
          {lang === "de" ? "Reise beginnen" : "Start the journey"}
          <svg className="inline-block w-3.5 h-3.5 ml-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </section>
  );
}
