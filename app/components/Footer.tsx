"use client";

import { useLang } from "../context/LanguageContext";
import { t } from "../translations";

export default function Footer() {
  const { lang } = useLang();
  const tr = t[lang].footer;

  return (
    <footer style={{ background: "#050d16", color: "#fff" }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-14 py-12 lg:py-16">

        {/* Logo */}
        <div className="mb-10">
          <a href="#hero" className="transition-opacity duration-300 hover:opacity-70 inline-block">
            <img
              src="/Ventum-Sailing-Logo.png"
              alt="Ventum Sailing"
              className="h-8 lg:h-10 w-auto object-contain"
              style={{ filter: "brightness(0) invert(1)" }}
            />
          </a>
        </div>

        {/* Links + Contact */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-10">
          {/* Links */}
          <div className="flex flex-wrap gap-x-6 gap-y-3">
            {tr.links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-[12px] tracking-[0.1em] uppercase transition-colors duration-200"
                style={{ color: "rgba(255,255,255,0.4)" }}
                onMouseEnter={(e) => (e.currentTarget as HTMLElement).style.color = "#fff"}
                onMouseLeave={(e) => (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.4)"}
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Contact */}
          <div className="flex flex-col gap-1">
            <a href="https://ventum-sailing.ch" target="_blank" rel="noopener noreferrer" className="text-xs font-light transition-colors duration-200" style={{ color: "rgba(255,255,255,0.35)" }} onMouseEnter={(e) => (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.7)"} onMouseLeave={(e) => (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.35)"}>ventum-sailing.ch</a>
            <a href="mailto:info@ventum-sailing.ch" className="text-xs font-light transition-colors duration-200" style={{ color: "rgba(255,255,255,0.2)" }} onMouseEnter={(e) => (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.55)"} onMouseLeave={(e) => (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.2)"}>info@ventum-sailing.ch</a>
          </div>
        </div>

        {/* Bottom */}
        <div
          className="pt-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2"
          style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}
        >
          <p className="text-[12px] font-light" style={{ color: "rgba(255,255,255,0.2)" }}>
            &copy; 2026 Ventum. {tr.rights}
          </p>
          <p className="text-[12px] font-light" style={{ color: "rgba(255,255,255,0.15)" }}>
            Mediterranean Sea
          </p>
        </div>
      </div>
    </footer>
  );
}
