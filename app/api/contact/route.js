import nodemailer from "nodemailer";

export async function POST(req) {
  try {
    const { email, message } = await req.json();

    const transporter = nodemailer.createTransport({
      host: "smtp.hostinger.com",
      port: 465,
      secure: true,
      auth: {
        user: "mohamedmed33mil@mohamedabudeveloper.com",
        pass: process.env.HOSTINGER_PASSWORD,
      },
    });

    await transporter.sendMail({
      from: "mohamedmed33mil@mohamedabudeveloper.com",
      replyTo: email,
      to: "mohamedmed33mil@mohamedabudeveloper.com",
      subject: "New Contact Form Message",
      text: message,
    });

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
}
