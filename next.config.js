/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ['page.tsx', 'page.ts', 'page.jsx', 'page.js'],
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['res.cloudinary.com'],
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        port: "",
        pathname: "/my-account/**",
      },
    ],
  },
}

module.exports = nextConfig
