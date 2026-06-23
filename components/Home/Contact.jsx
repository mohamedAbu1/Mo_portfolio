"use client";
import { useTheme } from "@/context/ThemeContext";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import Lottie from "lottie-react";
import doneAnimation from "../../public/animation/done.json";
import contactAnimation from "../../public/animation/contact.json";

const Contact = () => {
  const { theme } = useTheme();
  const [inView, setInView] = useState(false);
  const { user } = useAuth();
  const [state, setState] = useState({ submitting: false, succeeded: false });

  useEffect(() => {
    const section = document.getElementById("contact");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setInView(true);
        });
      },
      { threshold: 0.6 }
    );
    if (section) observer.observe(section);
    return () => section && observer.unobserve(section);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setState({ submitting: true, succeeded: false });

    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: e.target.email.value,
        message: e.target.message.value,
      }),
    });

    const data = await res.json();
    if (data.success) {
      setState({ submitting: false, succeeded: true });
    } else {
      setState({ submitting: false, succeeded: false });
      alert("❌ Error: " + data.error);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
  };

  return (
    <motion.section
      id="contact"
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={containerVariants}
      style={{
        padding: "2rem 1rem",
        backgroundColor: theme.background,
        color: theme.text,
        borderRadius: "12px",
        maxWidth: "1200px",
        margin: "0 auto",
      }}
    >
      <motion.div variants={itemVariants} style={{ textAlign: "center", marginBottom: "2rem" }}>
        <h1 style={{ fontSize: "clamp(1.8rem, 3vw, 2.2rem)", color: theme.title }}>
          <span style={{ color: theme.icon, fontSize: "1.8rem" }}>✉</span> Contact Us
        </h1>
        <p style={{ color: theme.subText, fontSize: "0.95rem", fontStyle: "italic" }}>
          Let’s talk together — we’d love to hear from you
        </p>
      </motion.div>

      <motion.div
        variants={itemVariants}
        style={{ display: "flex", flexWrap: "wrap", gap: "2rem", justifyContent: "center" }}
      >
        <motion.form
          onSubmit={handleSubmit}
          variants={itemVariants}
          style={{
            flex: "1 1 350px",
            maxWidth: "600px",
            display: "flex",
            flexDirection: "column",
            gap: "1.5rem",
            backgroundColor: theme.cardInnerBg,
            padding: "1.5rem",
            borderRadius: "12px",
            boxShadow: theme.shadow,
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
            <label htmlFor="email" style={{ color: theme.subText }}>Email Address:</label>
            <input
              autoComplete="off"
              defaultValue={user?.email || ""}
              required
              type="email"
              name="email"
              id="email"
              style={{
                backgroundColor: theme.card,
                border: `1px solid ${theme.border}`,
                padding: "0.7rem 1rem",
                borderRadius: "8px",
                color: theme.text,
              }}
            />
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
            <label htmlFor="message" style={{ color: theme.subText }}>Your message:</label>
            <textarea
              required
              name="message"
              id="message"
              style={{
                backgroundColor: theme.card,
                border: `1px solid ${theme.border}`,
                padding: "0.7rem 1rem",
                borderRadius: "8px",
                minHeight: "9rem",
                resize: "vertical",
                color: theme.text,
              }}
            ></textarea>
          </div>

          <motion.button
            type="submit"
            disabled={state.submitting}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            style={{
              backgroundColor: theme.buttonPrimaryBg,
              color: theme.buttonPrimaryText,
              padding: "0.75rem 2rem",
              borderRadius: "8px",
              border: `1px solid ${theme.border}`,
              cursor: "pointer",
            }}
          >
            {state.submitting ? "Submitting ..." : "Submit"}
          </motion.button>

          {state.succeeded && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              style={{ marginTop: "1rem", display: "flex", alignItems: "center", gap: "0.5rem", color: theme.icon }}
            >
              <Lottie loop={false} style={{ height: 37 }} animationData={doneAnimation} />
              Your message has been sent successfully 👌
            </motion.p>
          )}
        </motion.form>

        <motion.div variants={itemVariants} style={{ flex: "1 1 300px", display: "flex", justifyContent: "center" }}>
          <Lottie style={{ height: "clamp(250px, 40vw, 355px)" }} animationData={contactAnimation} />
        </motion.div>
      </motion.div>
    </motion.section>
  );
};

export default Contact;
