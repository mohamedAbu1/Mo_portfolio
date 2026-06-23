"use client";
import { FaPaperPlane } from "react-icons/fa";
import { useTheme } from "@/context/ThemeContext";

export default function MessageForm({ message, setMessage, handleSend }) {
  const { theme } = useTheme();

  return (
    <form onSubmit={handleSend} style={{ display: "flex", gap: "0.5rem" }}>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type your message..."
        style={{
          flex: 1,
          padding: "0.6rem",
          borderRadius: "8px",
          border: `1px solid ${theme.border}`,
          backgroundColor: theme.card,
          color: theme.text,
        }}
      />
      <button
        type="submit"
        style={{
          backgroundColor: theme.buttonPrimaryBg,
          color: theme.buttonPrimaryText,
          border: "none",
          borderRadius: "8px",
          padding: "0.6rem 1rem",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          gap: "0.4rem",
        }}
      >
        <FaPaperPlane /> Send
      </button>
    </form>
  );
}
