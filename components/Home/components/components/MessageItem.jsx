"use client";
import { motion } from "framer-motion";
import { FaTrash } from "react-icons/fa";
import { useTheme } from "@/context/ThemeContext";
import { useAuth } from "@/context/AuthContext";
import { useMessages } from "@/context/MessageContext";

export default function MessageItem({ msg }) {
  const { theme } = useTheme();
  const { user } = useAuth();
  const { deleteMessage } = useMessages();

  return (
    <motion.div
      key={msg.id}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      style={{
        backgroundColor: theme.cardInnerBg,
        border: `1px solid ${theme.border}`,
        borderRadius: "8px",
        padding: "0.6rem",
        marginBottom: "0.6rem",
        display: "flex",
        alignItems: "center",
        gap: "0.6rem",
      }}
    >
      {/* صورة المستخدم */}
      <img
        src={msg.user_image || "/default-avatar.png"}
        alt={msg.user_name}
        style={{
          width: "35px",
          height: "35px",
          borderRadius: "50%",
          objectFit: "cover",
          border: `1px solid ${theme.border}`,
        }}
      />

      {/* تفاصيل الرسالة */}
      <div style={{ flex: 1 }}>
        <strong>{msg.user_name}</strong>
        <p style={{ margin: "0.3rem 0", color: theme.text }}>{msg.content}</p>
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
            marginLeft: "0.5rem",
            fontSize: "0.75rem",
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

      {/* زر الحذف */}
      {user?.id === msg.user_id && (
        <button
          onClick={() => deleteMessage(msg.id)}
          style={{
            background: "none",
            border: "none",
            color: "red",
            cursor: "pointer",
            fontSize: "1.2rem",
          }}
        >
          <FaTrash />
        </button>
      )}
    </motion.div>
  );
}
