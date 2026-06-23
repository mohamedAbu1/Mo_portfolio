"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "@/context/ThemeContext";
import { useReviews } from "@/context/ReviewContext";
import ReviewForm from "./components/ReviewForm";
import ReviewCard from "./components/ReviewCard";
import { useAuth } from "@/context/AuthContext";
const Testimonials = ({ projectId }) => {
  const { theme } = useTheme();
  const { reviews, fetchReviews } = useReviews();
  const { isLoggedIn, user } = useAuth();

  const [page, setPage] = useState(0);
  const [inView, setInView] = useState(false);

  const itemsPerPage = 3;
  const totalPages = Math.ceil(reviews.length / itemsPerPage);
  const start = page * itemsPerPage;
  const currentItems = reviews.slice(start, start + itemsPerPage);

  useEffect(() => {
    fetchReviews();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setPage((prev) => (prev + 1) % totalPages);
    }, 30000);
    return () => clearInterval(interval);
  }, [totalPages]);

  useEffect(() => {
    const section = document.getElementById("testimonials");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setInView(true);
        });
      },
      { threshold: 0.6 },
    );
    if (section) observer.observe(section);
    return () => section && observer.unobserve(section);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
  };

  return (
    <motion.div
      id="testimonials"
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={containerVariants}
      style={{
        padding: "2rem",
        borderRadius: "12px",
        backgroundColor: theme.cardBg,
        color: theme.text,
        boxShadow: theme.shadow,
      }}
    >
      <motion.h2
        style={{
          textAlign: "start",
          fontSize: "clamp(2rem, 4vw, 2.8rem)",
          marginBottom: "2rem",
          fontWeight: "700",
          letterSpacing: "1px",
          backgroundImage: `linear-gradient(90deg, ${theme.primary}, ${theme.secondary})`,
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}
      >
        Client Testimonials
      </motion.h2>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          marginBottom: "2rem",
        }}
      ></div>

      {/* ✅ شرط تسجيل الدخول */}
      {/* ✅ شرط تسجيل الدخول مع استثناء الأدمن */}
      {user?.user_metadata?.role !== "admin" && (
        <>
          {isLoggedIn ? (
            <ReviewForm user={user} />
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              style={{
                marginBottom: "2rem",
                padding: "1rem",
                borderRadius: "10px",
                backgroundColor: theme.cardInnerBg,
                color: theme.subText,
                textAlign: "center",
                fontStyle: "italic",
                boxShadow: theme.shadow,
              }}
            >
              "You can leave a comment after logging in ✨"
            </motion.div>
          )}
        </>
      )}
      {/* ✅ عرض الريفيوهات */}
      <AnimatePresence mode="wait">
        <motion.div
          key={page}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          exit="hidden"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "1.5rem",
          }}
        >
          {currentItems
            .filter((r) => r.project_id === projectId)
            .map((item, index) => (
              <ReviewCard key={index} item={item} />
            ))}
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
};

export default Testimonials;
