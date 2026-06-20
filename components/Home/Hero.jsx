"use client";
import Lottie from "lottie-react";
import devAnimation from "../../public/animation/dev.json";
import { useRef } from "react";
import { motion } from "framer-motion";
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

const Hero = () => {
  const lottieRef = useRef();
  const { theme } = useTheme();

  return (
    <section
    id="Home"
      style={{
        marginTop: "3rem",
        display: "flex",
        flexWrap: "wrap",
        borderRadius: "15px",
        padding: "20px",
        backgroundColor: theme.background,
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      {/* Left Section */}
      <div style={{ flex: "1 1 400px", minWidth: "300px" }}>
        {/* الترحيب */}
        <div
          style={{
            display: "flex",
            alignItems: "end",
            gap: "0.6rem",
            minHeight: "88px",
          }}
        >
          <motion.img
            initial={{ transform: "scale(0)" }}
            animate={{ transform: "scale(1.1)" }}
            transition={{ damping: 6, type: "spring", stiffness: 100 }}
            src="/images/logo.webp"
            alt="Mohamed Abu Logo"
            style={{
              width: "80px",
              height: "80px",
              borderRadius: "50%",
              border: `1px solid ${theme.icon}`,
              padding: "1px",
              transform: "scaleX(-1) scaleY(-1)",
              boxShadow: "2px 2px 40px rgba(203,200,200,0.586) inset",
            }}
          />
          <div
            style={{
              color: theme.icon,
              fontSize: "1.1rem",
              marginBottom: "0.3rem",
            }}
          >
            ✔
          </div>
        </div>

        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5 }}
          style={{
            fontSize: "clamp(1.5rem, 2vw, 2rem)", // يتغير حسب الشاشة
            fontWeight: "600",
            paddingTop: "20px",
            color: theme.title,
            marginBottom: "1rem",
          }}
        >
          Hello, I’m Mohamed Abu
        </motion.h2>

        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2 }}
          style={{
            fontSize: "clamp(2rem, 4vw, 3rem)", // متجاوب
            lineHeight: "clamp(2.5rem, 5vw, 3.5rem)",
            margin: "24px 0",
            color: theme.title,
          }}
        >
          Software designer, founder, and amateur astronaut.
        </motion.h1>

        <p
          style={{
            color: theme.subText,
            fontSize: "clamp(0.85rem, 1.5vw, 1rem)", // أصغر على الموبايل
            lineHeight: "1.65rem",
            marginBottom: "32px",
          }}
        >
          I’m Mohamed Abu, a software developer and entrepreneur based in Luxor,
          Egypt...
        </p>

        {/* أيقونات السوشيال ميديا */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "1.5rem",
            fontSize: "clamp(1.2rem, 2vw, 1.8rem)", // حجم الأيقونات متجاوب
            width: "100%",
            padding: "1rem 0",
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
      </div>

      {/* Right Section */}
      <div
        style={{
          flex: "1 1 400px",
          minWidth: "300px",
          display: "flex",
          justifyContent: "center",
          marginTop: "2rem",
        }}
      >
        <Lottie
          lottieRef={lottieRef}
          onLoadedImages={() => {
            lottieRef.current.setSpeed(0.5);
          }}
          animationData={devAnimation}
          style={{ maxWidth: "100%", height: "auto" }}
        />
      </div>
    </section>
  );
};

export default Hero;
