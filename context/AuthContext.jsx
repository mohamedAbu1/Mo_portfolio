"use client";
import { createContext, useContext } from "react";
import { signIn, signOut, useSession } from "next-auth/react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const { data: session, status } = useSession();
  const user = session?.user || null;
  const isLoggedIn = status === "authenticated";

  const loginWithGoogle = () => signIn("google");
  const logout = () => signOut();

  return <AuthContext.Provider value={{ isLoggedIn, user, loginWithGoogle, logout }}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}