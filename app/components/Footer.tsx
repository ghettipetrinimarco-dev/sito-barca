"use client";

export default function Footer() {
  return (
    <footer style={{ borderTop: "1px solid rgba(255,255,255,0.05)", background: "rgba(0,0,0,0.4)" }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-14 py-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo */}
          <a
            href="#hero"
            className="font-manrope font-bold tracking-[0.32em] transition-opacity duration-300 hover:opacity-70"
            style={{ fontSize: "1.1rem", color: "rgba(255,255,255,0.6)" }}
          >
            VENTUM
          </a>

          {/* Links */}
          <div className="flex flex-wrap justify-center gap-8">
            {[
              { label: "Services", href: "#services" },
              { label: "Cruise Plan", href: "#cruise-plan" },
              { label: "Ventum Story", href: "#ventum-story" },
              { label: "Captain Marco", href: "#captain-marco" },
              { label: "Contact", href: "#contact" },
            ].map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-[10px] tracking-[0.22em] uppercase transition-colors duration-200"
                style={{ color: "rgba(255,255,255,0.28)" }}
                onMouseEnter={(e) => (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.65)"}
                onMouseLeave={(e) => (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.28)"}
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Website */}
          <div className="text-right">
            <p className="text-[11px] font-light" style={{ color: "rgba(255,255,255,0.18)" }}>
              ventum-sailing.ch
            </p>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="mt-8 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4"
          style={{ borderTop: "1px solid rgba(255,255,255,0.04)" }}
        >
          <p className="text-[11px] font-light" style={{ color: "rgba(255,255,255,0.18)" }}>
            &copy; 2026 Ventum. All rights reserved.
          </p>
          <p className="font-playfair italic text-[11px]" style={{ color: "rgba(255,255,255,0.1)" }}>
            Always in motion like the ocean
          </p>
        </div>
      </div>
    </footer>
  );
}
