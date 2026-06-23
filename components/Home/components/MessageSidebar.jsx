"use client";
import { motion } from "framer-motion";
import { FaTimes } from "react-icons/fa";
import { useState, useEffect } from "react";
import { useTheme } from "@/context/ThemeContext";
import { useAuth } from "@/context/AuthContext";
import { useMessages } from "@/context/MessageContext";
import MessageList from "./components/MessageList";
import MessageForm from "./components/MessageForm";

export default function MessageSidebar({ isOpen, onClose }) {
  const [message, setMessage] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [usersList, setUsersList] = useState([]);
  const { theme } = useTheme();
  const { user } = useAuth();
  const { messages, sendMessage, fetchMessages } = useMessages();

  const isAdmin = user?.user_metadata?.role === "admin";

  useEffect(() => {
    if (user?.id) {
      fetchMessages(user.id, isAdmin);
    }
  }, [user?.id, isAdmin]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch("/api/users");
        if (!res.ok) return console.error("❌ Fetch failed:", res.statusText);

        const json = await res.json();
        if (json.error) {
          console.error("❌ Error fetching users:", json.error);
        } else {
          setUsersList(
            (json.users || []).map((u) => ({
              user_id: u.id,
              user_name: u.user_metadata?.name,
              user_role: u.user_metadata?.role,
              user_image: u.user_metadata?.avatar_url || "/default-avatar.png",
            })),
          );
        }
      } catch (err) {
        console.error("❌ Fetch failed:", err.message);
      }
    };
    fetchUsers();
  }, []);

  const filteredMessages = isAdmin
    ? selectedUser
      ? messages.filter((msg) => msg.user_id === selectedUser.user_id)
      : []
    : messages.filter((msg) => msg.user_id === user?.id);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    await sendMessage({
      user_id: isAdmin ? selectedUser?.user_id : user?.id,
      content: message,
      sender_type: isAdmin ? "admin" : "user",
    });

    setMessage("");
  };

  return (
    <motion.div
      initial={{ x: "100%" }}
      animate={{ x: isOpen ? 0 : "100%" }}
      transition={{ duration: 0.6, ease: "easeInOut" }}
      style={{
        position: "fixed",
        top: 0,
        right: 0,
        height: "100vh",
        width: isAdmin ? "600px" : "400px",
        backgroundColor: theme.cardInnerBg,
        color: theme.text,
        boxShadow: "-2px 0 20px rgba(0,0,0,0.5)",
        zIndex: 3000,
        display: "flex",
        flexDirection: "row",
        borderLeft: `2px solid ${theme.border}`,
      }}
    >
      {/* زر الإغلاق */}
      <motion.button
        whileHover={{ scale: 1.2, color: theme.buttonPrimaryBg }}
        whileTap={{ scale: 0.9 }}
        onClick={onClose}
        style={{
          position: "absolute",
          top: "1rem",
          right: "1rem",
          background: "none",
          border: "none",
          color: theme.icon,
          fontSize: "1.6rem",
          cursor: "pointer",
        }}
      >
        <FaTimes />
      </motion.button>

      {isAdmin ? (
        <>
          {/* ✅ عمود المستخدمين */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            style={{
              width: "220px",
              borderRight: `1px solid ${theme.border}`,
              backgroundColor: theme.card,
              padding: "1rem",
              overflowY: "auto",
            }}
          >
            <h4 style={{ color: theme.title, marginBottom: "1rem" }}>Users</h4>
            {usersList
              .filter((u) => u.user_role !== "admin")
              .map((u) => (
                <motion.div
                  key={u.user_id}
                  whileHover={{
                    scale: 1.05,
                    backgroundColor: theme.cardInnerBg,
                  }}
                  onClick={() => setSelectedUser(u)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.6rem",
                    padding: "0.6rem",
                    borderRadius: "10px",
                    cursor: "pointer",
                    backgroundColor:
                      selectedUser?.user_id === u.user_id
                        ? theme.cardInnerBg
                        : "transparent",
                    transition: "all 0.3s ease",
                  }}
                >
                  <img
                    src={u.user_image}
                    alt={u.user_name}
                    style={{
                      width: "38px",
                      height: "38px",
                      borderRadius: "50%",
                      objectFit: "cover",
                      border: `1px solid ${theme.border}`,
                    }}
                  />
                  <span style={{ color: theme.text }}>{u.user_name}</span>
                </motion.div>
              ))}
          </motion.div>

          {/* ✅ نافذة الشات مع المستخدم المختار */}
          <div
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              padding: "1rem",
            }}
          >
            <h3 style={{ color: theme.title, marginBottom: "1rem" }}>
              {selectedUser
                ? `Chat with ${selectedUser.user_name}`
                : "Select a user"}
            </h3>

            <MessageList messages={filteredMessages} user={user}/>

            {selectedUser && (
              <MessageForm
                message={message}
                setMessage={setMessage}
                handleSend={handleSend}
              />
            )}
          </div>
        </>
      ) : (
        // ✅ واجهة المستخدم العادي
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            padding: "1rem",
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            style={{ textAlign: "center", marginBottom: "1.5rem" }}
          >
            <h3
              style={{
                color: theme.title,
                marginBottom: "0.3rem",
                fontSize: "1.6rem",
                fontWeight: "bold",
              }}
            >
              💬 My Messages
            </h3>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              style={{
                color: theme.subText,
                fontSize: "0.9rem",
                fontStyle: "italic",
              }}
            >
              Connect & talk with me
            </motion.p>
          </motion.div>

          <MessageList messages={filteredMessages}  user={user}/>

          <MessageForm
            message={message}
            setMessage={setMessage}
            handleSend={handleSend}
          />
        </div>
      )}
    </motion.div>
  );
}
