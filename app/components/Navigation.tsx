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
    <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-64 bg-black/95 border border-white/10 backdrop-blur-md rounded-sm z-50">
      {items.map((item, i) => (
        <a
          key={i}
          href={item.href}
          onClick={onClose}
          className="block px-5 py-3 text-xs font-light tracking-widest uppercase text-white/70 hover:text-white hover:bg-white/5 transition-all duration-200 border-b border-white/5 last:border-0"
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
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (servicesRef.current && !servicesRef.current.contains(e.target as Node)) {
        setServicesOpen(false);
      }
      if (aboutRef.current && !aboutRef.current.contains(e.target as Node)) {
        setAboutOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const navLinkClass =
    "text-xs font-light tracking-widest uppercase text-white/80 hover:text-white transition-colors duration-200 cursor-pointer";

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-black/90 backdrop-blur-md border-b border-white/5"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <a
            href="#hero"
            className="text-2xl font-bold tracking-[0.3em] text-white hover:text-blue-400 transition-colors duration-300"
          >
            VENTUM
          </a>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-10">
            <a href="#yacht" className={navLinkClass}>
              Yacht
            </a>

            {/* Services Dropdown */}
            <div ref={servicesRef} className="relative">
              <button
                className={`${navLinkClass} flex items-center gap-1`}
                onClick={() => {
                  setServicesOpen(!servicesOpen);
                  setAboutOpen(false);
                }}
              >
                Services
                <svg
                  className={`w-3 h-3 transition-transform duration-200 ${servicesOpen ? "rotate-180" : ""}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <DropdownMenu
                items={servicesItems}
                isOpen={servicesOpen}
                onClose={() => setServicesOpen(false)}
              />
            </div>

            <a href="#cruise-plan" className={navLinkClass}>
              Cruise Plan
            </a>

            {/* About Dropdown */}
            <div ref={aboutRef} className="relative">
              <button
                className={`${navLinkClass} flex items-center gap-1`}
                onClick={() => {
                  setAboutOpen(!aboutOpen);
                  setServicesOpen(false);
                }}
              >
                About
                <svg
                  className={`w-3 h-3 transition-transform duration-200 ${aboutOpen ? "rotate-180" : ""}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <DropdownMenu
                items={aboutItems}
                isOpen={aboutOpen}
                onClose={() => setAboutOpen(false)}
              />
            </div>

            <a href="#contact" className={navLinkClass}>
              Contact
            </a>

            {/* Language Switcher */}
            <div className="flex items-center gap-1 ml-4 border border-white/20 rounded-sm px-3 py-1">
              <button className="text-xs text-white tracking-widest">EN</button>
              <span className="text-white/20 text-xs">|</span>
              <button className="text-xs text-white/40 hover:text-white/70 tracking-widest transition-colors">DE</button>
            </div>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="lg:hidden text-white p-2"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            <div className="w-6 flex flex-col gap-1.5">
              <span
                className={`block h-px bg-white transition-all duration-300 ${
                  mobileOpen ? "rotate-45 translate-y-2" : ""
                }`}
              />
              <span
                className={`block h-px bg-white transition-all duration-300 ${
                  mobileOpen ? "opacity-0" : ""
                }`}
              />
              <span
                className={`block h-px bg-white transition-all duration-300 ${
                  mobileOpen ? "-rotate-45 -translate-y-2" : ""
                }`}
              />
            </div>
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileOpen && (
          <div className="lg:hidden border-t border-white/10 bg-black/95 backdrop-blur-md pb-6">
            <div className="flex flex-col gap-0">
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
                  className="block px-6 py-3 text-xs tracking-widest uppercase text-white/70 hover:text-white hover:bg-white/5 transition-all border-b border-white/5"
                >
                  {item.label}
                </a>
              ))}
              <div className="flex gap-3 px-6 pt-4">
                <button className="text-xs text-white tracking-widest">EN</button>
                <span className="text-white/20">|</span>
                <button className="text-xs text-white/40 tracking-widest">DE</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
