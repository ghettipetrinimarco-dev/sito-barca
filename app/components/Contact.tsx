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

  const inputStyle: React.CSSProperties = {
    width: "100%",
    background: "var(--bg)",
    border: "1px solid var(--border)",
    color: "var(--text)",
    padding: "13px 16px",
    fontSize: "0.875rem",
    fontWeight: 300,
    outline: "none",
    transition: "border-color 0.3s ease, background 0.3s ease",
    borderRadius: "1px",
  };

  const onFocus = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    e.currentTarget.style.borderColor = "var(--accent-light)";
    e.currentTarget.style.background = "#fff";
  };
  const onBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    e.currentTarget.style.borderColor = "var(--border)";
    e.currentTarget.style.background = "var(--bg)";
  };

  return (
    <section id="contact" className="py-32 px-6 lg:px-14" style={{ background: "var(--bg)" }}>
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          {/* Left */}
          <motion.div
            ref={ref}
            initial={{ opacity: 0, x: -28 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -28 }}
            transition={{ duration: 0.95, ease }}
          >
            <p className="text-[10px] tracking-[0.45em] uppercase mb-4 font-light" style={{ color: "var(--accent-light)" }}>
              {tr.label}
            </p>
            <h2
              className="font-manrope font-bold tracking-tight mb-6"
              style={{ fontSize: "clamp(2rem, 4vw, 3.25rem)", color: "var(--text)" }}
            >
              {tr.title}
            </h2>
            <span className="accent-line mb-8" />
            <p className="font-playfair italic text-2xl font-light mt-8 mb-12" style={{ color: "var(--text-secondary)" }}>
              {tr.subtitle}
            </p>

            <div className="space-y-6">
              {[
                {
                  icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />,
                  label: tr.emailLabel, value: "info@ventum-sailing.ch",
                },
                {
                  icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />,
                  label: tr.websiteLabel, value: "ventum-sailing.ch",
                },
                {
                  icon: <><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></>,
                  label: tr.baseLabel, value: tr.base,
                },
                {
                  icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />,
                  label: tr.phoneLabel, value: tr.phone,
                },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-4">
                  <div className="w-9 h-9 flex items-center justify-center flex-shrink-0 mt-0.5" style={{ border: "1px solid var(--border)", background: "var(--surface)", borderRadius: "1px" }}>
                    <svg className="w-4 h-4" style={{ color: "var(--accent)" }} fill="none" stroke="currentColor" viewBox="0 0 24 24">{item.icon}</svg>
                  </div>
                  <div>
                    <p className="text-[10px] tracking-[0.2em] uppercase mb-1" style={{ color: "var(--text-muted)" }}>{item.label}</p>
                    <p className="text-sm font-light" style={{ color: "var(--text-secondary)" }}>{item.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: 28 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 28 }}
            transition={{ duration: 0.95, delay: 0.2, ease }}
          >
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="flex flex-col items-center justify-center min-h-[400px] text-center p-12"
                style={{ border: "1px solid var(--border)", background: "var(--surface)" }}
              >
                <div className="w-14 h-14 rounded-full flex items-center justify-center mb-6" style={{ border: "2px solid var(--accent)", background: "#eef4fb" }}>
                  <svg className="w-6 h-6" style={{ color: "var(--accent)" }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="font-manrope font-semibold text-xl mb-3" style={{ color: "var(--text)" }}>{tr.successTitle}</h3>
                <p className="text-sm font-light max-w-xs leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                  {tr.successText}
                </p>
                <button
                  onClick={() => { setSubmitted(false); setForm({ name: "", email: "", subject: "", message: "" }); }}
                  className="mt-8 text-[10px] tracking-[0.22em] uppercase pb-0.5 transition-colors duration-200"
                  style={{ color: "var(--accent)", borderBottom: "1px solid rgba(0,75,145,0.3)" }}
                  onMouseEnter={(e) => (e.currentTarget as HTMLElement).style.borderBottomColor = "var(--accent)"}
                  onMouseLeave={(e) => (e.currentTarget as HTMLElement).style.borderBottomColor = "rgba(0,75,145,0.3)"}
                >
                  {tr.sendAnother}
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] tracking-[0.22em] uppercase mb-2 font-medium" style={{ color: "var(--text-secondary)" }}>{tr.nameLabel}</label>
                    <input type="text" required placeholder={tr.namePlaceholder} value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} style={inputStyle} onFocus={onFocus} onBlur={onBlur} />
                  </div>
                  <div>
                    <label className="block text-[10px] tracking-[0.22em] uppercase mb-2 font-medium" style={{ color: "var(--text-secondary)" }}>{tr.emailFieldLabel}</label>
                    <input type="email" required placeholder={tr.emailPlaceholder} value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} style={inputStyle} onFocus={onFocus} onBlur={onBlur} />
                  </div>
                </div>
                <div>
                  <label className="block text-[10px] tracking-[0.22em] uppercase mb-2 font-medium" style={{ color: "var(--text-secondary)" }}>{tr.subjectLabel}</label>
                  <select required value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })} style={{ ...inputStyle, cursor: "pointer" }} onFocus={onFocus} onBlur={onBlur}>
                    <option value="" disabled>{tr.subjectPlaceholder}</option>
                    {tr.subjects.map((s) => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-[10px] tracking-[0.22em] uppercase mb-2 font-medium" style={{ color: "var(--text-secondary)" }}>{tr.messageLabel}</label>
                  <textarea required rows={6} placeholder={tr.messagePlaceholder} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} style={{ ...inputStyle, resize: "none" }} onFocus={onFocus} onBlur={onBlur} />
                </div>
                <button
                  type="submit"
                  className="w-full text-white py-4 text-[11px] tracking-[0.22em] uppercase font-manrope font-semibold transition-all duration-300 mt-2"
                  style={{ background: "var(--accent)", boxShadow: "0 4px 16px rgba(0,75,145,0.2)" }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "var(--accent-hover)"; (e.currentTarget as HTMLElement).style.boxShadow = "0 6px 28px rgba(0,75,145,0.35)"; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "var(--accent)"; (e.currentTarget as HTMLElement).style.boxShadow = "0 4px 16px rgba(0,75,145,0.2)"; }}
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
