"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaStar } from "react-icons/fa";
import { useTheme } from "@/context/ThemeContext";

const testimonials = [
  {
    name: "John Smith",
    role: "Client",
    date: "June 10, 2026",
    comment: "The service was excellent and exceeded my expectations!",
    image: "/images/3d-avatar-cartoon-character_113255-92170.webp",
    rating: 5,
  },
  {
    name: "Emily Johnson",
    role: "Designer",
    date: "June 12, 2026",
    comment: "The UI is clean and professional. I loved the experience.",
    image: "/images/bjlsd.webp",
    rating: 4,
  },
  {
    name: "Michael Brown",
    role: "Developer",
    date: "June 15, 2026",
    comment: "The code quality is outstanding and very well structured.",
    image: "/images/usa.webp",
    rating: 5,
  },
  {
    name: "Sophia Davis",
    role: "Manager",
    date: "June 16, 2026",
    comment: "Great communication and timely delivery. Highly recommended!",
    image:
      "/images/3d-rendered-photo-woman-wearing-glasses-smiles-camera_1103059-4400.webp",
    rating: 5,
  },
  {
    name: "David Wilson",
    role: "Engineer",
    date: "June 17, 2026",
    comment: "The technical implementation was flawless and efficient.",
    image: "/images/3d-avatar-cartoon-character_113255-93687.webp",
    rating: 4,
  },
  {
    name: "Olivia Taylor",
    role: "Marketer",
    date: "June 18, 2026",
    comment: "Creative ideas and excellent execution. Loved the results!",
    image:
      "/images/3d-rendered-photo-woman-wearing-glasses-smiles-camera_1103059-4319.webp",
    rating: 5,
  },
];

const Testimonials = () => {
  const { theme } = useTheme();
  const [page, setPage] = useState(0);

  const itemsPerPage = 3;
  const totalPages = Math.ceil(testimonials.length / itemsPerPage);
  const start = page * itemsPerPage;
  const currentItems = testimonials.slice(start, start + itemsPerPage);

  // Auto change every 30 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setPage((prev) => (prev + 1) % totalPages);
    }, 30000); // 30000ms = 30 seconds

    return () => clearInterval(interval);
  }, [totalPages]);

  return (
    <div
      style={{
        padding: "2rem",
        borderRadius: "12px",
        backgroundColor: theme.cardBg,
        color: theme.text,
        boxShadow: theme.shadow,
        transition: "background-color 0.3s ease, color 0.3s ease",
      }}
    >
      <h2
        style={{
          textAlign: "center",
          fontSize: "clamp(2rem, 4vw, 2.8rem)", // متجاوب
          marginBottom: "2rem",
          fontWeight: "700",
          letterSpacing: "1px",
          backgroundImage: `linear-gradient(90deg, ${theme.primary}, ${theme.secondary})`,
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          display: "inline-block", // مهم علشان يظهر النص
        }}
      >
        Client Testimonials
      </h2>

      {/* خط سفلي متدرج */}
      <div
        style={{
          width: "180px",
          height: "4px",
          margin: "0 auto 2rem 0",
          borderRadius: "2px",
          background: `linear-gradient(90deg, ${theme.primary}, ${theme.secondary})`,
          animation: "slideIn 1s ease forwards",
        }}
      ></div>

      <AnimatePresence mode="wait">
        <motion.div
          key={page}
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 }}
          transition={{ duration: 0.6 }}
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "1.5rem",
          }}
        >
          {currentItems.map((item, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05 }}
              style={{
                backgroundColor: theme.cardInnerBg,
                color: theme.text,
                padding: "1.5rem",
                borderRadius: "10px",
                boxShadow: theme.shadow,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                textAlign: "center",
              }}
            >
              <img
                src={item.image}
                alt={item.name}
                style={{
                  width: "80px",
                  height: "80px",
                  borderRadius: "50%",
                  objectFit: "cover",
                  marginBottom: "1rem",
                  boxShadow: theme.shadow,
                }}
              />
              <p style={{ fontStyle: "italic", marginBottom: "1rem" }}>
                "{item.comment}"
              </p>
              <h4 style={{ margin: 0 }}>{item.name}</h4>
              <span style={{ fontSize: "0.9rem", color: theme.subText }}>
                {item.role}
              </span>
              <span
                style={{
                  fontSize: "0.8rem",
                  color: theme.muted,
                  marginTop: "0.5rem",
                }}
              >
                {item.date}
              </span>
              <div
                style={{ display: "flex", gap: "0.2rem", marginTop: "0.8rem" }}
              >
                {[...Array(item.rating)].map((_, i) => (
                  <FaStar key={i} color={theme.starColor || "#FFD700"} />
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default Testimonials;
