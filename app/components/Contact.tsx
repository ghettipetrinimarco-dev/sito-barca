"use client";

import { useState, useRef, FormEvent } from "react";
import { motion, useInView } from "framer-motion";

const easeOut = [0.16, 1, 0.3, 1];

const subjects = [
  "Holiday Cruise",
  "Mileage Cruise",
  "Harbor Maneuver Course",
  "Wingfoil Course",
  "Survey / Inspection",
  "Sushi Sailor",
  "Other",
];

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });

  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const inputStyle = {
    width: "100%",
    background: "rgba(255,255,255,0.025)",
    border: "1px solid rgba(255,255,255,0.09)",
    color: "#fff",
    padding: "14px 16px",
    fontSize: "0.875rem",
    fontWeight: "300",
    outline: "none",
    transition: "border-color 0.3s ease, background 0.3s ease",
  };

  const inputFocus = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    e.currentTarget.style.borderColor = "rgba(0,104,198,0.55)";
    e.currentTarget.style.background = "rgba(255,255,255,0.048)";
  };
  const inputBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    e.currentTarget.style.borderColor = "rgba(255,255,255,0.09)";
    e.currentTarget.style.background = "rgba(255,255,255,0.025)";
  };

  return (
    <section id="contact" className="py-32 px-6 lg:px-14 relative overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse 80% 40% at 50% 100%, rgba(0,104,198,0.05) 0%, transparent 70%)",
        }}
      />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          {/* Left */}
          <motion.div
            ref={ref}
            initial={{ opacity: 0, x: -28 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -28 }}
            transition={{ duration: 0.95, ease: easeOut }}
          >
            <p className="text-[10px] tracking-[0.45em] uppercase mb-4 font-light" style={{ color: "var(--accent-light)" }}>
              Get in touch
            </p>
            <h2
              className="font-manrope font-bold text-white tracking-tight mb-6"
              style={{ fontSize: "clamp(2rem, 4vw, 3.25rem)" }}
            >
              CONTACT
            </h2>
            <span className="accent-line mb-8" />

            <p className="font-playfair italic text-2xl font-light mt-8 mb-12" style={{ color: "rgba(255,255,255,0.4)" }}>
              Ready to set sail?
            </p>

            <div className="space-y-6">
              {[
                {
                  icon: (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  ),
                  label: "Email",
                  value: "info@ventum-sailing.ch",
                },
                {
                  icon: (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                  ),
                  label: "Website",
                  value: "ventum-sailing.ch",
                },
                {
                  icon: (
                    <>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </>
                  ),
                  label: "Base",
                  value: "Mediterranean Sea",
                },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-4">
                  <div
                    className="w-8 h-8 flex items-center justify-center flex-shrink-0 mt-0.5"
                    style={{ border: "1px solid rgba(255,255,255,0.09)" }}
                  >
                    <svg className="w-3.5 h-3.5" style={{ color: "var(--accent-light)" }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      {item.icon}
                    </svg>
                  </div>
                  <div>
                    <p className="text-[10px] tracking-[0.22em] uppercase mb-1" style={{ color: "rgba(255,255,255,0.28)" }}>
                      {item.label}
                    </p>
                    <p className="text-sm font-light" style={{ color: "rgba(255,255,255,0.55)" }}>
                      {item.value}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right: Form */}
          <motion.div
            initial={{ opacity: 0, x: 28 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 28 }}
            transition={{ duration: 0.95, delay: 0.2, ease: easeOut }}
          >
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="flex flex-col items-center justify-center min-h-[400px] text-center p-12"
                style={{ border: "1px solid rgba(255,255,255,0.07)", background: "rgba(255,255,255,0.02)" }}
              >
                <div
                  className="w-14 h-14 rounded-full flex items-center justify-center mb-6"
                  style={{ border: "1px solid rgba(0,104,198,0.5)" }}
                >
                  <svg className="w-6 h-6" style={{ color: "var(--accent-light)" }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="font-manrope font-semibold text-white text-xl mb-3">Thank you</h3>
                <p className="text-sm font-light max-w-xs leading-relaxed" style={{ color: "rgba(255,255,255,0.38)" }}>
                  Your message has been received. We will get back to you as soon as possible.
                </p>
                <button
                  onClick={() => { setSubmitted(false); setForm({ name: "", email: "", subject: "", message: "" }); }}
                  className="mt-8 text-[10px] tracking-[0.22em] uppercase pb-0.5 transition-colors duration-200"
                  style={{ color: "var(--accent-light)", borderBottom: "1px solid rgba(0,104,198,0.3)" }}
                  onMouseEnter={(e) => (e.currentTarget as HTMLElement).style.color = "#fff"}
                  onMouseLeave={(e) => (e.currentTarget as HTMLElement).style.color = "var(--accent-light)"}
                >
                  Send another message
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] tracking-[0.22em] uppercase mb-2" style={{ color: "rgba(255,255,255,0.28)" }}>
                      Name
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Your name"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      style={{ ...inputStyle, placeholderColor: "rgba(255,255,255,0.2)" }}
                      onFocus={inputFocus}
                      onBlur={inputBlur}
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] tracking-[0.22em] uppercase mb-2" style={{ color: "rgba(255,255,255,0.28)" }}>
                      Email
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="your@email.com"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      style={inputStyle}
                      onFocus={inputFocus}
                      onBlur={inputBlur}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] tracking-[0.22em] uppercase mb-2" style={{ color: "rgba(255,255,255,0.28)" }}>
                    Subject
                  </label>
                  <select
                    required
                    value={form.subject}
                    onChange={(e) => setForm({ ...form, subject: e.target.value })}
                    style={{ ...inputStyle, cursor: "pointer", colorScheme: "dark" }}
                    onFocus={inputFocus}
                    onBlur={inputBlur}
                  >
                    <option value="" disabled>Select a subject</option>
                    {subjects.map((s) => (
                      <option key={s} value={s} style={{ background: "#0d1117" }}>{s}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] tracking-[0.22em] uppercase mb-2" style={{ color: "rgba(255,255,255,0.28)" }}>
                    Message
                  </label>
                  <textarea
                    required
                    rows={6}
                    placeholder="Tell us about your plans..."
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    style={{ ...inputStyle, resize: "none" }}
                    onFocus={inputFocus}
                    onBlur={inputBlur}
                  />
                </div>

                <button
                  type="submit"
                  className="w-full text-white py-4 text-[11px] tracking-[0.22em] uppercase font-manrope font-semibold transition-all duration-350 mt-2"
                  style={{
                    background: "linear-gradient(120deg, var(--accent) 0%, var(--accent-light) 100%)",
                    boxShadow: "0 4px 24px rgba(0,104,198,0.3)",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.boxShadow = "0 6px 40px rgba(0,104,198,0.5)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.boxShadow = "0 4px 24px rgba(0,104,198,0.3)";
                  }}
                >
                  Send Message
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
