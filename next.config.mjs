/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "mohamedabudeveloper.com" },
      { protocol: "http", hostname: "localhost", port: "3000" },
    ],
    qualities: [75, 85, 100], // ✅ لتفادي التحذير في Next.js 16
  },
};

export default nextConfig;


