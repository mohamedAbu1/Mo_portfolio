"use client";
import React, { useState, useEffect } from "react";
import { useTheme } from "@/context/ThemeContext";
import { FaMoon, FaSun, FaComments } from "react-icons/fa";
import { motion } from "framer-motion";
import { useAuth } from "@/context/AuthContext";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

const HeaderComponent = ({ setIsOpen }) => {
  const [activeSection, setActiveSection] = useState("home");
  const { theme, themeName, toggleThemeFun } = useTheme();
  const { isLoggedIn, user, logout } = useAuth();

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
      { threshold: 0.6 }
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
        backgroundColor: theme.background,
        display:"flex",
        alignItems:"center",
        justifyContent:"center",
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
      }}
    >
      <Box
        sx={{
          width:"60%",
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
          px: { xs: 2, md: 4 },
          py: 1.5,
        }}
      >
        {/* Navigation */}
        <Box
          sx={{
            display: { xs: "none", md: "flex" },
            gap: 2,
            borderRadius: "25px",
            border: `1px solid ${theme.border}`,
            px: 2,
            py: 1,
          }}
        >
          {navItems.map((item, index) => (
            <motion.a
              key={item}
              href={`#${item}`}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.15 }}
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
          ))}
        </Box>

        {/* User Box */}
        {isLoggedIn && (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1.5,
              backgroundColor: theme.cardInnerBg,
              boxShadow: theme.shadow,
              borderRadius: "8px",
              px: 2,
              py: 1,
            }}
          >
            <Avatar
              src={user?.user_metadata?.image}
              alt="User Avatar"
              sx={{ width: 35, height: 35 }}
            />
            <Typography
              sx={{
                color: theme.text,
                fontSize: "0.95rem",
                fontWeight: 500,
                textTransform: "capitalize",
              }}
            >
              {user?.user_metadata?.name}
            </Typography>
            <Button
              onClick={logout}
              variant="outlined"
              size="small"
              sx={{
                color: theme.text,
                borderColor: theme.text,
                textTransform: "capitalize",
              }}
            >
              Logout
            </Button>
          </Box>
        )}

        {/* Theme Toggle */}
        <IconButton onClick={toggleThemeFun} sx={{ color: theme.icon }}>
          {themeName === "dark" ? <FaMoon /> : <FaSun />}
        </IconButton>

        {/* Chat Button */}
        {user && (
          <IconButton
            onClick={() => setIsOpen(true)}
            sx={{
              display: { xs: "none", md: "flex" },
              color: theme.icon,
              ml: 2,
            }}
          >
            <FaComments />
          </IconButton>
        )}
      </Box>
    </motion.header>
  );
};

export default HeaderComponent;
