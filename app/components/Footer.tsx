"use client";

export default function Footer() {
  return (
    <footer style={{ background: "var(--text)", color: "#fff" }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-14 py-16">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-10 mb-12">
          {/* Logo + tagline */}
          <div>
            <a
              href="#hero"
              className="font-manrope font-bold tracking-[0.32em] transition-opacity duration-300 hover:opacity-70 block mb-2"
              style={{ fontSize: "1.2rem", color: "#fff" }}
            >
              VENTUM
            </a>
            <p className="font-playfair italic text-sm" style={{ color: "rgba(255,255,255,0.35)" }}>
              Always in motion like the ocean
            </p>
          </div>

          {/* Links */}
          <div className="flex flex-wrap gap-8">
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
                style={{ color: "rgba(255,255,255,0.4)" }}
                onMouseEnter={(e) => (e.currentTarget as HTMLElement).style.color = "#fff"}
                onMouseLeave={(e) => (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.4)"}
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Contact */}
          <div className="text-right">
            <p className="text-xs font-light" style={{ color: "rgba(255,255,255,0.35)" }}>ventum-sailing.ch</p>
            <p className="text-xs font-light mt-1" style={{ color: "rgba(255,255,255,0.2)" }}>info@ventum-sailing.ch</p>
          </div>
        </div>

        {/* Bottom */}
        <div
          className="pt-8 flex flex-col sm:flex-row justify-between items-center gap-4"
          style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}
        >
          <p className="text-[11px] font-light" style={{ color: "rgba(255,255,255,0.2)" }}>
            &copy; 2026 Ventum. All rights reserved.
          </p>
          <p className="text-[11px] font-light" style={{ color: "rgba(255,255,255,0.15)" }}>
            Mediterranean Sea
          </p>
        </div>
      </div>
    </footer>
  );
}
