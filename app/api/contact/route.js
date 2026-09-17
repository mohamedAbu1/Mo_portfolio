import nodemailer from "nodemailer";
import { NextResponse } from "next/server";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX_MESSAGE_LENGTH = 5000;
const MAILBOX = "mohamedmed33mil@mohamedabudeveloper.com";

export async function POST(request) {
  try {
    const body = await request.json();
    const name = typeof body.name === "string" ? body.name.trim() : "";
    const email = typeof body.email === "string" ? body.email.trim().toLowerCase() : "";
    const message = typeof body.message === "string" ? body.message.trim() : "";

    if (name.length < 2 || name.length > 120) {
      return NextResponse.json({ success: false, error: "Please enter a valid name." }, { status: 400 });
    }
    if (!EMAIL_PATTERN.test(email) || email.length > 254) {
      return NextResponse.json({ success: false, error: "Please enter a valid email address." }, { status: 400 });
    }
    if (message.length < 10 || message.length > MAX_MESSAGE_LENGTH) {
      return NextResponse.json({ success: false, error: "Message must be between 10 and 5000 characters." }, { status: 400 });
    }
    if (!process.env.HOSTINGER_PASSWORD) {
      console.error("Contact form is missing HOSTINGER_PASSWORD");
      return NextResponse.json({ success: false, error: "The message service is temporarily unavailable." }, { status: 503 });
    }

    const transporter = nodemailer.createTransport({
      host: "smtp.hostinger.com",
      port: 465,
      secure: true,
      auth: { user: MAILBOX, pass: process.env.HOSTINGER_PASSWORD },
    });

    await transporter.sendMail({
      from: MAILBOX,
      to: MAILBOX,
      replyTo: email,
      subject: `Portfolio contact message from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
      html: `<p><strong>Name:</strong> ${escapeHtml(name)}</p><p><strong>Email:</strong> ${escapeHtml(email)}</p><p>${escapeHtml(message).replace(/\n/g, "<br />")}</p>`,
    });

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("Contact form delivery failed:", error.message);
    return NextResponse.json({ success: false, error: "Unable to send your message. Please try again." }, { status: 500 });
  }
}

function escapeHtml(value) {
  return value.replace(/[&<>'"]/g, (character) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    "'": "&#39;",
    '"': "&quot;",
  }[character]));
}
