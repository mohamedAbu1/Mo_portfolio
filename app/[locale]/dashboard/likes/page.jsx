"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { FaArrowLeft, FaHeart } from "react-icons/fa6";

export default function LikesPage() {
  const { data: session, status } = useSession();
  const [likes, setLikes] = useState([]);
  useEffect(() => { if (status === "authenticated") fetch("/api/admin/likes").then((r) => r.json()).then((d) => setLikes(d.data || [])); }, [status]);
  if (status === "loading") return <main className="dashboard-page"><div className="dashboard-loading">Loading likes…</div></main>;
  if (!session || session.user?.role !== "admin") return <main className="dashboard-page"><div className="dashboard-loading"><h1>Access required</h1><Link href="/en/login" className="button primary">Sign in</Link></div></main>;
  return <main className="dashboard-page"><aside className="dashboard-sidebar"><Link className="brand" href="/"><img className="brand-logo" src="/images/mohamed-abu-logo.png" alt="Mohamed Abu" /></Link><nav className="comments-nav"><Link href="/en/dashboard"><FaArrowLeft /> Dashboard</Link><Link href="/en/dashboard/comments">Comments</Link></nav></aside><section className="dashboard-main"><header className="dashboard-header"><div><p className="eyebrow">ACTIVITY / LIKES</p><h1>Audience reactions.</h1></div></header><div className="moderation-list">{likes.length === 0 ? <div className="empty-state"><span>♡</span><p>No likes yet.</p></div> : likes.map((like, index) => <article className="moderation-card" key={`${like.target}-${like.user_key}-${index}`}><FaHeart className="activity-icon" /><div><strong>{like.user_key}</strong><small>{like.target_type}: {like.target} · {new Date(like.created_at).toLocaleString()}</small><p>Liked this portfolio item.</p></div></article>)}</div></section></main>;
}
