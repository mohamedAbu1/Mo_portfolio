"use client";
import { useForm, ValidationError } from "@formspree/react";
import Lottie from "lottie-react";
import doneAnimation from "../../public/animation/done.json";
import contactAnimation from "../../public/animation/contact.json";
import { useTheme } from "@/context/ThemeContext";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const Contact = () => {
  const [state, handleSubmit] = useForm("xrgvvdlo");
  const { theme } = useTheme();
  const [inView, setInView] = useState(false);

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

  // إعدادات الأنيميشن
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
        transition: "background-color 0.3s ease, color 0.3s ease",
        maxWidth: "1200px",
        margin: "0 auto",
      }}
    >
      <motion.h1
        variants={itemVariants}
        style={{
          fontSize: "clamp(1.8rem, 3vw, 2.2rem)",
          color: theme.title,
          marginBottom: "1rem",
          display: "flex",
          alignItems: "start",
          gap: "0.5rem",
          justifyContent: "start",
          textAlign: "start",
        }}
      >
        <span style={{ color: theme.icon, fontSize: "1.8rem" }}>✉</span>
        Contact Us
      </motion.h1>

      <motion.p
        variants={itemVariants}
        style={{
          color: theme.subText,
          display: "flex",
          alignItems: "start",
          gap: "0.5rem",
          justifyContent: "start",
          textAlign: "start",
          marginBottom: "2rem",
          lineHeight: "1.65rem",
          textAlign: "start",
          maxWidth: "700px",
          marginInline: "auto",
        }}
      >
        Contact us for more information and get notified when I publish
        something new.
      </motion.p>

      <motion.div
        variants={itemVariants}
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "2rem",
          justifyContent: "center",
          alignItems: "flex-start",
        }}
      >
        {/* النموذج */}
        <motion.form
          onSubmit={handleSubmit}
          variants={itemVariants}
          style={{
            flex: "1 1 350px",
            maxWidth: "600px",
            display: "flex",
            flexDirection: "column",
            gap: "1.5rem",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
            <label htmlFor="email" style={{ color: theme.subText }}>
              Email Address:
            </label>
            <input
              autoComplete="off"
              required
              type="email"
              name="email"
              id="email"
              style={{
                backgroundColor: theme.card,
                border: `1px solid ${theme.border}`,
                padding: "0.7rem 1rem",
                borderRadius: "5px",
                color: theme.text,
                fontSize: "1rem",
              }}
            />
            <ValidationError prefix="Email" field="email" errors={state.errors} />
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
            <label htmlFor="message" style={{ color: theme.subText }}>
              Your message:
            </label>
            <textarea
              required
              name="message"
              id="message"
              style={{
                backgroundColor: theme.card,
                border: `1px solid ${theme.border}`,
                padding: "0.7rem 1rem",
                borderRadius: "5px",
                minHeight: "9rem",
                resize: "vertical",
                color: theme.text,
                fontSize: "1rem",
              }}
            ></textarea>
            <ValidationError prefix="Message" field="message" errors={state.errors} />
          </div>

          <button
            type="submit"
            disabled={state.submitting}
            style={{
              backgroundColor: theme.buttonPrimaryBg,
              color: theme.buttonPrimaryText,
              padding: "0.75rem 2rem",
              fontSize: "1.05rem",
              borderRadius: "5px",
              border: `1px solid ${theme.border}`,
              cursor: "pointer",
              transition: "background-color 0.3s ease",
              alignSelf: "flex-start",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.backgroundColor = theme.buttonPrimaryHover)
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.backgroundColor = theme.buttonPrimaryBg)
            }
          >
            {state.submitting ? "Submitting ..." : "Submit"}
          </button>

          {state.succeeded && (
            <p
              style={{
                fontSize: "1rem",
                marginTop: "1rem",
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                color: theme.icon,
              }}
            >
              <Lottie loop={false} style={{ height: 37 }} animationData={doneAnimation} />
              Your message has been sent successfully 👌
            </p>
          )}
        </motion.form>

        {/* الأنيميشن */}
        <motion.div
          variants={itemVariants}
          style={{
            flex: "1 1 300px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Lottie
            style={{ height: "clamp(250px, 40vw, 355px)" }}
            animationData={contactAnimation}
          />
        </motion.div>
      </motion.div>
    </motion.section>
  );
};

export default Contact;
