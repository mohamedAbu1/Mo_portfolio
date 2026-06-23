"use client";
import React, { useState } from "react";
import { useReviews } from "@/context/ReviewContext";
import { useTheme } from "@/context/ThemeContext";
import Picker from "@emoji-mart/react";
import data from "@emoji-mart/data";
import { FaStar, FaPlus } from "react-icons/fa";

const ReviewForm = ({user}) => {
  const { addReview } = useReviews();
  const { theme } = useTheme();

  const [newReview, setNewReview] = useState({
    name: user?.user_metadata?.name || "",
    avatar_url: user?.user_metadata?.image || "",
    content: "",
    rating: 5,
    user_id: user?.id,
  });

  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    addReview(newReview);
    setNewReview({
      name: user?.user_metadata?.name || "",
      avatar_url: user?.user_metadata?.image || "",
      content: "",
      rating: 5,
      user_id: user?.id,
    });
  };

  const addEmoji = (emoji) => {
    setNewReview({ ...newReview, content: newReview.content + emoji.native });
    setShowEmojiPicker(false);
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        marginBottom: "2rem",
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
        backgroundColor: theme.cardInnerBg,
        padding: "1.5rem",
        borderRadius: "10px",
        boxShadow: theme.shadow,
      }}
    >
      <div
        style={{
          display: "flex",
          width: "100%",
          gap: "0.5rem",
          alignItems: "center",
        }}
      >
        <textarea
          placeholder="Your Comment"
          value={newReview.content}
          onChange={(e) =>
            setNewReview({ ...newReview, content: e.target.value })
          }
          style={{
            padding: "0.8rem",
            borderRadius: "8px",
            border: `1px solid ${theme.border}`,
            backgroundColor: theme.inputBg,
            color: theme.text,
            minHeight: "100px",
            width: "60%",
          }}
        />

        <button
          type="button"
          onClick={() => setShowEmojiPicker(!showEmojiPicker)}
          style={{
            padding: "0.5rem",
            borderRadius: "6px",
            border: `1px solid ${theme.border}`,
            backgroundColor: theme.buttonSecondaryBg,
            color: theme.buttonSecondaryText,
            cursor: "pointer",
          }}
        >
          😀 Add Emoji
        </button>

        {showEmojiPicker && (
          <Picker
            data={data}
            onEmojiSelect={addEmoji}
            theme={theme.mode === "dark" ? "dark" : "light"}
          />
        )}
      </div>
      <div style={{ display: "flex", gap: "0.5rem" }}>
        {[1, 2, 3, 4, 5].map((r) => (
          <FaStar
            key={r}
            size={28}
            onClick={() => setNewReview({ ...newReview, rating: r })}
            style={{
              cursor: "pointer",
              transition: "transform 0.2s ease",
              color:
                r <= newReview.rating
                  ? theme.starColor || "#C9A34A"
                  : theme.muted,
            }}
            onMouseOver={(e) => (e.target.style.transform = "scale(1.2)")}
            onMouseOut={(e) => (e.target.style.transform = "scale(1)")}
          />
        ))}
      </div>
      <button
        type="submit"
        style={{
          display: "flex",
          alignItems: "center",
          gap: "0.5rem",
          width: "fit-content",
          padding: "0.8rem 1.2rem",
          borderRadius: "8px",
          border: "none",
          backgroundColor: theme.buttonPrimaryBg,
          color: theme.buttonPrimaryText,
          fontWeight: "bold",
          cursor: "pointer",
          transition: "all 0.3s ease",
          boxShadow: theme.shadow,
        }}
        onMouseOver={(e) =>
          (e.currentTarget.style.backgroundColor = theme.buttonPrimaryHover)
        }
        onMouseOut={(e) =>
          (e.currentTarget.style.backgroundColor = theme.buttonPrimaryBg)
        }
      >
        <FaPlus size={16} />
        Add Review
      </button>
    </form>
  );
};

export default ReviewForm;
