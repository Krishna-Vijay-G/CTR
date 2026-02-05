/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: '/CTR',
  assetPrefix: '/CTR/',
  reactStrictMode: true,
  images: {
    unoptimized: true,
  },
}

module.exports = nextConfig