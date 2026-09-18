"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { FaBell, FaComments, FaHeart, FaMessage, FaXmark } from "react-icons/fa6";
import { notifyBrowser, requestBrowserNotifications } from "@/lib/browserNotifications";

export default function AdminNotificationCenter({ stats }) {
  const [open, setOpen] = useState(null);
  const [data, setData] = useState({ messages: [], comments: [], likes: [] });
  const [loading, setLoading] = useState(false);
  const rootRef = useRef(null);
  const previousCounts = useRef({ messages: 0, activity: 0 });
  const [activitySeenAt, setActivitySeenAt] = useState(null);
  const activitySeenKey = "admin-activity-seen-at";

  useEffect(() => {
    const close = (event) => { if (rootRef.current && !rootRef.current.contains(event.target)) setOpen(null); };
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, []);

  async function load() {
    setLoading(true);
    try {
      const [messages, comments, likes] = await Promise.all([
        fetch("/api/admin/chat").then((r) => r.json()),
        fetch("/api/admin/comments").then((r) => r.json()),
        fetch("/api/admin/likes").then((r) => r.json()),
      ]);
      const seenAt = activitySeenAt || window.localStorage.getItem(activitySeenKey);
      const next = { messages: messages.data || [], comments: (comments.data || []).filter((item) => item.status === "pending"), likes: (likes.data || []).filter((item) => !seenAt || new Date(item.created_at) > new Date(seenAt)) };
      const nextMessages = next.messages.reduce((total, item) => total + Number(item.unread_count || 0), 0);
      const nextActivity = next.comments.length + next.likes.length;
      if (previousCounts.current.messages && nextMessages > previousCounts.current.messages) notifyBrowser("New client message", { body: "A client sent a new message in your inbox.", tag: "admin-chat" });
      if (previousCounts.current.activity && nextActivity > previousCounts.current.activity) notifyBrowser("New portfolio activity", { body: "A new comment or like needs your attention.", tag: "admin-activity" });
      previousCounts.current = { messages: nextMessages, activity: nextActivity };
      setData(next);
    } finally { setLoading(false); }
  }

  useEffect(() => {
    setActivitySeenAt(window.localStorage.getItem(activitySeenKey));
    requestBrowserNotifications().catch(() => {});
    load();
    const timer = window.setInterval(load, 5000);
    return () => window.clearInterval(timer);
  }, []);

  function markActivitySeen() {
    const seenAt = new Date().toISOString();
    window.localStorage.setItem(activitySeenKey, seenAt);
    setActivitySeenAt(seenAt);
    setData((current) => ({ ...current, likes: [] }));
  }

  function toggle(type) {
    const opening = open !== type;
    if (opening && type === "activity") markActivitySeen();
    setOpen((current) => current === type ? null : type);
    if (opening) load();
  }
  const messagesCount = data.messages.reduce((total, item) => total + Number(item.unread_count || 0), 0) || Number(stats?.messages || 0);
  const activityCount = data.comments.length + data.likes.length;

  return <div className="admin-notification-center" ref={rootRef}>
    <div className="admin-notification-actions">
      <button className={`notification-trigger ${open === "messages" ? "active" : ""}`} onClick={() => toggle("messages")} aria-label="Message notifications"><FaMessage />{messagesCount > 0 && <b>{messagesCount}</b>}</button>
      <button className={`notification-trigger ${open === "activity" ? "active" : ""}`} onClick={() => toggle("activity")} aria-label="Comment and like notifications"><FaBell />{activityCount > 0 && <b>{activityCount}</b>}</button>
    </div>
    {open && <div className="notification-popover">
      <div className="notification-popover-header"><div><span className="eyebrow">{open === "messages" ? "PRIVATE INBOX" : "AUDIENCE ACTIVITY"}</span><h2>{open === "messages" ? "Messages" : "Comments & likes"}</h2></div><button onClick={() => setOpen(null)} aria-label="Close notifications"><FaXmark /></button></div>
      {loading ? <p className="notification-empty">Loading activity…</p> : open === "messages" ? <NotificationList items={data.messages.slice(0, 5)} empty="No messages yet." icon={<FaComments />} render={(item) => <><strong>{item.last_sender || item.user_key}</strong><span>{item.last_message || "Conversation waiting for a reply."}</span></>} /> : <><NotificationList items={data.comments.slice(0, 4)} empty="No comments waiting for review." icon={<FaMessage />} render={(item) => <><strong>{item.author_name}</strong><span>{item.content}</span></>} /><NotificationList items={data.likes.slice(0, 4)} empty="No likes yet." icon={<FaHeart />} render={(item) => <><strong>{item.user_key}</strong><span>Liked {item.target_type.toLowerCase()}: {item.target}</span></>} /></>}
      <Link className="notification-view-all" href={open === "messages" ? "/en/dashboard/chat" : "/en/dashboard/comments"} onClick={() => setOpen(null)}>{open === "messages" ? "Open chat inbox" : "Review activity"} →</Link>
    </div>}
  </div>;
}

function NotificationList({ items, empty, icon, render }) {
  if (!items.length) return <p className="notification-empty">{empty}</p>;
  return <div className="notification-list">{items.map((item, index) => <article className="notification-item" key={item.id || `${item.target}-${index}`}><span className="notification-item-icon">{icon}</span><div>{render(item)}</div></article>)}</div>;
}
