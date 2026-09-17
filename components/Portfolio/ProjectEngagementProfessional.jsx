"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { signIn, useSession } from "next-auth/react";
import { useTranslation } from "react-i18next";
import { FaHeart, FaRegHeart, FaPaperPlane, FaReply, FaTrash } from "react-icons/fa6";

export default function ProjectEngagementProfessional({ projectKey }) {
  const { data: session } = useSession();
  const { t } = useTranslation();
  const [project, setProject] = useState({ count: 0, liked: false });
  const [comments, setComments] = useState([]);
  const [content, setContent] = useState("");
  const [replyDrafts, setReplyDrafts] = useState({});
  const [sending, setSending] = useState(false);
  const [notice, setNotice] = useState("");

  useEffect(() => {
    fetch(`/api/projects/${projectKey}/like`).then((r) => r.json()).then(setProject).catch(() => {});
    fetch(`/api/projects/${projectKey}/comments`).then((r) => r.json()).then(async (payload) => {
      const rows = payload.data || [];
      const withReplies = await Promise.all(rows.map(async (comment) => {
        const response = await fetch(`/api/comments/${comment.id}/replies`);
        const replies = await response.json().catch(() => ({}));
        return { ...comment, replies: replies.data || [] };
      }));
      setComments(withReplies);
    }).catch(() => setComments([]));
  }, [projectKey]);

  async function toggleProjectLike() {
    if (!session) return signIn("google", { callbackUrl: window.location.href });
    const response = await fetch(`/api/projects/${projectKey}/like`, { method: project.liked ? "DELETE" : "POST" });
    if (response.ok) setProject(await response.json());
  }

  async function submitComment(event) {
    event.preventDefault();
    if (!session) return signIn("google", { callbackUrl: window.location.href });
    if (session.user?.role === "admin" || content.trim().length < 3) return;
    setSending(true); setNotice("");
    const response = await fetch(`/api/projects/${projectKey}/comments`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ content: content.trim() }) });
    const payload = await response.json().catch(() => ({}));
    setNotice(payload.message || payload.error || t("contact.failed"));
    if (response.ok) setContent("");
    setSending(false);
  }

  async function submitReply(commentId) {
    const reply = String(replyDrafts[commentId] || "").trim();
    if (!reply || session?.user?.role !== "admin") return;
    setSending(true);
    const response = await fetch(`/api/comments/${commentId}/replies`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ content: reply }) });
    if (response.ok) { setReplyDrafts((drafts) => ({ ...drafts, [commentId]: "" })); const refreshed = await fetch(`/api/comments/${commentId}/replies`).then((r) => r.json()); setComments((items) => items.map((item) => item.id === commentId ? { ...item, replies: refreshed.data || [] } : item)); }
    else { const payload = await response.json().catch(() => ({})); setNotice(payload.error || t("contact.failed")); }
    setSending(false);
  }

  async function likeComment(comment) {
    if (!session) return signIn("google", { callbackUrl: window.location.href });
    const response = await fetch(`/api/comments/${comment.id}/like`, { method: comment.liked ? "DELETE" : "POST" });
    if (response.ok) { const payload = await response.json(); setComments((items) => items.map((item) => item.id === comment.id ? { ...item, likes: payload.count, liked: payload.liked } : item)); }
  }

  async function deleteComment(commentId) {
    if (session?.user?.role !== "admin" || !window.confirm(t("engagement.deleteConfirm", { defaultValue: "Delete this comment permanently?" }))) return;
    const response = await fetch(`/api/comments/${commentId}`, { method: "DELETE" });
    if (response.ok) setComments((items) => items.filter((item) => item.id !== commentId));
    else { const payload = await response.json().catch(() => ({})); setNotice(payload.error || t("contact.failed")); }
  }

  return <section className="engagement"><div className="engagement-bar"><button className={`like-button ${project.liked ? "liked" : ""}`} onClick={toggleProjectLike} aria-label={t("details.like")}>{project.liked ? <FaHeart /> : <FaRegHeart />}<strong>{project.count}</strong><span>{t("details.like")}</span></button><span className="comment-count">{comments.length} {t("engagement.comments", { defaultValue: "approved comments" })}</span></div><div className="comments-area"><div className="comments-heading"><div><p className="eyebrow">{t("engagement.eyebrow", { defaultValue: "COMMUNITY NOTES" })}</p><h2>{t("engagement.title", { defaultValue: "Thoughts on this build." })}</h2></div></div>{!session && <div className="comment-login-card"><p>{t("engagement.loginPrompt", { defaultValue: "Sign in to leave a comment and join the conversation." })}</p><button className="button primary" type="button" onClick={() => signIn("google", { callbackUrl: window.location.href })}>{t("nav.signIn", { defaultValue: "Sign in" })}</button></div>}{session?.user?.role !== "admin" && session && <form className="comment-form" onSubmit={submitComment}><Image src={session.user?.image || "/images/MyPic.webp"} alt="" width={38} height={38} /><textarea value={content} onChange={(e) => setContent(e.target.value)} maxLength={2000} placeholder={t("engagement.placeholder", { defaultValue: "Share a thoughtful comment…" })} /><button disabled={sending || content.trim().length < 3} aria-label={t("details.send")}><FaPaperPlane /></button></form>}{session?.user?.role === "admin" && <p className="admin-comment-note">{t("engagement.adminNote", { defaultValue: "Admin accounts can reply to comments and like them, but cannot create comments." })}</p>}{notice && <p className="comment-notice">{notice}</p>}<div className="comments-list">{comments.length === 0 ? <p className="empty-comments">{t("engagement.empty", { defaultValue: "No approved comments yet." })}</p> : comments.map((comment) => <article className="comment-card" key={comment.id}><Image src={comment.author_image || "/images/MyPic.webp"} alt="" width={38} height={38} /><div><div className="comment-author"><strong>{comment.author_name}</strong><time>{new Date(comment.created_at).toLocaleDateString()}</time></div><p>{comment.content}</p><div className="comment-actions"><button className={comment.liked ? "comment-liked" : ""} onClick={() => likeComment(comment)}><FaHeart /> {Number(comment.likes || 0)}</button>{session?.user?.role === "admin" && <button className="comment-delete-button" onClick={() => deleteComment(comment.id)}><FaTrash /> {t("engagement.delete", { defaultValue: "Delete" })}</button>}</div>{comment.replies?.map((reply) => <div className="comment-reply" key={reply.id}><strong><FaReply /> {reply.author_name}</strong><p>{reply.content}</p></div>)}{session?.user?.role === "admin" && <div className="admin-reply-form"><input value={replyDrafts[comment.id] || ""} onChange={(e) => setReplyDrafts((drafts) => ({ ...drafts, [comment.id]: e.target.value }))} placeholder={t("engagement.replyPlaceholder", { defaultValue: "Write an official reply…" })} /><button type="button" disabled={sending || !String(replyDrafts[comment.id] || "").trim()} onClick={() => submitReply(comment.id)}><FaReply /> {t("engagement.reply", { defaultValue: "Reply" })}</button></div>}</div></article>)}</div></div></section>;
}
