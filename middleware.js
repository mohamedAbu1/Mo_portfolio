import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

const SUPPORTED_LOCALES = ["en", "ar", "es", "fr", "de", "it", "zh"];

export async function middleware(request) {
  const url = request.nextUrl.clone();
  if (url.pathname === "/robots.txt" || url.pathname === "/sitemap.xml") return NextResponse.next();
  const segments = url.pathname.split("/").filter(Boolean);
  const isAsset = ["/_next", "/favicon.ico", "/api", "/assets", "/images", "/avatar", "/uploads"].some((path) => url.pathname.startsWith(path));
  if (isAsset) return NextResponse.next();

  const locale = segments[0];
  const isDashboard = segments.includes("dashboard");
  if (isDashboard) {
    const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET });
    if (!token || token.role !== "admin") {
      const login = new URL("/en/login", request.url);
      login.searchParams.set("callbackUrl", `${url.pathname}${url.search}`);
      return NextResponse.redirect(login);
    }
  }

  if (!SUPPORTED_LOCALES.includes(locale)) {
    // English is the official/default site language. Users can still switch
    // explicitly to another supported locale from the language menu.
    url.pathname = `/en${url.pathname}`;
    return NextResponse.redirect(url);
  }
  return NextResponse.next();
}

export const config = { matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"] };
