"use client";

import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { useLang } from "../context/LanguageContext";

/* ── Translations ─────────────────────────────────────────────────── */
const tr = {
  en: {
    back: "Ventum Sailing",
    heroEyebrow: "Ventum × Sushi Sailor",
    heroTitle: "Private Omakase by Chef Marco Haenni",
    heroSub: "The sea as inspiration. Your home as the stage.",
    heroTagline: "Sushi Sailor — The Art of Omakase",
    introStatement:
      "An exclusive combination of freedom and gourmet pleasure — brought to your table.",
    introBody:
      "Sushi Sailor stands for slow sailing paired with high-quality cuisine. As a passionate sushi chef, I transform your time on the water into a private omakase experience. Enjoy handcrafted sushi at sunset, while the yacht gently anchors in the bay.",
    s01: "01",
    s01heading: "Mastery of Japanese\nCuisine, Brought to Your Door.",
    s01sub: "Influenced by a passion for the ocean and the philosophy of omakase.",
    s01body:
      "Sushi Sailor is born at sea — and arrives at your table. As a sailor and passionate sushi chef, Marco brings the philosophy of omakase from the water to your home. The ocean sets the rhythm. The season defines the menu.\n\nEach experience is a private, handcrafted journey — composed around the catch, the moment, and your guests. Never the same twice.",
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
    s03sub: "The sea as inspiration. Your home as the stage.",
    s03body:
      "Sushi Sailor comes to you. Marco brings the full omakase experience — fresh ingredients, precise technique, and the quiet philosophy of the sea — directly to your home. Intimate dinners, celebrations, and private events, tailored entirely around you.",
    services: [
      "Private Omakase at Home",
      "Sushi Catering — Events & Celebrations",
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
    heroTitle: "Privates Omakase von Chef Marco Haenni",
    heroSub: "Das Meer als Inspiration. Ihr Zuhause als Bühne.",
    heroTagline: "Sushi Sailor — Die Kunst des Omakase",
    introStatement:
      "Eine exklusive Kombination aus Freiheit und Gourmet-Genuss — zu Ihnen gebracht.",
    introBody:
      "Sushi Sailor steht für entschleunigtes Segeln gepaart mit hochwertiger Bordküche. Als leidenschaftlicher Sushi-Koch verwandle ich Ihre Zeit auf dem Wasser in ein privates Omakase Erlebnis. Geniessen Sie handgemachtes Sushi bei Sonnenuntergang, während die Yacht sanft in der Bucht vor Anker liegt.",
    s01: "01",
    s01heading: "Meisterschaft der\njapanischen Küche, zu Ihnen gebracht.",
    s01sub: "Inspiriert von der Leidenschaft für das Meer und die Philosophie des Omakase.",
    s01body:
      "Sushi Sailor entsteht auf See — und kommt an Ihrem Tisch an. Als Segler und leidenschaftlicher Sushi-Koch bringt Marco die Philosophie des Omakase vom Wasser zu Ihnen nach Hause. Das Meer gibt den Rhythmus vor. Die Saison bestimmt das Menü.\n\nJedes Erlebnis ist eine private, handgemachte Reise — komponiert aus Fang, Moment und Ihren Gästen. Nie zweimal dasselbe.",
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
    s03sub: "Das Meer als Inspiration. Ihr Zuhause als Bühne.",
    s03body:
      "Sushi Sailor kommt zu Ihnen. Marco bringt das vollständige Omakase-Erlebnis — frische Zutaten, präzise Technik und die stille Philosophie des Meeres — direkt zu Ihnen nach Hause. Intime Dinner, Feiern und private Events, ganz auf Sie abgestimmt.",
    services: [
      "Privates Omakase bei Ihnen",
      "Sushi-Catering — Events & Feiern",
    ],
    contactHeading: "Reservieren Sie\nIhr Erlebnis.",
    contactSub:
      "Jede Buchung ist persönlich. Kontaktieren Sie uns für Datum, Ort und Ihre Wünsche.",
    contactCta: "Kontakt aufnehmen",
    footerCopy: "© 2025 Ventum Sailing — Sushi Sailor",
    footerEmail: "info@ventum-sailing.ch",
  },
};

/* ── Chopstick cursor ─────────────────────────────────────────────── */
function ChopstickCursor() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const visible = useRef(false);

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const onMove = (e: MouseEvent) => {
      if (!wrapRef.current) return;
      if (!visible.current) {
        wrapRef.current.style.opacity = "1";
        visible.current = true;
      }
      wrapRef.current.style.transform = `translate(${e.clientX - 10}px, ${e.clientY - 80}px)`;
    };
    const hide = () => { if (wrapRef.current) wrapRef.current.style.opacity = "0"; };
    const show = () => { if (wrapRef.current) wrapRef.current.style.opacity = "1"; };

    window.addEventListener("mousemove", onMove);
    document.addEventListener("mouseleave", hide);
    document.addEventListener("mouseenter", show);
    return () => {
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", hide);
      document.removeEventListener("mouseenter", show);
    };
  }, []);

  return (
    /* mix-blend-mode:difference — black bg acts as transparent, white chopsticks auto-invert */
    <div
      ref={wrapRef}
      style={{ position: "fixed", top: 0, left: 0, pointerEvents: "none", zIndex: 999999, opacity: 0, mixBlendMode: "difference", willChange: "transform" }}
    >
      {/* invert(1): black chopsticks→white, white bg→black (disappears with difference) */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/Logo-Cursor-new.png"
        alt=""
        style={{ display: "block", height: "80px", width: "auto", filter: "invert(1)", transform: "rotate(168deg)" }}
      />
    </div>
  );
}

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


/* ── Smart header hook ────────────────────────────────────────────── */
function useHeaderState() {
  const [visible, setVisible]   = useState(true);
  const [atTop,   setAtTop]     = useState(true);
  const lastY = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setAtTop(y < 60);
      if (y > lastY.current && y > 120) setVisible(false); // scrolling down
      else setVisible(true);                                // scrolling up
      lastY.current = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return { visible, atTop };
}

/* ── Page ─────────────────────────────────────────────────────────── */
export default function SushiSailorPage() {
  const { lang, setLang } = useLang();
  const l = lang === "de" ? "de" : "en";
  const tx = tr[l];
  const { visible, atTop } = useHeaderState();

  const sushiImages = ["/Sushi-1.webp", "/Sushi-2.webp", "/Sushi-3.webp", "/Sushi-4.webp"];

  return (
    <main style={{ background: "#F8F7F5", color: "#0C0C0C", cursor: "none" }}>
      <ChopstickCursor />

      {/* ── Header ─────────────────────────────────────────────── */}
      <header
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between"
        style={{
          height: "62px",
          padding: `0 ${PAD}`,
          background: atTop ? "transparent" : "rgba(8,8,8,0.88)",
          backdropFilter: atTop ? "none" : "blur(16px)",
          transform: visible ? "translateY(0)" : "translateY(-100%)",
          transition: "transform 0.4s ease, background 0.5s ease, backdrop-filter 0.5s ease",
          borderBottom: atTop ? "none" : "1px solid rgba(255,255,255,0.06)",
        }}
      >
        {/* Logo — text only, Masa style */}
        <Link
          href="/"
          className="font-manrope font-semibold"
          style={{ fontSize: "11px", letterSpacing: "0.3em", textTransform: "uppercase", color: "rgba(255,255,255,0.9)", textDecoration: "none" }}
        >
          S U S H I &nbsp; S A I L O R
        </Link>

        {/* Right — lang + book */}
        <div className="flex items-center gap-5">
          <button
            onClick={() => setLang(l === "en" ? "de" : "en")}
            className="font-manrope"
            style={{ fontSize: "10px", letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(255,255,255,0.5)", background: "none", border: "none", cursor: "pointer" }}
          >
            {l === "en" ? "DE" : "EN"}
          </button>
          <a
            href={`mailto:${tx.footerEmail}`}
            className="font-manrope font-medium"
            style={{
              fontSize: "10px",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.85)",
              border: "1px solid rgba(255,255,255,0.4)",
              padding: "0.5rem 1.2rem",
              textDecoration: "none",
              transition: "all 0.3s",
            }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.9)"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.4)"; }}
          >
            {l === "en" ? "Book" : "Buchen"}
          </a>
        </div>
      </header>

      {/* ── Hero — dark full bleed, centered title ──────────────── */}
      <section className="relative overflow-hidden" style={{ height: "100svh" }}>
        <div style={{ position: "absolute", inset: "-12% -8% -12% -8%" }}>
          <Image
            src="/Sushi-landing-page.jpg"
            alt="Sushi Sailor"
            fill
            priority
            className="object-cover"
            sizes="100vw"
            style={{ objectPosition: "25% 55%", filter: "grayscale(100%) brightness(0.45)" }}
          />
        </div>
        {/* Dark overlay */}
        <div className="absolute inset-0" style={{ background: "rgba(4,4,4,0.55)" }} />

        {/* Centered content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
          {/* Logo stamp */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2, delay: 0.2 }}
            style={{ marginBottom: "2rem" }}
          >
            <Image
              src="/Logo-Icon.png"
              alt="Sushi Sailor"
              width={48}
              height={48}
              style={{ objectFit: "contain", filter: "invert(1) hue-rotate(180deg)" }}
            />
          </motion.div>

          {/* Label */}
          <motion.p
            className="font-manrope"
            style={{ fontSize: "9px", letterSpacing: "0.36em", textTransform: "uppercase", color: "rgba(255,255,255,0.35)", marginBottom: "1.2rem" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.4, delay: 0.35 }}
          >
            {l === "en" ? "Private Omakase by" : "Privates Omakase von"}
          </motion.p>

          {/* Heading */}
          <motion.h1
            className="font-playfair text-white"
            style={{
              fontSize: "clamp(2.2rem, 4vw, 3.8rem)",
              fontWeight: 400,
              letterSpacing: "-0.01em",
              lineHeight: 1.1,
              textTransform: "uppercase",
              marginBottom: "1.6rem",
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.3, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            Chef Marco Haenni
          </motion.h1>

          {/* Tagline */}
          <motion.p
            className="font-playfair"
            style={{ fontSize: "clamp(0.95rem, 1.4vw, 1.15rem)", fontStyle: "italic", color: "rgba(255,255,255,0.45)" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.4, delay: 0.9 }}
          >
            {tx.heroSub}
          </motion.p>
        </div>

        {/* Bottom bar — Masa style */}
        <div
          className="absolute bottom-0 left-0 right-0 flex items-center justify-between font-manrope"
          style={{ padding: `1.2rem ${PAD}`, borderTop: "1px solid rgba(255,255,255,0.08)" }}
        >
          <p style={{ fontSize: "10px", letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(255,255,255,0.3)" }}>
            {tx.heroTagline}
          </p>
          <Link
            href="/"
            style={{ fontSize: "10px", letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(255,255,255,0.3)", textDecoration: "none" }}
          >
            ← {tx.back}
          </Link>
        </div>
      </section>

      {/* ── Intro ───────────────────────────────────────────────── */}
      <section style={{ padding: `${SECTION_V} ${PAD}` }}>
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-12 lg:gap-24 items-start">

          {/* Left — opening statement */}
          <Reveal>
            <p
              className="font-manrope"
              style={{ fontSize: "10px", letterSpacing: "0.28em", textTransform: "uppercase", color: "#BBBBBB", marginBottom: "2rem" }}
            >
              {l === "en" ? "The Experience" : "Das Erlebnis"}
            </p>
            <p
              className="font-playfair"
              style={{ fontSize: "clamp(1.4rem, 2.6vw, 2.1rem)", lineHeight: 1.55, color: "#1A1A1A", fontStyle: "italic" }}
            >
              {tx.introStatement}
            </p>
          </Reveal>

          {/* Right — body */}
          <Reveal delay={0.12}>
            <p
              className="font-manrope"
              style={{ fontSize: "1.05rem", lineHeight: 1.95, color: "#555", paddingTop: "clamp(0rem, 3vw, 3.5rem)" }}
            >
              {tx.introBody}
            </p>
          </Reveal>

        </div>
      </section>

      <div style={{ height: "1px", margin: `0 ${PAD}`, background: "rgba(0,0,0,0.09)" }} />

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

      {/* ── Full-bleed image ─────────────────────────────────────── */}
      <div style={{ position: "relative", height: "clamp(340px, 55vh, 680px)", overflow: "hidden" }}>
        <Image
          src="/Sushi-sailor-marco.jpg"
          alt="Chef Marco Haenni"
          fill
          className="object-cover"
          style={{ objectPosition: "center 30%" }}
          sizes="100vw"
        />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(248,247,245,0.18) 0%, rgba(248,247,245,0) 30%, rgba(248,247,245,0) 70%, rgba(248,247,245,0.22) 100%)" }} />
      </div>

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

      {/* ── Closing — Contact + Footer unified ──────────────────── */}
      <footer style={{ background: "#0C0C0C", color: "#fff" }}>

        {/* Central CTA block */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
            padding: `clamp(5rem, 14vh, 10rem) ${PAD} clamp(4rem, 10vh, 7rem)`,
          }}
        >
          {/* Logo */}
          <Reveal>
            <Image
              src="/Logo-Icon.png"
              alt="Sushi Sailor"
              width={64}
              height={64}
              style={{ objectFit: "contain", filter: "invert(1) hue-rotate(180deg)", marginBottom: "2rem" }}
            />
          </Reveal>

          {/* Brand name */}
          <Reveal delay={0.06}>
            <p
              className="font-manrope font-semibold"
              style={{ fontSize: "10px", letterSpacing: "0.36em", textTransform: "uppercase", color: "rgba(255,255,255,0.4)", marginBottom: "2rem" }}
            >
              S U S H I &nbsp; S A I L O R
            </p>
          </Reveal>

          {/* Heading */}
          <Reveal delay={0.12}>
            <h2
              className="font-playfair"
              style={{
                fontSize: "clamp(2.4rem, 5.5vw, 5rem)",
                letterSpacing: "-0.03em",
                lineHeight: 1.05,
                color: "#fff",
                whiteSpace: "pre-line",
                marginBottom: "2rem",
              }}
            >
              {tx.contactHeading}
            </h2>
          </Reveal>

          {/* Tagline */}
          <Reveal delay={0.18}>
            <p
              className="font-playfair"
              style={{ fontSize: "clamp(1rem, 1.6vw, 1.2rem)", fontStyle: "italic", color: "rgba(255,255,255,0.35)", lineHeight: 1.7, marginBottom: "3.5rem", maxWidth: "38ch" }}
            >
              {l === "en" ? "The sea as inspiration. Your home as the stage." : "Das Meer als Inspiration. Ihr Zuhause als Bühne."}
            </p>
          </Reveal>

          {/* CTA button */}
          <Reveal delay={0.24}>
            <a
              href={`mailto:${tx.footerEmail}`}
              className="inline-block font-manrope font-medium"
              style={{
                fontSize: "10px",
                letterSpacing: "0.24em",
                textTransform: "uppercase",
                padding: "1.1rem 2.8rem",
                border: "1px solid rgba(255,255,255,0.35)",
                color: "#fff",
                textDecoration: "none",
                transition: "background 0.35s, border-color 0.35s",
                marginBottom: "1.5rem",
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.background = "rgba(255,255,255,0.08)";
                el.style.borderColor = "rgba(255,255,255,0.7)";
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.background = "transparent";
                el.style.borderColor = "rgba(255,255,255,0.35)";
              }}
            >
              {tx.contactCta}
            </a>
          </Reveal>

          {/* Email visible */}
          <Reveal delay={0.28}>
            <a
              href={`mailto:${tx.footerEmail}`}
              className="font-manrope"
              style={{ fontSize: "11px", letterSpacing: "0.1em", color: "rgba(255,255,255,0.25)", textDecoration: "none", transition: "color 0.2s" }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.65)"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.25)"; }}
            >
              {tx.footerEmail}
            </a>
          </Reveal>
        </div>

        {/* Bottom bar */}
        <div
          style={{
            borderTop: "1px solid rgba(255,255,255,0.06)",
            padding: `1.25rem ${PAD}`,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "0.5rem",
          }}
        >
          <p className="font-manrope" style={{ fontSize: "10px", letterSpacing: "0.15em", color: "rgba(255,255,255,0.18)" }}>
            {tx.footerCopy}
          </p>
          <Link
            href="/"
            className="font-manrope"
            style={{ fontSize: "10px", letterSpacing: "0.12em", color: "rgba(255,255,255,0.18)", textDecoration: "none", transition: "color 0.2s" }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.5)"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.18)"; }}
          >
            ← Ventum Sailing
          </Link>
        </div>

      </footer>
    </main>
  );
}
