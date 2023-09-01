/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    esmExternals: 'loose'
    // serverComponentsExternalPackages: ["@sparticuz/chromium"],
  }
}

module.exports = nextConfig
