"use client";

export default function Footer() {
  return (
    <footer className="border-t border-white/5 bg-black/50">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo */}
          <a
            href="#hero"
            className="text-xl font-bold tracking-[0.3em] text-white/70 hover:text-white transition-colors duration-300"
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
                className="text-xs tracking-widest uppercase text-white/30 hover:text-white/70 transition-colors duration-200"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Copyright */}
          <div className="text-right">
            <p className="text-xs text-white/20 font-light">
              ventum-sailing.ch
            </p>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-8 pt-8 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs text-white/20 font-light">
            &copy; 2026 Ventum. All rights reserved.
          </p>
          <p className="text-xs text-white/10 font-light italic">
            Always in motion like the ocean
          </p>
        </div>
      </div>
    </footer>
  );
}
