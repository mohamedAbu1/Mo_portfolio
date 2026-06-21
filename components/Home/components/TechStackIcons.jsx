"use client";

import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import {
  FaHtml5,
  FaCss3Alt,
  FaBootstrap,
  FaJs,
  FaReact,
  FaGithub,
  FaNodeJs,
  FaFigma,
  FaTripadvisor,
} from "react-icons/fa";
import { SiMui, SiTailwindcss, SiNextdotjs, SiExpo } from "react-icons/si";
import { siSupabase, siHostinger, siVercel } from "simple-icons";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function TechStackIcons() {
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const section = document.getElementById("techstack");
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

  const row1 = [
    { name: "HTML5", icon: FaHtml5, color: "#E34F26" },
    { name: "CSS3", icon: FaCss3Alt, color: "#1572B6" },
    { name: "Bootstrap", icon: FaBootstrap, color: "#7952B3" },
    { name: "Material_UI", icon: SiMui, color: "#007FFF" },
    { name: "Tailwind_CSS", icon: SiTailwindcss, color: "#38BDF8" },
    { name: "JavaScript", icon: FaJs, color: "#F7DF1E" },
    { name: "React", icon: FaReact, color: "#61DBFB" },
    { name: "Next_js", icon: SiNextdotjs, color: "#000000" },
  ];

  const row2 = [
    { name: "GitHub", icon: FaGithub, color: "#333333" },
    { name: "Expo", icon: SiExpo, color: "#000020" },
    { name: "Node_js", icon: FaNodeJs, color: "#68A063" },
    { name: "Figma", icon: FaFigma, color: "#F24E1E" },
    { name: "Tripadvisor", icon: FaTripadvisor, color: "#34E0A1" },
    { name: "Supabase", svg: siSupabase, color: "#3FCF8E" },
    { name: "Hostinger", svg: siHostinger, color: "#673DE6" },
    { name: "Vercel", svg: siVercel, color: "#000000" },
  ];

  // إعدادات الأنيميشن
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 },
    },
  };

  const iconVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  return (
    <div id="techstack" className="flex flex-col gap-6" style={{ alignItems: "start" }}>
      {/* الصف الأول */}
      <motion.div
        className="w-full flex justify-center gap-8 flex-wrap"
        variants={containerVariants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
      >
        {row1.map(({ name, icon: Icon, color }) => (
          <motion.span key={name} variants={iconVariants}>
            <Tippy content={<span className="text-black px-2 py-1 rounded shadow">{name}</span>}>
              <span style={{ paddingLeft: "20px" }}>
                <Icon size={50} color={color} className="hover:scale-110 transition-transform" />
              </span>
            </Tippy>
          </motion.span>
        ))}
      </motion.div>

      {/* الصف الثاني */}
      <motion.div
        className="w-full flex justify-center gap-8 flex-wrap mt-[30px]"
        variants={containerVariants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
      >
        {row2.map(({ name, icon: Icon, svg, color }) =>
          Icon ? (
            <motion.span key={name} variants={iconVariants}>
              <Tippy content={<span className="text-black px-2 py-1 rounded shadow">{name}</span>}>
                <span style={{ paddingLeft: "20px" }}>
                  <Icon size={50} color={color} className="hover:scale-110 transition-transform" />
                </span>
              </Tippy>
            </motion.span>
          ) : (
            <motion.span key={name} variants={iconVariants}>
              <Tippy content={<span className="text-black px-2 py-1 rounded shadow">{name}</span>}>
                <span style={{ paddingLeft: "20px" }}>
                  <svg
                    role="img"
                    viewBox="0 0 24 24"
                    width={65}
                    height={65}
                    fill={color}
                    xmlns="http://www.w3.org/2000/svg"
                    className="hover:scale-110 transition-transform"
                  >
                    <title>{name}</title>
                    <path d={svg.path} />
                  </svg>
                </span>
              </Tippy>
            </motion.span>
          )
        )}
      </motion.div>
    </div>
  );
}
