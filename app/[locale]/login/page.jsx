"use client";
import { signIn } from "next-auth/react"; import { useParams, useSearchParams } from "next/navigation";
import { useTranslation } from "react-i18next";
import Link from "next/link";
import { FaGoogle, FaArrowLeft } from "react-icons/fa6";
export default function LoginPage(){const q=useSearchParams();const {locale="en"}=useParams();const {t}=useTranslation();const error=q.get("error");return <main className="portfolio-shell auth-page"><div className="auth-card"><Link className="auth-brand" href={`/${locale}`}>~/mohamed-abu</Link><p className="eyebrow">{t("login.eyebrow",{defaultValue:"SIGN IN"})}</p><h1>{t("login.title",{defaultValue:"Welcome back."})}</h1><p className="auth-copy">{t("login.description",{defaultValue:"Sign in to join the conversation, leave comments, and save your activity."})}</p>{error&&<p className="auth-error">{t("login.error",{defaultValue:"Google sign-in failed. Please try again."})}</p>}<button className="google-button" onClick={()=>signIn("google",{callbackUrl:`/${locale}`})}><FaGoogle/> {t("login.google",{defaultValue:"Continue with Google"})}</button><Link className="back-link" href={`/${locale}`}><FaArrowLeft/> {t("login.back",{defaultValue:"Back to portfolio"})}</Link></div></main>}



