"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "@/context/ThemeContext";
import MessageItem from "./MessageItem";

export default function MessageList({ messages,user }) {
  const { theme } = useTheme();
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      style={{
        flex: 1,
        overflowY: "auto",
        marginBottom: "1rem",
        backgroundColor: theme.card,
        borderRadius: "12px",
        padding: "1rem",
        boxShadow: theme.shadow,
        border: `1px solid ${theme.border}`,
      }}
    >
      {messages.length === 0 ? (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
          style={{
            fontStyle: "italic",
            color: theme.subText,
            textAlign: "center",
            padding: "1rem",
          }}
        >
          Hello,{" "}
          <span style={{ fontWeight: "bold",textTransform: "capitalize" }}>
            {user?.user_metadata?.name || "User"}
          </span>
          ! You have no messages yet. Start a conversation by sending a message!
        </motion.p>
      ) : (
        <AnimatePresence>
          {messages.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <MessageItem msg={msg} />
            </motion.div>
          ))}
        </AnimatePresence>
      )}
    </motion.div>
  );
}
