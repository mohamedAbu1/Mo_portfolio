"use client";
import React from "react";
import { motion } from "framer-motion";
import { FaStar, FaTrash } from "react-icons/fa";
import { useTheme } from "@/context/ThemeContext";
import { useAuth } from "@/context/AuthContext";
import { useReviews } from "@/context/ReviewContext"; // ✅ استدعاء الـ context

const ReviewCard = ({ item }) => {
  const { theme } = useTheme();
  const { user } = useAuth();
  const { deleteReview } = useReviews(); // ✅ دالة الحذف من الـ context

  const handleDelete = async () => {
    try {
      await deleteReview(item.id); // ✅ استدعاء الدالة مباشرة
      console.log("Review deleted successfully");
    } catch (err) {
      console.error("Error deleting review:", err.message);
    }
  };

  // ✅ الشرط: الأدمن أو صاحب التعليق نفسه
  const canDelete =
    user?.user_metadata?.role === "admin" || user?.id === item.user_id;

  return (
    <motion.div
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
        position: "relative",
      }}
    >
      {/* ✅ صورة المستخدم */}
      <img
        src={item.avatar_url === null ? "/avatar/3d-rendered-photo-woman-wearing-glasses-smiles-camera_1103059-4400.webp" : item.avatar_url}
        alt={item.name}
        style={{
          width: "70px",
          height: "70px",
          borderRadius: "50%",
          objectFit: "cover",
          marginBottom: "1rem",
          border: `2px solid ${theme.border}`,
        }}
      />

      {/* ✅ اسم المستخدم */}
      <h4 style={{ margin: "0.5rem 0", fontWeight: "bold", textTransform: "capitalize" }}>
        {item.name}
      </h4>

      {/* ✅ التعليق */}
      <p style={{ fontStyle: "italic", marginBottom: "1rem", textTransform: "capitalize" }}>
        "{item.comment}"
      </p>

      {/* ✅ التاريخ */}
      <span
        style={{
          fontSize: "0.9rem",
          fontWeight: "bold",
          color: theme.subText,
          marginTop: "0.5rem",
        }}
      >
        {new Date(item.created_at).toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        })}
      </span>

      {/* ✅ التقييم بالنجوم */}
      <div style={{ display: "flex", gap: "0.2rem", marginTop: "0.8rem" }}>
        {[...Array(item.rating)].map((_, i) => (
          <FaStar key={i} color={theme.text || "#FFD700"} />
        ))}
      </div>

      {/* ✅ زر الحذف يظهر فقط للأدمن أو صاحب التعليق */}
      {canDelete && (
        <motion.button
          onClick={handleDelete}
          whileHover={{ scale: 1.1 }}
          style={{
            marginTop: "1rem",
            backgroundColor: "red",
            color: "white",
            border: "none",
            borderRadius: "6px",
            padding: "0.4rem 0.8rem",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: "0.3rem",
          }}
        >
          <FaTrash /> Delete
        </motion.button>
      )}
    </motion.div>
  );
};

export default ReviewCard;
