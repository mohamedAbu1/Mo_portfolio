"use client";

import Link from "next/link";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import {
  FaTwitter,
  FaInstagram,
  FaGithub,
  FaLinkedin,
  FaFacebook,
  FaWhatsapp,
  FaEnvelope,
  FaYoutube,
} from "react-icons/fa";
import { motion } from "framer-motion";

export default function SocialIcons() {
  const icons = [
    { name: "Twitter", href: "https://x.com/MohamedAhm20475", color: "#1DA1F2", icon: FaTwitter },
    { name: "Instagram", href: "https://www.instagram.com/mohamedahmed33m11/", color: "#E1306C", icon: FaInstagram },
    { name: "GitHub", href: "https://github.com/mohamedAbu1", color: "#333", icon: FaGithub },
    { name: "LinkedIn", href: "https://www.linkedin.com/in/mohamed-ahmed-a993b729b/", color: "#0077B5", icon: FaLinkedin },
    { name: "Facebook", href: "https://www.facebook.com/share/1AeawYzziL/?mibextid=wwXIfr", color: "#1877F2", icon: FaFacebook },
    { name: "WhatsApp", href: "https://wa.me/201234567890", color: "#25D366", icon: FaWhatsapp },
    { name: "Email", href: "mailto:yourmail@example.com", color: "#D44638", icon: FaEnvelope },
    { name: "YouTube", href: "https://www.youtube.com/@M_Developer", color: "#D44638", icon: FaYoutube },
  ];

  // إعدادات الأنيميشن
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }, // كل أيقونة تظهر بعد الأخرى
    },
  };

  const iconVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      style={{
        display: "flex",
        flexWrap: "wrap",
        gap: "2rem",
        fontSize: "clamp(1.8rem, 2vw, 1.8rem)",
        width: "100%",
        padding: "1rem 0",
      }}
    >
      {icons.map(({ name, href, color, icon: Icon }) => (
        <motion.span key={name} variants={iconVariants}>
          <Tippy
            theme={name}
            content={
              <span className="bg-white text-black px-2 py-1 rounded shadow">
                {name}
              </span>
            }
          >
            <Link href={href} target="_blank" rel="noopener noreferrer">
              <Icon
                className="hover:scale-110 transition-transform"
                color={color}
              />
            </Link>
          </Tippy>
        </motion.span>
      ))}
    </motion.div>
  );
}
