"use client";
import { useForm, ValidationError } from "@formspree/react";
import Lottie from "lottie-react";
import doneAnimation from "../../public/animation/done.json";
import contactAnimation from "../../public/animation/contact.json";
import { useTheme } from "@/context/ThemeContext";

const Contact = () => {
  const [state, handleSubmit] = useForm("xrgvvdlo");
  const { theme } = useTheme();

  return (
    <section
    id="Contact"
      style={{
        padding: "2rem",
        backgroundColor: theme.background,
        color: theme.text,
        borderRadius: "12px",
        transition: "background-color 0.3s ease, color 0.3s ease",
      }}
    >
      <h1
        style={{
          fontSize: "2.1rem",
          color: theme.title,
          marginBottom: "1rem",
          display: "flex",
          alignItems: "center",
          gap: "0.5rem",
        }}
      >
        <span style={{ color: theme.icon, fontSize: "1.8rem" }}>✉</span>
        Contact us
      </h1>

      <p
        style={{
          color: theme.subText,
          marginBottom: "2rem",
          lineHeight: "1.65rem",
        }}
      >
        Contact us for more information and get notified when I publish
        something new.
      </p>

      <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap" }}>
        <form onSubmit={handleSubmit} style={{ flex: 1, minWidth: "300px" }}>
          <div style={{ display: "flex", alignItems: "center", marginBottom: "1.5rem" }}>
            <label htmlFor="email" style={{ color: theme.subText, marginRight: "1rem" }}>
              Email Address:
            </label>
            <input
              autoComplete="off"
              required
              type="email"
              name="email"
              id="email"
              style={{
                backgroundColor: theme.card,
                border: `1px solid ${theme.border}`,
                padding: "0.5rem 1rem",
                borderRadius: "5px",
                flex: 1,
                color: theme.text,
              }}
            />
            <ValidationError prefix="Email" field="email" errors={state.errors} />
          </div>

          <div style={{ display: "flex", flexDirection: "column", marginBottom: "1.5rem" }}>
            <label htmlFor="message" style={{ color: theme.subText, marginBottom: "0.5rem" }}>
              Your message:
            </label>
            <textarea
              required
              name="message"
              id="message"
              style={{
                backgroundColor: theme.card,
                border: `1px solid ${theme.border}`,
                padding: "0.7rem 1rem",
                borderRadius: "5px",
                minHeight: "9rem",
                resize: "vertical",
                color: theme.text,
              }}
            ></textarea>
            <ValidationError prefix="Message" field="message" errors={state.errors} />
          </div>

          <button
            type="submit"
            disabled={state.submitting}
            style={{
              backgroundColor: theme.buttonPrimaryBg,
              color: theme.buttonPrimaryText,
              padding: "0.75rem 2rem",
              fontSize: "1.05rem",
              borderRadius: "5px",
              border: `1px solid ${theme.border}`,
              cursor: "pointer",
              transition: "background-color 0.3s ease",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = theme.buttonPrimaryHover)}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = theme.buttonPrimaryBg)}
          >
            {state.submitting ? "Submitting ..." : "Submit"}
          </button>

          {state.succeeded && (
            <p style={{ fontSize: "18px", marginTop: "1.7rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <Lottie loop={false} style={{ height: 37 }} animationData={doneAnimation} />
              Your message has been sent successfully 👌
            </p>
          )}
        </form>

        <div style={{ flex: 1, minWidth: "300px", display: "flex", justifyContent: "center" }}>
          <Lottie
            style={{ height: 355 }}
            animationData={contactAnimation}
          />
        </div>
      </div>
    </section>
  );
};

export default Contact;
