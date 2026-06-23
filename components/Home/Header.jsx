"use client";
import React, { useState, useEffect } from "react";
import { useTheme } from "@/context/ThemeContext";
import { FaMoon, FaSun, FaComments } from "react-icons/fa";
import { motion } from "framer-motion";
import { useAuth } from "@/context/AuthContext";
import Box from '@mui/material/Box';
const HeaderComponent = ({setIsOpen}) => {
  const [activeSection, setActiveSection] = useState("home");
  const { theme, themeName, toggleThemeFun } = useTheme();
  const { isLoggedIn, user, loginWithGoogle, logout } = useAuth();

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

  const navItems = ["home", "about", "projects", "contact", "footer"];

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
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
      }}
    >
      {/* روابط الناف */}
      <Box className="desktop-nav" sx={{ width:{ xs: "0%", lg: "40%" } }}>
        <Box
          sx={{
            display: { xs: "none", lg: "flex" },
            justifyContent: "center",
            gap: "1.5rem",
            listStyle: "none",
            margin: 0,
            padding: "10px 20px",
            borderRadius: "25px",
            border: `1px solid ${theme.border}`,
          }}
        >
          {navItems.map((item, index) => (
            <motion.li
              key={item}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.15 }}
            >
              <motion.a
                href={`#${item}`}
                whileHover={{ scale: 1.1 }}
                style={{
                  textDecoration: "none",
                  textTransform: "capitalize",
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
              </motion.a>
            </motion.li>
          ))}
        </Box>
      </Box>

      {/* مربع المستخدم */}
      {isLoggedIn && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          style={{
            width:"50%",
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
            src={user?.user_metadata?.image}
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
            style={{
              color: theme.text,
              fontSize: "0.95rem",
              fontWeight: "500",
              textTransform: "capitalize",
            }}
          >
            {user?.user_metadata?.name}
          </span>
          <button
            onClick={logout} // ✅ من AuthContext
            style={{
              marginLeft: "10px",
              background: "none",
              border: "1px solid",
              borderRadius: "6px",
              padding: "0.2rem 0.6rem",
              cursor: "pointer",
              color: theme.text,
            }}
          >
            Logout
          </button>
        </motion.div>
      )}

      <motion.button
        whileHover={{ rotate: 180 }}
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
      </motion.button>
      {user && (
        <motion.button
          whileHover={{ scale: 1.2 }}
          onClick={() => setIsOpen(true)} // ✅ فتح النافذة
          style={{
            display:{xs:"none",lg: "flex"},
            background: "none",
            border: "none",
            cursor: "pointer",
            color: "white",
            fontSize: "1.5rem",
            marginLeft: "55px",
          }}
        >
          <FaComments color={theme.icon} />
        </motion.button>
      )}
    </motion.header>
  );
};

export default HeaderComponent;
