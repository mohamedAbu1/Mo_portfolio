"use client";
import { motion } from "framer-motion";
import { FaTimes } from "react-icons/fa";
import { useState, useEffect } from "react";
import { useTheme } from "@/context/ThemeContext";
import { useAuth } from "@/context/AuthContext";
import { useMessages } from "@/context/MessageContext";
import { supabase } from "@/lib/supabaseClient"; // ✅ استيراد Supabase Client
import MessageList from "./components/MessageList";
import MessageForm from "./components/MessageForm";

export default function MessageSidebar({ isOpen, onClose }) {
  const [message, setMessage] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [usersList, setUsersList] = useState([]); // ✅ قائمة المستخدمين من Auth
  const { theme } = useTheme();
  const { user } = useAuth();
  const { messages, sendMessage, fetchMessages } = useMessages();

  const isAdmin = user?.user_metadata?.role === "admin";

  // ✅ جلب الرسائل
  useEffect(() => {
    if (user?.id) {
      fetchMessages(user.id, isAdmin);
    }
  }, [user?.id, isAdmin]);

  // ✅ جلب جميع المستخدمين من Supabase Auth
  useEffect(() => {
    const fetchUsers = async () => {
      const { data, error } = await supabase.auth.admin.listUsers();

      if (!error) {
        setUsersList(
          data.users.map((u) => ({
            user_id: u.id,
            user_name: u.user_metadata?.name || u.email,
            user_image:
              u.user_metadata?.avatar_url ||
              u.user_metadata?.picture ||
              "/default-avatar.png",
          }))
        );
      } else {
        console.error("❌ Error fetching users:", error.message);
      }
    };

    fetchUsers();
  }, []);

  // ✅ فلترة الرسائل حسب المستخدم المختار
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
      transition={{ duration: 0.5, ease: "easeInOut" }}
      style={{
        position: "fixed",
        top: 0,
        right: 0,
        height: "100vh",
        width: isAdmin ? "600px" : "400px",
        backgroundColor: theme.cardInnerBg,
        color: theme.text,
        boxShadow: "-2px 0 15px rgba(0,0,0,0.4)",
        zIndex: 3000,
        display: "flex",
        flexDirection: "row",
      }}
    >
      {/* زر الإغلاق */}
      <div style={{ position: "absolute", top: "1rem", right: "1rem" }}>
        <button
          onClick={onClose}
          style={{
            background: "none",
            border: "none",
            color: theme.icon,
            fontSize: "1.4rem",
            cursor: "pointer",
          }}
        >
          <FaTimes />
        </button>
      </div>

      {isAdmin ? (
        <>
          {/* ✅ عمود المستخدمين */}
          <div
            style={{
              width: "200px",
              borderRight: `1px solid ${theme.border}`,
              backgroundColor: theme.card,
              padding: "1rem",
              overflowY: "auto",
            }}
          >
            <h4 style={{ color: theme.title, marginBottom: "1rem" }}>Users</h4>
            {usersList.map((u) => (
              <div
                key={u.user_id}
                onClick={() => setSelectedUser(u)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.6rem",
                  padding: "0.5rem",
                  borderRadius: "8px",
                  cursor: "pointer",
                  backgroundColor:
                    selectedUser?.user_id === u.user_id
                      ? theme.cardInnerBg
                      : "transparent",
                }}
              >
                <img
                  src={u.user_image}
                  alt={u.user_name}
                  style={{
                    width: "35px",
                    height: "35px",
                    borderRadius: "50%",
                    objectFit: "cover",
                  }}
                />
                <span>{u.user_name}</span>
              </div>
            ))}
          </div>

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

            <MessageList messages={filteredMessages} />

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
          <h3
            style={{
              color: theme.title,
              marginBottom: "1rem",
              textAlign: "center",
            }}
          >
            💬 My Messages
          </h3>

          <MessageList messages={filteredMessages} />

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
