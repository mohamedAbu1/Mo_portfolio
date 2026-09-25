import { NextResponse } from "next/server";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { mediaCandidates, mediaFilePath } from "@/lib/media-storage";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const contentTypes = {
  ".avif": "image/avif", ".gif": "image/gif", ".jpeg": "image/jpeg", ".jpg": "image/jpeg",
  ".mp4": "video/mp4", ".png": "image/png", ".svg": "image/svg+xml", ".webm": "video/webm", ".webp": "image/webp",
};

export async function GET(_request, { params }) {
  const { path: parts = [] } = await params;
  const requestedPath = parts.join("/");
  const candidates = [mediaFilePath(parts), ...mediaCandidates(requestedPath)].filter(Boolean);

  for (const candidate of [...new Set(candidates)]) {
    try {
      const body = await readFile(candidate);
      return new NextResponse(body, { headers: {
        "Cache-Control": "public, max-age=31536000, immutable",
        "Content-Type": contentTypes[path.extname(candidate).toLowerCase()] || "application/octet-stream",
      } });
    } catch {
      // Try the next storage location.
    }
  }

  return NextResponse.json({ error: "Media file not found" }, { status: 404 });
}
