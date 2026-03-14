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
  items,
  isOpen,
  onClose,
}: {
  items: { label: string; href: string }[];
  isOpen: boolean;
  onClose: () => void;
}) {
  if (!isOpen) return null;
  return (
    <div
      className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-68 z-50 overflow-hidden"
      style={{
        background: "rgba(10,14,22,0.97)",
        border: "1px solid rgba(255,255,255,0.08)",
        backdropFilter: "blur(20px)",
        borderRadius: "2px",
        boxShadow: "0 24px 60px rgba(0,0,0,0.5), 0 0 0 1px rgba(0,104,198,0.1)",
      }}
    >
      {items.map((item, i) => (
        <a
          key={i}
          href={item.href}
          onClick={onClose}
          className="block px-5 py-3 text-[10px] font-light tracking-[0.22em] uppercase transition-all duration-200"
          style={{ color: "rgba(255,255,255,0.55)", borderBottom: i < items.length - 1 ? "1px solid rgba(255,255,255,0.04)" : "none" }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLElement).style.color = "#fff";
            (e.currentTarget as HTMLElement).style.background = "rgba(0,104,198,0.08)";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.55)";
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

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
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

  const navLinkClass =
    "text-[10px] font-light tracking-[0.22em] uppercase transition-all duration-250 cursor-pointer relative group";
  const navLinkStyle = { color: "rgba(255,255,255,0.7)" };

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
      style={
        scrolled
          ? {
              background: "rgba(11,14,20,0.92)",
              backdropFilter: "blur(20px)",
              borderBottom: "1px solid rgba(255,255,255,0.05)",
              boxShadow: "0 8px 32px rgba(0,0,0,0.3)",
            }
          : { background: "transparent" }
      }
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-14">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <a
            href="#hero"
            className="font-manrope font-bold tracking-[0.32em] text-white hover:opacity-80 transition-opacity duration-300"
            style={{ fontSize: "1.25rem", letterSpacing: "0.3em" }}
          >
            VENTUM
          </a>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-10">
            <a href="#yacht" className={navLinkClass} style={navLinkStyle}
              onMouseEnter={(e) => (e.currentTarget as HTMLElement).style.color = "#fff"}
              onMouseLeave={(e) => (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.7)"}
            >
              Yacht
            </a>

            {/* Services Dropdown */}
            <div ref={servicesRef} className="relative">
              <button
                className={`${navLinkClass} flex items-center gap-1.5`}
                style={navLinkStyle}
                onMouseEnter={(e) => (e.currentTarget as HTMLElement).style.color = "#fff"}
                onMouseLeave={(e) => (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.7)"}
                onClick={() => { setServicesOpen(!servicesOpen); setAboutOpen(false); }}
              >
                Services
                <svg
                  className={`w-2.5 h-2.5 transition-transform duration-250 ${servicesOpen ? "rotate-180" : ""}`}
                  fill="none" stroke="currentColor" viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <DropdownMenu items={servicesItems} isOpen={servicesOpen} onClose={() => setServicesOpen(false)} />
            </div>

            <a href="#cruise-plan" className={navLinkClass} style={navLinkStyle}
              onMouseEnter={(e) => (e.currentTarget as HTMLElement).style.color = "#fff"}
              onMouseLeave={(e) => (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.7)"}
            >
              Cruise Plan
            </a>

            {/* About Dropdown */}
            <div ref={aboutRef} className="relative">
              <button
                className={`${navLinkClass} flex items-center gap-1.5`}
                style={navLinkStyle}
                onMouseEnter={(e) => (e.currentTarget as HTMLElement).style.color = "#fff"}
                onMouseLeave={(e) => (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.7)"}
                onClick={() => { setAboutOpen(!aboutOpen); setServicesOpen(false); }}
              >
                About
                <svg
                  className={`w-2.5 h-2.5 transition-transform duration-250 ${aboutOpen ? "rotate-180" : ""}`}
                  fill="none" stroke="currentColor" viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <DropdownMenu items={aboutItems} isOpen={aboutOpen} onClose={() => setAboutOpen(false)} />
            </div>

            <a href="#contact" className={navLinkClass} style={navLinkStyle}
              onMouseEnter={(e) => (e.currentTarget as HTMLElement).style.color = "#fff"}
              onMouseLeave={(e) => (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.7)"}
            >
              Contact
            </a>

            {/* Language switcher */}
            <div
              className="flex items-center gap-1 ml-2 px-3 py-1.5 border"
              style={{ borderColor: "rgba(255,255,255,0.12)", borderRadius: "1px" }}
            >
              <button className="text-[10px] text-white tracking-[0.2em]">EN</button>
              <span className="text-white/20 text-xs">|</span>
              <button
                className="text-[10px] tracking-[0.2em] transition-colors duration-200"
                style={{ color: "rgba(255,255,255,0.35)" }}
                onMouseEnter={(e) => (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.7)"}
                onMouseLeave={(e) => (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.35)"}
              >
                DE
              </button>
            </div>
          </div>

          {/* Mobile Toggle */}
          <button
            className="lg:hidden text-white p-2"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            <div className="w-6 flex flex-col gap-[5px]">
              <span className={`block h-px bg-white transition-all duration-300 ${mobileOpen ? "rotate-45 translate-y-[7px]" : ""}`} />
              <span className={`block h-px bg-white transition-all duration-300 ${mobileOpen ? "opacity-0 scale-x-0" : ""}`} />
              <span className={`block h-px bg-white transition-all duration-300 ${mobileOpen ? "-rotate-45 -translate-y-[7px]" : ""}`} />
            </div>
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileOpen && (
          <div
            className="lg:hidden border-t pb-6"
            style={{
              background: "rgba(10,14,22,0.98)",
              backdropFilter: "blur(20px)",
              borderColor: "rgba(255,255,255,0.06)",
            }}
          >
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
                className="block px-6 py-3.5 text-[10px] tracking-[0.22em] uppercase transition-all border-b"
                style={{ color: "rgba(255,255,255,0.6)", borderColor: "rgba(255,255,255,0.04)" }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.color = "#fff";
                  (e.currentTarget as HTMLElement).style.background = "rgba(0,104,198,0.07)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.6)";
                  (e.currentTarget as HTMLElement).style.background = "transparent";
                }}
              >
                {item.label}
              </a>
            ))}
            <div className="flex gap-3 px-6 pt-5">
              <button className="text-[10px] text-white tracking-[0.2em]">EN</button>
              <span style={{ color: "rgba(255,255,255,0.2)" }}>|</span>
              <button className="text-[10px] tracking-[0.2em]" style={{ color: "rgba(255,255,255,0.35)" }}>DE</button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
