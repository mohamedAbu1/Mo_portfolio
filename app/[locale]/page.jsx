"use client";
import Header from "@/components/Home/Header";
import Hero from "@/components/Home/Hero";
import Main from "@/components/Home/Main";
import Contact from "@/components/Home/Contact";
import Footer from "@/components/Home/Footer";
import React, { useEffect, useState } from "react";
import About from "@/components/Home/About";
import { useTheme } from "@/context/ThemeContext";
import { FaArrowUp } from "react-icons/fa";

const HomePage = () => {
  const [showScrollBTN, setshowScrollBTN] = useState(false);
  const { theme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setshowScrollBTN(window.scrollY > 300);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    // الطبقة الخارجية
    <div
      style={{
        backgroundColor: theme.background,
        color: theme.text,
        minHeight: "100vh",
        transition: "background-color 0.3s ease, color 0.3s ease",
      }}
    >
      {/* الطبقة الداخلية */}
      <div
        id="up"
        style={{
          borderLeft: `1px solid ${theme.border}`,
          borderRight: `1px solid ${theme.border}`,
          maxWidth: "clamp(320px, 85%, 1800px)", // متجاوب
          margin: "0 auto",
          backgroundColor: theme.background,
          padding: "clamp(1rem, 4vw, 4.8rem)", // متجاوب
          borderRadius: "12px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
          transition: "background-color 0.3s ease, color 0.3s ease",
        }}
      >
        <Header />
        <Hero />

        {/* Divider */}
        <div style={{ borderBottom: `1px solid ${theme.border}`, margin: "3rem 0" }} />

        <About />
        <div style={{ borderBottom: `1px solid ${theme.border}`, margin: "3rem 0" }} />

        <Main />
        <div style={{ borderBottom: `1px solid ${theme.border}`, margin: "3rem 0" }} />

        <Contact />
        <div style={{ borderBottom: `1px solid ${theme.border}`, margin: "3rem 0" }} />

        <Footer />
      </div>

      {/* زر الرجوع لأعلى */}
      <a
        href="#up"
        style={{
          opacity: showScrollBTN ? 1 : 0,
          transition: "opacity 0.8s ease",
          position: "fixed",
          bottom: "2rem",
          right: "3%",
          textDecoration: "none",
          zIndex: 1000,
        }}
      >
        <button
          style={{
            backgroundColor: theme.buttonPrimaryBg,
            color: theme.buttonPrimaryText,
            width: "clamp(2.5rem, 3vw, 3.2rem)", // متجاوب
            height: "clamp(2.5rem, 3vw, 3.2rem)",
            borderRadius: "50%",
            border: `1px solid ${theme.border}`,
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "clamp(1.2rem, 2vw, 1.4rem)", // متجاوب
            transition: "all 0.3s ease",
            boxShadow: "0 6px 18px rgba(0,0,0,0.3)",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = theme.buttonPrimaryHover;
            e.currentTarget.style.transform = "translateY(-4px) scale(1.1)";
            e.currentTarget.style.boxShadow = "0 10px 24px rgba(0,0,0,0.35)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = theme.buttonPrimaryBg;
            e.currentTarget.style.transform = "translateY(0) scale(1)";
            e.currentTarget.style.boxShadow = "0 6px 18px rgba(0,0,0,0.3)";
          }}
        >
          <FaArrowUp />
        </button>
      </a>
    </div>
  );
};

export default HomePage;
