"use client";
import React, { useEffect, useState } from "react";
import {
  AboutSection,
  AboutText,
  AboutImageWrapper,
  AboutImage,
} from "../../app/style/HomeStyle";
import { motion } from "framer-motion";
import { images } from "../../constants/images";
import { useTheme } from "@/context/ThemeContext";
import TechStackIcons from "./components/TechStackIcons";

const About = () => {
  const { theme, themeName } = useTheme();
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const section = document.getElementById("about");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          // لو السكشن ظاهر بنسبة 60% أو أكثر
          if (entry.isIntersecting) {
            setInView(true);
          }
        });
      },
      { threshold: 0.6 }
    );
    if (section) observer.observe(section);
    return () => section && observer.unobserve(section);
  }, []);

  return (
    <AboutSection
      id="about"
      style={{
        backgroundColor: theme.background,
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        gap: "2rem",
        justifyContent: "space-between",
        padding: "2rem 1rem",
      }}
    >
      {/* النص */}
      <AboutText
        style={{
          flex: "1 1 400px",
          minWidth: "280px",
          maxWidth: "600px",
        }}
      >
        <motion.h1
          style={{
            color: theme.title,
            fontSize: "clamp(1.8rem, 3vw, 2.2rem)",
            textAlign: "start",
          }}
          initial={{ opacity: 0, y: -30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1 }}
        >
          About Me
        </motion.h1>

        <motion.p
          style={{
            color: theme.subText,
            fontSize: "clamp(0.9rem, 2vw, 1rem)",
            lineHeight: "1.6rem",
            textAlign: "justify",
            marginTop: "1rem",
          }}
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1.2 }}
        >
          Hi, I’m <strong style={{ color: theme.icon }}>Mohamed Abu</strong>, a
          passionate software developer with 3 years of experience. I specialize
          in building mobile applications and websites, and I also provide
          professional services such as creating CVs, cover letters, and other
          digital solutions. My goal is to deliver high-quality, user-friendly
          products that help people and businesses achieve their objectives.
        </motion.p>

        {/* أيقونات المهارات */}
        <motion.div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "2rem",
            marginTop: "2rem",
            width: "100%",
          }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 1.5 }}
        >
          <TechStackIcons />
        </motion.div>
      </AboutText>

      {/* الصور */}
      <AboutImageWrapper
        style={{
          flex: "1 1 400px",
          minWidth: "280px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "1.5rem",
          marginTop: "2rem",
          perspective: "1000px",
          flexWrap: "wrap",
        }}
      >
        <motion.img
          src={images[themeName][0]}
          alt="Mohamed Abu portrait 1"
          style={{
            width: "clamp(200px, 28vw, 280px)",
            height: "clamp(280px, 40vw, 420px)",
            objectFit: "cover",
            borderRadius: "12px",
            border: `1px solid ${theme.border}`,
            boxShadow: "0 15px 25px rgba(0,0,0,0.35)",
          }}
          initial={{ opacity: 0, x: -50, rotateY: 30 }}
          animate={inView ? { opacity: 1, x: 0, rotateY: 0 } : {}}
          transition={{ duration: 1.2 }}
        />

        <motion.img
          src={images[themeName][1]}
          alt="Mohamed Abu portrait 2"
          style={{
            width: "clamp(200px, 28vw, 280px)",
            height: "clamp(280px, 40vw, 420px)",
            objectFit: "cover",
            borderRadius: "12px",
            border: `1px solid ${theme.border}`,
            boxShadow: "0 15px 25px rgba(0,0,0,0.35)",
          }}
          initial={{ opacity: 0, x: 50, rotateY: -30 }}
          animate={inView ? { opacity: 1, x: 0, rotateY: 0 } : {}}
          transition={{ duration: 1.2 }}
        />
      </AboutImageWrapper>
    </AboutSection>
  );
};

export default About;
