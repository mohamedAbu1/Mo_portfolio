"use client";

import { useEffect, useState } from "react";
import { signIn, useSession } from "next-auth/react";
import { useTranslation } from "react-i18next";
import { FaComments, FaXmark, FaPaperPlane, FaGoogle, FaCircleCheck } from "react-icons/fa6";

const PROJECT_TOPICS = [0, 1];

export default function ChatWidgetProfessional() {
  const { data: session } = useSession();
  const { t, i18n } = useTranslation();
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const options = t("chat.options", { returnObjects: true });
  const responses = t("chat.responses", { returnObjects: true });
  useEffect(() => {
    if (!open) return undefined;
    let cancelled = false;
    const welcome = { id: "welcome", role: "bot", content: t("chat.welcome") };
    if (!session) { setMessages([welcome]); return undefined; }
    fetch("/api/chat").then((response) => response.json()).then((payload) => {
      if (!cancelled) setMessages([welcome, ...(payload.data || []).map((item) => ({ ...item, role: item.is_admin ? "admin" : "user" }))]);
    }).catch(() => { if (!cancelled) setMessages([welcome]); });
    return () => { cancelled = true; };
  }, [open, session, t, i18n.language]);

  function addBot(content, extra = {}) { setMessages((current) => [...current, { id: `${Date.now()}-${Math.random()}`, role: "bot", content, ...extra }]); }

  function chooseTopic(index) {
    const label = options[index];
    if (!label) return;
    setMessages((current) => [...current, { id: `${Date.now()}-user`, role: "user", content: label }]);
    addBot(responses[index] || t("chat.welcome"));
    if (PROJECT_TOPICS.includes(index) && !session) addBot(t("chat.signInPrompt"), { login: true });
    if (PROJECT_TOPICS.includes(index) && session) addBot(responses[index] || t("chat.welcome"));
  }

  async function send(event) {
    event.preventDefault();
    const content = text.trim();
    if (!content || loading) return;
    if (!session) { setMessages((current) => [...current, { id: `${Date.now()}-user`, role: "user", content }]); setText(""); addBot(t("chat.signInPrompt"), { login: true }); return; }
    setLoading(true); setText("");
    try {
      const response = await fetch("/api/chat", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ content }) });
      const payload = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(payload.error || t("contact.failed"));
      setMessages((current) => [...current, { id: `${Date.now()}-user`, role: "user", content }]);
      addBot(t("contact.sent"));
    } catch (error) { addBot(error.message || t("contact.failed")); } finally { setLoading(false); }
  }

  function login() { signIn("google", { callbackUrl: window.location.href }); }

  return session?.user?.role === "admin" ? null : <div className="chat-widget"><button className="chat-fab" onClick={() => setOpen((value) => !value)} aria-label={t("chat.title")}>{open ? <FaXmark /> : <FaComments />}<span>{t("chat.title")}</span></button>{open && <div className="chat-window professional-chat"><div className="chat-header"><div><strong>{t("chat.title")}</strong><small><span className="pulse" /> {t("chat.online")}</small></div><button onClick={() => setOpen(false)} aria-label={t("memorial.close")}><FaXmark /></button></div><div className="chat-messages">{messages.map((message) => <div key={message.id} className={`chat-message ${message.role === "user" ? "user" : "admin"}`}>{message.content}{message.login && <button className="chat-google-button" type="button" onClick={login}><FaGoogle /> {t("chat.continueGoogle")}</button>}<small>{message.role === "bot" && <FaCircleCheck />} {message.created_at ? new Date(message.created_at).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) : ""}</small></div>)}{messages.length === 1 && <div className="chat-quick-actions"><p>{t("chat.choose")}</p>{options.map((option, index) => <button key={option} type="button" onClick={() => chooseTopic(index)}>{option}</button>)}</div>}</div><form onSubmit={send} className="chat-form"><input value={text} onChange={(event) => setText(event.target.value)} placeholder={t("chat.input")} aria-label={t("chat.input")} /><button disabled={loading || !text.trim()} aria-label={t("contact.send")}><FaPaperPlane /></button></form></div>}</div>;
}
