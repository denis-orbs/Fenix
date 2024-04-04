/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['fenix-api-testnet.vercel.app'],
  },
  reactStrictMode: true,
  i18n: {
    locales: ['en-US', 'zh-CN'],
    defaultLocale: 'en-US',
  },
  images: {
    domains: ['fenix-api-testnet.vercel.app'],
  },
  // TODO: REMOVE
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
}

module.exports = nextConfig
