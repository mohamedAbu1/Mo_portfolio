/* eslint-disable react-hooks/set-state-in-effect */
"use client";
import React, { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "./AuthContext";
import { supabase } from "@/lib/supabaseClient";

const MessageContext = createContext();

export function MessageProvider({ children }) {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  // ✅ جلب رسائل المستخدم الحالي أو كل الرسائل للأدمن
  const fetchMessages = async (userId, isAdmin = false) => {
    setLoading(true);
    try {
      const res = await fetch(isAdmin ? "/api/messages" : `/api/messages?userId=${userId}`);
      const data = await res.json();
      setMessages(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("❌ Error fetching messages:", err.message);
    } finally {
      setLoading(false);
    }
  };

  // ✅ إرسال رسالة جديدة عبر الـ API
  const sendMessage = async ({
    user_id,
    content,
    sender_type,
    status = "sent",
  }) => {
    const payload = {
      user_id,
      user_name:
        sender_type === "admin"
          ? user?.user_metadata?.name || "Admin"
          : user?.user_metadata?.name || "Unknown User",
      user_image:
        user?.user_metadata?.picture ||
        user?.user_metadata?.avatar_url ||
        user?.user_metadata?.avatar ||
        "/default-avatar.png",
      content,
      sender_type,
      status,
      admin_id: sender_type === "admin" ? user?.id : null, // ✅ ربط رسالة الأدمن
    };

    const tempMessage = {
      ...payload,
      id: Date.now(),
      status: "pending",
    };
    setMessages((prev) => [...prev, tempMessage]);

    try {
      const res = await fetch("/api/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();

      if (data?.error) {
        console.error("❌ Error sending message:", data.error);
        setMessages((prev) =>
          prev.map((msg) =>
            msg.id === tempMessage.id ? { ...msg, status: "error" } : msg
          )
        );
      } else {
        const newMessage = Array.isArray(data) ? data[0] : data;
        setMessages((prev) =>
          prev.map((msg) =>
            msg.id === tempMessage.id
              ? { ...msg, ...newMessage, status: "sent" }
              : msg
          )
        );
      }

      return data;
    } catch (err) {
      console.error("❌ Error sending message:", err.message);
    }
  };

  // ✅ تعديل رسالة (للمستخدم صاحب الرسالة فقط)
const editMessage = async (messageId, newContent) => {
  try {
    const res = await fetch("/api/messages", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: messageId, content: newContent }),
    });

    if (!res.ok) {
      console.error("❌ Error editing message:", res.statusText);
      return;
    }

    const data = await res.json();

    if (data?.error) {
      console.error("❌ Error editing message:", data.error);
    } else {
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === messageId ? { ...msg, content: newContent } : msg
        )
      );
    }
    return data;
  } catch (err) {
    console.error("❌ Error editing message:", err.message);
  }
};


  // ✅ تحديث حالة الرسالة إلى "seen"
  const markMessageSeen = async (messageId) => {
    try {
      const res = await fetch("/api/messages", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: messageId, status: "seen" }),
      });
      const data = await res.json();

      if (!data.error) {
        setMessages((prev) =>
          prev.map((msg) =>
            msg.id === messageId ? { ...msg, status: "seen" } : msg
          )
        );
      } else {
        console.error("❌ Error marking message seen:", data.error);
      }
      return data;
    } catch (err) {
      console.error("❌ Error marking message seen:", err.message);
    }
  };

  // ✅ حذف رسالة (للأدمن فقط)
  const deleteMessage = async (messageId) => {
    try {
      const res = await fetch(`/api/messages?id=${messageId}`, {
        method: "DELETE",
      });
      const data = await res.json();

      if (!data.error) {
        setMessages((prev) => prev.filter((msg) => msg.id !== messageId));
      } else {
        console.error("❌ Error deleting message:", data.error);
      }
      return data;
    } catch (err) {
      console.error("❌ Error deleting message:", err.message);
    }
  };

  // ✅ يجلب الرسائل عند تحميل المستخدم
  useEffect(() => {
    if (user?.id) {
      const isAdmin = user?.user_metadata?.role === "admin";
      fetchMessages(user.id, isAdmin);
    }
  }, [user?.id]);

  // ✅ Realtime Subscriptions
  useEffect(() => {
    const channel = supabase
      .channel("messages-channel")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "messages" },
        (payload) => {
          setMessages((prev) => {
            if (prev.find((msg) => msg.id === payload.new.id)) return prev;
            return [...prev, payload.new];
          });
        }
      )
      .on(
        "postgres_changes",
        { event: "UPDATE", schema: "public", table: "messages" },
        (payload) => {
          setMessages((prev) =>
            prev.map((msg) => (msg.id === payload.new.id ? payload.new : msg))
          );
        }
      )
      .on(
        "postgres_changes",
        { event: "DELETE", schema: "public", table: "messages" },
        (payload) => {
          setMessages((prev) =>
            prev.filter((msg) => msg.id !== payload.old.id)
          );
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return (
    <MessageContext.Provider
      value={{
        messages,
        loading,
        fetchMessages,
        sendMessage,
        editMessage, // ✅ جديد
        markMessageSeen,
        deleteMessage,
      }}
    >
      {children}
    </MessageContext.Provider>
  );
}

export const useMessages = () => useContext(MessageContext);
