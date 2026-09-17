"use client";

import { useTheme } from "@/context/ThemeContext";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { toast } from "react-toastify";
import Lottie from "lottie-react";
import doneAnimation from "../../public/animation/done.json";
import contactAnimation from "../../public/animation/contact.json";

const INITIAL_FORM = { name: "", email: "", message: "" };
const TOAST_OPTIONS = {
  position: "top-right",
  autoClose: 4500,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
};

const Contact = () => {
  const { theme } = useTheme();
  const { user } = useAuth();
  const [inView, setInView] = useState(false);
  const [form, setForm] = useState(INITIAL_FORM);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const section = document.getElementById("contact");
    if (!section) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && setInView(true),
      { threshold: 0.25 },
    );
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (user?.email) {
      setForm((current) => ({ ...current, email: current.email || user.email, name: current.name || user.name || "" }));
    }
  }, [user]);

  const updateField = (field) => (event) => {
    setForm((current) => ({ ...current, [field]: event.target.value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (submitting) return;

    const payload = {
      name: form.name.trim(),
      email: form.email.trim(),
      message: form.message.trim(),
    };

    if (payload.name.length < 2 || payload.message.length < 10) {
      toast.error("Please enter your name and a message of at least 10 characters.", TOAST_OPTIONS);
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(payload.email)) {
      toast.error("Please enter a valid email address and try again.", TOAST_OPTIONS);
      return;
    }

    setSubmitting(true);
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await response.json().catch(() => ({}));

      if (!response.ok || !data.success) {
        throw new Error(data.error || "We could not send your message.");
      }

      setForm(INITIAL_FORM);
      toast.success("Message sent successfully. We will get back to you soon.", {
        ...TOAST_OPTIONS,
        icon: "✉️",
      });
    } catch (error) {
      toast.error(error.message || "Message failed to send. Please try again.", {
        ...TOAST_OPTIONS,
        icon: "⚠️",
      });
    } finally {
      setSubmitting(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.12 } },
  };
  const itemVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: "easeOut" } },
  };
  const inputStyle = {
    width: "100%",
    backgroundColor: theme.card,
    border: `1px solid ${theme.border}`,
    padding: "0.85rem 1rem",
    borderRadius: "7px",
    color: theme.text,
    outline: "none",
    font: "inherit",
    transition: "border-color 180ms ease, box-shadow 180ms ease",
  };

  return (
    <motion.section
      id="contact"
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={containerVariants}
      style={{ padding: "2.5rem 1rem", backgroundColor: theme.background, color: theme.text, borderRadius: "12px", maxWidth: "1200px", margin: "0 auto" }}
    >
      <motion.div variants={itemVariants} style={{ textAlign: "center", marginBottom: "2rem" }}>
        <h1 style={{ fontSize: "clamp(1.8rem, 3vw, 2.2rem)", color: theme.title }}>
          <span style={{ color: theme.icon, fontSize: "1.8rem" }}>✉</span> Contact Us
        </h1>
        <p style={{ color: theme.subText, fontSize: "0.95rem", fontStyle: "italic" }}>
          Let’s talk together — we’d love to hear from you
        </p>
      </motion.div>

      <motion.div variants={itemVariants} style={{ display: "flex", flexWrap: "wrap", gap: "2rem", justifyContent: "center", alignItems: "center" }}>
        <motion.form onSubmit={handleSubmit} noValidate variants={itemVariants} style={{ flex: "1 1 350px", maxWidth: "600px", display: "flex", flexDirection: "column", gap: "1.1rem", backgroundColor: theme.cardInnerBg, padding: "1.5rem", borderRadius: "12px", boxShadow: theme.shadow }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.45rem" }}>
            <label htmlFor="contact-name" style={{ color: theme.subText }}>Name</label>
            <input id="contact-name" name="name" type="text" autoComplete="name" placeholder="Your name" value={form.name} onChange={updateField("name")} required minLength={2} style={inputStyle} />
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.45rem" }}>
            <label htmlFor="contact-email" style={{ color: theme.subText }}>Email</label>
            <input id="contact-email" name="email" type="email" autoComplete="email" placeholder="you@example.com" value={form.email} onChange={updateField("email")} required style={inputStyle} />
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.45rem" }}>
            <label htmlFor="contact-message" style={{ color: theme.subText }}>Message</label>
            <textarea id="contact-message" name="message" placeholder="What are we building?" value={form.message} onChange={updateField("message")} required minLength={10} rows={6} style={{ ...inputStyle, resize: "vertical", minHeight: "9rem" }} />
          </div>
          <motion.button type="submit" disabled={submitting} whileHover={!submitting ? { y: -1 } : undefined} whileTap={!submitting ? { scale: 0.98 } : undefined} style={{ backgroundColor: submitting ? theme.muted : theme.buttonPrimaryBg, color: theme.buttonPrimaryText, padding: "0.85rem 1.2rem", borderRadius: "8px", border: `1px solid ${theme.border}`, cursor: submitting ? "wait" : "pointer", fontWeight: 700, fontSize: "0.95rem", opacity: submitting ? 0.8 : 1 }}>
            {submitting ? "Sending message…" : "Send message ↗"}
          </motion.button>
        </motion.form>

        <motion.div variants={itemVariants} style={{ flex: "1 1 300px", display: "flex", justifyContent: "center" }} aria-hidden="true">
          <Lottie style={{ height: "clamp(250px, 40vw, 355px)" }} animationData={submitting ? doneAnimation : contactAnimation} loop={!submitting} />
        </motion.div>
      </motion.div>
    </motion.section>
  );
};

export default Contact;
