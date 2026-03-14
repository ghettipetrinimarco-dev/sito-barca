"use client";

import { useState, useEffect, useRef } from "react";

const servicesItems = [
  { label: "Mileage Cruise / Heavy Weather Training", href: "#services" },
  { label: "Holiday Cruise", href: "#services" },
  { label: "Harbor Maneuver Course", href: "#services" },
  { label: "Survey / Yacht Inspection", href: "#services" },
  { label: "Wingfoil Courses", href: "#services" },
  { label: "Sushi Sailor", href: "#services" },
];

const aboutItems = [
  { label: "Ventum Story", href: "#ventum-story" },
  { label: "Captain Marco", href: "#captain-marco" },
];

function DropdownMenu({
  items, isOpen, onClose, dark,
}: {
  items: { label: string; href: string }[];
  isOpen: boolean;
  onClose: () => void;
  dark: boolean;
}) {
  if (!isOpen) return null;
  return (
    <div
      className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-72 z-50 overflow-hidden"
      style={{
        background: "#fff",
        border: "1px solid var(--border)",
        borderRadius: "2px",
        boxShadow: "0 12px 40px rgba(0,0,0,0.12)",
      }}
    >
      {items.map((item, i) => (
        <a
          key={i}
          href={item.href}
          onClick={onClose}
          className="block px-5 py-3 text-[10px] font-light tracking-[0.2em] uppercase transition-all duration-200"
          style={{
            color: "var(--text-secondary)",
            borderBottom: i < items.length - 1 ? "1px solid var(--border-light)" : "none",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLElement).style.color = "var(--accent)";
            (e.currentTarget as HTMLElement).style.background = "var(--surface-alt)";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLElement).style.color = "var(--text-secondary)";
            (e.currentTarget as HTMLElement).style.background = "transparent";
          }}
        >
          {item.label}
        </a>
      ))}
    </div>
  );
}

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [aboutOpen, setAboutOpen] = useState(false);

  const servicesRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);

  // Hero height detection
  const [pastHero, setPastHero] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const heroH = window.innerHeight * 0.75;
      setScrolled(window.scrollY > 40);
      setPastHero(window.scrollY > heroH);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (servicesRef.current && !servicesRef.current.contains(e.target as Node)) setServicesOpen(false);
      if (aboutRef.current && !aboutRef.current.contains(e.target as Node)) setAboutOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // On dark hero: white text. When scrolled into light sections: dark text
  const isDark = !pastHero;
  const textColor = isDark && !scrolled ? "rgba(255,255,255,0.88)" : "var(--text-secondary)";
  const textHover = isDark && !scrolled ? "#fff" : "var(--accent)";
  const logoColor = isDark && !scrolled ? "#fff" : "var(--accent)";

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-400"
      style={
        scrolled
          ? {
              background: "rgba(255,255,255,0.97)",
              backdropFilter: "blur(16px)",
              borderBottom: "1px solid var(--border)",
              boxShadow: "0 2px 20px rgba(0,0,0,0.06)",
            }
          : { background: "transparent" }
      }
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-14">
        <div className="flex items-center justify-between h-20">
          <a
            href="#hero"
            className="font-manrope font-bold tracking-[0.3em] transition-colors duration-400"
            style={{ fontSize: "1.2rem", color: logoColor }}
          >
            VENTUM
          </a>

          <div className="hidden lg:flex items-center gap-10">
            {[
              { label: "Yacht", href: "#yacht" },
              { label: "Cruise Plan", href: "#cruise-plan" },
              { label: "Contact", href: "#contact" },
            ].map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="text-[10px] font-light tracking-[0.22em] uppercase transition-colors duration-300"
                style={{ color: textColor }}
                onMouseEnter={(e) => (e.currentTarget as HTMLElement).style.color = textHover}
                onMouseLeave={(e) => (e.currentTarget as HTMLElement).style.color = textColor}
              >
                {item.label}
              </a>
            ))}

            <div ref={servicesRef} className="relative">
              <button
                className="text-[10px] font-light tracking-[0.22em] uppercase flex items-center gap-1.5 transition-colors duration-300"
                style={{ color: textColor }}
                onMouseEnter={(e) => (e.currentTarget as HTMLElement).style.color = textHover}
                onMouseLeave={(e) => (e.currentTarget as HTMLElement).style.color = textColor}
                onClick={() => { setServicesOpen(!servicesOpen); setAboutOpen(false); }}
              >
                Services
                <svg className={`w-2.5 h-2.5 transition-transform duration-200 ${servicesOpen ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <DropdownMenu items={servicesItems} isOpen={servicesOpen} onClose={() => setServicesOpen(false)} dark={isDark} />
            </div>

            <div ref={aboutRef} className="relative">
              <button
                className="text-[10px] font-light tracking-[0.22em] uppercase flex items-center gap-1.5 transition-colors duration-300"
                style={{ color: textColor }}
                onMouseEnter={(e) => (e.currentTarget as HTMLElement).style.color = textHover}
                onMouseLeave={(e) => (e.currentTarget as HTMLElement).style.color = textColor}
                onClick={() => { setAboutOpen(!aboutOpen); setServicesOpen(false); }}
              >
                About
                <svg className={`w-2.5 h-2.5 transition-transform duration-200 ${aboutOpen ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <DropdownMenu items={aboutItems} isOpen={aboutOpen} onClose={() => setAboutOpen(false)} dark={isDark} />
            </div>

            <div
              className="flex items-center gap-1 ml-2 px-3 py-1.5"
              style={{ border: `1px solid ${isDark && !scrolled ? "rgba(255,255,255,0.3)" : "var(--border)"}`, borderRadius: "1px" }}
            >
              <button className="text-[10px] tracking-[0.2em] transition-colors duration-300" style={{ color: isDark && !scrolled ? "#fff" : "var(--accent)", fontWeight: 600 }}>EN</button>
              <span className="text-xs" style={{ color: isDark && !scrolled ? "rgba(255,255,255,0.25)" : "var(--border)" }}>|</span>
              <button className="text-[10px] tracking-[0.2em] transition-colors duration-300" style={{ color: isDark && !scrolled ? "rgba(255,255,255,0.4)" : "var(--text-muted)" }}>DE</button>
            </div>
          </div>

          <button className="lg:hidden p-2" onClick={() => setMobileOpen(!mobileOpen)} aria-label="Toggle menu">
            <div className="w-6 flex flex-col gap-[5px]">
              {[
                mobileOpen ? "rotate-45 translate-y-[7px]" : "",
                mobileOpen ? "opacity-0 scale-x-0" : "",
                mobileOpen ? "-rotate-45 -translate-y-[7px]" : "",
              ].map((cls, i) => (
                <span key={i} className={`block h-px transition-all duration-300 ${cls}`} style={{ background: isDark && !scrolled ? "#fff" : "var(--text)" }} />
              ))}
            </div>
          </button>
        </div>

        {mobileOpen && (
          <div className="lg:hidden pb-6" style={{ background: "#fff", borderTop: "1px solid var(--border)" }}>
            {[
              { label: "Yacht", href: "#yacht" },
              ...servicesItems.map((s) => ({ label: s.label, href: "#services" })),
              { label: "Cruise Plan", href: "#cruise-plan" },
              { label: "Ventum Story", href: "#ventum-story" },
              { label: "Captain Marco", href: "#captain-marco" },
              { label: "Contact", href: "#contact" },
            ].map((item, i) => (
              <a
                key={i}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className="block px-6 py-3.5 text-[10px] tracking-[0.2em] uppercase transition-all"
                style={{ color: "var(--text-secondary)", borderBottom: "1px solid var(--border-light)" }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "var(--accent)"; (e.currentTarget as HTMLElement).style.background = "var(--surface-alt)"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "var(--text-secondary)"; (e.currentTarget as HTMLElement).style.background = "transparent"; }}
              >
                {item.label}
              </a>
            ))}
            <div className="flex gap-3 px-6 pt-5">
              <button className="text-[10px] tracking-[0.2em]" style={{ color: "var(--accent)", fontWeight: 600 }}>EN</button>
              <span style={{ color: "var(--border)" }}>|</span>
              <button className="text-[10px] tracking-[0.2em]" style={{ color: "var(--text-muted)" }}>DE</button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
