import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { randomUUID } from "node:crypto";
import { mediaUrl } from "@/lib/media-storage";

export const runtime = "nodejs";
const imageTypes = new Set(["image/jpeg", "image/png", "image/webp", "image/avif"]);
const videoTypes = new Set(["video/mp4", "video/webm", "video/quicktime"]);
export async function POST(req) {
  const session = await getServerSession(authOptions);
  if (session?.user?.role !== "admin") return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const form = await req.formData();
  const file = form.get("file");
  const kind = form.get("kind") === "video" ? "video" : "image";
  const extension = path.extname(file?.name || "").toLowerCase();
  const imageExtensions = new Set([".jpg", ".jpeg", ".png", ".webp", ".avif"]);
  const videoExtensions = new Set([".mp4", ".webm", ".mov"]);
  const valid = kind === "video" ? (videoTypes.has(file?.type) || videoExtensions.has(extension)) : (imageTypes.has(file?.type) || imageExtensions.has(extension));
  if (!file || typeof file.arrayBuffer !== "function" || !valid) return NextResponse.json({ error: "Unsupported file type" }, { status: 400 });
  if (file.size > (kind === "video" ? 50 : 8) * 1024 * 1024) return NextResponse.json({ error: "File is too large" }, { status: 413 });
  const ext = path.extname(file.name).toLowerCase() || (kind === "video" ? ".mp4" : ".webp");
  const folder = path.join(process.env.UPLOADS_DIR || path.join(process.cwd(), "storage", "uploads"), "projects");
  await mkdir(folder, { recursive: true });
  const name = `${Date.now()}-${randomUUID()}${ext}`;
  await writeFile(path.join(folder, name), Buffer.from(await file.arrayBuffer()));
  return NextResponse.json({ url: mediaUrl(`/uploads/projects/${name}`) }, { status: 201 });
}
