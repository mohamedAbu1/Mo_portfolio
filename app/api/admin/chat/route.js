import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { query } from "@/lib/mysql";

async function adminSession() {
  const session = await getServerSession(authOptions);
  return session?.user?.role === "admin" ? session : null;
}

export async function GET(request) {
  const session = await adminSession();
  if (!session) return NextResponse.json({ error: "Admin access required" }, { status: 403 });
  try {
    const conversationId = new URL(request.url).searchParams.get("conversationId");
    if (conversationId) {
      const rows = await query("SELECT id, sender_key, sender_name, sender_image, content, is_admin, read_at, created_at FROM chat_messages WHERE conversation_id=? ORDER BY created_at ASC", [conversationId]);
      await query("UPDATE chat_messages SET read_at=CURRENT_TIMESTAMP WHERE conversation_id=? AND is_admin=FALSE AND read_at IS NULL", [conversationId]);
      return NextResponse.json({ data: rows });
    }
    const conversations = await query(`SELECT c.id, c.user_key, c.status, c.created_at, c.updated_at,
      (SELECT m.sender_name FROM chat_messages m WHERE m.conversation_id=c.id ORDER BY m.created_at DESC LIMIT 1) AS last_sender,
      (SELECT m.content FROM chat_messages m WHERE m.conversation_id=c.id ORDER BY m.created_at DESC LIMIT 1) AS last_message,
      (SELECT m.created_at FROM chat_messages m WHERE m.conversation_id=c.id ORDER BY m.created_at DESC LIMIT 1) AS last_message_at,
      (SELECT COUNT(*) FROM chat_messages m WHERE m.conversation_id=c.id AND m.is_admin=FALSE AND m.read_at IS NULL) AS unread_count
      FROM chat_conversations c ORDER BY c.updated_at DESC`);
    return NextResponse.json({ data: conversations });
  } catch (error) { console.error("Admin chat GET failed", error); return NextResponse.json({ error: "Unable to load chat" }, { status: 500 }); }
}

export async function POST(request) {
  const session = await adminSession();
  if (!session) return NextResponse.json({ error: "Admin access required" }, { status: 403 });
  try {
    const { conversationId, content } = await request.json();
    const message = String(content || "").trim();
    if (!conversationId || message.length < 1 || message.length > 2000) return NextResponse.json({ error: "Conversation and valid message are required" }, { status: 400 });
    const conversation = await query("SELECT id FROM chat_conversations WHERE id=? LIMIT 1", [conversationId]);
    if (!conversation.length) return NextResponse.json({ error: "Conversation not found" }, { status: 404 });
    await query("INSERT INTO chat_messages(conversation_id, sender_key, sender_name, sender_image, content, is_admin) VALUES(?,?,?,?,?,TRUE)", [conversationId, session.user.email, session.user.name || "Admin", session.user.image || null, message]);
    await query("UPDATE chat_messages SET read_at=CURRENT_TIMESTAMP WHERE conversation_id=? AND is_admin=FALSE AND read_at IS NULL", [conversationId]);
    return NextResponse.json({ ok: true }, { status: 201 });
  } catch (error) { console.error("Admin chat POST failed", error); return NextResponse.json({ error: "Unable to send reply" }, { status: 500 }); }
}
