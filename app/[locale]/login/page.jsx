"use client";
import { signIn } from "next-auth/react"; import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { FaGoogle, FaArrowLeft } from "react-icons/fa6";
export default function LoginPage(){const q=useSearchParams();const error=q.get("error");return <main className="auth-page"><div className="auth-card"><Link className="auth-brand" href="/">~/mohamed-abu</Link><p className="eyebrow">PRIVATE WORKSPACE</p><h1>Welcome back.</h1><p className="auth-copy">Sign in to manage your portfolio, clients, deliverables, files, and messages.</p>{error&&<p className="auth-error">Google sign-in failed: {error}. Check the OAuth client settings and server log.</p>}<button className="google-button" onClick={()=>signIn("google",{callbackUrl:"/en/dashboard"})}><FaGoogle/> Continue with Google</button><Link className="back-link" href="/"><FaArrowLeft/> Back to portfolio</Link></div></main>}



