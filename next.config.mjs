/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    // Portfolio media is served by the same-origin media route. Keep these
    // dynamic paths direct so the browser can load them without an optimizer
    // round-trip when the work section is populated after hydration.
    unoptimized: true,
    remotePatterns: [
      { protocol: "https", hostname: "mohamedabudeveloper.com" },
      { protocol: "http", hostname: "localhost", port: "3000" },
    ],
    qualities: [75, 85, 100], // ✅ لتفادي التحذير في Next.js 16
  },
};

export default nextConfig;


