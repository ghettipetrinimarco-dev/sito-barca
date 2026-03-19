"use client";

import { useState, useEffect, useRef } from "react";
import { useLang } from "../context/LanguageContext";
import { t } from "../translations";

function Dropdown({ items, isOpen }: { items: { label: string; href: string }[]; isOpen: boolean }) {
  if (!isOpen) return null;
  return (
    <div className="absolute top-full left-1/2 -translate-x-1/2 pt-3 z-50" style={{ minWidth: "260px" }}>
      <div
        style={{
          background: "#fff",
          border: "1px solid var(--border)",
          borderRadius: "10px",
          boxShadow: "0 16px 48px rgba(0,0,0,0.1)",
          overflow: "hidden",
        }}
      >
        {items.map((item, i) => (
          <a
            key={i}
            href={item.href}
            className="block px-5 py-3 text-[12px] tracking-[0.08em] uppercase transition-all duration-200"
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
    </div>
  );
}

export default function Navigation() {
  const { lang, setLang } = useLang();
  const tr = t[lang].nav;

  const [scrolled, setScrolled] = useState(false);
  const [pastHero, setPastHero] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const navRef = useRef<HTMLDivElement>(null);

  const leftNav = [
    { label: tr.yacht, type: "dropdown", items: tr.yachtItems },
    { label: tr.services, type: "dropdown", items: tr.servicesItems },
    { label: tr.cruisePlan, type: "dropdown", items: tr.cruisePlanItems },
  ];

  const rightNav = [
    { label: tr.about, type: "dropdown", items: tr.aboutItems },
    { label: tr.contact, href: "#contact", type: "link" },
  ];

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

  const onDark = !pastHero && !scrolled && !mobileOpen;
  const linkColor = onDark ? "rgba(255,255,255,0.85)" : "var(--text)";
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
        scrolled || mobileOpen
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
              <div
                key={item.label}
                className="relative flex items-center"
                onMouseEnter={() => item.type === "dropdown" && setOpenDropdown(item.label)}
                onMouseLeave={() => item.type === "dropdown" && setOpenDropdown(null)}
              >
                {item.type === "link" ? (
                  <a
                    href={(item as { href: string }).href}
                    className="text-[13px] font-normal tracking-[0.08em] uppercase transition-colors duration-300"
                    style={{ color: linkColor }}
                    onMouseEnter={(e) => (e.currentTarget as HTMLElement).style.color = linkHover}
                    onMouseLeave={(e) => (e.currentTarget as HTMLElement).style.color = linkColor}
                  >
                    {item.label}
                  </a>
                ) : (
                  <>
                    <button
                      className="flex items-center gap-1.5 text-[13px] font-normal tracking-[0.08em] uppercase transition-colors duration-300"
                      style={{ color: openDropdown === item.label ? linkHover : linkColor }}
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
              className="transition-opacity duration-400 hover:opacity-60"
            >
              <img
                src="/logo-ventum.png"
                alt="Ventum"
                className="h-7 w-auto max-w-[160px] object-contain transition-all duration-400"
                style={{ filter: onDark ? "brightness(0) invert(1)" : "brightness(0)" }}
              />
            </a>
          </div>

          {/* Right nav */}
          <div className="flex items-center justify-end gap-8">
            {rightNav.map((item) => (
              <div
                key={item.label}
                className="relative flex items-center"
                onMouseEnter={() => item.type === "dropdown" && setOpenDropdown(item.label)}
                onMouseLeave={() => item.type === "dropdown" && setOpenDropdown(null)}
              >
                {item.type === "link" ? (
                  <a
                    href={(item as { href: string }).href}
                    className="text-[13px] font-normal tracking-[0.08em] uppercase transition-colors duration-300"
                    style={{ color: linkColor }}
                    onMouseEnter={(e) => (e.currentTarget as HTMLElement).style.color = linkHover}
                    onMouseLeave={(e) => (e.currentTarget as HTMLElement).style.color = linkColor}
                  >
                    {item.label}
                  </a>
                ) : (
                  <>
                    <button
                      className="flex items-center gap-1.5 text-[13px] font-normal tracking-[0.08em] uppercase transition-colors duration-300"
                      style={{ color: openDropdown === item.label ? linkHover : linkColor }}
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

            {/* Language switcher */}
            <div
              className="flex items-center gap-1 px-3 py-1.5"
              style={{ border: `1px solid ${borderColor}`, borderRadius: "20px" }}
            >
              <button
                className="text-[12px] tracking-[0.08em] font-semibold transition-colors duration-300"
                style={{ color: lang === "en" ? (onDark ? "#fff" : "var(--accent)") : langColor }}
                onClick={() => setLang("en")}
              >
                EN
              </button>
              <span className="text-xs" style={{ color: borderColor }}>|</span>
              <button
                className="text-[12px] tracking-[0.08em] transition-colors duration-300"
                style={{ color: lang === "de" ? (onDark ? "#fff" : "var(--accent)") : langColor }}
                onClick={() => setLang("de")}
                onMouseEnter={(e) => (e.currentTarget as HTMLElement).style.color = linkHover}
                onMouseLeave={(e) => (e.currentTarget as HTMLElement).style.color = lang === "de" ? (onDark ? "#fff" : "var(--accent)") : langColor}
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
            className="transition-opacity duration-400 hover:opacity-60"
          >
            <img
              src="/logo-ventum.png"
              alt="Ventum"
              className="h-6 w-auto max-w-[140px] object-contain transition-all duration-400"
              style={{ filter: onDark ? "brightness(0) invert(1)" : "brightness(0)" }}
            />
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
                  className="block px-6 py-3.5 text-[12px] tracking-[0.08em] uppercase transition-all"
                  style={{ color: "var(--text-secondary)", borderBottom: "1px solid var(--border-light)" }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "var(--accent)"; (e.currentTarget as HTMLElement).style.background = "var(--surface-alt)"; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "var(--text-secondary)"; (e.currentTarget as HTMLElement).style.background = "transparent"; }}
                >
                  {link.label}
                </a>
              ));
            })}
            <div className="flex gap-3 px-6 pt-5">
              <button
                className="text-[12px] tracking-[0.08em] font-semibold"
                style={{ color: lang === "en" ? "var(--accent)" : "var(--text-muted)" }}
                onClick={() => setLang("en")}
              >
                EN
              </button>
              <span style={{ color: "var(--border)" }}>|</span>
              <button
                className="text-[12px] tracking-[0.08em]"
                style={{ color: lang === "de" ? "var(--accent)" : "var(--text-muted)" }}
                onClick={() => setLang("de")}
              >
                DE
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
