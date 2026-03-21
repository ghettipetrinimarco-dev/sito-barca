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
    tagline: "Private Omakase at Sea",
    s01num: "01",
    s01heading: "Mastery of Japanese Cuisine —\nRefined at Sea.",
    s01sub: "INFLUENCED BY A PASSION FOR THE OCEAN AND THE PHILOSOPHY OF OMAKASE.",
    s01body:
      "Sushi Sailor is an exclusive combination of freedom and gourmet pleasure. We stand for slow sailing paired with high-quality cuisine on board. As a passionate sushi chef, I transform your time on the water into a private omakase experience.\n\nEnjoy handcrafted sushi at sunset, while the yacht gently anchors in the bay. Every piece is composed around the season, the catch, and the moment — never the same twice.",
    chefLabel: "The Chef",
    chefName: "Marco Haenni",
    s02num: "02",
    s02heading: "The Philosophy of Shibui —\nSimplicity and Complexity.",
    s02sub: "QUIET ELEGANCE. NOTHING ADDED. NOTHING REMOVED.",
    quote:
      "The sea sets the rhythm. The fish tells the story.\nI simply listen — and let the ingredients speak.",
    quoteAttr: "— Marco Haenni, Sushi Sailor",
    s03num: "03",
    s03heading: "Every Detail Reflects a\nDeeply Personal Experience.",
    s03sub: "SUSHI WHEREVER YOU ARE — ON LAND OR AT SEA.",
    s03body:
      "The Sushi Sailor experience comes to you. Private sushi catering for intimate dinners, celebrations, and events — on land or at sea. Each booking is tailored around your occasion, your location, and your preferences.",
    contactHeading: "Step Into the Experience.",
    contactSub:
      "Get in touch to reserve your private omakase — on the water or wherever you choose to gather.",
    emailPlaceholder: "Your email address",
    emailCta: "Get in Touch",
    footer: "© 2025 Ventum Sailing — Sushi Sailor",
    footerContact: "info@ventum-sailing.ch",
  },
  de: {
    back: "Ventum Sailing",
    tagline: "Privates Omakase auf See",
    s01num: "01",
    s01heading: "Meisterschaft der japanischen\nKüche — verfeinert auf See.",
    s01sub: "INSPIRIERT VON DER LEIDENSCHAFT FÜR DAS MEER UND DIE PHILOSOPHIE DES OMAKASE.",
    s01body:
      "Sushi Sailor steht für eine exklusive Kombination aus Freiheit und Gourmet-Genuss. Entschleunigtes Segeln gepaart mit hochwertiger Bordküche. Als leidenschaftlicher Sushi-Koch verwandle ich Ihre Zeit auf dem Wasser in ein privates Omakase-Erlebnis.\n\nGeniessen Sie handgemachtes Sushi bei Sonnenuntergang, während die Yacht sanft in der Bucht vor Anker liegt. Jedes Stück ist auf Saison, Fang und Moment abgestimmt — nie zweimal dasselbe.",
    chefLabel: "Der Chef",
    chefName: "Marco Haenni",
    s02num: "02",
    s02heading: "Die Philosophie des Shibui —\nEinfachheit und Komplexität.",
    s02sub: "STILLE ELEGANZ. NICHTS HINZUGEFÜGT. NICHTS WEGGENOMMEN.",
    quote:
      "Das Meer gibt den Rhythmus vor. Der Fisch erzählt die Geschichte.\nIch höre nur zu — und lasse die Zutaten sprechen.",
    quoteAttr: "— Marco Haenni, Sushi Sailor",
    s03num: "03",
    s03heading: "Jedes Detail spiegelt ein\nzutiefst persönliches Erlebnis.",
    s03sub: "SUSHI WO IMMER SIE SIND — ZU LAND ODER AUF SEE.",
    s03body:
      "Das Sushi Sailor Erlebnis kommt zu Ihnen. Privates Sushi-Catering für intime Abendessen, Feiern und Events — zu Land oder auf See. Jede Buchung wird auf Ihren Anlass, Ihren Ort und Ihre Wünsche abgestimmt.",
    contactHeading: "Treten Sie ein.",
    contactSub:
      "Kontaktieren Sie uns für Ihr privates Omakase — auf dem Wasser oder wo immer Sie möchten.",
    emailPlaceholder: "Ihre E-Mail-Adresse",
    emailCta: "Kontakt aufnehmen",
    footer: "© 2025 Ventum Sailing — Sushi Sailor",
    footerContact: "info@ventum-sailing.ch",
  },
};

/* ── Fade-up reveal ───────────────────────────────────────────────── */
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
  const inView = useInView(ref, { once: true, margin: "-50px" });
  return (
    <motion.div
      ref={ref}
      className={className}
      style={style}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 1.1, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}

/* ── Section number ───────────────────────────────────────────────── */
function SectionNum({ n }: { n: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  return (
    <motion.p
      ref={ref}
      initial={{ opacity: 0 }}
      animate={inView ? { opacity: 1 } : {}}
      transition={{ duration: 1.2 }}
      className="font-manrope select-none"
      style={{
        fontSize: "clamp(5rem, 14vw, 11rem)",
        fontWeight: 300,
        letterSpacing: "-0.04em",
        color: "rgba(0,0,0,0.07)",
        lineHeight: 1,
        marginBottom: "-0.15em",
      }}
    >
      {n}
    </motion.p>
  );
}

/* ── Thin divider ─────────────────────────────────────────────────── */
function Divider({ className }: { className?: string }) {
  return (
    <div
      className={className}
      style={{ height: "1px", background: "rgba(0,0,0,0.1)" }}
    />
  );
}

/* ── Page ─────────────────────────────────────────────────────────── */
export default function SushiSailorPage() {
  const { lang, setLang } = useLang();
  const l = lang === "de" ? "de" : "en";
  const tx = tr[l];

  const galleryImages = [
    "/Sushi-1.webp",
    "/Sushi-2.webp",
    "/Sushi-3.webp",
    "/Sushi-4.webp",
    "/Sushi-sailor-new.jpg",
  ];

  return (
    <main style={{ background: "#F9F8F6", color: "#0A0A0A" }}>

      {/* ── Header ─────────────────────────────────────────────── */}
      <header
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between"
        style={{
          height: "56px",
          padding: "0 clamp(1.5rem, 4vw, 3.5rem)",
          background: "rgba(249,248,246,0.9)",
          backdropFilter: "blur(14px)",
          borderBottom: "1px solid rgba(0,0,0,0.07)",
        }}
      >
        <Link
          href="/"
          className="font-manrope"
          style={{
            fontSize: "10px",
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            color: "#888",
            textDecoration: "none",
          }}
        >
          ← {tx.back}
        </Link>

        <p
          className="font-playfair absolute left-1/2 -translate-x-1/2"
          style={{ fontSize: "14px", letterSpacing: "0.04em", color: "#0A0A0A" }}
        >
          Sushi Sailor
        </p>

        <button
          onClick={() => setLang(l === "en" ? "de" : "en")}
          className="font-manrope"
          style={{
            fontSize: "10px",
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            color: "#888",
            background: "none",
            border: "none",
            cursor: "pointer",
          }}
        >
          {l === "en" ? "DE" : "EN"}
        </button>
      </header>

      {/* ── Hero ───────────────────────────────────────────────── */}
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
          style={{
            background:
              "linear-gradient(to top, rgba(5,5,5,0.78) 0%, rgba(5,5,5,0.18) 55%, rgba(5,5,5,0.08) 100%)",
          }}
        />

        {/* Brand top */}
        <motion.div
          className="absolute top-0 left-0 right-0 flex items-center justify-center"
          style={{ paddingTop: "88px" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.6, delay: 0.3 }}
        >
          <p
            className="font-manrope"
            style={{
              fontSize: "9px",
              letterSpacing: "0.35em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.4)",
            }}
          >
            Ventum × Sushi Sailor
          </p>
        </motion.div>

        {/* Tagline */}
        <div
          className="absolute bottom-0 left-0 right-0"
          style={{ padding: "0 clamp(1.5rem, 4vw, 3.5rem)", paddingBottom: "clamp(3rem, 9vh, 6rem)" }}
        >
          <motion.h1
            className="font-playfair text-white"
            style={{
              fontSize: "clamp(2.4rem, 6.5vw, 5.5rem)",
              letterSpacing: "-0.025em",
              lineHeight: 1.06,
              maxWidth: "14ch",
            }}
            initial={{ opacity: 0, y: 36 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.3, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            {tx.tagline}
          </motion.h1>

          <motion.div
            className="font-manrope"
            style={{
              fontSize: "10px",
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.35)",
              marginTop: "1.5rem",
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2, delay: 0.9 }}
          >
            Scroll
          </motion.div>
        </div>
      </section>

      {/* ── Section 01 ─────────────────────────────────────────── */}
      <section style={{ padding: "clamp(5rem, 12vh, 9rem) clamp(1.5rem, 4vw, 3.5rem) clamp(4rem, 10vh, 7rem)" }}>
        <SectionNum n={tx.s01num} />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          {/* Left: text */}
          <div>
            <Reveal>
              <h2
                className="font-manrope font-bold"
                style={{
                  fontSize: "clamp(1.6rem, 3.2vw, 2.8rem)",
                  letterSpacing: "-0.02em",
                  lineHeight: 1.1,
                  textTransform: "uppercase",
                  marginBottom: "2rem",
                  whiteSpace: "pre-line",
                }}
              >
                {tx.s01heading}
              </h2>
            </Reveal>

            <Reveal delay={0.08}>
              <p
                className="font-manrope"
                style={{
                  fontSize: "10px",
                  letterSpacing: "0.22em",
                  textTransform: "uppercase",
                  color: "#999",
                  marginBottom: "2.5rem",
                  lineHeight: 1.8,
                }}
              >
                {tx.s01sub}
              </p>
            </Reveal>

            <Reveal delay={0.14}>
              <p
                className="font-manrope"
                style={{
                  fontSize: "1.05rem",
                  lineHeight: 1.9,
                  color: "#444",
                  whiteSpace: "pre-line",
                  maxWidth: "44ch",
                }}
              >
                {tx.s01body}
              </p>
            </Reveal>
          </div>

          {/* Right: chef image */}
          <Reveal delay={0.1} style={{ position: "relative", aspectRatio: "3/4" } as React.CSSProperties}>
            <Image
              src="/Sushi-sailor-marco.jpg"
              alt={tx.chefName}
              fill
              className="object-cover"
              sizes="(min-width: 1024px) 50vw, 100vw"
            />
            <div
              style={{
                position: "absolute",
                bottom: 0,
                left: 0,
                right: 0,
                padding: "2.5rem 2rem 2rem",
                background: "linear-gradient(to top, rgba(5,5,5,0.65) 0%, transparent 100%)",
              }}
            >
              <p
                className="font-manrope"
                style={{ fontSize: "9px", letterSpacing: "0.28em", textTransform: "uppercase", color: "rgba(255,255,255,0.5)", marginBottom: "0.4rem" }}
              >
                {tx.chefLabel}
              </p>
              <p
                className="font-playfair text-white"
                style={{ fontSize: "1.5rem", letterSpacing: "-0.01em" }}
              >
                {tx.chefName}
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <Divider className="mx-6 md:mx-14" />

      {/* ── Section 02 ─────────────────────────────────────────── */}
      <section style={{ padding: "clamp(5rem, 12vh, 9rem) clamp(1.5rem, 4vw, 3.5rem) 0" }}>
        <SectionNum n={tx.s02num} />

        <Reveal>
          <h2
            className="font-manrope font-bold"
            style={{
              fontSize: "clamp(1.6rem, 3.2vw, 2.8rem)",
              letterSpacing: "-0.02em",
              lineHeight: 1.1,
              textTransform: "uppercase",
              marginBottom: "1.5rem",
              whiteSpace: "pre-line",
              maxWidth: "22ch",
            }}
          >
            {tx.s02heading}
          </h2>
        </Reveal>

        <Reveal delay={0.08}>
          <p
            className="font-manrope"
            style={{
              fontSize: "10px",
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              color: "#999",
              marginBottom: "4rem",
            }}
          >
            {tx.s02sub}
          </p>
        </Reveal>
      </section>

      {/* Carousel — horizontal scroll */}
      <div
        className="flex overflow-x-auto gap-3"
        style={{
          scrollSnapType: "x mandatory",
          paddingLeft: "clamp(1.5rem, 4vw, 3.5rem)",
          paddingRight: "clamp(1.5rem, 4vw, 3.5rem)",
          paddingBottom: "0",
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
      >
        {galleryImages.map((src, i) => (
          <div
            key={i}
            className="flex-shrink-0 relative overflow-hidden"
            style={{
              width: "clamp(260px, 36vw, 480px)",
              aspectRatio: "3/4",
              scrollSnapAlign: "start",
            }}
          >
            <Image
              src={src}
              alt={`Sushi Sailor ${i + 1}`}
              fill
              className="object-cover"
              sizes="36vw"
            />
          </div>
        ))}
      </div>

      {/* Pullquote */}
      <div
        style={{
          padding: "clamp(5rem, 13vh, 10rem) clamp(1.5rem, 6vw, 8rem)",
          textAlign: "center",
        }}
      >
        <Reveal>
          <blockquote
            className="font-playfair"
            style={{
              fontSize: "clamp(1.35rem, 2.8vw, 2.2rem)",
              fontStyle: "italic",
              lineHeight: 1.55,
              color: "#1C1C1C",
              whiteSpace: "pre-line",
              maxWidth: "30ch",
              margin: "0 auto 2rem",
            }}
          >
            {`"${tx.quote}"`}
          </blockquote>
          <p
            className="font-manrope"
            style={{
              fontSize: "10px",
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              color: "#AAA",
            }}
          >
            {tx.quoteAttr}
          </p>
        </Reveal>
      </div>

      <Divider className="mx-6 md:mx-14" />

      {/* ── Section 03 ─────────────────────────────────────────── */}
      <section style={{ padding: "clamp(5rem, 12vh, 9rem) clamp(1.5rem, 4vw, 3.5rem) clamp(5rem, 12vh, 9rem)" }}>
        <SectionNum n={tx.s03num} />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <div>
            <Reveal>
              <h2
                className="font-manrope font-bold"
                style={{
                  fontSize: "clamp(1.6rem, 3.2vw, 2.8rem)",
                  letterSpacing: "-0.02em",
                  lineHeight: 1.1,
                  textTransform: "uppercase",
                  marginBottom: "1.5rem",
                  whiteSpace: "pre-line",
                }}
              >
                {tx.s03heading}
              </h2>
            </Reveal>
            <Reveal delay={0.08}>
              <p
                className="font-manrope"
                style={{
                  fontSize: "10px",
                  letterSpacing: "0.22em",
                  textTransform: "uppercase",
                  color: "#999",
                  marginBottom: "2.5rem",
                  lineHeight: 1.8,
                }}
              >
                {tx.s03sub}
              </p>
            </Reveal>
            <Reveal delay={0.14}>
              <p
                className="font-manrope"
                style={{
                  fontSize: "1.05rem",
                  lineHeight: 1.9,
                  color: "#444",
                  maxWidth: "44ch",
                }}
              >
                {tx.s03body}
              </p>
            </Reveal>
          </div>

          {/* Service cards */}
          <div className="flex flex-col gap-px" style={{ borderTop: "1px solid rgba(0,0,0,0.1)" }}>
            {[
              { icon: "⚓", label: l === "en" ? "Private Charter Omakase" : "Privates Charter-Omakase" },
              { icon: "🍱", label: l === "en" ? "Sushi Catering — Events" : "Sushi-Catering — Events" },
              { icon: "🌅", label: l === "en" ? "Sunset Experience at Anchor" : "Sonnenuntergang vor Anker" },
              { icon: "🏠", label: l === "en" ? "Private Dining at Home" : "Privates Dinner bei Ihnen" },
            ].map((item, i) => (
              <Reveal key={i} delay={i * 0.06}>
                <div
                  style={{
                    padding: "1.6rem 0",
                    borderBottom: "1px solid rgba(0,0,0,0.1)",
                    display: "flex",
                    alignItems: "center",
                    gap: "1.5rem",
                  }}
                >
                  <span style={{ fontSize: "1.1rem" }}>{item.icon}</span>
                  <p
                    className="font-manrope font-medium"
                    style={{ fontSize: "10px", letterSpacing: "0.18em", textTransform: "uppercase", color: "#333" }}
                  >
                    {item.label}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <Divider className="mx-6 md:mx-14" />

      {/* ── Contact ────────────────────────────────────────────── */}
      <section
        style={{
          padding: "clamp(5rem, 14vh, 11rem) clamp(1.5rem, 4vw, 3.5rem) clamp(5rem, 14vh, 11rem)",
          textAlign: "center",
        }}
      >
        <Reveal>
          <h2
            className="font-manrope font-bold"
            style={{
              fontSize: "clamp(1.8rem, 4vw, 3.5rem)",
              letterSpacing: "-0.02em",
              lineHeight: 1.08,
              textTransform: "uppercase",
              marginBottom: "1.5rem",
            }}
          >
            {tx.contactHeading}
          </h2>
        </Reveal>

        <Reveal delay={0.1}>
          <p
            className="font-manrope"
            style={{
              fontSize: "1rem",
              lineHeight: 1.8,
              color: "#666",
              maxWidth: "44ch",
              margin: "0 auto 3rem",
            }}
          >
            {tx.contactSub}
          </p>
        </Reveal>

        <Reveal delay={0.18}>
          <a
            href={`mailto:${tx.footerContact}`}
            className="inline-block font-manrope font-medium"
            style={{
              fontSize: "10px",
              letterSpacing: "0.24em",
              textTransform: "uppercase",
              padding: "1.1rem 2.8rem",
              border: "1px solid #0A0A0A",
              color: "#0A0A0A",
              textDecoration: "none",
              transition: "all 0.4s ease",
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget as HTMLElement;
              el.style.background = "#0A0A0A";
              el.style.color = "#F9F8F6";
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget as HTMLElement;
              el.style.background = "transparent";
              el.style.color = "#0A0A0A";
            }}
          >
            {tx.emailCta}
          </a>
        </Reveal>
      </section>

      {/* ── Footer ─────────────────────────────────────────────── */}
      <footer
        style={{
          borderTop: "1px solid rgba(0,0,0,0.08)",
          padding: "2.5rem clamp(1.5rem, 4vw, 3.5rem)",
          display: "flex",
          flexWrap: "wrap",
          gap: "1rem",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <p
          className="font-manrope"
          style={{ fontSize: "10px", letterSpacing: "0.15em", color: "#BBB" }}
        >
          {tx.footer}
        </p>
        <a
          href={`mailto:${tx.footerContact}`}
          className="font-manrope"
          style={{ fontSize: "10px", letterSpacing: "0.15em", color: "#BBB", textDecoration: "none" }}
        >
          {tx.footerContact}
        </a>
      </footer>
    </main>
  );
}
