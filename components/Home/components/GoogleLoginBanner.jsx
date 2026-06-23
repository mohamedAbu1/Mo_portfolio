"use client";

import { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import { FaGoogle } from "react-icons/fa";
import { useAuth } from "@/context/AuthContext"; // ✅ استدعاء الـ AuthContext

export default function GoogleLoginBanner() {
  const [showButton, setShowButton] = useState(false);
  const { isLoggedIn, loginWithGoogle } = useAuth(); // ✅ استخدام الدوال من AuthContext

  useEffect(() => {
    // كل مرة تتغير حالة تسجيل الدخول → يعيد تشغيل التايمر
    if (!isLoggedIn) {
      const showTimer = setTimeout(() => setShowButton(true), 5000);
      const hideTimer = setTimeout(() => setShowButton(false), 20000);

      return () => {
        clearTimeout(showTimer);
        clearTimeout(hideTimer);
      };
    } else {
      // لو المستخدم مسجل دخول → اخفي الزر
      setShowButton(false);
    }
  }, [isLoggedIn]); // ✅ يعتمد على حالة تسجيل الدخول

  // لو المستخدم مسجل دخول بالفعل أو الزر مش مفعل → لا يظهر
  if (isLoggedIn || !showButton) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: "1rem",
        right: "1rem",
        zIndex: 2000,
        animation: "fadeIn 0.8s ease",
      }}
    >
      <Button
        variant="contained"
        color="primary"
        onClick={loginWithGoogle} // ✅ استدعاء تسجيل الدخول من Supabase
        sx={{
          gap: "0.5rem",
          backgroundColor: "#4285F4",
          color: "#fff",
          "&:hover": { backgroundColor: "#357ae8" },
          boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
          borderRadius: "8px",
          padding: "0.6rem 1.2rem",
        }}
      >
        <FaGoogle /> Login with Google
      </Button>
    </div>
  );
}
