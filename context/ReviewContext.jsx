"use client";
import React, { createContext, useContext, useState } from "react";

// إنشاء الـ Context
const ReviewContext = createContext();

// Hook للاستخدام داخل الكومبوننتات
export const useReviews = () => useContext(ReviewContext);

export const ReviewProvider = ({ children }) => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(false);

  // 📌 إضافة ريفيو جديد
  const addReview = async (reviewData) => {
    try {
      setLoading(true);
      const res = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(reviewData),
      });
      const data = await res.json();
      if (res.ok) {
        setReviews((prev) => [...prev, data]);
      } else {
        console.error("Error adding review:", data.error);
      }
    } catch (err) {
      console.error("Error:", err);
    } finally {
      setLoading(false);
    }
  };

  // 📌 جلب كل الريفيوهات
  const fetchReviews = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/reviews");
      const data = await res.json();
      if (res.ok) {
        setReviews(data);
      } else {
        console.error("Error fetching reviews:", data.error);
      }
    } catch (err) {
      console.error("Error:", err);
    } finally {
      setLoading(false);
    }
  };

  

  // 📌 حذف ريفيو
  const deleteReview = async (id) => {
    try {
      setLoading(true);
      const res = await fetch(`/api/reviews/${id}`, { method: "DELETE" });
      if (res.ok) {
        setReviews((prev) => prev.filter((r) => r.id !== id));
      } else {
        console.error("Error deleting review");
      }
    } catch (err) {
      console.error("Error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ReviewContext.Provider
      value={{
        reviews,
        loading,
        addReview,
        fetchReviews,
        deleteReview,
      }}
    >
      {children}
    </ReviewContext.Provider>
  );
};
