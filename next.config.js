/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  // Cloudflare Pages configuration
  output: 'export',
  trailingSlash: true,
  skipTrailingSlashRedirect: true,
  distDir: 'dist',
  images: {
    unoptimized: true,
    domains: ['localhost'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  // Enable experimental features for Cloudflare
  experimental: {
    runtime: 'edge',
  },
  // Environment variables for Saudi market
  env: {
    NEXT_PUBLIC_SITE_NAME: 'E-Commerce 369',
    NEXT_PUBLIC_SITE_DESCRIPTION: 'Saudi Women\'s Fashion Platform',
    NEXT_PUBLIC_DEFAULT_LOCALE: 'ar',
    NEXT_PUBLIC_SUPPORTED_LOCALES: 'ar,en',
    NEXT_PUBLIC_RTL_SUPPORT: 'true',
  },
  // Headers for Arabic content and security
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Content-Language',
            value: 'ar,en',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
        ],
      },
    ];
  },
  // Redirects for Arabic/English routing
  async redirects() {
    return [
      {
        source: '/ar',
        destination: '/',
        permanent: true,
        locale: false,
      },
    ];
  },
}

module.exports = nextConfig