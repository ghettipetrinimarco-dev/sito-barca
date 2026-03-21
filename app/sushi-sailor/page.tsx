"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { useLang } from "../context/LanguageContext";

/* ── Translations ─────────────────────────────────────────────────── */
const tr = {
  en: {
    back: "Ventum Sailing",
    heroEyebrow: "Ventum × Sushi Sailor",
    heroTagline: "Private Omakase\nat Sea.",
    s01: "01",
    s01heading: "Mastery of Japanese\nCuisine, Refined at Sea.",
    s01sub: "Influenced by a passion for the ocean and the philosophy of omakase.",
    s01body:
      "Sushi Sailor is an exclusive combination of freedom and gourmet pleasure — slow sailing paired with high-quality cuisine on board. As a passionate sushi chef, I transform your time on the water into a private omakase experience.\n\nEnjoy handcrafted sushi at sunset, while the yacht gently anchors in the bay. Every piece is composed around the season, the catch, and the moment. Never the same twice.",
    chefLabel: "The Chef",
    chefName: "Marco Haenni",
    chefBio:
      "Trained in the art of traditional Japanese sushi, Marco brings the philosophy of omakase to the open sea. Each experience is crafted around the season, the catch, and the moment.",
    s02: "02",
    s02heading: "The Philosophy\nof Shibui.",
    s02sub: "Subtle beauty, quiet elegance, simplicity and complexity.",
    quote:
      '"The sea sets the rhythm.\nThe fish tells the story.\nI simply listen."',
    quoteAttr: "Marco Haenni — Sushi Sailor",
    s03: "03",
    s03heading: "Every Detail Reflects\na Deeply Personal Experience.",
    s03sub: "Sushi wherever you are — on land or at sea.",
    s03body:
      "The Sushi Sailor experience comes to you. Private sushi catering for intimate dinners, celebrations, and events. Each booking is tailored around your occasion, your location, and your preferences.",
    services: [
      "Private Charter Omakase",
      "Sushi Catering — Events & Celebrations",
      "Sunset Experience at Anchor",
      "Private Dining at Home",
    ],
    contactHeading: "Reserve Your\nExperience.",
    contactSub:
      "Each booking is personal. Get in touch to discuss your date, location, and preferences.",
    contactCta: "Get in Touch",
    footerCopy: "© 2025 Ventum Sailing — Sushi Sailor",
    footerEmail: "info@ventum-sailing.ch",
  },
  de: {
    back: "Ventum Sailing",
    heroEyebrow: "Ventum × Sushi Sailor",
    heroTagline: "Privates Omakase\nauf See.",
    s01: "01",
    s01heading: "Meisterschaft der\njapanischen Küche, auf See.",
    s01sub: "Inspiriert von der Leidenschaft für das Meer und die Philosophie des Omakase.",
    s01body:
      "Sushi Sailor steht für eine exklusive Kombination aus Freiheit und Gourmet-Genuss — entschleunigtes Segeln gepaart mit hochwertiger Bordküche. Als leidenschaftlicher Sushi-Koch verwandle ich Ihre Zeit auf dem Wasser in ein privates Omakase-Erlebnis.\n\nGeniessen Sie handgemachtes Sushi bei Sonnenuntergang, während die Yacht sanft in der Bucht vor Anker liegt. Jedes Stück ist auf Saison, Fang und Moment abgestimmt. Nie zweimal dasselbe.",
    chefLabel: "Der Chef",
    chefName: "Marco Haenni",
    chefBio:
      "Mit einer Leidenschaft für die traditionelle japanische Sushi-Kunst bringt Marco die Philosophie des Omakase auf die offene See. Jedes Erlebnis wird nach Saison, Fang und Moment gestaltet.",
    s02: "02",
    s02heading: "Die Philosophie\ndes Shibui.",
    s02sub: "Stille Eleganz, Einfachheit und Komplexität.",
    quote:
      '„Das Meer gibt den Rhythmus vor.\nDer Fisch erzählt die Geschichte.\nIch höre nur zu."',
    quoteAttr: "Marco Haenni — Sushi Sailor",
    s03: "03",
    s03heading: "Jedes Detail spiegelt ein\npersönliches Erlebnis.",
    s03sub: "Sushi wo immer Sie sind — zu Land oder auf See.",
    s03body:
      "Das Sushi Sailor Erlebnis kommt zu Ihnen. Privates Sushi-Catering für intime Abendessen, Feiern und Events. Jede Buchung wird auf Ihren Anlass, Ihren Ort und Ihre Wünsche abgestimmt.",
    services: [
      "Privates Charter-Omakase",
      "Sushi-Catering — Events & Feiern",
      "Sonnenuntergang-Erlebnis vor Anker",
      "Privates Dinner bei Ihnen",
    ],
    contactHeading: "Reservieren Sie\nIhr Erlebnis.",
    contactSub:
      "Jede Buchung ist persönlich. Kontaktieren Sie uns für Datum, Ort und Ihre Wünsche.",
    contactCta: "Kontakt aufnehmen",
    footerCopy: "© 2025 Ventum Sailing — Sushi Sailor",
    footerEmail: "info@ventum-sailing.ch",
  },
};

/* ── Scroll reveal ────────────────────────────────────────────────── */
function Reveal({
  children,
  delay = 0,
  className,
  style,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  style?: React.CSSProperties;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      className={className}
      style={style}
      initial={{ opacity: 0, y: 22 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 1.1, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}

const PAD = "clamp(1.5rem, 5vw, 5rem)";
const SECTION_V = "clamp(6rem, 14vh, 10rem)";

/* ── Page ─────────────────────────────────────────────────────────── */
export default function SushiSailorPage() {
  const { lang, setLang } = useLang();
  const l = lang === "de" ? "de" : "en";
  const tx = tr[l];

  const sushiImages = ["/Sushi-1.webp", "/Sushi-2.webp", "/Sushi-3.webp", "/Sushi-4.webp"];

  return (
    <main style={{ background: "#F8F7F5", color: "#0C0C0C" }}>

      {/* ── Header ─────────────────────────────────────────────── */}
      <header
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between"
        style={{
          height: "58px",
          padding: `0 ${PAD}`,
          background: "rgba(248,247,245,0.92)",
          backdropFilter: "blur(16px)",
          borderBottom: "1px solid rgba(0,0,0,0.06)",
        }}
      >
        <Link
          href="/"
          className="font-manrope"
          style={{ fontSize: "10px", letterSpacing: "0.2em", textTransform: "uppercase", color: "#999", textDecoration: "none" }}
        >
          ← {tx.back}
        </Link>

        <span
          className="font-playfair absolute left-1/2 -translate-x-1/2"
          style={{ fontSize: "15px", color: "#0C0C0C", letterSpacing: "0.02em" }}
        >
          Sushi Sailor
        </span>

        <button
          onClick={() => setLang(l === "en" ? "de" : "en")}
          className="font-manrope"
          style={{ fontSize: "10px", letterSpacing: "0.2em", textTransform: "uppercase", color: "#999", background: "none", border: "none", cursor: "pointer" }}
        >
          {l === "en" ? "DE" : "EN"}
        </button>
      </header>

      {/* ── Hero — full bleed ───────────────────────────────────── */}
      <section className="relative overflow-hidden" style={{ height: "100svh" }}>
        <Image
          src="/Sushi-sailor-new.jpg"
          alt="Sushi Sailor"
          fill
          priority
          className="object-cover"
          sizes="100vw"
          style={{ objectPosition: "center 40%" }}
        />
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(to top, rgba(5,5,5,0.82) 0%, rgba(5,5,5,0.15) 55%, transparent 100%)" }}
        />

        {/* Top label */}
        <motion.p
          className="absolute font-manrope"
          style={{ top: "80px", left: 0, right: 0, textAlign: "center", fontSize: "9px", letterSpacing: "0.32em", textTransform: "uppercase", color: "rgba(255,255,255,0.38)" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2, delay: 0.4 }}
        >
          {tx.heroEyebrow}
        </motion.p>

        {/* Tagline */}
        <div
          className="absolute bottom-0 left-0"
          style={{ padding: `0 ${PAD}`, paddingBottom: "clamp(3rem, 8vh, 5.5rem)" }}
        >
          <motion.h1
            className="font-playfair text-white"
            style={{
              fontSize: "clamp(3rem, 7.5vw, 6.5rem)",
              letterSpacing: "-0.03em",
              lineHeight: 1.0,
              whiteSpace: "pre-line",
            }}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.4, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            {tx.heroTagline}
          </motion.h1>
        </div>
      </section>

      {/* ── Section 01 — Bio ────────────────────────────────────── */}
      <section style={{ padding: `${SECTION_V} ${PAD}` }}>

        {/* Section label */}
        <Reveal>
          <p
            className="font-manrope"
            style={{ fontSize: "10px", letterSpacing: "0.28em", textTransform: "uppercase", color: "#C0C0C0", marginBottom: "3rem" }}
          >
            {tx.s01}
          </p>
        </Reveal>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_0.9fr] gap-16 lg:gap-28 items-start">
          {/* Left */}
          <div>
            <Reveal>
              <h2
                className="font-playfair"
                style={{
                  fontSize: "clamp(2rem, 4vw, 3.6rem)",
                  letterSpacing: "-0.025em",
                  lineHeight: 1.08,
                  marginBottom: "2.5rem",
                  whiteSpace: "pre-line",
                }}
              >
                {tx.s01heading}
              </h2>
            </Reveal>

            <Reveal delay={0.08}>
              <p
                className="font-manrope"
                style={{ fontSize: "10px", letterSpacing: "0.22em", textTransform: "uppercase", color: "#AAA", marginBottom: "2.5rem", lineHeight: 1.9 }}
              >
                {tx.s01sub}
              </p>
            </Reveal>

            <Reveal delay={0.14}>
              <p
                className="font-manrope"
                style={{ fontSize: "1.05rem", lineHeight: 1.95, color: "#3A3A3A", whiteSpace: "pre-line" }}
              >
                {tx.s01body}
              </p>
            </Reveal>
          </div>

          {/* Right — chef portrait */}
          <Reveal
            delay={0.05}
            style={{ position: "relative", aspectRatio: "3/4" } as React.CSSProperties}
          >
            <Image
              src="/Sushi-sailor-marco.jpg"
              alt={tx.chefName}
              fill
              className="object-cover"
              sizes="(min-width: 1024px) 45vw, 100vw"
            />
            {/* Caption overlay */}
            <div
              style={{
                position: "absolute",
                bottom: 0,
                left: 0,
                right: 0,
                padding: "3rem 2rem 2rem",
                background: "linear-gradient(to top, rgba(5,5,5,0.7) 0%, transparent 100%)",
              }}
            >
              <p className="font-manrope" style={{ fontSize: "9px", letterSpacing: "0.28em", textTransform: "uppercase", color: "rgba(255,255,255,0.45)", marginBottom: "0.35rem" }}>
                {tx.chefLabel}
              </p>
              <p className="font-playfair text-white" style={{ fontSize: "1.4rem", letterSpacing: "-0.01em" }}>
                {tx.chefName}
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Divider ─────────────────────────────────────────────── */}
      <div style={{ height: "1px", margin: `0 ${PAD}`, background: "rgba(0,0,0,0.09)" }} />

      {/* ── Section 02 — Philosophy + Gallery ──────────────────── */}
      <section style={{ paddingTop: SECTION_V }}>

        <div style={{ padding: `0 ${PAD}` }}>
          <Reveal>
            <p className="font-manrope" style={{ fontSize: "10px", letterSpacing: "0.28em", textTransform: "uppercase", color: "#C0C0C0", marginBottom: "3rem" }}>
              {tx.s02}
            </p>
          </Reveal>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-end" style={{ marginBottom: "4rem" }}>
            <Reveal>
              <h2
                className="font-playfair"
                style={{ fontSize: "clamp(2rem, 4vw, 3.6rem)", letterSpacing: "-0.025em", lineHeight: 1.08, whiteSpace: "pre-line" }}
              >
                {tx.s02heading}
              </h2>
            </Reveal>
            <Reveal delay={0.08}>
              <p className="font-manrope" style={{ fontSize: "10px", letterSpacing: "0.22em", textTransform: "uppercase", color: "#AAA", lineHeight: 1.9, maxWidth: "34ch" }}>
                {tx.s02sub}
              </p>
            </Reveal>
          </div>
        </div>

        {/* Horizontal image strip — drag to scroll */}
        <div
          className="flex overflow-x-auto"
          style={{
            scrollSnapType: "x mandatory",
            scrollbarWidth: "none",
            gap: "3px",
            paddingLeft: PAD,
            paddingRight: PAD,
            cursor: "grab",
          }}
        >
          {sushiImages.map((src, i) => (
            <div
              key={i}
              className="flex-shrink-0 relative overflow-hidden"
              style={{ width: "clamp(220px, 32vw, 520px)", aspectRatio: "2/3", scrollSnapAlign: "start" }}
            >
              <Image
                src={src}
                alt={`Sushi ${i + 1}`}
                fill
                className="object-cover"
                sizes="32vw"
              />
            </div>
          ))}
        </div>

        {/* Pullquote */}
        <div
          style={{
            padding: `${SECTION_V} ${PAD}`,
            textAlign: "center",
          }}
        >
          <Reveal>
            <blockquote
              className="font-playfair"
              style={{
                fontSize: "clamp(1.4rem, 2.8vw, 2.3rem)",
                fontStyle: "italic",
                lineHeight: 1.6,
                color: "#1A1A1A",
                whiteSpace: "pre-line",
                maxWidth: "26ch",
                margin: "0 auto 1.75rem",
              }}
            >
              {tx.quote}
            </blockquote>
            <p
              className="font-manrope"
              style={{ fontSize: "9px", letterSpacing: "0.26em", textTransform: "uppercase", color: "#BBBBBB" }}
            >
              {tx.quoteAttr}
            </p>
          </Reveal>
        </div>
      </section>

      {/* ── Divider ─────────────────────────────────────────────── */}
      <div style={{ height: "1px", margin: `0 ${PAD}`, background: "rgba(0,0,0,0.09)" }} />

      {/* ── Section 03 — Services ───────────────────────────────── */}
      <section style={{ padding: `${SECTION_V} ${PAD}` }}>

        <Reveal>
          <p className="font-manrope" style={{ fontSize: "10px", letterSpacing: "0.28em", textTransform: "uppercase", color: "#C0C0C0", marginBottom: "3rem" }}>
            {tx.s03}
          </p>
        </Reveal>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-28 items-start">

          {/* Left — heading + text */}
          <div>
            <Reveal>
              <h2
                className="font-playfair"
                style={{ fontSize: "clamp(2rem, 4vw, 3.6rem)", letterSpacing: "-0.025em", lineHeight: 1.08, marginBottom: "2.5rem", whiteSpace: "pre-line" }}
              >
                {tx.s03heading}
              </h2>
            </Reveal>
            <Reveal delay={0.08}>
              <p className="font-manrope" style={{ fontSize: "10px", letterSpacing: "0.22em", textTransform: "uppercase", color: "#AAA", marginBottom: "2.5rem", lineHeight: 1.9 }}>
                {tx.s03sub}
              </p>
            </Reveal>
            <Reveal delay={0.14}>
              <p className="font-manrope" style={{ fontSize: "1.05rem", lineHeight: 1.95, color: "#3A3A3A" }}>
                {tx.s03body}
              </p>
            </Reveal>
          </div>

          {/* Right — service list */}
          <div>
            <div style={{ borderTop: "1px solid rgba(0,0,0,0.09)" }}>
              {tx.services.map((item, i) => (
                <Reveal key={i} delay={i * 0.07}>
                  <div
                    style={{
                      padding: "1.5rem 0",
                      borderBottom: "1px solid rgba(0,0,0,0.09)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <p className="font-manrope" style={{ fontSize: "10px", letterSpacing: "0.18em", textTransform: "uppercase", color: "#333" }}>
                      {item}
                    </p>
                    <span style={{ color: "#CCC", fontSize: "12px" }}>↗</span>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Divider ─────────────────────────────────────────────── */}
      <div style={{ height: "1px", margin: `0 ${PAD}`, background: "rgba(0,0,0,0.09)" }} />

      {/* ── Contact ─────────────────────────────────────────────── */}
      <section style={{ padding: `${SECTION_V} ${PAD}` }}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-end">
          <div>
            <Reveal>
              <h2
                className="font-playfair"
                style={{
                  fontSize: "clamp(2.2rem, 5vw, 4.5rem)",
                  letterSpacing: "-0.03em",
                  lineHeight: 1.0,
                  whiteSpace: "pre-line",
                }}
              >
                {tx.contactHeading}
              </h2>
            </Reveal>
          </div>
          <div>
            <Reveal delay={0.1}>
              <p className="font-manrope" style={{ fontSize: "1rem", lineHeight: 1.85, color: "#666", marginBottom: "2.5rem" }}>
                {tx.contactSub}
              </p>
            </Reveal>
            <Reveal delay={0.18}>
              <a
                href={`mailto:${tx.footerEmail}`}
                className="inline-block font-manrope font-medium"
                style={{
                  fontSize: "10px",
                  letterSpacing: "0.22em",
                  textTransform: "uppercase",
                  padding: "1rem 2.4rem",
                  border: "1px solid #0C0C0C",
                  color: "#0C0C0C",
                  textDecoration: "none",
                  transition: "background 0.35s, color 0.35s",
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.background = "#0C0C0C";
                  el.style.color = "#F8F7F5";
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.background = "transparent";
                  el.style.color = "#0C0C0C";
                }}
              >
                {tx.contactCta}
              </a>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── Footer ─────────────────────────────────────────────── */}
      <footer
        style={{
          borderTop: "1px solid rgba(0,0,0,0.07)",
          padding: `2rem ${PAD}`,
          display: "flex",
          flexWrap: "wrap",
          gap: "1rem",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <p className="font-manrope" style={{ fontSize: "10px", letterSpacing: "0.15em", color: "#C0C0C0" }}>
          {tx.footerCopy}
        </p>
        <a
          href={`mailto:${tx.footerEmail}`}
          className="font-manrope"
          style={{ fontSize: "10px", letterSpacing: "0.15em", color: "#C0C0C0", textDecoration: "none" }}
        >
          {tx.footerEmail}
        </a>
      </footer>
    </main>
  );
}
