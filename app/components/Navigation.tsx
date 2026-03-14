"use client";

import { useState, useEffect, useRef } from "react";

const leftNav = [
  { label: "Yacht", href: "#yacht", type: "link" },
  { label: "Services", type: "dropdown", items: [
    { label: "Mileage Cruise / Heavy Weather Training", href: "#services" },
    { label: "Holiday Cruise", href: "#services" },
    { label: "Harbor Maneuver Course", href: "#services" },
    { label: "Survey / Yacht Inspection", href: "#services" },
    { label: "Wingfoil Courses", href: "#services" },
    { label: "Sushi Sailor", href: "#services" },
  ]},
  { label: "About", type: "dropdown", items: [
    { label: "Ventum Story", href: "#ventum-story" },
    { label: "Captain Marco", href: "#captain-marco" },
  ]},
];

const rightNav = [
  { label: "Cruise Plan", href: "#cruise-plan", type: "link" },
  { label: "Contact", href: "#contact", type: "link" },
];

function Dropdown({ items, isOpen }: { items: { label: string; href: string }[]; isOpen: boolean }) {
  if (!isOpen) return null;
  return (
    <div
      className="absolute top-full left-1/2 -translate-x-1/2 mt-3 z-50 overflow-hidden"
      style={{
        minWidth: "260px",
        background: "#fff",
        border: "1px solid var(--border)",
        borderRadius: "2px",
        boxShadow: "0 16px 48px rgba(0,0,0,0.1)",
      }}
    >
      {items.map((item, i) => (
        <a
          key={i}
          href={item.href}
          className="block px-5 py-3 text-[10px] tracking-[0.2em] uppercase transition-all duration-200"
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
  const [pastHero, setPastHero] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const navRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
      setPastHero(window.scrollY > window.innerHeight * 0.7);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const onDark = !pastHero && !scrolled;
  const linkColor = onDark ? "rgba(255,255,255,0.75)" : "var(--text-secondary)";
  const linkHover = onDark ? "#fff" : "var(--accent)";
  const logoColor = onDark ? "#fff" : "var(--accent)";
  const borderColor = onDark ? "rgba(255,255,255,0.22)" : "var(--border)";
  const langColor = onDark ? "rgba(255,255,255,0.35)" : "var(--text-muted)";

  const navItems = [...leftNav, ...rightNav];

  return (
    <nav
      ref={navRef}
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
        <div className="hidden lg:grid grid-cols-3 items-center h-20">
          {/* Left nav */}
          <div className="flex items-center gap-8">
            {leftNav.map((item) => (
              <div key={item.label} className="relative">
                {item.type === "link" ? (
                  <a
                    href={(item as { href: string }).href}
                    className="text-[10px] font-light tracking-[0.22em] uppercase transition-colors duration-300"
                    style={{ color: linkColor }}
                    onMouseEnter={(e) => (e.currentTarget as HTMLElement).style.color = linkHover}
                    onMouseLeave={(e) => (e.currentTarget as HTMLElement).style.color = linkColor}
                  >
                    {item.label}
                  </a>
                ) : (
                  <>
                    <button
                      className="flex items-center gap-1.5 text-[10px] font-light tracking-[0.22em] uppercase transition-colors duration-300"
                      style={{ color: openDropdown === item.label ? linkHover : linkColor }}
                      onClick={() => setOpenDropdown(openDropdown === item.label ? null : item.label)}
                      onMouseEnter={(e) => (e.currentTarget as HTMLElement).style.color = linkHover}
                      onMouseLeave={(e) => (e.currentTarget as HTMLElement).style.color = openDropdown === item.label ? linkHover : linkColor}
                    >
                      {item.label}
                      <svg
                        className={`w-2.5 h-2.5 transition-transform duration-200 ${openDropdown === item.label ? "rotate-180" : ""}`}
                        fill="none" stroke="currentColor" viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                    <Dropdown
                      items={(item as { items: { label: string; href: string }[] }).items}
                      isOpen={openDropdown === item.label}
                    />
                  </>
                )}
              </div>
            ))}
          </div>

          {/* Center logo */}
          <div className="flex justify-center">
            <a
              href="#hero"
              className="font-playfair font-bold italic transition-colors duration-400 hover:opacity-75"
              style={{ fontSize: "1.45rem", color: logoColor, letterSpacing: "0.12em" }}
            >
              VENTUM
            </a>
          </div>

          {/* Right nav */}
          <div className="flex items-center justify-end gap-8">
            {rightNav.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="text-[10px] font-light tracking-[0.22em] uppercase transition-colors duration-300"
                style={{ color: linkColor }}
                onMouseEnter={(e) => (e.currentTarget as HTMLElement).style.color = linkHover}
                onMouseLeave={(e) => (e.currentTarget as HTMLElement).style.color = linkColor}
              >
                {item.label}
              </a>
            ))}

            {/* Language */}
            <div
              className="flex items-center gap-1 px-3 py-1.5"
              style={{ border: `1px solid ${borderColor}`, borderRadius: "1px" }}
            >
              <button
                className="text-[10px] tracking-[0.2em] font-semibold transition-colors duration-300"
                style={{ color: onDark ? "#fff" : "var(--accent)" }}
              >
                EN
              </button>
              <span className="text-xs" style={{ color: borderColor }}>|</span>
              <button
                className="text-[10px] tracking-[0.2em] transition-colors duration-300"
                style={{ color: langColor }}
                onMouseEnter={(e) => (e.currentTarget as HTMLElement).style.color = linkHover}
                onMouseLeave={(e) => (e.currentTarget as HTMLElement).style.color = langColor}
              >
                DE
              </button>
            </div>
          </div>
        </div>

        {/* Mobile header */}
        <div className="lg:hidden flex items-center justify-between h-20">
          <a
            href="#hero"
            className="font-playfair font-bold italic"
            style={{ fontSize: "1.35rem", color: logoColor, letterSpacing: "0.1em" }}
          >
            VENTUM
          </a>
          <button className="p-2" onClick={() => setMobileOpen(!mobileOpen)} aria-label="Toggle menu">
            <div className="w-6 flex flex-col gap-[5px]">
              {[
                mobileOpen ? "rotate-45 translate-y-[7px]" : "",
                mobileOpen ? "opacity-0 scale-x-0" : "",
                mobileOpen ? "-rotate-45 -translate-y-[7px]" : "",
              ].map((cls, i) => (
                <span key={i} className={`block h-px transition-all duration-300 ${cls}`} style={{ background: onDark ? "#fff" : "var(--text)" }} />
              ))}
            </div>
          </button>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="lg:hidden pb-6" style={{ background: "#fff", borderTop: "1px solid var(--border)" }}>
            {navItems.map((item) => {
              const links = item.type === "link"
                ? [{ label: item.label, href: (item as { href: string }).href }]
                : (item as { items: { label: string; href: string }[] }).items;
              return links.map((link, i) => (
                <a
                  key={`${item.label}-${i}`}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="block px-6 py-3.5 text-[10px] tracking-[0.2em] uppercase transition-all"
                  style={{ color: "var(--text-secondary)", borderBottom: "1px solid var(--border-light)" }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "var(--accent)"; (e.currentTarget as HTMLElement).style.background = "var(--surface-alt)"; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "var(--text-secondary)"; (e.currentTarget as HTMLElement).style.background = "transparent"; }}
                >
                  {link.label}
                </a>
              ));
            })}
            <div className="flex gap-3 px-6 pt-5">
              <button className="text-[10px] tracking-[0.2em] font-semibold" style={{ color: "var(--accent)" }}>EN</button>
              <span style={{ color: "var(--border)" }}>|</span>
              <button className="text-[10px] tracking-[0.2em]" style={{ color: "var(--text-muted)" }}>DE</button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
