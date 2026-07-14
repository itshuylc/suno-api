/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    config.module.rules.push({
      test: /\.(ttf|html)$/i,
      type: 'asset/resource'
    });
    return config;
  },
  experimental: {
    serverMinification: false, // the server minification unfortunately breaks the selector class names
    serverComponentsExternalPackages: [
      '@playwright/browser-chromium',
      'playwright',
      'playwright-core',
      'rebrowser-playwright-core',
      'electron'
    ],
  },
};  

export default nextConfig;
