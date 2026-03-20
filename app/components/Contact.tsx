"use client";

import { useState, useRef, FormEvent } from "react";
import { motion, useInView } from "framer-motion";
import { useLang } from "../context/LanguageContext";
import { t } from "../translations";

const ease: [number, number, number, number] = [0.16, 1, 0.3, 1];

export default function Contact() {
  const { lang } = useLang();
  const tr = t[lang].contact;

  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });

  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  const handleSubmit = (e: FormEvent) => { e.preventDefault(); setSubmitted(true); };

  const fieldStyle: React.CSSProperties = {
    width: "100%",
    background: "transparent",
    border: "none",
    borderBottom: "1px solid rgba(255,255,255,0.12)",
    color: "rgba(255,255,255,0.9)",
    padding: "12px 0",
    fontSize: "0.95rem",
    fontWeight: 300,
    outline: "none",
    transition: "border-color 0.3s ease",
    borderRadius: 0,
  };

  const onFocus = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    e.currentTarget.style.borderBottomColor = "#4a7fb5";
  };
  const onBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    e.currentTarget.style.borderBottomColor = "rgba(255,255,255,0.12)";
  };

  return (
    <section id="contact" className="py-16 md:py-24 lg:py-32 px-6 lg:px-14" style={{ background: "#07101e" }}>
      <div className="max-w-6xl mx-auto">

        {/* Header — full width */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
          transition={{ duration: 0.9, ease }}
          className="mb-16"
        >
          <p className="text-[12px] tracking-[0.25em] uppercase mb-4 font-light" style={{ color: "rgba(255,255,255,0.4)" }}>
            {tr.label}
          </p>
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4">
            <h2
              className="font-manrope font-bold leading-tight"
              style={{ fontSize: "clamp(2rem, 4vw, 3.25rem)", color: "#fff" }}
            >
              {tr.title}
            </h2>
            <p className="font-manrope font-light text-base max-w-sm" style={{ color: "rgba(255,255,255,0.55)" }}>
              {tr.subtitle}
            </p>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.4fr] gap-16 lg:gap-24">

          {/* Left — contact details */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
            transition={{ duration: 0.9, delay: 0.1, ease }}
          >
            <div style={{ borderTop: "1px solid rgba(255,255,255,0.1)" }}>
              {[
                { label: tr.emailLabel, value: "info@ventum-sailing.ch", href: "mailto:info@ventum-sailing.ch" },
                { label: tr.phoneLabel, value: tr.phone, href: null },
                { label: tr.baseLabel, value: tr.base, href: null },
              ].map((item, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between py-5"
                  style={{ borderBottom: "1px solid rgba(255,255,255,0.1)" }}
                >
                  <p className="text-[11px] tracking-[0.2em] uppercase font-manrope" style={{ color: "rgba(255,255,255,0.35)" }}>
                    {item.label}
                  </p>
                  {item.href ? (
                    <a
                      href={item.href}
                      className="font-manrope font-light transition-colors duration-200"
                      style={{ color: "rgba(255,255,255,0.65)" }}
                      onMouseEnter={(e) => (e.currentTarget as HTMLElement).style.color = "#4a7fb5"}
                      onMouseLeave={(e) => (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.65)"}
                    >
                      {item.value}
                    </a>
                  ) : (
                    <p className="font-manrope font-light" style={{ color: "rgba(255,255,255,0.65)" }}>
                      {item.value}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right — form */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
            transition={{ duration: 0.9, delay: 0.15, ease }}
          >

            {submitted ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="flex flex-col justify-center min-h-[400px]"
              >
                <div className="w-10 h-[1px] mb-10" style={{ background: "var(--accent)" }} />
                <h3 className="font-manrope font-bold text-2xl mb-4" style={{ color: "#fff" }}>
                  {tr.successTitle}
                </h3>
                <p className="font-manrope font-light leading-relaxed mb-10" style={{ color: "rgba(255,255,255,0.55)" }}>
                  {tr.successText}
                </p>
                <button
                  onClick={() => { setSubmitted(false); setForm({ name: "", email: "", subject: "", message: "" }); }}
                  className="text-[12px] tracking-[0.15em] uppercase font-manrope self-start pb-0.5 transition-colors duration-200"
                  style={{ color: "var(--accent)", borderBottom: "1px solid rgba(0,75,145,0.3)" }}
                  onMouseEnter={(e) => (e.currentTarget as HTMLElement).style.borderBottomColor = "var(--accent)"}
                  onMouseLeave={(e) => (e.currentTarget as HTMLElement).style.borderBottomColor = "rgba(0,75,145,0.3)"}
                >
                  {tr.sendAnother}
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">

                <div className="grid grid-cols-2 gap-6">
                  <input
                    type="text" required
                    placeholder={tr.namePlaceholder}
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    style={fieldStyle} onFocus={onFocus} onBlur={onBlur}
                  />
                  <input
                    type="email" required
                    placeholder={tr.emailPlaceholder}
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    style={fieldStyle} onFocus={onFocus} onBlur={onBlur}
                  />
                </div>

                <select
                  required
                  value={form.subject}
                  onChange={(e) => setForm({ ...form, subject: e.target.value })}
                  style={{ ...fieldStyle, cursor: "pointer", color: form.subject ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.35)", background: "#07101e" }}
                  onFocus={onFocus} onBlur={onBlur}
                >
                  <option value="" disabled>{tr.subjectPlaceholder}</option>
                  {tr.subjects.map((s) => <option key={s} value={s}>{s}</option>)}
                </select>

                <textarea
                  required rows={5}
                  placeholder={tr.messagePlaceholder}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  style={{ ...fieldStyle, resize: "none" }}
                  onFocus={onFocus} onBlur={onBlur}
                />

                <button
                  type="submit"
                  className="w-full text-white py-4 text-[13px] tracking-[0.12em] uppercase font-manrope font-semibold transition-all duration-300"
                  style={{ background: "var(--accent)", boxShadow: "0 4px 20px rgba(0,75,145,0.25)", borderRadius: "8px" }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "var(--accent-hover)"; (e.currentTarget as HTMLElement).style.boxShadow = "0 6px 32px rgba(0,75,145,0.4)"; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "var(--accent)"; (e.currentTarget as HTMLElement).style.boxShadow = "0 4px 20px rgba(0,75,145,0.25)"; }}
                >
                  {tr.submitBtn}
                </button>

              </form>
            )}
          </motion.div>

        </div>
      </div>
    </section>
  );
}
