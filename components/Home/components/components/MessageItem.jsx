"use client";
import { motion } from "framer-motion";
import { FaTrash, FaEdit, FaCheck } from "react-icons/fa";
import { useTheme } from "@/context/ThemeContext";
import { useAuth } from "@/context/AuthContext";
import { useMessages } from "@/context/MessageContext";
import { useState } from "react";

export default function MessageItem({ msg }) {
  const { theme } = useTheme();
  const { user } = useAuth();
  const { deleteMessage, editMessage } = useMessages();

  const [isEditing, setIsEditing] = useState(false);
  const [newContent, setNewContent] = useState(msg.content);

  const handleEdit = async () => {
    await editMessage(msg.id, newContent);
    setIsEditing(false);
  };

  return (
    <motion.div
      key={msg.id}
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      whileHover={{
        scale: 1.02,
        boxShadow: theme.shadow,
      }}
      style={{
        backgroundColor: theme.cardInnerBg,
        border: `1px solid ${theme.border}`,
        borderRadius: "12px",
        padding: "0.8rem",
        marginBottom: "0.8rem",
        display: "flex",
        alignItems: "center",
        gap: "0.8rem",
        transition: "all 0.3s ease",
      }}
    >
      {/* صورة المستخدم */}
      <motion.img
        src={msg.user_image || "/default-avatar.png"}
        alt={msg.user_name}
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.3 }}
        style={{
          width: "40px",
          height: "40px",
          borderRadius: "50%",
          objectFit: "cover",
          border: `2px solid ${theme.border}`,
        }}
      />

      {/* تفاصيل الرسالة */}
      <div style={{ flex: 1 }}>
        <strong style={{ color: theme.title }}>{msg.user_name}</strong>

        {isEditing ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            style={{ display: "flex", gap: "0.5rem", marginTop: "0.4rem" }}
          >
            <input
              type="text"
              value={newContent}
              onChange={(e) => setNewContent(e.target.value)}
              style={{
                flex: 1,
                padding: "0.4rem",
                borderRadius: "6px",
                border: `1px solid ${theme.border}`,
                backgroundColor: theme.card,
                color: theme.text,
              }}
            />
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleEdit}
              style={{
                background: theme.buttonPrimaryBg,
                border: "none",
                color: theme.buttonPrimaryText,
                cursor: "pointer",
                fontSize: "1.2rem",
                borderRadius: "6px",
                padding: "0.4rem 0.6rem",
              }}
            >
              <FaCheck />
            </motion.button>
          </motion.div>
        ) : (
          <p style={{ margin: "0.4rem 0", color: theme.text }}>{msg.content}</p>
        )}

        <small style={{ color: theme.subText }}>
          {new Date(msg.created_at).toLocaleString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
          })}
        </small>
        <span
          style={{
            marginLeft: "0.6rem",
            fontSize: "0.75rem",
            fontWeight: "bold",
            color:
              msg.status === "sent"
                ? "green"
                : msg.status === "seen"
                ? "blue"
                : msg.status === "error"
                ? "red"
                : theme.subText,
          }}
        >
          {msg.status}
        </span>
      </div>

      {/* أزرار التحكم */}
      {user?.role === "admin" ? (
        // ✅ الأدمن يقدر يحذف أي رسالة
        <motion.button
          whileHover={{ scale: 1.2, color: "darkred" }}
          whileTap={{ scale: 0.9 }}
          onClick={() => deleteMessage(msg.id)}
          style={{
            background: "none",
            border: "none",
            color: "red",
            cursor: "pointer",
            fontSize: "1.3rem",
          }}
        >
          <FaTrash />
        </motion.button>
      ) : user?.id === msg.user_id && msg.sender_type !== "admin" ? (
        // ✅ المستخدم يقدر يعدل رسالته فقط إذا لم تكن رسالة أدمن
        <motion.button
          whileHover={{ scale: 1.2, color: theme.buttonPrimaryBg }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setIsEditing(true)}
          style={{
            background: "none",
            border: "none",
            color: theme.buttonPrimaryText,
            cursor: "pointer",
            fontSize: "1.3rem",
          }}
        >
          <FaEdit />
        </motion.button>
      ) : null}
    </motion.div>
  );
}
