/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      "dxpbyrcbklqrjlytmkum.supabase.co", // أضف دومين Supabase هنا
      "bsrlydzntfpuyxcqwjpl.supabase.co", // لو عندك أكثر من مشروع أو bucket
    ],
    qualities: [75, 85, 100], // ✅ لتفادي التحذير في Next.js 16
  },
};

export default nextConfig;
