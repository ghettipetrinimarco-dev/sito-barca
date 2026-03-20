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
        <button
          onClick={() => window.open("/cruise-map", "_blank")}
          className="group relative font-manrope font-semibold text-[12px] tracking-[0.15em] uppercase px-8 py-4 mt-2 overflow-hidden transition-all duration-500"
          style={{
            background: "transparent",
            color: "#fff",
            borderRadius: 8,
            border: "1px solid rgba(255,255,255,0.4)",
            backdropFilter: "blur(6px)",
          }}
          onMouseEnter={(e) => {
            const el = e.currentTarget as HTMLElement;
            el.style.borderColor = "rgba(255,255,255,0.85)";
            el.style.letterSpacing = "0.2em";
          }}
          onMouseLeave={(e) => {
            const el = e.currentTarget as HTMLElement;
            el.style.borderColor = "rgba(255,255,255,0.4)";
            el.style.letterSpacing = "0.15em";
          }}
        >
          {/* Shimmer sweep */}
          <span
            className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out"
            style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.12), transparent)" }}
          />
          <span className="relative flex items-center gap-3">
            {tr.cta}
            <svg className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </span>
        </button>
      </div>
    </section>
  );
}
