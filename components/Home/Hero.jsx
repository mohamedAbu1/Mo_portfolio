"use client";
import Lottie from "lottie-react";
import devAnimation from "../../public/animation/dev.json";
import { useRef } from "react";
import { motion } from "framer-motion";
import { useTheme } from "@/context/ThemeContext";
import SocialIcons from "./components/SocialIcons";

const Hero = () => {
  const lottieRef = useRef();
  const { theme } = useTheme();

  return (
    <motion.section
      id="home"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, ease: "easeOut" }}
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
      <motion.div
        initial={{ x: -60, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
        style={{ flex: "1 1 400px", minWidth: "300px" }}
      >
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
            initial={{ scale: 0 }}
            animate={{ scale: 1.1 }}
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
          <motion.div
            initial={{ rotate: -90, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            transition={{ duration: 1 }}
            style={{
              color: theme.icon,
              fontSize: "1.1rem",
              marginBottom: "0.3rem",
            }}
          >
            ✔
          </motion.div>
        </div>

        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2 }}
          style={{
            fontSize: "clamp(1.5rem, 2vw, 2rem)",
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
          transition={{ duration: 1.5 }}
          style={{
            fontSize: "clamp(2rem, 4vw, 3rem)",
            lineHeight: "clamp(2.5rem, 5vw, 3.5rem)",
            margin: "24px 0",
            color: theme.title,
          }}
        >
          Software designer, founder, and amateur astronaut.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.8 }}
          style={{
            color: theme.subText,
            fontSize: "clamp(0.85rem, 1.5vw, 1rem)",
            lineHeight: "1.65rem",
            marginBottom: "32px",
          }}
        >
          I’m Mohamed Abu, a software developer and entrepreneur based in Luxor,
          Egypt...
        </motion.p>

        {/* أيقونات السوشيال ميديا */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: .2 }}
        >
          <SocialIcons />
        </motion.div>
      </motion.div>

      {/* Right Section */}
      <motion.div
        initial={{ x: 60, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
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
      </motion.div>
    </motion.section>
  );
};

export default Hero;
