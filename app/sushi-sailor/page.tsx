"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { useLang } from "../context/LanguageContext";

/* ── Translations (EN / DE only) ─────────────────────────────────── */
const tr = {
  en: {
    back: "← Ventum Sailing",
    langToggle: "DE",
    eyebrow: "Ventum × Sushi Sailor",
    tagline: "Private Omakase\nat Sea",
    intro:
      "Experience an exclusive combination of freedom and gourmet pleasure. Sushi Sailor stands for slow sailing paired with high-quality cuisine on board. As a passionate sushi chef, I transform your time on the water into a private omakase experience. Enjoy handcrafted sushi at sunset, while the yacht gently anchors in the bay.",
    chefEyebrow: "The Chef",
    chefName: "Marco Haenni",
    chefBio:
      "Trained in the art of traditional Japanese sushi, Marco brings the philosophy of omakase to the open sea. Each experience is crafted around the season, the catch, and the moment — never the same twice.",
    galleryEyebrow: "The Experience",
    serviceEyebrow: "Beyond the Water",
    serviceTitle: "Sushi Wherever You Are",
    serviceText:
      "The Sushi Sailor experience comes to you. Private sushi catering for intimate dinners, celebrations, and events — on land or at sea.",
    contactTitle: "Reserve Your\nExperience",
    contactText:
      "Each booking is personal. Get in touch to discuss your date, location, and preferences.",
    contactCta: "Get in Touch",
    footer: "© 2025 Ventum Sailing — Sushi Sailor",
  },
  de: {
    back: "← Ventum Sailing",
    langToggle: "EN",
    eyebrow: "Ventum × Sushi Sailor",
    tagline: "Privates Omakase\nauf See",
    intro:
      "Erleben Sie eine exklusive Kombination aus Freiheit und Gourmet-Genuss. Sushi Sailor steht für entschleunigtes Segeln gepaart mit hochwertiger Bordküche. Als leidenschaftlicher Sushi-Koch verwandle ich Ihre Zeit auf dem Wasser in ein privates Omakase Erlebnis. Geniessen Sie handgemachtes Sushi bei Sonnenuntergang, während die Yacht sanft in der Bucht vor Anker liegt.",
    chefEyebrow: "Der Chef",
    chefName: "Marco Haenni",
    chefBio:
      "Mit einer Leidenschaft für die traditionelle japanische Sushi-Kunst bringt Marco die Philosophie des Omakase auf die offene See. Jedes Erlebnis wird nach Saison, Fang und Moment gestaltet — nie zweimal dasselbe.",
    galleryEyebrow: "Das Erlebnis",
    serviceEyebrow: "Über das Wasser hinaus",
    serviceTitle: "Sushi wo immer Sie sind",
    serviceText:
      "Das Sushi Sailor Erlebnis kommt zu Ihnen. Privates Sushi-Catering für intime Abendessen, Feiern und Events — zu Land oder auf See.",
    contactTitle: "Reservieren Sie\nIhr Erlebnis",
    contactText:
      "Jede Buchung ist persönlich. Kontaktieren Sie uns für Datum, Ort und Ihre Wünsche.",
    contactCta: "Kontakt aufnehmen",
    footer: "© 2025 Ventum Sailing — Sushi Sailor",
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
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 1.0, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}

/* ── Eyebrow label ────────────────────────────────────────────────── */
function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p
      className="font-manrope font-medium"
      style={{
        fontSize: "10px",
        letterSpacing: "0.28em",
        textTransform: "uppercase",
        color: "#999",
        marginBottom: "1.5rem",
      }}
    >
      {children}
    </p>
  );
}

/* ── Main page ────────────────────────────────────────────────────── */
export default function SushiSailorPage() {
  const { lang, setLang } = useLang();
  const l = lang === "de" ? "de" : "en";
  const tx = tr[l];

  return (
    <main
      className="font-sans"
      style={{ background: "#F9F8F6", color: "#0A0A0A", minHeight: "100vh" }}
    >
      {/* ── Header ───────────────────────────────────────────────── */}
      <header
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-12"
        style={{
          height: "60px",
          background: "rgba(249,248,246,0.88)",
          backdropFilter: "blur(12px)",
          borderBottom: "1px solid rgba(0,0,0,0.06)",
        }}
      >
        <Link
          href="/"
          className="font-manrope font-medium"
          style={{ fontSize: "11px", letterSpacing: "0.15em", color: "#888", textDecoration: "none" }}
        >
          {tx.back}
        </Link>

        <p
          className="font-playfair absolute left-1/2 -translate-x-1/2"
          style={{ fontSize: "15px", letterSpacing: "0.05em", color: "#0A0A0A" }}
        >
          Sushi Sailor
        </p>

        <button
          onClick={() => setLang(l === "en" ? "de" : "en")}
          className="font-manrope font-medium"
          style={{ fontSize: "11px", letterSpacing: "0.2em", color: "#888" }}
        >
          {tx.langToggle}
        </button>
      </header>

      {/* ── Hero ─────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden" style={{ height: "100svh" }}>
        <Image
          src="/Sushi-sailor-new.jpg"
          alt="Sushi Sailor"
          fill
          className="object-cover"
          priority
          sizes="100vw"
          style={{ objectPosition: "center 40%" }}
        />
        {/* Dark overlay */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to top, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0.18) 55%, rgba(0,0,0,0.08) 100%)",
          }}
        />

        {/* Eyebrow top */}
        <div className="absolute top-0 left-0 right-0 flex justify-center" style={{ paddingTop: "80px" }}>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.4, delay: 0.2 }}
            className="font-manrope font-medium"
            style={{ fontSize: "10px", letterSpacing: "0.3em", textTransform: "uppercase", color: "rgba(255,255,255,0.45)" }}
          >
            {tx.eyebrow}
          </motion.p>
        </div>

        {/* Tagline bottom */}
        <div className="absolute bottom-0 left-0 right-0 px-8 md:px-16" style={{ paddingBottom: "clamp(3rem, 8vh, 6rem)" }}>
          <motion.h1
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="font-playfair text-white"
            style={{
              fontSize: "clamp(2.8rem, 7vw, 6rem)",
              letterSpacing: "-0.02em",
              lineHeight: 1.05,
              whiteSpace: "pre-line",
            }}
          >
            {tx.tagline}
          </motion.h1>
        </div>
      </section>

      {/* ── Intro ────────────────────────────────────────────────── */}
      <section
        className="px-8 md:px-16 lg:px-40"
        style={{ paddingTop: "clamp(5rem, 12vh, 9rem)", paddingBottom: "clamp(5rem, 12vh, 9rem)" }}
      >
        <div className="max-w-2xl">
          <Reveal>
            <p
              className="font-playfair"
              style={{
                fontSize: "clamp(1.25rem, 2.2vw, 1.65rem)",
                lineHeight: 1.65,
                color: "#1C1C1C",
              }}
            >
              {tx.intro}
            </p>
          </Reveal>
        </div>
      </section>

      {/* ── Divider ──────────────────────────────────────────────── */}
      <div className="mx-8 md:mx-16 lg:mx-40" style={{ height: "1px", background: "rgba(0,0,0,0.1)" }} />

      {/* ── Chef ─────────────────────────────────────────────────── */}
      <section
        className="grid grid-cols-1 lg:grid-cols-2"
        style={{ paddingTop: "clamp(4rem, 10vh, 8rem)", paddingBottom: "clamp(4rem, 10vh, 8rem)" }}
      >
        {/* Image */}
        <Reveal className="relative mx-8 md:mx-16 lg:mx-0 lg:ml-40" style={{ aspectRatio: "3/4", minHeight: "420px" } as React.CSSProperties}>
          <Image
            src="/Sushi-sailor-marco.jpg"
            alt="Chef Marco Haenni"
            fill
            className="object-cover"
            sizes="(min-width: 1024px) 50vw, 100vw"
          />
        </Reveal>

        {/* Text */}
        <div
          className="flex flex-col justify-center px-8 md:px-16 lg:px-20"
          style={{ paddingTop: "3rem" }}
        >
          <Reveal delay={0.1}>
            <Eyebrow>{tx.chefEyebrow}</Eyebrow>
            <h2
              className="font-playfair"
              style={{
                fontSize: "clamp(2rem, 4vw, 3.5rem)",
                letterSpacing: "-0.02em",
                marginBottom: "1.75rem",
                lineHeight: 1.1,
              }}
            >
              {tx.chefName}
            </h2>
            <p
              className="font-manrope"
              style={{
                fontSize: "1.05rem",
                lineHeight: 1.8,
                color: "#555",
                maxWidth: "36ch",
              }}
            >
              {tx.chefBio}
            </p>
          </Reveal>
        </div>
      </section>

      {/* ── Gallery ──────────────────────────────────────────────── */}
      <section>
        <div className="px-8 md:px-16 lg:px-40 mb-8">
          <Reveal>
            <Eyebrow>{tx.galleryEyebrow}</Eyebrow>
          </Reveal>
        </div>

        {/* 2-col grid */}
        <div className="grid grid-cols-1 md:grid-cols-2">
          {["/Sushi-1.webp", "/Sushi-2.webp", "/Sushi-3.webp", "/Sushi-4.webp"].map((src, i) => (
            <motion.div
              key={i}
              className="relative overflow-hidden"
              style={{ aspectRatio: "4/3" }}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.8, delay: (i % 2) * 0.15 }}
            >
              <Image
                src={src}
                alt={`Sushi ${i + 1}`}
                fill
                className="object-cover transition-transform duration-700 hover:scale-[1.03]"
                sizes="(min-width: 768px) 50vw, 100vw"
              />
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── Service ──────────────────────────────────────────────── */}
      <section
        className="px-8 md:px-16 lg:px-40"
        style={{ paddingTop: "clamp(5rem, 12vh, 9rem)", paddingBottom: "clamp(5rem, 12vh, 9rem)" }}
      >
        <Reveal>
          <Eyebrow>{tx.serviceEyebrow}</Eyebrow>
        </Reveal>
        <Reveal delay={0.08}>
          <h2
            className="font-playfair"
            style={{
              fontSize: "clamp(2rem, 4.5vw, 4rem)",
              letterSpacing: "-0.02em",
              lineHeight: 1.1,
              marginBottom: "2rem",
              maxWidth: "16ch",
            }}
          >
            {tx.serviceTitle}
          </h2>
        </Reveal>
        <Reveal delay={0.16}>
          <p
            className="font-manrope"
            style={{ fontSize: "1.1rem", lineHeight: 1.8, color: "#555", maxWidth: "44ch" }}
          >
            {tx.serviceText}
          </p>
        </Reveal>
      </section>

      {/* ── Divider ──────────────────────────────────────────────── */}
      <div className="mx-8 md:mx-16 lg:mx-40" style={{ height: "1px", background: "rgba(0,0,0,0.1)" }} />

      {/* ── Contact ──────────────────────────────────────────────── */}
      <section
        className="px-8 md:px-16 lg:px-40"
        style={{ paddingTop: "clamp(5rem, 12vh, 9rem)", paddingBottom: "clamp(5rem, 14vh, 10rem)" }}
      >
        <Reveal>
          <h2
            className="font-playfair"
            style={{
              fontSize: "clamp(2.2rem, 5vw, 4.5rem)",
              letterSpacing: "-0.02em",
              lineHeight: 1.05,
              marginBottom: "1.5rem",
              whiteSpace: "pre-line",
            }}
          >
            {tx.contactTitle}
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p
            className="font-manrope"
            style={{ fontSize: "1.05rem", lineHeight: 1.8, color: "#666", maxWidth: "42ch", marginBottom: "3rem" }}
          >
            {tx.contactText}
          </p>
        </Reveal>
        <Reveal delay={0.2}>
          <a
            href="mailto:info@ventum-sailing.ch"
            className="inline-block font-manrope font-medium"
            style={{
              fontSize: "11px",
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              padding: "1rem 2.5rem",
              border: "1px solid #0A0A0A",
              color: "#0A0A0A",
              textDecoration: "none",
              transition: "all 0.35s ease",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.background = "#0A0A0A";
              (e.currentTarget as HTMLElement).style.color = "#F9F8F6";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.background = "transparent";
              (e.currentTarget as HTMLElement).style.color = "#0A0A0A";
            }}
          >
            {tx.contactCta}
          </a>
        </Reveal>
      </section>

      {/* ── Footer ───────────────────────────────────────────────── */}
      <footer
        className="px-8 md:px-16 lg:px-40 py-8"
        style={{ borderTop: "1px solid rgba(0,0,0,0.08)" }}
      >
        <p
          className="font-manrope"
          style={{ fontSize: "11px", letterSpacing: "0.12em", color: "#AAA" }}
        >
          {tx.footer}
        </p>
      </footer>
    </main>
  );
}
