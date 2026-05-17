import React, { useRef } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const BLUE      = "#0d6efd";
const BLUE_DARK = "#0b5ed7";
const BLUE_SOFT = "#e7f1ff";

const fadeUp = {
  hidden:  { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
};
const stagger = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
};

const FEATURES = [
  { icon: "bi-activity",               title: "Symptom Checker",   desc: "Enter your symptoms and get an AI-generated breakdown of possible conditions with guidance on next steps." },
  { icon: "bi-file-earmark-medical",   title: "Report Analysis",   desc: "Upload a blood test or medical report. The AI reads it and returns a plain-language summary." },
  { icon: "bi-alarm",                  title: "Medicine Reminders", desc: "Add medicines with dosages and times. Get email notifications so you never miss a dose." },
  { icon: "bi-geo-alt",                title: "Nearby Clinics",    desc: "Share your location to see hospitals, clinics, and doctor's offices near you on a live map." },
  { icon: "bi-heart-pulse",            title: "Emergency Info",    desc: "Quick access to emergency numbers and first-aid steps when every second counts." },
  { icon: "bi-capsule",                title: "Medicine Lookup",   desc: "Search any medicine to see its uses, dosage guidelines, and common side effects." },
];

const BG_PATTERN = `url("data:image/svg+xml,%3Csvg width='48' height='48' viewBox='0 0 48 48' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%230d6efd' fill-opacity='0.055'%3E%3Crect x='22' y='18' width='4' height='12' rx='1'/%3E%3Crect x='18' y='22' width='12' height='4' rx='1'/%3E%3C/g%3E%3C/svg%3E")`;

export default function Landing() {
  const featRef = useRef(null);

  return (
    <div style={{ fontFamily: "'Nunito', sans-serif", color: "#212529", background: "#fff" }}>

      {/* ── NAVBAR ── */}
      <motion.nav
        initial={{ opacity: 0, y: -14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        style={{
          position: "sticky", top: 0, zIndex: 100,
          background: "rgba(255,255,255,0.95)",
          backdropFilter: "blur(10px)",
          borderBottom: "1px solid #dee2e6",
          padding: "0.85rem 0",
        }}
      >
        <div style={{ maxWidth: 1140, margin: "0 auto", padding: "0 1rem", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <i className="bi bi-heart-pulse" style={{ color: BLUE, fontSize: "1.3rem" }} />
            <span style={{ fontWeight: 800, fontSize: "1.15rem", color: "#212529" }}>MediMate</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <button
              onClick={() => featRef.current?.scrollIntoView({ behavior: "smooth" })}
              style={{ background: "none", border: "none", cursor: "pointer", color: "#6c757d", fontSize: "0.9rem", fontFamily: "inherit", padding: "0.25rem 0.5rem" }}
            >
              Features
            </button>
            <Link to="/login" style={{ color: "#6c757d", textDecoration: "none", fontSize: "0.9rem", fontWeight: 600 }}>
              Login
            </Link>
            <Link to="/register" style={{ textDecoration: "none" }}>
              <motion.button
                whileHover={{ background: BLUE_DARK }}
                whileTap={{ scale: 0.96 }}
                style={{ background: BLUE, border: "none", borderRadius: 8, padding: "0.44rem 1.1rem", color: "#fff", fontWeight: 700, fontSize: "0.88rem", cursor: "pointer", fontFamily: "inherit", transition: "background 0.18s" }}
              >
                Get started
              </motion.button>
            </Link>
          </div>
        </div>
      </motion.nav>

      {/* ── HERO ── */}
      <section
        style={{
          padding: "6rem 0 5.5rem",
          backgroundImage: BG_PATTERN,
          backgroundRepeat: "repeat",
          backgroundColor: "#f8fbff",
          position: "relative",
        }}
      >
        <div style={{ position: "absolute", top: 0, right: 0, width: "45vw", height: "100%", background: "radial-gradient(ellipse at 100% 30%, rgba(13,110,253,0.07) 0%, transparent 65%)", pointerEvents: "none" }} />
        <div style={{ maxWidth: 680, margin: "0 auto", padding: "0 1rem", textAlign: "center", position: "relative" }}>
          <motion.div initial="hidden" animate="visible" variants={stagger}>

            <motion.div variants={fadeUp} style={{ marginBottom: "1.4rem" }}>
              <span style={{ display: "inline-flex", alignItems: "center", gap: 6, background: BLUE_SOFT, border: `1px solid ${BLUE}30`, borderRadius: 20, padding: "0.3rem 0.9rem", fontSize: "0.78rem", fontWeight: 700, color: BLUE, letterSpacing: "0.04em" }}>
                <i className="bi bi-cpu" style={{ fontSize: "0.78rem" }} />
                Powered by Gemini AI
              </span>
            </motion.div>

            <motion.h1
              variants={fadeUp}
              style={{ fontSize: "clamp(2.5rem, 5.5vw, 3.9rem)", fontWeight: 800, lineHeight: 1.1, letterSpacing: "-0.02em", color: "#212529", marginBottom: "1.3rem" }}
            >
              Your personal{" "}
              <span style={{ color: BLUE }}>health assistant</span>
            </motion.h1>

            <motion.p
              variants={fadeUp}
              style={{ fontSize: "1.1rem", color: "#6c757d", lineHeight: 1.8, maxWidth: 540, margin: "0 auto 2.4rem" }}
            >
              Understand your symptoms, read medical reports, track medications,
              and find nearby clinics — all in one free app.
            </motion.p>

            <motion.div variants={fadeUp} style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
              <Link to="/register" style={{ textDecoration: "none" }}>
                <motion.button
                  whileHover={{ background: BLUE_DARK, scale: 1.03 }}
                  whileTap={{ scale: 0.96 }}
                  style={{ background: BLUE, border: "none", borderRadius: 8, padding: "0.78rem 1.9rem", color: "#fff", fontWeight: 700, fontSize: "1rem", cursor: "pointer", fontFamily: "inherit", transition: "background 0.18s" }}
                >
                  Create free account
                </motion.button>
              </Link>
              <motion.button
                whileHover={{ borderColor: BLUE, color: BLUE, scale: 1.02 }}
                whileTap={{ scale: 0.96 }}
                onClick={() => featRef.current?.scrollIntoView({ behavior: "smooth" })}
                style={{ background: "#fff", border: "1.5px solid #dee2e6", borderRadius: 8, padding: "0.78rem 1.9rem", color: "#495057", fontWeight: 600, fontSize: "1rem", cursor: "pointer", fontFamily: "inherit", transition: "border-color 0.18s, color 0.18s" }}
              >
                See features
              </motion.button>
            </motion.div>

          </motion.div>
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section ref={featRef} style={{ padding: "5rem 0", background: "#fff" }}>
        <div style={{ maxWidth: 1140, margin: "0 auto", padding: "0 1rem" }}>

          <motion.div
            style={{ textAlign: "center", marginBottom: "3rem" }}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={stagger}
          >
            <motion.h2 variants={fadeUp} style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.5rem)", fontWeight: 800, letterSpacing: "-0.02em", color: "#212529", marginBottom: "0.7rem" }}>
              What MediMate does
            </motion.h2>
            <motion.p variants={fadeUp} style={{ color: "#6c757d", fontSize: "1rem", maxWidth: 440, margin: "0 auto" }}>
              Six tools for your day-to-day health needs.
            </motion.p>
          </motion.div>

          <motion.div
            style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "1rem" }}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-30px" }}
            variants={stagger}
          >
            {FEATURES.map((f, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                whileHover={{ y: -4, boxShadow: "0 10px 28px rgba(13,110,253,0.1)" }}
                style={{ border: "1.5px solid #e9ecef", borderRadius: 12, padding: "1.6rem", background: "#fff", transition: "box-shadow 0.2s, border-color 0.2s" }}
              >
                <div style={{ width: 44, height: 44, borderRadius: 10, background: BLUE_SOFT, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "1rem" }}>
                  <i className={`bi ${f.icon}`} style={{ color: BLUE, fontSize: "1.25rem" }} />
                </div>
                <h6 style={{ fontWeight: 700, marginBottom: "0.5rem", fontSize: "0.97rem", color: "#212529" }}>
                  {f.title}
                </h6>
                <p style={{ color: "#6c757d", fontSize: "0.88rem", lineHeight: 1.72, margin: 0 }}>
                  {f.desc}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section style={{ padding: "5rem 0", background: BLUE_SOFT, backgroundImage: BG_PATTERN, backgroundRepeat: "repeat" }}>
        <div style={{ maxWidth: 560, margin: "0 auto", padding: "0 1rem", textAlign: "center" }}>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={stagger}
          >
            <motion.h2 variants={fadeUp} style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.5rem)", fontWeight: 800, letterSpacing: "-0.02em", color: "#212529", marginBottom: "0.85rem" }}>
              Ready to get started?
            </motion.h2>
            <motion.p variants={fadeUp} style={{ color: "#6c757d", fontSize: "1rem", lineHeight: 1.78, marginBottom: "2rem" }}>
              Free to use. No credit card required.
              Create an account and start today.
            </motion.p>
            <motion.div variants={fadeUp} style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
              <Link to="/register" style={{ textDecoration: "none" }}>
                <motion.button
                  whileHover={{ background: BLUE_DARK, scale: 1.03 }}
                  whileTap={{ scale: 0.96 }}
                  style={{ background: BLUE, border: "none", borderRadius: 8, padding: "0.78rem 2rem", color: "#fff", fontWeight: 700, fontSize: "1rem", cursor: "pointer", fontFamily: "inherit", transition: "background 0.18s" }}
                >
                  Create free account
                </motion.button>
              </Link>
              <Link to="/login" style={{ textDecoration: "none" }}>
                <motion.button
                  whileHover={{ borderColor: BLUE, color: BLUE, scale: 1.02 }}
                  whileTap={{ scale: 0.96 }}
                  style={{ background: "#fff", border: "1.5px solid #dee2e6", borderRadius: 8, padding: "0.78rem 2rem", color: "#495057", fontWeight: 600, fontSize: "1rem", cursor: "pointer", fontFamily: "inherit", transition: "border-color 0.18s, color 0.18s" }}
                >
                  Sign in
                </motion.button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{ borderTop: "1px solid #dee2e6", padding: "1.5rem 0", background: "#fff" }}>
        <div style={{ maxWidth: 1140, margin: "0 auto", padding: "0 1rem", display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "center", gap: 8 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <i className="bi bi-heart-pulse" style={{ color: BLUE, fontSize: "1rem" }} />
            <span style={{ fontWeight: 800, fontSize: "0.9rem", color: "#212529" }}>MediMate</span>
          </div>
          <span style={{ color: "#adb5bd", fontSize: "0.8rem" }}>© 2025 MediMate</span>
          <div style={{ display: "flex", gap: 16 }}>
            <Link to="/login"    style={{ color: "#adb5bd", textDecoration: "none", fontSize: "0.82rem" }}>Login</Link>
            <Link to="/register" style={{ color: "#adb5bd", textDecoration: "none", fontSize: "0.82rem" }}>Register</Link>
          </div>
        </div>
      </footer>

    </div>
  );
}
