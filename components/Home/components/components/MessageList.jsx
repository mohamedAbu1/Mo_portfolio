"use client";
import { useTheme } from "@/context/ThemeContext";
import MessageItem from "./MessageItem";

export default function MessageList({ messages }) {
  const { theme } = useTheme();

  return (
    <div
      style={{
        flex: 1,
        overflowY: "auto",
        marginBottom: "1rem",
        backgroundColor: theme.card,
        borderRadius: "10px",
        padding: "0.8rem",
        boxShadow: theme.shadow,
      }}
    >
      {messages.length === 0 ? (
        <p style={{ fontStyle: "italic", color: theme.subText, textAlign: "center" }}>
          No messages yet...
        </p>
      ) : (
        messages.map((msg) => <MessageItem key={msg.id} msg={msg} />)
      )}
    </div>
  );
}
