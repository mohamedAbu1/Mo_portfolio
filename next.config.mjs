/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "dxpbyrcbklqrjlytmkum.supabase.co" },
      { protocol: "https", hostname: "bsrlydzntfpuyxcqwjpl.supabase.co" },
      { protocol: "https", hostname: "iyvdseypdpcejejyyuwz.supabase.co" },
    ],
    qualities: [75, 85, 100], // ✅ لتفادي التحذير في Next.js 16
  },
};

export default nextConfig;
