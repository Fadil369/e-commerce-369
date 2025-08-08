const createNextIntlPlugin = require("next-intl/plugin");

const withNextIntl = createNextIntlPlugin("./src/i18n.ts");

/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  // Production configuration for Cloudflare Pages
  output: "export",
  trailingSlash: true,
  skipTrailingSlashRedirect: true,
  distDir: "dist",
  images: {
    unoptimized: true,
    domains: ["localhost"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
  // Environment variables for Saudi market
  env: {
    NEXT_PUBLIC_SITE_NAME: "E-Commerce 369",
    NEXT_PUBLIC_SITE_DESCRIPTION: "Saudi Women's Fashion Platform",
    NEXT_PUBLIC_DEFAULT_LOCALE: "en",
    NEXT_PUBLIC_SUPPORTED_LOCALES: "ar,en",
    NEXT_PUBLIC_RTL_SUPPORT: "true",
  },
  // Static export configuration - no middleware in static mode
  // Internationalization will be handled client-side
};

module.exports = withNextIntl(nextConfig);
