"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import { FaArrowLeft, FaArrowRightFromBracket, FaComments, FaPaperPlane } from "react-icons/fa6";

export default function AdminChatPage() {
  const { data: session, status } = useSession();
  const [conversations, setConversations] = useState([]);
  const [selected, setSelected] = useState(null);
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [notice, setNotice] = useState("");

  async function loadConversations() {
    const response = await fetch("/api/admin/chat");
    const payload = await response.json();
    if (response.ok) setConversations(payload.data || []);
  }

  async function openConversation(conversation) {
    setSelected(conversation);
    const response = await fetch(`/api/admin/chat?conversationId=${conversation.id}`);
    const payload = await response.json();
    if (response.ok) {
      setMessages(payload.data || []);
      setConversations((items) => items.map((item) => item.id === conversation.id ? { ...item, unread_count: 0 } : item));
    }
  }

  useEffect(() => {
    if (status !== "authenticated" || session?.user?.role !== "admin") return;
    loadConversations().catch(() => setNotice("Unable to load conversations."));
  }, [status, session]);

  useEffect(() => {
    if (status !== "authenticated" || session?.user?.role !== "admin") return undefined;
    const refresh = async () => {
      await loadConversations();
      if (selected?.id) {
        const response = await fetch(`/api/admin/chat?conversationId=${selected.id}`, { cache: "no-store" });
        const payload = await response.json();
        if (response.ok) setMessages(payload.data || []);
      }
    };
    const timer = window.setInterval(refresh, 4000);
    return () => window.clearInterval(timer);
  }, [status, session, selected?.id]);

  async function sendReply(event) {
    event.preventDefault();
    if (!selected || !text.trim() || loading) return;
    setLoading(true); setNotice("");
    try {
      const response = await fetch("/api/admin/chat", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ conversationId: selected.id, content: text }) });
      const payload = await response.json();
      if (!response.ok) throw new Error(payload.error || "Unable to send reply.");
      setText(""); await openConversation(selected); await loadConversations();
    } catch (error) { setNotice(error.message); } finally { setLoading(false); }
  }

  if (status === "loading") return <main className="dashboard-page"><div className="dashboard-loading">Loading inbox…</div></main>;
  if (!session || session.user?.role !== "admin") return <main className="dashboard-page"><div className="dashboard-loading"><h1>Access required</h1><Link className="button primary" href="/en/login">Go to login</Link></div></main>;

  return <main className="dashboard-page admin-chat-page"><aside className="dashboard-sidebar"><Link className="brand" href="/en"><img className="brand-logo" src="/images/mohamed-abu-logo.svg" alt="Mohamed Abu" /></Link><Link className="dashboard-back-site" href="/en/dashboard"><FaArrowLeft /> Dashboard</Link><div className="dashboard-user"><img src={session.user?.image || "/images/MyPic.webp"} alt="" /><div><strong>{session.user?.name || "Admin"}</strong><small>Administrator</small></div></div><nav><Link href="/en/dashboard"><FaComments /> Overview</Link><Link className="active" href="/en/dashboard/chat"><FaComments /> Chat inbox</Link><Link href="/en/dashboard/comments"><FaComments /> Comments</Link></nav><button className="logout-button" onClick={() => signOut({ callbackUrl: "/en" })}><FaArrowRightFromBracket /> Sign out</button></aside><section className="dashboard-main"><header className="dashboard-header"><div><p className="eyebrow">PRIVATE INBOX / 01</p><h1>Client conversations.</h1></div><span className="inbox-status"><span className="pulse" /> Secure admin channel</span></header><div className="admin-chat-layout"><section className="conversation-list"><div className="panel-heading"><div><p className="eyebrow">INBOX</p><h2>{conversations.length} conversations</h2></div></div>{conversations.length === 0 ? <p className="panel-copy">No conversations yet.</p> : conversations.map((conversation) => <button type="button" key={conversation.id} className={`conversation-item${selected?.id === conversation.id ? " selected" : ""}`} onClick={() => openConversation(conversation)}><span className="conversation-avatar"><FaComments /></span><span className="conversation-copy"><strong>{conversation.last_sender || conversation.user_key}</strong><small>{conversation.last_message || "No messages yet"}</small></span>{Number(conversation.unread_count) > 0 && <b className="conversation-unread">{conversation.unread_count}</b>}</button>)}</section><section className="admin-chat-panel"><div className="panel-heading"><div><p className="eyebrow">{selected ? selected.user_key : "SELECT A CONVERSATION"}</p><h2>{selected ? "Conversation" : "Your private inbox"}</h2></div></div><div className="admin-chat-messages">{!selected ? <div className="chat-empty-state"><FaComments /><p>Select a conversation to read and reply.</p></div> : messages.map((message) => <article key={message.id} className={`admin-message ${message.is_admin ? "from-admin" : "from-user"}`}><div><strong>{message.sender_name}</strong><time>{new Date(message.created_at).toLocaleString()}</time></div><p>{message.content}</p></article>)}</div>{selected && <form className="admin-chat-form" onSubmit={sendReply}><textarea value={text} onChange={(event) => setText(event.target.value)} placeholder="Write a private reply…" maxLength={2000} /><button className="button primary" disabled={loading || !text.trim()}><FaPaperPlane /> {loading ? "Sending…" : "Send reply"}</button></form>}{notice && <p className="comment-notice">{notice}</p>}</section></div></section></main>;
}
