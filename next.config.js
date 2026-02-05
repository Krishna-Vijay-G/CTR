/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  reactStrictMode: true,
  basePath: '/CTR',
  images: {
    domains: ['localhost'],
    unoptimized: true,
  },
}

module.exports = nextConfig