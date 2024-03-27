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
}

module.exports = nextConfig
