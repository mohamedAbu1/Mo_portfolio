"use client";
import React from "react";
import { useTheme } from "@/context/ThemeContext";
import {
  FaTwitter,
  FaInstagram,
  FaGithub,
  FaLinkedin,
  FaFacebook,
  FaWhatsapp,
  FaEnvelope,
} from "react-icons/fa";
import Image from "next/image";

const FooterComponent = () => {
  const { theme } = useTheme();

  return (
    <section id="Footer">
      {" "}
      <footer
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
        <div style={{ marginBottom: "1rem" }}>
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
        </div>

        {/* روابط التنقل */}
        <ul
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
        </ul>

        {/* أيقونات السوشيال ميديا */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "1.5rem",
            fontSize: "1.5rem",
            marginBottom: "1rem",
          }}
        >
          <FaTwitter color="#1DA1F2" />
          <FaInstagram color="#E1306C" />
          <FaGithub color="#333" />
          <FaLinkedin color="#0077B5" />
          <FaFacebook color="#1877F2" />
          <FaWhatsapp color="#25D366" />
          <FaEnvelope color="#D44638" />
        </div>

        {/* رقم الهاتف */}
        <p
          style={{
            color: theme.subText,
            fontSize: "0.95rem",
            marginBottom: "0.5rem",
          }}
        >
          📞{" "}
          <a
            href="tel:+201018539889"
            style={{ color: theme.icon, textDecoration: "none" }}
          >
            +201018539889
          </a>
        </p>

        {/* الحقوق */}
        <p
          style={{
            color: theme.subText,
            fontSize: "0.85rem",
          }}
        >
          © 2026 Mohamed Abu. All rights reserved.
        </p>
      </footer>
    </section>
  );
};

export default FooterComponent;
