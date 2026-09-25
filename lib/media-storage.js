import path from "node:path";
import { access } from "node:fs/promises";

const uploadRoot = () => process.env.UPLOADS_DIR || path.join(process.cwd(), "storage", "uploads");

export function cleanMediaPath(value) {
  if (!value || /^https?:\/\//i.test(value)) return value;
  const normalized = String(value).replace(/\\/g, "/").replace(/^\/+/, "").replace(/^api\/media\//i, "").replace(/^uploads\//i, "");
  const segments = normalized.split("/");
  if (!normalized || path.isAbsolute(normalized) || segments.some((segment) => !segment || segment === "." || segment === ".." || segment.includes("\0") || segment.includes(":"))) return null;
  return normalized;
}

export function mediaCandidates(value) {
  const relative = cleanMediaPath(value);
  if (!relative) return [];
  return [
    path.join(uploadRoot(), relative),
    path.join(process.cwd(), "public", "uploads", relative),
  ];
}

export async function mediaExists(value) {
  if (!value || /^https?:\/\//i.test(value)) return true;
  for (const candidate of mediaCandidates(value)) {
    try {
      await access(candidate);
      return true;
    } catch {
      // Check the next configured storage location.
    }
  }
  return false;
}

export function mediaUrl(value) {
  if (!value || /^https?:\/\//i.test(value)) return value;
  const relative = cleanMediaPath(value);
  if (!relative) return null;
  return `/api/media/${relative.split("/").map(encodeURIComponent).join("/")}`;
}

export function mediaFilePath(parts) {
  const relative = cleanMediaPath(parts.map((part) => String(part)).join("/"));
  return relative ? path.join(uploadRoot(), relative) : null;
}
