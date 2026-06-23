"use client";
import { motion } from "framer-motion";
import { FaPaperPlane } from "react-icons/fa";
import { useTheme } from "@/context/ThemeContext";

export default function MessageForm({ message, setMessage, handleSend }) {
  const { theme } = useTheme();

  return (
    <motion.form
      onSubmit={handleSend}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      style={{
        display: "flex",
        gap: "0.6rem",
        padding: "0.5rem",
        backgroundColor: theme.cardInnerBg,
        borderRadius: "12px",
        border: `1px solid ${theme.border}`,
      }}
    >
      {/* حقل إدخال الرسالة */}
      <motion.input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type your message..."
        whileFocus={{ scale: 1.02, boxShadow: theme.shadow }}
        style={{
          flex: 1,
          padding: "0.7rem",
          borderRadius: "8px",
          border: `1px solid ${theme.border}`,
          backgroundColor: theme.card,
          color: theme.text,
          outline: "none",
          transition: "all 0.3s ease",
        }}
      />

      {/* زر الإرسال */}
      <motion.button
        type="submit"
        whileHover={{ scale: 1.05, backgroundColor: theme.buttonHoverBg }}
        whileTap={{ scale: 0.95 }}
        style={{
          backgroundColor: theme.buttonPrimaryBg,
          color: theme.buttonPrimaryText,
          border: "none",
          borderRadius: "8px",
          padding: "0.7rem 1.2rem",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          gap: "0.5rem",
          fontWeight: "bold",
          transition: "all 0.3s ease",
        }}
      >
        <FaPaperPlane /> Send
      </motion.button>
    </motion.form>
  );
}
