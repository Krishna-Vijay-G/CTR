/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: true, // or remove this, Vercel handles it
  },
}

module.exports = nextConfig