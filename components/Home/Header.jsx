"use client";
import React, { useState, useEffect } from "react";
import { useTheme } from "@/context/ThemeContext";
import {
  FaBars,
  FaTimes,
  FaMoon,
  FaSun,
  FaUserCircle,
  FaComments,
} from "react-icons/fa";

const HeaderComponent = () => {
  const [showModal, setShowModal] = useState(false);
  const [activeSection, setActiveSection] = useState("Home");
  const { theme, themeName, toggleThemeFun } = useTheme();

  useEffect(() => {
    const sections = document.querySelectorAll("section[id]");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.6 },
    );

    sections.forEach((sec) => observer.observe(sec));
    return () => sections.forEach((sec) => observer.unobserve(sec));
  }, []);

  const navItems = ["Home", "About", "Projects", "Contact", "Footer"];

  return (
    <header
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "1rem 2rem",
        backgroundColor: theme.background,
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
        transition: "background-color 0.3s ease, padding 0.3s ease",
      }}
    >
      {/* زر القائمة (يظهر على الموبايل) */}
      <button
        onClick={() => setShowModal(true)}
        style={{
          background: "none",
          border: "none",
          cursor: "pointer",
          color: theme.icon,
          fontSize: "1.5rem",
          display: "none", // نخفيه على الديسكتوب
        }}
        className="menu-btn"
      >
        <FaBars />
      </button>

      {/* روابط الناف (تظهر على الديسكتوب) */}
      <nav className="desktop-nav" style={{ width: "40%" }}>
        <ul
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "1.5rem",
            listStyle: "none",
            margin: 0,
            padding: "10px 20px",
            borderRadius: "25px",
            border: `1px solid ${theme.border}`,
          }}
        >
          {navItems.map((item) => (
            <li key={item}>
              <a
                href={`#${item.toLowerCase()}`}
                style={{
                  textDecoration: "none",
                  fontSize: "1rem",
                  color:
                    activeSection === item
                      ? theme.buttonPrimaryText
                      : theme.subText,
                  backgroundColor:
                    activeSection === item
                      ? theme.buttonPrimaryBg
                      : "transparent",
                  padding: "0.4rem 0.8rem",
                  borderRadius: "8px",
                  transition: "all 0.3s ease",
                }}
              >
                {item}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      {/* مربع المستخدم */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          marginLeft: "20px",
          padding: "0.4rem 0.8rem",
          borderRadius: "8px",
          backgroundColor: theme.cardInnerBg,
          boxShadow: theme.shadow,
        }}
      >
        <img
          src="/images/3d-avatar-cartoon-character_113255-92170.webp" // ضع صورة المستخدم هنا
          alt="User Avatar"
          style={{
            width: "35px",
            height: "35px",
            borderRadius: "50%",
            objectFit: "cover",
            marginRight: "10px",
          }}
        />
        <span
          style={{ color: theme.text, fontSize: "0.95rem", fontWeight: "500" }}
        >
          Mohamed Abu
        </span>
      </div>
      {/* أيقونة تسجيل الدخول */}
      <button
        style={{
          background: "none",
          border: "none",
          cursor: "pointer",
          color: theme.icon,
          fontSize: "1.5rem",
          marginLeft: "20px",
        }}
      >
        <FaUserCircle />
      </button>

      {/* أيقونة الدردشة */}
      <button
        style={{
          background: "none",
          border: "none",
          cursor: "pointer",
          color: theme.icon,
          fontSize: "1.5rem",
          marginLeft: "15px",
        }}
      >
        <FaComments />
      </button>
      {/* زر تبديل الثيم */}
      <button
        onClick={toggleThemeFun}
        style={{
          background: "none",
          border: "none",
          cursor: "pointer",
          color: theme.icon,
          fontSize: "1.5rem",
          marginLeft: "25px",
        }}
      >
        {themeName === "dark" ? <FaMoon /> : <FaSun />}
      </button>
      {/* المودال (يظهر على الموبايل) */}
      {showModal && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            backgroundColor: "rgba(0,0,0,0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div
            style={{
              backgroundColor: theme.card,
              padding: "2rem",
              borderRadius: "12px",
              minWidth: "250px",
            }}
          >
            <ul style={{ listStyle: "none", padding: 0 }}>
              <li>
                <button
                  onClick={() => setShowModal(false)}
                  style={{
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    color: theme.icon,
                    fontSize: "1.5rem",
                  }}
                >
                  <FaTimes />
                </button>
              </li>
              {navItems.map((item) => (
                <li key={item} style={{ margin: "1rem 0" }}>
                  <a
                    href={`#${item.toLowerCase()}`}
                    style={{
                      textDecoration: "none",
                      fontSize: "1rem",
                      color:
                        activeSection === item
                          ? theme.buttonPrimaryText
                          : theme.subText,
                      backgroundColor:
                        activeSection === item
                          ? theme.buttonPrimaryBg
                          : "transparent",
                      padding: "0.4rem 0.8rem",
                      borderRadius: "8px",
                      transition: "all 0.3s ease",
                    }}
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {/* CSS بسيط للتجاوب */}
      <style jsx>{`
        @media (max-width: 768px) {
          .desktop-nav {
            display: none;
          }
          .menu-btn {
            display: block;
          }
        }
      `}</style>
    </header>
  );
};

export default HeaderComponent;
