"use client";
import React, { useEffect, useState } from "react";
import { useTheme } from "@/context/ThemeContext";
import Image from "next/image";
import SocialIcons from "./components/SocialIcons";
import { motion } from "framer-motion";
import { FaPhone } from "react-icons/fa";
const FooterComponent = () => {
  const { theme } = useTheme();
  const [inView, setInView] = useState(false);
  const phoneNumbers = ["+201018539889"];
  useEffect(() => {
    const section = document.getElementById("footer");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setInView(true);
        });
      },
      { threshold: 0.6 },
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
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <motion.section
      id="footer"
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={containerVariants}
    >
      <motion.footer
        variants={containerVariants}
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: "2rem",
          backgroundColor: theme.background,
          borderTop: `1px solid ${theme.border}`,
          transition: "background-color 0.3s ease, color 0.3s ease",
        }}
      >
        {/* اللوجو */}
        <motion.div variants={itemVariants} style={{ marginBottom: "1rem" }}>
          <Image
            src="/images/logo.webp"
            alt="Mohamed Abu Logo"
            width={60}
            height={60}
            style={{
              borderRadius: "50%",
              border: `2px solid ${theme.icon}`,
              boxShadow: "0 4px 12px rgba(0,0,0,0.25)",
            }}
          />
        </motion.div>

        {/* روابط التنقل */}
        <motion.ul
          variants={itemVariants}
          style={{
            display: "flex",
            gap: "1.5rem",
            listStyle: "none",
            margin: "0 0 1rem 0",
            padding: 0,
          }}
        >
          {["About", "Projects", "Speaking", "Uses"].map((item) => (
            <li key={item}>
              <a
                href=""
                style={{
                  textDecoration: "none",
                  color: theme.subText,
                  fontSize: "1rem",
                  transition: "color 0.3s ease",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = theme.icon)}
                onMouseLeave={(e) =>
                  (e.currentTarget.style.color = theme.subText)
                }
              >
                {item}
              </a>
            </li>
          ))}
        </motion.ul>

        {/* أيقونات السوشيال ميديا */}
        <motion.div
          variants={itemVariants}
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "1.5rem",
            fontSize: "1.5rem",
            marginBottom: "1rem",
          }}
        >
          <SocialIcons />
        </motion.div>

        {/* رقم الهاتف */}
        <motion.p
          variants={itemVariants}
          style={{
            color: theme.subText,
            fontSize: "0.95rem",
            marginBottom: "0.5rem",
          }}
        >
          <div style={{ display: "flex", gap: "1rem" }}>
            {phoneNumbers.map((num, i) => (
              <motion.a
                key={i}
                href={`tel:${num}`}
                whileHover={{ scale: 1.1 }}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.4rem",
                  backgroundColor: theme.cardInnerBg,
                  padding: "0.4rem 0.8rem",
                  borderRadius: "8px",
                  color: theme.text,
                  textDecoration: "none",
                  boxShadow: theme.shadow,
                }}
              >
                <FaPhone style={{ color: theme.icon }} />
                {num}
              </motion.a>
            ))}
          </div>
        </motion.p>

        {/* الحقوق */}
        <motion.p
          variants={itemVariants}
          style={{
            color: theme.subText,
            fontSize: "0.85rem",
          }}
        >
          © 2026 Mohamed Abu. All rights reserved.
        </motion.p>
      </motion.footer>
    </motion.section>
  );
};

export default FooterComponent;
