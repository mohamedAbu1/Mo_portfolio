"use client";
import React from "react";
import { 
  AboutSection, 
  AboutText, 
  AboutImageWrapper, 
  AboutImage 
} from "../../app/style/HomeStyle";
import { motion } from "framer-motion";
import { images } from "../../constants/images";
import { 
  FaReact, FaNodeJs, FaCss3Alt, FaHtml5, FaGithub, FaBootstrap, FaJs ,FaTripadvisor, FaFigma
} from "react-icons/fa";
import { SiNextdotjs, SiExpo, SiTailwindcss, SiMui } from "react-icons/si";
import { useTheme } from "@/context/ThemeContext"; 

const About = () => {
  const { theme, themeName } = useTheme();

  return (
    <AboutSection
    id="About"
      style={{
        backgroundColor: theme.background,
        display: "flex",
        flexWrap: "wrap", // متجاوب
        gap: "2rem",
        justifyContent: "space-between",
      }}
    >
      {/* النص */}
      <AboutText style={{ flex: "1 1 400px", minWidth: "300px" }}>
        <motion.h1
          style={{ color: theme.title, fontSize: "clamp(1.8rem, 3vw, 2.2rem)" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5 }}
        >
          About Me
        </motion.h1>

        <motion.p
          style={{
            color: theme.subText,
            fontSize: "clamp(0.9rem, 2vw, 1rem)",
            lineHeight: "1.6rem",
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 2 }}
        >
          Hi, I’m <strong style={{color:theme.icon}}>Mohamed Abu</strong>, a passionate software developer with
          3 years of experience. I specialize in building mobile applications and
          websites, and I also provide professional services such as creating CVs,
          cover letters, and other digital solutions. My goal is to deliver
          high-quality, user-friendly products that help people and businesses
          achieve their objectives.
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
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ duration: 2 }}
>
  {/* الصف الأول */}
  <div style={{ display: "flex", justifyContent: "center", gap: "2rem", flexWrap: "wrap" }}>
    <FaHtml5 size={50} color="#E34F26" />
    <FaCss3Alt size={50} color="#1572B6" />
    <FaBootstrap size={50} color="#7952B3" />
    <SiMui size={50} color="#007FFF" />
    <SiTailwindcss size={50} color="#38BDF8" />
    <FaJs size={50} color="#F7DF1E" />
    <FaTripadvisor size={50} color="#34E0A1" /> {/* Tripadvisor */}
  </div>

  {/* الصف الثاني */}
  <div style={{ display: "flex", justifyContent: "center", gap: "2rem", flexWrap: "wrap" }}>
    <FaReact size={50} color="#61DBFB" />
    <SiNextdotjs size={50} color="#000000" />
    <FaGithub size={50} color="#333333" />
    <SiExpo size={50} color="#000020" />
    <FaNodeJs size={50} color="#68A063" />
    <FaFigma size={50} color="#F24E1E" /> {/* Figma */}
  </div>
</motion.div>

      </AboutText>

      {/* الصور بشكل كارتين بحرف V مع تأثير 3D */}
      <AboutImageWrapper
        style={{
          flex: "1 1 400px",
          minWidth: "300px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "2rem",
          marginTop: "2rem",
          perspective: "1000px",
          flexWrap: "wrap", // متجاوب
        }}
      >
        {/* الصورة الأولى */}
        <AboutImage
          src={images[themeName][0]}
          alt="Mohamed Abu portrait 1"
          style={{
            width: "clamp(220px, 30vw, 300px)",
            height: "clamp(320px, 45vw, 480px)",
            objectFit: "cover",
            borderRadius: "12px",
            border: `1px solid ${theme.border}`,
            boxShadow: "0 15px 25px rgba(0,0,0,0.35)",
            transform: "rotateY(15deg) rotate(-8deg) translateY(-20px)",
            transition: "transform 0.3s ease, box-shadow 0.3s ease",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "rotateY(0deg) scale(1.05)";
            e.currentTarget.style.boxShadow = "0 20px 30px rgba(0,0,0,0.4)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "rotateY(15deg) rotate(-8deg) translateY(-20px)";
            e.currentTarget.style.boxShadow = "0 15px 25px rgba(0,0,0,0.35)";
          }}
        />

        {/* الصورة الثانية */}
        <AboutImage
          src={images[themeName][1]}
          alt="Mohamed Abu portrait 2"
          style={{
            width: "clamp(220px, 30vw, 300px)",
            height: "clamp(320px, 45vw, 480px)",
            objectFit: "cover",
            borderRadius: "12px",
            border: `1px solid ${theme.border}`,
            boxShadow: "0 15px 25px rgba(0,0,0,0.35)",
            transform: "rotateY(-15deg) rotate(8deg) translateY(-20px)",
            transition: "transform 0.3s ease, box-shadow 0.3s ease",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "rotateY(0deg) scale(1.05)";
            e.currentTarget.style.boxShadow = "0 20px 30px rgba(0,0,0,0.4)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "rotateY(-15deg) rotate(8deg) translateY(-20px)";
            e.currentTarget.style.boxShadow = "0 15px 25px rgba(0,0,0,0.35)";
          }}
        />
      </AboutImageWrapper>
    </AboutSection>
  );
};

export default About;
