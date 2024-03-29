/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  i18n: {
    locales: ['en-US', 'zh-CN'],
    defaultLocale: 'en-US',
  },
  images: {
    domains: ['fenix-api-testnet.vercel.app'],
  },
}

module.exports = nextConfig
