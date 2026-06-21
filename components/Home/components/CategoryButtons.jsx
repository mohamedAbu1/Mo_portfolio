"use client";
import { motion } from "framer-motion";
import { LeftButtons } from "../../../app/style/HomeStyle";
import { useEffect, useState } from "react";

// استيراد الأيقونات المناسبة
import { FaGlobe, FaHospital, FaMobileAlt, FaLaptopCode, FaSuitcase, FaCog } from "react-icons/fa";
import { MdBusinessCenter } from "react-icons/md";

const CategoryButtons = ({ currentActive, handleClick, theme }) => {
  const [inView, setInView] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // تحديد إذا كان الجهاز موبايل
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    const section = document.getElementById("projects");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setInView(true);
        });
      },
      { threshold: 0.3 } // أقل شوية عشان يتفعل أسرع
    );
    if (section) observer.observe(section);
    return () => section && observer.unobserve(section);
  }, []);

  const buttons = [
    { key: "all", label: "All Projects", icon: FaGlobe },
    { key: "css", label: "Electronic Services", icon: FaCog },
    { key: "js", label: "Tourism Projects", icon: FaSuitcase },
    { key: "react", label: "Commercial Projects", icon: MdBusinessCenter },
    { key: "node", label: "Medical Projects", icon: FaHospital },
    { key: "mobile", label: "Mobile Apps", icon: FaMobileAlt },
    { key: "website", label: "Websites", icon: FaLaptopCode },
  ];

  // إعدادات الأنيميشن
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
  };

  const buttonVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  return (
    <LeftButtons style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        // لو موبايل → يظهر مباشرة، لو ديسكتوب → يظهر بأنيميشن عند inView
        animate={isMobile ? "visible" : inView ? "visible" : "hidden"}
        style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
      >
        {buttons.map(({ key, label, icon: Icon }) => (
          <motion.button
            key={key}
            variants={buttonVariants}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleClick(key)}
            style={{
              backgroundColor: currentActive === key ? theme.buttonPrimaryBg : theme.card,
              color: currentActive === key ? theme.buttonPrimaryText : theme.subText,
              border: `1px solid ${theme.border}`,
              padding: "0.7rem 1.4rem",
              borderRadius: "8px",
              cursor: "pointer",
              fontWeight: "500",
              display: "flex",
              alignItems: "center",
              gap: "0.6rem",
            }}
          >
            <Icon /> {label}
          </motion.button>
        ))}
      </motion.div>
    </LeftButtons>
  );
};

export default CategoryButtons;
